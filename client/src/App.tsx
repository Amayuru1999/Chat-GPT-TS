import { Routes,Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import ChatBot from './pages/ChatBot'
import HomePage from './pages/Homepage'
import Register from './pages/Register'
import Login from './pages/Login'
import Summary from './pages/Summary'
import Paragraph from './pages/Paragraph'
import JsConverter from './pages/JsConverter'
import ScifiImage from './pages/ScifiImage'
import Footer from './components/Footer'

function App() {
 

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/paragraph" element={<Paragraph />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/js-converter" element={<JsConverter />} />
          <Route path="/scifi-image" element={<ScifiImage />} />
    </Routes>
    <Footer/>
     </> 
   
  )
}

export default App
