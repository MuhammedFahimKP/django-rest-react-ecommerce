
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Signup from './components/signup'
import Signin from './components/SignIn'
import GoogleAuth from './components/GoogleOuth'
import Checkout from './components/Razorpay'
// import GoogleAuth from './components/GoogleAuth'
import Razorpay  from './components/Razorpay'


function App() {
  

  return (
    <>
     <Router>

       <Routes>
          {/* <Route path="/"  element={<Signup/>}/> */}
          {/* <Route path="/google" element={<GoogleAuth/>}/> */}
          <Route path="/" element={ <Razorpay/>  } />
          
       </Routes>

     </Router>
    </>
  )
}

export default App
