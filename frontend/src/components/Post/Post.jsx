
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getComment } from "../../services/comment";
// import CommentForm from "./CommentForm";
// import Comment from "./Comment";
// import { ViewCommentButton } from "./ViewCommentButton";
// import LikeButton from "../LikeButton";


// export const Post = (props) => {
//   const [comments, setComments] = useState([]);
//   const [token, setToken] = useState(window.localStorage.getItem("token"));
//   const [viewComment, setCommentSection] = useState(false);
//   const [likes, setLikes] = useState(props.post.likes);
//   const navigate = useNavigate();
  
//   const getPostById = (data, post_id) => {
//     const comments = data.comments.filter((comment) => comment.post_id == post_id)
//     setComments(comments)
//   }

  

//   useEffect(() => {
//     if (token) {
//       getComment(token)
//         .then((data) => {
//           getPostById(data, props.post._id)
//           setToken(data.token);
//           window.localStorage.setItem("token", data.token);
//         })
//         .catch((err) => {
//           console.err(err);
//         });
//     } else {
//       navigate("/posts");
//     }
//   }, []);

//   if (!token) {
//     return;
//   }

//   return (
//   <>
//   <br/>
//   <h4>POSTS</h4>
//   <article key={props.post._id}>{props.post.message}</article>
//   <div><h6>{props.date}</h6></div>
//   <div>
//   <ViewCommentButton setCommentSection={setCommentSection} viewComment={viewComment}/>
//   <LikeButton likes={likes} post={props.post} user_id={props.user_id}/>
//   </div>
//   {viewComment && <div className="comment_section" role="comment_section">
//     <CommentForm role="new-comment" post_id={props.post._id}/>
//     <div className="comment" role="comment">
//         {comments.toReversed().map((comment) => (
//         <Comment comment={comment} key={comment._id} date={comment.time_of_comment} />
//         ))}
//     </div>
//   </div>}
      
//   </>
//   )

// };

// export default Post;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getComment } from "../../services/comments";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { ViewCommentButton } from "./ViewCommentButton";
import LikeButton from "../LikeButton";
import './Post.css';
import { getId, getUserDataByUserId } from "../../services/user";


export const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [viewComment, setCommentSection] = useState(false);
  const [likes, setLikes] = useState(props.post.likes);
  const navigate = useNavigate();
  const getPostById = (data, post_id) => {
    const comments = data.comments.filter((comment) => comment.post_id == post_id)
    setComments(comments)
  }

  const handleClickOnPost = async () => {
    
    const data = await getUserDataByUserId(token, props.post.user_id)
    const user = data.user
    navigate(`/profilepage/${user.username}`)
  }

  useEffect(() => {
    if (token) {
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
          <div className="spanText">
            <span onClick={handleClickOnPost}> UserName </span>
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
