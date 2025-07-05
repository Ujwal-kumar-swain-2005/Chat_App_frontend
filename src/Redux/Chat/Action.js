import { BASE_API_URL } from "../../Config/api"
import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./ActionType";

export const createChat = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/chats/single`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`
      },
      body: JSON.stringify({ userId: data.userId })
    })
    const chat = await res.json();
    console.log("Create Chat", chat);
    dispatch({ type: CREATE_CHAT, payload: chat })
  }
  catch (error) {
    console.log("chat error", error);
  }
}

export const createGroupChat = (chatData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/chats/group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${chatData.token}`
      },
      body: JSON.stringify(chatData.group)
    })
    const data = await res.json();
    dispatch({ type: CREATE_GROUP, payload: data })
  }
  catch (error) {
    console.log("Error while creating the group ", error);
  }
}

export const getUsersChat = (token) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/chats/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
    const data = await res.json();
    console.log("users chat------>", data)
    dispatch({ type: GET_USERS_CHAT, payload: data })
  }
  catch (error) {
    console.log("Error while fetching chat ", error);
  }
}