import { API_VIEW_FRIENDS_DETAILS } from "../constants/Endpoints";

const fetchFriendDetail = async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWI5NjA0ZWQzNjYzYTQzYzFkNDc5NCIsImlhdCI6MTcwMDUzNzE2OSwiZXhwIjoxNzAxMTQxOTY5fQ.Y6UAFqoFvvTUm8sxfjCtUkqnqzfYTUna6TLGSTyVa7Y"
    );
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
