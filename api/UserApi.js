import { API_VIEW_ALL_USERS } from "../constants/Endpoints";

const fetchUsers = async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTRlNDAyMjcwYjI2NDliY2NjODJmYiIsImlhdCI6MTcwMDA2NTgwNywiZXhwIjoxNzAwNjcwNjA3fQ.FRiNpxJMMN6BNYUwR_hX7XU8VD2C-YsVwUTtsaCErTc"
    );
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    const response = await fetch(API_VIEW_ALL_USERS, requestOptions);
    return (data = await response.json());
  } catch (error) {
    console.error(error);
  }
};

export { fetchUsers };
