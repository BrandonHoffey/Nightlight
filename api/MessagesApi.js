import React, { useContext } from "react";
import {
  API_MESSAGE_SEND,
  API_MESSAGE_VIEW,
  API_VIEW_ALL_MESSAGES,
  API_VIEW_LATEST_MESSAGE,
} from "../constants/Endpoints";

const sendMessage = async (receiver, content, token) => {
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
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

const viewMessages = async (id, token) => {
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
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

const listMessages = async (receiverId, token) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOption = {
      method: "GET",
      headers: myHeaders,
    };
    const response = await fetch(
      API_VIEW_ALL_MESSAGES.replace(":id", receiverId),
      requestOption
    );
    const data = await response.json();
    return data.messages;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

const latestMessage = async (receiverId, token) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    const requestOption = {
      method: "GET",
      headers: myHeaders,
    };
    const response = await fetch(
      API_VIEW_LATEST_MESSAGE.replace(":id", receiverId),
      requestOption
    );
    const data = await response.json();
    const latestMessageSent = data.latestMessage[0]?.content;
    const latestMessageSender = data.latestMessage[0]?.sender;
    return { latestMessageSent, latestMessageSender };
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export { sendMessage, viewMessages, listMessages, latestMessage };
