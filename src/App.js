import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<SignUp />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
