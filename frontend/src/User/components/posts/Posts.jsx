import axios from "axios";
import Post from "../post/Post";
import "./posts.scss";
import { useEffect, useState } from "react";

const Posts = ({ postRefresh,vis }) => {
 
  const [rows, setRows] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:4000/Campaign/" + sessionStorage.getItem("uid")).then((response) => {
      var data = response.data.Campaign;
console.log("From Post");
      setRows(data);


    });
  };
  useEffect(() => {
    
    fetchData();

  },  [postRefresh]);

  return <div className="posts">
    {rows.map(post=>(
      <Post post={post} Campaign={post.campaign_id} key={post.id}/>
    ))}
  </div>;
};

export default Posts;
