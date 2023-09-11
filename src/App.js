import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import AddUsers from "./pages/AddUsers";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Result from "./pages/Result";

function App() {
  // const isLoggedIn = useSelector(state => state.isLoggedIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<AddUsers />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
