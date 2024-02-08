
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './NewPostForm.css';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { uploadPostImage } from "../../services/posts";


const NewPostForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const token = window.localStorage.getItem("token");
  const [image, setImage] = useState();  

  const handleSubmit = () => {
    let datetime = new Date().toLocaleString("en-GB")

      let payload = {
        message: message,
        datetime: datetime,
        image: image.name,
      };
      console.log("I am the post payload:", payload)


    fetch(`${BACKEND_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(uploadPostImage(image))
    navigate("/posts");
  };


  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    setImage(file)
  };

  return (

    <div className="postFormBox">

    


      <form className="feedForm " onSubmit={handleSubmit}>

          <div className="boxText">
            <img className="profileIcon" src="src/assets/profile.png"/>
            <input className="postFormInput" type="text" onChange={handleMessageChange} data-testid="post-input" placeholder="Say Hello!" />
          </div>

          <hr/>
        
          <div className="imageIcon">

            <div className="iconSingle">
            <img className="videoIcon" src="src/assets/video-stream.png"/>
            <span>Live Video</span>
            </div>

            <div className="iconSingle">
            <img className="photoIcon" src="src/assets/photos.png" />
            <span>Picture</span>
            </div>

            <div className="iconSingle">
            <img className="feelingsIcon" src="src/assets/facebook-reactions.png"/>
            <span>Feelings</span>
            </div>
            
          </div>
            
            <input className="buttonPostForm" role="submit-button" id="submit" type="submit" value="Submit" />
      
      </form>
    </div>
  );
};

export default NewPostForm;



