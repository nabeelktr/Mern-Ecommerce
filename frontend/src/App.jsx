
import Navbar from "./components/user/Navbar"
import Signup from "./components/user/Signup"


function App() {


  return (
    <>
    <div className="flex flex-col min-h-screen justify-between" style={{background:'linear-gradient(to bottom right, #FEEDF6, #FFE1BE)'}}>
    <Navbar />
    <div className="flex items-center justify-center h-full">
      <Signup />
    </div>
  </div>
  </>
  )
}

export default App
