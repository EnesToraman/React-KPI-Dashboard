import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Dashboard } from "./components/dashboard/Dashboard";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { PrivateRoute } from "./components/PrivateRoute";
import { createContext } from "react";
import { useFindUser } from "./hooks/useFindUser";

export const UserContext = createContext()

function App() {
  const { user, setUser, isLoading } = useFindUser();
  const context = { user, setUser, isLoading }

  return (
    <UserContext.Provider value={context} >
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="dashboard" element={<PrivateRoute component={Dashboard} />} />
          <Route path="*" element={<Navigate to='/login' />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;