const User = require("../models/user");
const { generateToken } = require("../lib/token");

const create = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const profile_picture = req.body.profile_picture || null;

  //checks if the email is already in use
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(401).json({ message: 'Email already in use', code: 1});
  } 
  // creates a new user if the email is not in use 
  else {
    const newUser = new User({ username, email, password, profile_picture });
    newUser
      .save()
      .then((user) => {
        console.log("User created, id:", user._id.toString());
        return res.status(201).json({ message: 'User created' });
      })
      .catch((err) => {
        console.error(err);
        return res.status(400).json({ message: "Something went wrong" });
      });
    }
}

const getId = async (req, res) => {
  res.status(200).json({ user_id: req.user_id});
  
}





const getAllUserInfo = async (req, res) => {

  let user = undefined
  try {

    if (req.query.user_id != null) {
      user = await User.findById(req.query.user_id);
    } else {
      user = await User.findById(req.user_id);
    }

    const token = generateToken(req.user_id);
    res.status(200).json({user : user, token: token });
  } 
  catch (error) {
    console.log(error)
    console.log("bad call")
    return res.status(404).json({ message: 'User not found' })
  }
};










const updateUsersLikedPost = async (req, res) => {
  const liked_post_id = req.body.post_id
  const status = req.body.status
  const user = await User.findById(req.user_id)

  
  if (!user) {
    return res.status(404).json({ message: "Unable to find user's ID"})
  } else if (!liked_post_id){
    return res.status(404).json({ message: "Unable to get post ID"})
  }

  if (status == "unlike" && user.liked_posts.includes(liked_post_id)){
    const newListWithLikePostRemoved = user.liked_posts.filter((id) => id != liked_post_id)
    user.liked_posts = newListWithLikePostRemoved
    

  } else {
    user.liked_posts.push(liked_post_id)
  }

  console.log("liked list below")
  console.log(user.liked_posts)

  await user.save();

  return res.status(201).json({message: "User's liked list updated"})
}

const clearTestData = async () => {
  await User.deleteMany({})
}


const UsersController = {
  create: create,
  getId: getId,
  getAllUserInfo: getAllUserInfo, 
  clearTestData: clearTestData,
  updateUsersLikedPost: updateUsersLikedPost
};

module.exports = UsersController;
