import { getAuth } from "firebase/auth";
import { collection, getFirestore, query, where } from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/Logo.png";
import { currentChat, currentTab, setCurrentTab } from "../state/chatSlice";
import ChatListItem from "./ChatListItem";
import NewChat from "./NewChat";
import NewPersonalChat from "./NewPersonalChat";
import PersonalChatListItem from "./PersonalChatListItem";

/*
 * List of all chats
 */
function ChatList() {
  const tab = useSelector(currentTab);
  const chat = useSelector(currentChat);
  const dispatch = useDispatch();
  console.log(chat);

  const signOut = () => {
    getAuth().signOut();
  };

  return (
    <div className="chatlist-container flex flex-col h-screen">
      <div className="flex flex-row justify-between bg-slate-400 p-2 h-[10vh] place-items-center">
        <img src={logo} className="h-full w-auto" alt="logo" />
        <h3 className="mr-auto ml-2 my-0 p-0">Chatty</h3>
        <button onClick={signOut}>
          <span className="material-icons rounded-full p-2 hover:bg-slate-200">
            logout
          </span>
        </button>
      </div>
      <div>
        <div className="flex flex-row cursor-pointer text-center ">
          <h6
            className="w-1/2 py-3 m-0 transition duration-500 rounded-xl hover:bg-blue-300"
            onClick={() => {
              dispatch(setCurrentTab(0));
              // dispatch(resetCurrentChat())
            }}
          >
            Groups
          </h6>
          <h6
            className="w-1/2 py-3 m-0 rounded-xl duration-500 transition hover:bg-blue-300"
            onClick={() => {
              dispatch(setCurrentTab(1));
              // dispatch(resetCurrentChat())
            }}
          >
            Personal
          </h6>
        </div>
        <div
          className={
            "h-1 bg-accent w-1/2 rounded-full transition ease-out duration-300 " +
            (tab === 1 ? "translate-x-full" : "translate-x-0")
          }
        ></div>
        {tab === 1 ? <PersonalList /> : <GroupList />}
      </div>
    </div>
  );
}

function GroupList() {
  const auth = getAuth();
  const db = getFirestore();
  const chatsRef = collection(db, "chats");
  const q = query(
    chatsRef,
    where("userlist", "array-contains", auth.currentUser.email)
  );

  const [chats] = useCollectionData(q, { idField: "chatID" });
  return (
    <>
      <div className="overflow-y-auto flex-grow flex-shrink">
        {chats &&
          chats.map((chat) => <ChatListItem key={chat.id} chat={chat} />)}
      </div>
      <NewChat />
    </>
  );
}

function PersonalList() {
  const auth = getAuth();
  const db = getFirestore();
  const chatsRef = collection(db, "personal");
  const q = query(
    chatsRef,
    where("userlist", "array-contains", auth.currentUser.uid)
  );

  const [chats] = useCollection(q, { idField: "chatID" });
  return (
    <>
      <div className="overflow-y-auto flex-grow flex-shrink">
        {chats &&
          chats.docs.map((chat) => (
            <PersonalChatListItem key={chat.data().chatID} chat={chat.data()} />
          ))}
      </div>
      <NewPersonalChat />
    </>
  );
}

export default ChatList;
