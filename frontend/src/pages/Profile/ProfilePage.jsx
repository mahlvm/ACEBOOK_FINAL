// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts.js";
import { getId } from "../../services/users.js";
import "./ProfilePage.css";
import Post from "../../components/Post/Post.jsx";
import ProfileFeedSelector from "../../components/Profile/ProfileFeedSelector.jsx";
import { getAllUserInfo } from "../../services/user.js";



export const ProfilePage = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userId, setUserId] = useState('');
  const [posts, setPosts] = useState([]);
  let [feed, setFeed] = useState("Posts")
  const navigate = useNavigate();




  const getUsersPosts = (posts, userId) => {
    console.log(userId)
    return posts.filter((post) => post.user_id == userId)
  }

  const getLikedPosts = async (posts) => {
    // getUserLikeList()
    const data = await getAllUserInfo(token);
    const user_liked_list = data.user.liked_posts
    console.log(posts)

    return posts.filter(post => user_liked_list.includes(post._id))
  }

  useEffect(() => {
    if (token) {
      getId(token)
      .then((data) => {
        // console.log(data.user_id)
        setUserId(data.user_id)
        return data.user_id
      })
      .then((userId) => {
        getPosts(token)
          .then((data) => {
            
            setToken(data.token);
            console.log(feed)
            // console.log(data)
            console.log(data.posts)

            if (feed == "Posts") {
              let usersPosts = getUsersPosts(data.posts, userId);
              console.log(usersPosts)
              setPosts(usersPosts);
              console.log("hdhw")
              console.log(posts)
            } else if (feed == "Liked") {
              getLikedPosts(data.posts)
              .then((likedPosts) => {console.log(likedPosts)
              setPosts(likedPosts)
              console.log("hdhw")
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
  }, [feed])

  if(!token) {
    return;
  }

  return (
    <div className="profilepage">
      <Navbar />
        <h1>This is your profile!</h1>
        {/* profile nave bar - (posts, liked_posts) */}
        <ProfileFeedSelector feed={feed} setFeed={setFeed}/>
        <div className="feed" role="feed">
        {posts.toReversed().map((post) => (
          <Post post={post} key={post._id} date={post.time_of_post} user_id={userId} />
        ))}
        </div>
    </div>
  );
};