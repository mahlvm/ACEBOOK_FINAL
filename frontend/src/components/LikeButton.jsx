// import { useState } from "react";
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// const LikeButton = (props) => {
//   const [numberOfLikes, setNumberOfLikes] = useState(props.likes.length);
//   const [likeList, setLikeList] = useState(props.likes);
//   console.log(`Like list on load: ${likeList}`);

//   const handleClick = async () => {
//     const token = window.localStorage.getItem("token");
//     console.log(`Like list when clicked: ${likeList}`);

//     if (likeList.indexOf(props.user_id) === -1) {
//       setNumberOfLikes(numberOfLikes + 1);
//       likeList.push(props.user_id);
//     } else {
//       setNumberOfLikes(numberOfLikes - 1);
//       likeList.splice(likeList.indexOf(props.user_id), 1);
//     }
//     fetch(`${BACKEND_URL}/posts/like`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ id: props.post._id }),
//     });
//   };

//   return (
//     <>
//     {numberOfLikes} Likes<br/>
//         {likeList.indexOf(props.user_id) === -1 ? <input onClick={handleClick} type="image" src="src/assets/not_liked.png" /> : <input onClick={handleClick} type="image" src="src/assets/liked.png" />}
//     </>
//   );
// };

// export default LikeButton;


import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LikeButton = (props) => {
  const [numberOfLikes, setNumberOfLikes] = useState(props.likes.length);
  const [likeList, setLikeList] = useState(props.likes);
  console.log(`Like list on load: ${likeList}`);

  const handleClick = async () => {
    const token = window.localStorage.getItem("token");
    console.log(`Like list when clicked: ${likeList}`);

    if (likeList.indexOf(props.user_id) === -1) {
      setNumberOfLikes(numberOfLikes + 1);
      likeList.push(props.user_id);
    } else {
      setNumberOfLikes(numberOfLikes - 1);
      likeList.splice(likeList.indexOf(props.user_id), 1);
    }
    fetch(`${BACKEND_URL}/posts/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: props.post._id }),
    });
  };

  return (
    <div className="likeContainer">
      {likeList.indexOf(props.user_id) === -1 ? 
        <input onClick={handleClick} type="image" src="src/assets/not_liked.png" alt="Not Liked Icon" /> : 
        <input onClick={handleClick} type="image" src="src/assets/liked.png" alt="Liked Icon" />}
        <span>{numberOfLikes} Likes</span>
    </div>
  );
};

export default LikeButton;