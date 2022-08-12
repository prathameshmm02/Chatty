import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentChat: {
    chat: null,
    isPersonal: null,
  },
  currentTab: 0,
};
const chatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    resetCurrentChat: (state) => {
      state.currentChat = {
        chat: null,
        isPersonal: null,
      };
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setCurrentChat, resetCurrentChat, setCurrentTab } =
  chatSlice.actions;

export const currentChat = (state) => state.chat.currentChat;
export const currentTab = (state) => state.chat.currentTab;

export default chatSlice.reducer;
