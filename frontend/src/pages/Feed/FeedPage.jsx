import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import NewPostForm from "../../components/Post/NewPostForm";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const navigate = useNavigate();

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
      <Navbar />
      <h2>Posts</h2>
      <NewPostForm role="new-post"/>
      <div className="feed" role="feed">
        {posts.toReversed().map((post) => (
          <Post post={post} key={post._id} date={post.time_of_post} />
        ))}
      </div>
    </>
  );
};
