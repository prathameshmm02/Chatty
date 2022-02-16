export default function ChatItem(props) {
    let { chatName, chatImage, chatDescription } = props.chat;

    return <div className="chatItem-container">
        <img className="chat-image" src={chatImage} />
        <div className='chatItem-textContainer'>
            <h6 className="chat-name">{chatName}</h6>
            <p className='chat-desc'>{chatDescription}</p>
        </div>
    </div>
}