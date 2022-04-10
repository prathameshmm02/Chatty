import { getAuth } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

export default function PersonalChatHeader(props) {
  const chatRef = doc(getFirestore(), "personal", props.id);
  const [chat] = useDocumentData(chatRef);
  return chat && <UserDetailHeader chat={chat} />;
}
function UserDetailHeader({ chat }) {
  const userID = chat.userlist.find((uid) => {
    return uid !== getAuth().currentUser.uid;
  });
  const userRef = doc(getFirestore(), "users", userID);
  const [user] = useDocumentData(userRef);

  return (
    <>
      {user && (
        <div className="flex flex-row items-center bg-slate-200 h-[10vh]">
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
          <div className="flex flex-col justify-center">
            <h6 className="p-0 m-0">{user.displayName}</h6>
          </div>
        </div>
      )}
    </>
  );
}
