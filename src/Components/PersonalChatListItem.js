import { getAuth } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { setCurrentChat } from "../state/chatSlice";

export default function PersonalChatListItem({ chat }) {
  const { userlist } = chat;

  const dispatch = useDispatch();

  let userID = null;
  userlist.forEach((uid) => {
    if (uid !== getAuth().currentUser.uid) {
      userID = uid;
    }
  });
  const userRef = doc(getFirestore(), "users", userID);
  const [user] = useDocumentData(userRef);
  return (
    user && (
      <div
        className="chatItem-container flex items-center cursor-pointer content-center rounded-xl m-1 w-auto hover:bg-slate-300"
        onClick={() => {
          dispatch(setCurrentChat({ chat, isPersonal: true }));
        }}
      >
        <img
          className="bg-center h-10 w-10 rounded-full m-3"
          src={
            user.photoUrl ||
            "https://avatars.dicebear.com/api/initials/" +
              user.displayName +
              ".svg"
          }
          alt=""
        />
        <div className="flex flex-col content-center">
          <h6 className="p-0 m-0">{user.displayName}</h6>
        </div>
      </div>
    )
  );
}
