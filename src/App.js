import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./auth/LogIn";
import ForgotPassword from "./auth/ForgotPassword";
import SignUp from "./auth/SignUp";
import Orders from "./pages/Orders";
import Stocks from "./pages/Stocks";
import Debts from "./pages/Debts";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { Navigate } from "react-router-dom"; //Added for login page


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/debts" element={<Debts />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
