import { Route, Routes } from "react-router-dom";
import Guest from "./Guest/App";
import Agent from "./Agent/App";
import User from "./User/App";
import Admin from "./Admin/App";
import Payment from "./User/pages/Payment";


function App() {
  return (
    <Routes>
      <Route path="/*" element={<Guest />} />
      <Route path="/Agent/*" element={<Agent />} />
      <Route path="/User/*" element={<User />} />
      <Route path="/Admin/*" element={<Admin />} />
      <Route path="/Payment" element={<Payment/>} />
    </Routes>
  );
}

export default App;
