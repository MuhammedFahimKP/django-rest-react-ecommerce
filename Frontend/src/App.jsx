
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Signup from './components/signup'
import Signin from './components/SignIn'
import GoogleSignIn from './components/GoogleAuth'
import Checkout from './components/Razorpay'
import Razorpay  from './components/Razorpay'


function App() {
  

  return (
    <>
     <Router>

       <Routes>
          <Route path="/"  element={<Signup/>}/>
          <Route path="/google" element={<GoogleSignIn/>}/>
          {/* <Route path="/" element={ <Razorpay/>  } /> */}
          
       </Routes>

     </Router>
    </>
  )
}

export default App
