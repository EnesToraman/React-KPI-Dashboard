import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="dashboard" element={<PrivateRoute redirectTo={"/login"} children={<Dashboard />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;