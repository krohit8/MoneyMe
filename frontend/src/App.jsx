
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "../src/pages/Signup";
import { Signin } from "../src/pages/Signin";
import { Dashboard } from "../src/pages/Dashboard";
import { SendMoney } from "../src/pages/SendMoney";

function App() {
  return (
    <div>
       <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;