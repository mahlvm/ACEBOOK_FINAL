import { json } from "express";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; 

export const getAllUserInfo = async (token) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    // is being called
    const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch user");
    }
    
    const data = await response.json();
    console.log("data")

    return data;

};

export const getId = async (token) => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await fetch(`${BACKEND_URL}/users/id`, requestOptions);
  
    if (response.status !== 200) {
      throw new Error("Unable to fetch user id");
    }
  
    const data = await response.json();
    console.log("data")

    return data;
  }

  export const getUserDataWithUserIdFromPost = async (token, user_id) => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: json.stringify({user_id: user_id})
    };
  
    const response = await fetch(`${BACKEND_URL}/users/id`, requestOptions);
  
    if (response.status !== 200) {
      throw new Error("Unable to fetch user data");
    }
  
    const data = await response.json();
    console.log("data")

    return data;
  }

export const updateUsersLike = async (token, post_id, status) => {
    const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post_id: post_id, status: status }),
    }

    const response = await fetch(`${BACKEND_URL}/users/like`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to add post to user like list");
    }

}
