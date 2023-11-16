import { API_MESSAGE_SEND, API_MESSAGE_VIEW } from "../constants/Endpoints";

const sendMessage = async (receiver, content) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTUxZjhmNWNjNDlhMjI2MGUyMDE0YiIsImlhdCI6MTcwMDA3NzQ1NSwiZXhwIjoxNzAwNjgyMjU1fQ.2sCJEnhC5FuKa6fDzHyMAYvMrurmO4V_8tf8J0hUw38"
    );
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
    myHeaders.append(
      "Authorization",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTUxZjhmNWNjNDlhMjI2MGUyMDE0YiIsImlhdCI6MTcwMDA3NzQ1NSwiZXhwIjoxNzAwNjgyMjU1fQ.2sCJEnhC5FuKa6fDzHyMAYvMrurmO4V_8tf8J0hUw38"
    );
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
