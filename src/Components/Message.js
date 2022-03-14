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
  return email === auth.currentUser.email ? (
    <SentMessage
      text={text}
      mediaUrl={mediaUrl}
      setSelectedImg={props.setSelectedImg}
    />
  ) : (
    <ReceivedMessage
      text={text}
      photoURL={photoURL}
      displayName={displayName}
      mediaUrl={mediaUrl}
      setSelectedImg={props.setSelectedImg}
    />
  );
}

function SentMessage({ text, mediaUrl, setSelectedImg }) {
  return (
    <div className="flex justify-end mx-1">
      <div className="message sent rounded-3xl flex flex-col text-white items-start">
        {mediaUrl && (
          <Media
            mediaUrl={mediaUrl}
            /* type={type} */ setSelectedImg={setSelectedImg}
          />
        )}
        {text}
      </div>
    </div>
  );
}

function ReceivedMessage({
  text,
  photoURL,
  displayName,
  mediaUrl,
  setSelectedImg,
  type,
}) {
  return (
    <div className="flex items-end">
      <img
        className="bg-center h-10 w-10 rounded-full m-3"
        src={photoURL}
        alt=""
      />
      <div className="message rounded-2xl flex flex-col text-white items-start ">
        <h6 style={{ color: RandomColor(displayName) }} className="m-0">
          {displayName}
        </h6>
        {mediaUrl && (
          <Media
            mediaUrl={mediaUrl}
            /* type={type} */ setSelectedImg={setSelectedImg}
          />
        )}
        <p className="m-0">{text}</p>
      </div>
    </div>
  );
}

function Media({ mediaUrl, setSelectedImg }) {
  return (
    <div className="media">
      <img onClick={() => setSelectedImg(mediaUrl)} className="w-96 rounded-lg cursor-pointer" src={mediaUrl} alt="" />
    </div>
    /* {
        {
          image: <img src={mediaUrl} />,
          video: <ReactPlayer url={mediaUrl} />,
        }[type]
      } */
  );
}
