export const vs = `#version 300 es
  in vec4 a_position;
  in vec2 a_texcoord;
  out vec2 v_texcoord;

  void main(){
    gl_Position = a_position * vec4(vec2(-1.0), vec2(1.0));
    v_texcoord = a_texcoord;
  }
`
export const fs = `#version 300 es
  precision mediump float;
  precision mediump sampler2D;

  uniform sampler2D u_texture;
  in vec2 v_texcoord;
  out vec4 outcolor;

	float KERNEL[16] = float[](0.0, 0.5, 0.125, 0.625, 0.75, 0.25, 0.875, 0.375, 0.1875, 0.6875, 0.0625, 0.5625, 0.9375, 0.4375, 0.8125, 0.3125);

  float dither(float c) {
    float closestColor = step(.5, c);
    float secondClosestColor = 1.0 - closestColor;
    int x = int(mod(gl_FragCoord.x, 4.0));
    int y = int(mod(gl_FragCoord.y, 4.0));
    float d = KERNEL[(x + y * 4)];
    float dd = abs(closestColor - c);
    return (dd < d) ? closestColor : secondClosestColor;
  }

  float brightness(vec3 c){
    return 0.2126*c.r + 0.7152*c.g + 0.0722*c.b;
  }

  void main(){
		//float bright = brightness(texture(u_texture, v_texcoord).rgb);
		//outcolor = vec4(vec3(dither(bright)), 1.0);

		outcolor = texture(u_texture, v_texcoord) * 0.5;
  }
`
export const swirl_fs = `#version 300 es
	// https://www.shadertoy.com/view/wlVGWd

  precision mediump float;
  precision mediump sampler2D;
  uniform sampler2D u_texture;
	uniform bool u_effect;
  in vec2 v_texcoord;

	out vec4 outcolor;

	uniform float u_time;

	float rand(vec2 n) {
		return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
	}

	float noise(vec2 p) {
		vec2 ip = floor(p);
		vec2 u = fract(p);
		u = u*u*(3.0-2.0*u);

		float res = mix(
				mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
				mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
		return res*res;
	}

	const mat2 m2 = mat2(0.8,-0.6,0.6,0.8);

	float fbm( vec2 p ){
		float f = 0.0;
		f += 0.5000*noise( p ); p = m2*p*2.02;
		f += 0.2500*noise( p ); p = m2*p*2.03;
		f += 0.1250*noise( p ); p = m2*p*2.01;
		f += 0.0625*noise( p );

		return f/0.769;
	}

	float pattern( vec2 p ) {
		vec2 q = vec2(fbm(p + vec2(0.0,0.0)));
		vec2 r = vec2(fbm(p + 4.0*q + vec2(1.7,9.2)));
		r+= u_time * 0.15;
		return fbm( p + 1.760*r );
	}

  void main(){
		vec2 uv = v_texcoord;
    //uv *= 1.00;
  	float displacement = pattern(uv);
    //vec4 color = vec4(displacement * 1.2, 0.2, displacement * 5., 1.);
		if(u_effect) {
			//outcolor = vec4(vec3(displacement), 1.0);
			outcolor = texture(u_texture, vec2(displacement));
		} else {
			outcolor = texture(u_texture, v_texcoord);
		}
  }
`
