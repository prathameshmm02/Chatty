import { getAuth } from "firebase/auth";
import { collection, getFirestore, query, where } from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import ChatListItem from "./ChatListItem";
import NewChat from "./NewChat";
import NewPersonalChat from "./NewPersonalChat";
import PersonalChatListItem from "./PersonalChatListItem";

/*
 * List of all chats
 */
export default function ChatList({ setChatID, isPersonal, setPersonal }) {
  const signOut = () => {
    getAuth().signOut();
  };

  return (
    <div className="chatlist-container flex flex-col h-screen">
      <div className="flex flex-row justify-between bg-slate-400 p-2">
        <h3>Chatty</h3>
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
              if (isPersonal) {
                setPersonal(false);
                setChatID(null);
              }
            }}
          >
            Groups
          </h6>
          <h6
            className="w-1/2 py-3 m-0 rounded-xl duration-500 transition hover:bg-blue-300"
            onClick={() => {
              if (!isPersonal) {
                setPersonal(true);
                setChatID(null);
              }
            }}
          >
            Personal
          </h6>
        </div>
        <div
          className={
            "h-1 bg-accent w-1/2 rounded-full transition ease-out duration-300 " +
            (isPersonal ? "translate-x-full" : "translate-x-0")
          }
        ></div>
        {isPersonal ? (
          <PersonalList setChatID={setChatID} />
        ) : (
          <GroupList setChatID={setChatID} />
        )}
      </div>
    </div>
  );
}

function GroupList({ setChatID }) {
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
          chats.map((chat) => (
            <ChatListItem key={chat.id} chat={chat} setChatID={setChatID} />
          ))}
      </div>
      <NewChat />
    </>
  );
}

function PersonalList({ setChatID }) {
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
            <PersonalChatListItem
              key={chat.data().id}
              chat={chat.data()}
              id={chat.id}
              setChatID={setChatID}
            />
          ))}
      </div>
      <NewPersonalChat />
    </>
  );
}
