
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Voter from "./pages/Vote";
import Profile from "./pages/profile/Profile";
import Complaint from "./pages/Complaint"

import ViewElection from "./pages/ViewElection";
import "./style.scss";
import { Route, Routes } from "react-router-dom";
import { VoteButton } from "./pages/VoteButton";


function App() {
  return (
    
    <div className='theme-light'>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Vote" element={<Voter />} />
            <Route path="/ViewElection/" element={<ViewElection />} />
            <Route path="/Profile/:id" element={<Profile />} />
            <Route path="/Complaint/" element={<Complaint />} />
            <Route path="/VoteButton/" element={<VoteButton />} />  

          </Routes>
        </div>
        <RightBar />
      </div>
    </div>
    
   
    

  );


}

export default App;
