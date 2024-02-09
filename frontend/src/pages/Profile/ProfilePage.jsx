
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
  const [pageUserId, setPageUserId] = useState('');
  const [activeUserId, setActiveUserId] = useState() 
  const [posts, setPosts] = useState([]);
  let [feed, setFeed] = useState("Posts");
  const navigate = useNavigate();
  const { state } = useLocation();




  const getUsersPosts = (posts, pageUserId) => {
    console.log(pageUserId)
    return posts.filter((post) => post.user_id == pageUserId)
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
        setActiveUserId(data.user_id);
        let profile_page_user_data = "";
        if (state) {
          profile_page_user_data = state.visiting_user_id;
          setPageUserId(state.visiting_user_id);
        } else {
          profile_page_user_data = data.user_id;
          setPageUserId(data.user_id);
        }
        return profile_page_user_data
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
  }, [feed])

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
          <Post post={post} key={post._id} date={post.time_of_post} user_id={activeUserId} />
        ))}
        </div>
    </div>
  );
};