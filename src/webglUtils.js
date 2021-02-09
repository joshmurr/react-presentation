export function createProgram(gl, vs, fs, transform_feedback_varyings=null){
  const v_shader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(v_shader, vs);
  gl.compileShader(v_shader);
  const f_shader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(f_shader, fs);
  gl.compileShader(f_shader);

  const program = gl.createProgram();
  gl.attachShader(program, v_shader);
  gl.attachShader(program, f_shader);

	if(transform_feedback_varyings){
		gl.transformFeedbackVaryings(
			program,
			transform_feedback_varyings,
			gl.INTERLEAVED_ATTRIBS
		);
	}

  gl.linkProgram(program);
  return program;
}

export function createTexture(gl, w, h, data=null){
  const t = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    w, h,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    data,
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
	
	return t;
}

export function createVAO(gl, program, attrs){
	const vao = gl.createVertexArray();
	gl.bindVertexArray(vao);

	for(const name in attrs){
		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array(attrs[name]),
			gl.STATIC_DRAW
		);
		const location = gl.getAttribLocation(program, name);
		gl.enableVertexAttribArray(location);
		gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
	}

	return vao;
}

export function createFramebuffer(gl, tex){
	const f = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, f);
	gl.framebufferTexture2D(
		gl.FRAMEBUFFER,
		gl.COLOR_ATTACHMENT0,
		gl.TEXTURE_2D,
		tex,
		0
	);
	return f;
}

export function initVideo(videoEl) {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        videoEl.srcObject = stream;
      })
      .catch(function (error) {
        console.log('Something went wrong with the webcam...');
      });
  }
}

export function stopVideo(e, videoEl) {
  const stream = videoEl.srcObject;
  const tracks = stream.getTracks();

  for (let i = 0; i < tracks.length; i++) {
    tracks[i].stop();
  }

  videoEl.srcObject = null;
}
