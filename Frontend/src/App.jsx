
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Signup from './components/signup'
import Signin from './components/SignIn'
import GoogleAuth from './components/GoogleOuth'
// import GoogleAuth from './components/GoogleAuth'


function App() {
  

  return (
    <>
     <Router>

       <Routes>
          <Route path="/"  element={<Signup/>}/>
          <Route path="/google" element={<GoogleAuth/>}/>
          
       </Routes>

     </Router>
    </>
  )
}

export default App
