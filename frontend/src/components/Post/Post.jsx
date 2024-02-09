
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getComment } from "../../services/comments";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { ViewCommentButton } from "./ViewCommentButton";
import LikeButton from "../LikeButton";
import { getAllUserInfo } from "../../services/user";
import './Post.css';
import { getId, getUserDataByUserId } from "../../services/user";
import { deletePost } from "../../services/posts";


export const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [viewComment, setCommentSection] = useState(false);
  const [likes, setLikes] = useState(props.post.likes);
  const [username, setUsername] = useState()
  const navigate = useNavigate();
  const getPostById = (data, post_id) => {
    const comments = data.comments.filter((comment) => comment.post_id == post_id)
    setComments(comments)
  }

  const handleClickOnPost = async () => {
    
    const data = await getUserDataByUserId(token, props.post.user_id)
    const user = data.user
    navigate(`/profilepage/${user.username}`, 
    {state: {
      visiting_user_id: user._id,
      visiting_username: user.username, 
      visiting_profile_picture: user.profile_picture, 
      visiting_liked_posts: user.liked_posts}})
      window.location.reload(true)
  }

  const handleClickDelete = async () => {
    await deletePost(token, props.post._id)
    window.location.reload(true)
  }

  useEffect(() => {
    if (token) {
      getUserDataByUserId(token, props.post.user_id)
        .then((data) => {
          setUsername(data.user.username)
        })


      getComment(token)
        .then((data) => {
          getPostById(data, props.post._id)
          setToken(data.token);
          window.localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.err(err);
        });
    } else {
      navigate("/posts");
    }
  }, []);

  if (!token) {
    return;
  }

  return (
  <>
  <br/>
  
  <div className="messageBox">  


    <div className="feedPostSingle">

        <div className="profilePhoto">
          <img className="profileIconFeed" src="src/assets/profile.png" onClick={handleClickOnPost}/>
          {props.user_id == props.post.user_id && <button onClick={handleClickDelete}>delet</button> }
          <div className="spanText">
            <span onClick={handleClickOnPost}> {username} </span>
            <div className="datePost"><h6>{props.date}</h6></div>
          </div>
        </div>


        <p className="messagePost">
            <article key={props.post._id}>{props.post.message}</article>
        </p>


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
          <Comment comment={comment} key={comment._id} date={comment.time_of_comment} user_id={props.user_id}/>
          ))}

    </div>
    </div>}
  </div>
  </div>
      
  </>
  )

};

export default Post;
