import { API_CURRENT_USER_DETAILS } from "../constants/Endpoints";

const currentUser = async (token) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const response = await fetch(API_CURRENT_USER_DETAILS, requestOptions);
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error(error);
  }
};

export { currentUser };
