import "./App.css";
import Home from "./Components/Home";

import Footer from "./Components/Footer";
import { Route, Routes } from "react-router-dom";
import Registration from "./Components/Registration";
import Login from "./Components/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
