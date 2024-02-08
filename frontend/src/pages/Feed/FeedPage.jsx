import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

import { getPosts } from "../../services/posts";
import { getId } from "../../services/users";
import Post from "../../components/Post/Post";
import NewPostForm from "../../components/Post/NewPostForm";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if(token) {
      getId(token)
      .then((data) => {
        setUserId(data.user_id);
      })
    }
  }, []);

  
  useEffect(() => {
    if (token) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          setToken(data.token);
          window.localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.err(err);
        });
    } else {
      navigate("/login");
    }
  }, []);

  if (!token) {
    return;
  }

  

  return (
    <>
      <div className="header">
        <Navbar />
      </div>

      <div className="bodyFeed">
        <NewPostForm role="new-post"/>
        <div className="feedPost" role="feed">
          {posts.toReversed().map((post) => (
            <Post post={post} key={post._id} date={post.time_of_post} user_id={userId} />
            ))}
        </div>

        <div className="credits">
          <a href="https://www.flaticon.com/free-icons/heart"></a>
        </div>

      </div>
      

    </>
  );
};
