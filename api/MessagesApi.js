import React, { useContext } from "react";
import { API_MESSAGE_SEND, API_MESSAGE_VIEW } from "../constants/Endpoints";
import { UserContext } from "../UserContext";

const sendMessage = async (receiver, content) => {
  const { token } = useContext(UserContext);
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);
    const body = {
      receiver: receiver,
      content: content,
    };
    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
    };
    const response = await fetch(API_MESSAGE_SEND, requestOption);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

const viewMessages = async (id) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOption = {
      method: "GET",
      headers: myHeaders,
    };
    const response = await fetch(
      API_MESSAGE_VIEW.replace(":id", id),
      requestOption
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export { sendMessage, viewMessages };
