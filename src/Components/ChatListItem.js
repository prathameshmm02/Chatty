import { useDispatch } from "react-redux";
import { setCurrentChat } from "../state/chatSlice";

export default function ChatListItem({ chat }) {
  const dispatch = useDispatch();
  let { chatName, chatImage, chatDescription } = chat;
  if (!chatImage) {
    chatImage =
      "https://avatars.dicebear.com/api/initials/" + chatName + ".svg";
  }
  return (
    <div
      className="chatItem-container flex items-center cursor-pointer content-center rounded-xl m-1 w-auto hover:bg-slate-300"
      onClick={() => {
        dispatch(
          setCurrentChat({
            chat,
            isPersonal: false,
          })
        );
      }}
    >
      <img
        className="bg-center h-10 w-10 rounded-full m-3"
        src={chatImage}
        alt=""
      />
      <div className="flex flex-col content-center">
        <h6 className="p-0 m-0">{chatName}</h6>
        <p className="p-0 m-0">{chatDescription}</p>
      </div>
    </div>
  );
}
