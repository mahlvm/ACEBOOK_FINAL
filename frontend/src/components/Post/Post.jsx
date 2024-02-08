
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getComment } from "../../services/comments";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { ViewCommentButton } from "./ViewCommentButton";
import LikeButton from "../LikeButton";
import { getAllUserInfo } from "../../services/user";
import './Post.css';


export const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [viewComment, setCommentSection] = useState(false);
  const [likes, setLikes] = useState(props.post.likes);
  const [image, setImage] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const getPostById = (data, post_id) => {
    const comments = data.comments.filter((comment) => comment.post_id == post_id)
    setComments(comments)
  }

  useEffect(() => {
    if (token) {
      getComment(token)
        .then((data) => {
          getPostById(data, props.post._id)
          setToken(data.token);
          window.localStorage.setItem("token", data.token);
          if (props.post.image) {
            fetchPostImage(props.post.image)
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      navigate("/posts");
    }
  }, []);

  useEffect(() => {
    if (token) {
        getAllUserInfo(token)
            .then((data) => {
            setUser(data.user);
            setToken(data.token);
            window.localStorage.setItem("token", data.token);
            if (data.user.profile_picture) {
                fetchProfileImage(data.user.profile_picture);
            }
            })
    .catch((err) => {
        console.error(err);
        console.log(err)
        });
    }
}, []);

  const fetchPostImage = async (imageName) => {
    try {
        // this makes a request to the server to fetch the image
        const response = await fetch(`http://localhost:3000/upload/${imageName}`);
        const blob = await response.blob();
        setImage(URL.createObjectURL(blob));
    } catch (error) {
        console.error('Error fetching image:', error);
    }
  };

  const fetchProfileImage = async (imageName) => {
    try {
        // this makes a request to the server to fetch the image
        const response = await fetch(`http://localhost:3000/upload/${imageName}`);
        const blob = await response.blob();
        setProfilePicture(URL.createObjectURL(blob));
    } catch (error) {
        console.error('Error fetching image:', error);
    }
};


  if (!token) {
    return;
  }

  return (
  <>
  <br/>
  
  <div className="messageBox">  


    <div className="feedPostSingle">

      <div className="profilePhoto">
        <img className="profileIconFeed" src={profilePicture}/>
      <div className="spanText">
        <p>
          <span className="userName"> {user.username} </span>
        </p>
        <p>
          <span className="datePost"> {props.date} </span>
        </p>
        
      </div>

    </div>


        <p className="messagePost">
            <span key={props.post._id}>{props.post.message}</span>
        </p>
        <div><img className="post-image" src={image} /></div>


    </div>  

  <div className="actions">

    <div className="actionSingle">
      <LikeButton likes={likes} post={props.post} user_id={props.user_id}/>
    </div>

    <div className="actionSingle">
      <ViewCommentButton setCommentSection={setCommentSection} viewComment={viewComment}/>
    </div>

  </div>
  
  <div className="commentsOpen">
    {viewComment && <div className="comment_section" role="comment_section">
      <CommentForm role="new-comment" post_id={props.post._id}/>
      <div className="comment" role="comment">
          {comments.toReversed().map((comment) => (
          <Comment comment={comment} key={comment._id} date={comment.time_of_comment} />
          ))}

    </div>
    </div>}
  </div>
  </div>
      
  </>
  )

};

export default Post;
