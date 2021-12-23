import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from "./components/Login";
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<Login />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
