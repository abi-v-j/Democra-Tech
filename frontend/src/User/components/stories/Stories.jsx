import { useEffect, useState } from "react";
import "./stories.scss"
import axios from "axios";


const Stories = () => {

  const [rows, setRows] = useState([]);

  const fetchData = () => {
    axios.get("http://localhost:4000/Result/" + sessionStorage.getItem("uid")).then((response) => {
      var data = response.data.Result;

      setRows(data);
console.log(data);
    

    });
  };
  useEffect(() => {
    fetchData();

  }, []);
  //TEMPORARY
  // const stories = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  //   },
  //   {
  //     id: 2,
  //     name: "John Doe",
  //     img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  //   },
  //   {
  //     id: 3,
  //     name: "John Doe",
  //     img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  //   },
  //   {
  //     id: 4,
  //     name: "John Doe",
  //     img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  //   },

  // ];

  return (

    <div className="stories" >


      {rows.map(story => (
        <div className="story">
          <img src={story.user_photo} />
          <div className="name">
            <p>{story.user_name}</p>
            <p>{story.vote}</p>
          </div>
        </div>
      ))}



    </div>
  )
}

export default Stories