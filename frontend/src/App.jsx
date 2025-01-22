import {BrowserRouter,Route,Routes} from "react-router-dom"
import {Signup} from "./pages/Signup";
import {Signin} from "./pages/Signin";
import {Dashboard} from "./pages/Dashboard";
import {SendMoney} from "./pages/SendMoney";
import {Index} from "./components/Index"

function App() {

  return (
    <div>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Index></Index>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/send" element={<SendMoney></SendMoney>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
