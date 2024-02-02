import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getComment } from "../../services/comment";
import CommentForm from "./CommentForm";
import Comment from "./Comment";


export const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getComment(token)
        .then((data) => {
          setComments(data.comments);
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
  <h4>POSTS</h4>
  <article key={props.post._id}>{props.post.message}</article>
  {/* <div>{props.date}</div> */}
  <h4>Comments</h4>
  <div className="comment" role="comment">
        {comments.toReversed().map((comment) => (
        <Comment comment={comment} key={comment._id} date={comment.time_of_comment} />
        ))}
      </div>
      <CommentForm role="new-comment"/>


  </>
  
  )

};

export default Post;
