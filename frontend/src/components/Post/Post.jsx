
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getComment } from "../../services/comments";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { ViewCommentButton } from "./ViewCommentButton";
import LikeButton from "../LikeButton";


export const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [viewComment, setCommentSection] = useState(false);
  const [likes, setLikes] = useState(props.post.likes);
  const [image, setImage] = useState();
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
            fetchImage(props.post.image)
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      navigate("/posts");
    }
  }, []);

  const fetchImage = async (imageName) => {
    try {
        // this makes a request to the server to fetch the image
        const response = await fetch(`http://localhost:3000/upload/${imageName}`);
        const blob = await response.blob();
        setImage(URL.createObjectURL(blob));
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
  <h4>POSTS</h4>
  <article key={props.post._id}>{props.post.message}</article>
  <img className="post-image" src={image}/>
  <div><h6>{props.date}</h6></div>
  <div>
  <ViewCommentButton setCommentSection={setCommentSection} viewComment={viewComment}/>
  <LikeButton likes={likes} post={props.post} user_id={props.user_id}/>
  </div>
  {viewComment && <div className="comment_section" role="comment_section">
    <CommentForm role="new-comment" post_id={props.post._id}/>
    <div className="comment" role="comment">
        {comments.toReversed().map((comment) => (
        <Comment comment={comment} key={comment._id} date={comment.time_of_comment} />
        ))}
    </div>
  </div>}
      
  </>
  )

};

export default Post;
