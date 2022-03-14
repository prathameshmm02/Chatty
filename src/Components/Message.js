import { getAuth } from "firebase/auth";
import "../App.css";
import RandomColor from "./RandomColor";

export default function Message(props) {
  let { text, photoURL, displayName, email, mediaUrl } = props.message;
  const auth = getAuth();
  if (photoURL == null) {
    photoURL =
      "https://avatars.dicebear.com/api/bottts/" + displayName + ".svg";
  }
  return email === auth.currentUser.email
    ? SentMessage(text, mediaUrl)
    : ReceivedMessage(text, photoURL, displayName, mediaUrl);
}

function SentMessage(text, mediaUrl) {
  return (
    <div className="flex justify-end mx-1">
      <div className="message sent rounded-3xl flex flex-col text-white items-start">
        {mediaUrl && <Media mediaUrl={mediaUrl} /* type={type} */ />}
        {text}
      </div>
    </div>
  );
}

function ReceivedMessage(text, photoURL, name, mediaUrl, type) {
  return (
    <div className="flex items-end">
      <img
        className="bg-center h-10 w-10 rounded-full m-3"
        src={photoURL}
        alt=""
      />
      <div className="message rounded-2xl flex flex-col text-white items-start ">
        <h6 style={{ color: RandomColor(name) }} className="m-0">
          {name}
        </h6>
        {mediaUrl && <Media mediaUrl={mediaUrl} /* type={type} */ />}
        <p className="m-0">{text}</p>
      </div>
    </div>
  );
}

function Media({ mediaUrl }) {
  return (
    <div className="media">
      <img className="w-96 rounded-lg" src={mediaUrl} alt="" />
    </div>
    /* {
        {
          image: <img src={mediaUrl} />,
          video: <ReactPlayer url={mediaUrl} />,
        }[type]
      } */
  );
}
