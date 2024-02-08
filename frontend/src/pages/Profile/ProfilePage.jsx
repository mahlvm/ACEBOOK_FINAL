
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getPosts } from "../../services/posts.js";
import { getId } from "../../services/users.js";
import "./ProfilePage.css";
import Post from "../../components/Post/Post.jsx";
import ProfileFeedSelector from "../../components/Profile/ProfileFeedSelector.jsx";
import { getAllUserInfo, getUserDataByUserId } from "../../services/user.js";



export const ProfilePage = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userId, setUserId] = useState('');
  const [posts, setPosts] = useState([]);
  let [feed, setFeed] = useState("Posts");
  const navigate = useNavigate();
  const { state } = useLocation();




  const getUsersPosts = (posts, userId) => {
    console.log(userId)
    return posts.filter((post) => post.user_id == userId)
  }

  const getLikedPosts = async (posts, user_id) => {
    const data = await getUserDataByUserId(token, user_id);
    const user_liked_list = data.user.liked_posts
    console.log(posts)

    return posts.filter(post => user_liked_list.includes(post._id))
  }

  useEffect(() => {
    if (token) {
      getId(token)
      .then((data) => {
        let user_data = ""
        if (state) {
          user_data = state.visiting_user_id
          setUserId(state.visiting_user_id)
        } else {
          user_data = data.user_id
          setUserId(data.user_id)
        }
        return user_data
      })
      .then((currentPageUserId) => {
        getPosts(token)
          .then((data) => {
            
            setToken(data.token);

            if (feed == "Posts") {
              let usersPosts = getUsersPosts(data.posts, currentPageUserId);
              console.log(usersPosts)
              setPosts(usersPosts);
            } else if (feed == "Liked") {
              getLikedPosts(data.posts, currentPageUserId)
              .then((likedPosts) => {console.log(likedPosts)
              setPosts(likedPosts)
              });
            }
            
            window.localStorage.setItem("token", data.token);

          })
        })
      .catch((err) => {
        console.error(err);
        navigate("/login")
      })
    } else {
      navigate("/login")
    }
  }, [feed, userId])

  if(!token) {
    return;
  }

  return (
    <div className="profilepage">
      <Navbar />
        <h1>This is your profile!</h1>
        <ProfileFeedSelector feed={feed} setFeed={setFeed}/>
        <div className="feed" role="feed">
        {posts.toReversed().map((post) => (
          <Post post={post} key={post._id} date={post.time_of_post} user_id={userId} />
        ))}
        </div>
    </div>
  );
};