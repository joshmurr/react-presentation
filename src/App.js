import { useState } from 'react'
import GlobalStyle from './components/GlobalStyle'
import Slideshow from './components/Slideshow'

import { slides_data } from './slides'


function App() {
  const [slideNum, setSlideNum] = useState(0)

  return (
    <div className="App">
      <GlobalStyle />
			<Slideshow data={slides_data} slide={slideNum} onSlideChange={setSlideNum} />
    </div>
  );
}

export default App;
