import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { DataProvider } from "./contexts/DataContext";
import PrivateRoutes from "./components/PrivateRoutes";
import './App.css';

import Login from "./components/Authenticaion/Login";
import Register from "./components/Authenticaion/Register";

import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/" exact />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default App;
