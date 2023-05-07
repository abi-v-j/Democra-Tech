import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"
import { useEffect, useState } from "react"
import axios from "axios"

const Home = () => {
  const [visible,setVisible] = useState(false);
  const [cid,setCid] = useState("");
  const [postRefresh, setPostRefresh] = useState(false);

  const handlePostRefresh = () => {
    setPostRefresh(!postRefresh);
  };
  
  const fetchData = () => {
    axios.get("http://localhost:4000/CheckCandidate/" + sessionStorage.getItem("uid")).then((response) => {
      var data = response.data.CheckCandidate;
      var cid = response.data.Cad_id;


      setVisible(data);
      setCid(cid);


    });
  };
  useEffect(() => {
    fetchData();

  }, []);
  
  return (
    <div className="home">
      <Stories/>
     
     {visible&&<Share onPostShare={handlePostRefresh} cid={cid}/>}
     
      
      <Posts postRefresh={postRefresh}/>
    </div>
  )
}

export default Home