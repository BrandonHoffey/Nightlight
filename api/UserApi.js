import { useContext } from "react";
import { API_CURRENT_USER_DETAILS } from "../constants/Endpoints";
import { UserContext } from "../UserContext";

const currentUser = async () => {
  const { token } = useContext(UserContext);
  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const response = await fetch(API_CURRENT_USER_DETAILS, requestOptions);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { currentUser };
