import Home from "./pages/home/Home";
import District from "./pages/District";
import Sectionport from "./pages/Sectionport";
import Sectionsubport from "./pages/Sectionsubport";
import Election from "./pages/Election";
import Electionagent from "./pages/Electionagent";
import AssignAgent from "./pages/AssignAgent";
import Ward from "./pages/Ward";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { Routes, Route } from "react-router-dom";
import ElectionagentList from "./pages/ElectionagentList";
import ElectionResult from "./pages/ElectionResult";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/District" element={<District />} />
        <Route path="/Sectionport" element={<Sectionport />} />
        <Route path="/Sectionsubport" element={<Sectionsubport />} />
        <Route path="/Election" element={<Election />} />
        <Route path="/Electionagent" element={<Electionagent />} />
        <Route path="/Ward" element={<Ward />} />
        <Route path="/ElectionagentList/:id" element={<ElectionagentList />} />
        <Route path="/AssignAgent/:eid/:id" element={<AssignAgent />} />
        <Route path="/ElectionResult" element={<ElectionResult />} />
        {/* <Route path="login" element={<Login />} />
          <Route path="users">
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add New User" />}
            />
          </Route>
          <Route path="products">
            <Route index element={<List />} />
            <Route path=":productId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={productInputs} title="Add New Product" />}
            />
          </Route> */}
      </Routes>
    </div>
  );
}

export default App;
