import React from 'react'
import NavBar from './NavBar'
import TuneEditor from "./Home"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="wrapper">
        <TuneEditor />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        limit={1}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored" />
      <footer><p>Website updated June 6, 2023</p></footer>
      <script>fixScale(document);</script>
    </div>
  )
}

export default App
