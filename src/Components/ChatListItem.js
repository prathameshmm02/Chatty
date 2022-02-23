export default function ChatListItem(props) {
  console.log(props)
  let { id, chatName, chatImage, chatDescription } = props.chat;  
  return (
    <div
      className="chatItem-container"
      onClick={() => {
        props.onChatSelected(id);
      }}
    >
      <img className="chat-image" src={chatImage} alt="" />
      <div className="chatItem-textContainer">
        <h6 className="chat-name">{chatName}</h6>
        <p className="chat-desc">{chatDescription}</p>
      </div>
    </div>
  );
}
