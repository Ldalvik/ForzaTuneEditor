import React, { useState } from 'react'
import NavBar from './NavBar'
import TuneEditor from "./Home"
import Tutorial from './Tutorial'

const App = () => {
  const [tutorial, setTutorial] = useState(false)
  let currentComponent = tutorial ? <Tutorial /> : <TuneEditor />

  return (
    <div>
      <NavBar isTutorial={tutorial} onButtonClick={()=>setTutorial(!tutorial)} />
      <div className="wrapper">
        {currentComponent}
      </div>

      <footer><p>Website updated June 6, 2023</p></footer>
      <script>fixScale(document);</script>
    </div>
  )
}

export default App
