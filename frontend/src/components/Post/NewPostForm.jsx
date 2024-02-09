
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


  const handleSubmit = async () => {
    if (!image) {
      handleSubmitWithoutImage()
    }
    else {
      handleSubmitWithImage()
    }
  }

  const handleSubmitWithoutImage = async () => {
      let datetime = new Date().toLocaleString("en-GB")

        let payload = {
          message: message,
          datetime: datetime,
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
        navigate("/posts");
    };

  const handleSubmitWithImage = async () => {
    let datetime = new Date().toLocaleString("en-GB")

      let payload = {
        message: message,
        datetime: datetime,
        image: image.name,
      };

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
            <input className="postFormInput" type="text" onChange={handleMessageChange} data-testid="post-input" placeholder="Say Hello!" />
            
          </div>

          <hr/>
        
          <div className="imageIcon">

            <div className="iconSingle">
            <img className="videoIcon" src="src/assets/video-stream.png"/>
            <span>Live Video</span>
            </div>

            <div className="iconSingle">
            <label>
            <img className="photoIcon" src="src/assets/photos.png" />
            <input className="postFormImageinput" type= "file" onChange={handleImageChange} style={{ display: "none" }} name='image' />
            <span>Picture</span>
            </label>
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



