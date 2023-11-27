import React, { useContext } from "react";
import { API_VIEW_FRIENDS_DETAILS } from "../constants/Endpoints";

const fetchFriendDetail = async (token) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const response = await fetch(API_VIEW_FRIENDS_DETAILS, requestOptions);
    return (data = await response.json());
  } catch (error) {
    console.error(error);
  }
};

export { fetchFriendDetail };
