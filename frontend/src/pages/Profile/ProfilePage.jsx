import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts.js";
import { getId } from "../../services/users.js";
import "./ProfilePage.css";
import Post from "../../components/Post/Post.jsx";
import ProfileFeedSelector from "../../components/Profile/ProfileFeedSelector.jsx";

import { getAllUserInfo } from "../../services/user.js";
import ang from '../../assets/ang_profile.jpeg';

export const ProfilePage = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  let [feed, setFeed] = useState("Posts");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getAllUserInfo(token)
        .then((data) => {
          setUser(data.user);
          console.log(data.user);
          setToken(data.token);
          window.localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.err(err);
          console.log(err);
        });
    }
  }, []);

  const getUsersPosts = (posts, userId) => {
    console.log(userId);
    return posts.filter((post) => post.user_id == userId);
  };

  const getLikedPosts = async (posts) => {
    const data = await getAllUserInfo(token);
    const user_liked_list = data.user.liked_posts;
    console.log(posts);

    return posts.filter((post) => user_liked_list.includes(post._id));
  };

  useEffect(() => {
    if (token) {
      getId(token)
        .then((data) => {
          setUserId(data.user_id);
          return data.user_id;
        })
        .then((userId) => {
          getPosts(token).then((data) => {
            setToken(data.token);
            console.log(feed);
            console.log(data.posts);

            if (feed == "Posts") {
              let usersPosts = getUsersPosts(data.posts, userId);
              console.log(usersPosts);
              setPosts(usersPosts);
              console.log(posts);
            } else if (feed == "Liked") {
              getLikedPosts(data.posts).then((likedPosts) => {
                console.log(likedPosts);
                setPosts(likedPosts);
              });
            }

            window.localStorage.setItem("token", data.token);
          });
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [feed]);

  if (!token) {
    return;
  }

  return (
    <div className="profilepage">
      <Navbar />
      <div class="bio-box">
        <div class="bio-header"><h2>About Me</h2><div class='profile-pic-container'><img class="bio-profile-pic" src={ang} /></div></div>
        <hr></hr>
        <div class="profile-bio">
          <p>
            {user.bio || "Your bio goes here!"}
          </p>
        </div>
      </div>
      {/* profile nave bar - (posts, liked_posts) */}
      <div class="feed-selector-container">
        <div class ="feed-selector-container"><ProfileFeedSelector feed={feed} setFeed={setFeed} />
      </div>
      <div className="feed" role="feed">
        {posts.toReversed().map((post) => (
          <Post
            post={post}
            key={post._id}
            date={post.time_of_post}
            user_id={userId}
          />
        ))}
      </div>
    </div>
    </div>
  );
};