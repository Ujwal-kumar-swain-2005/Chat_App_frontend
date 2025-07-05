import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType"
import { BASE_API_URL } from "../../Config/api"

export const createMessage = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/messages/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`
      },
      body: JSON.stringify({ content: data.content, chatId: data.chatId })
    })
    const newMessage = await res.json();
    console.log("message debugger---", newMessage);
    dispatch({ type: CREATE_NEW_MESSAGE, payload: newMessage });
    return newMessage
  } catch (error) {
    console.log("Error while creating the message", error);
  }
}

export const getAllMessages = (reqData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/messages/chat/${reqData.chatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${reqData.token}`
        },
      }
    )
    const data = await res.json();
    console.log("all messages --- ", data);
    dispatch({ type: GET_ALL_MESSAGE, payload: data })
  } catch (error) {
    console.log("Error while fetching all the messages", error);
  }
}
