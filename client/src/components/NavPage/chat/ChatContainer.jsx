import { useEffect, useRef } from "react";
import { useChatStore } from "../../../store/useChatStore";
import { useAuthStore } from "../../../store/useAuthStore";
import ChatHeader from "./chatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeletons/MessageSkeleton";
import { formatMessageTime } from "../../../util";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="d-flex flex-column flex-grow-1 overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column flex-grow-1 overflow-auto">
      <ChatHeader />

      <div
        className="flex-grow-1 overflow-auto p-3"
        style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
      >
        {messages.length === 0 ? (
          <div className="text-center text-muted">No messages yet</div>
        ) : (
          messages.map((message, index) => {
            const isLast = index === messages.length - 1;
            const isSender = message.senderId === authUser._id;

            return (
              <div
                key={message._id}
                className={`d-flex mb-3 ${
                  isSender ? "justify-content-end" : "justify-content-start"
                }`}
                ref={isLast ? messageEndRef : null}
              >
                <div className="d-flex align-items-start gap-2">
                  <img
                    src={
                      isSender
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                    className="rounded-circle border"
                    width="40"
                    height="40"
                  />
                  <div>
                    <small className="text-muted">
                      {formatMessageTime(message.createdAt)}
                    </small>
                    <div className="card p-2 mt-1">
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Attachment"
                          className="img-fluid rounded mb-2"
                          style={{ maxWidth: "200px" }}
                        />
                      )}
                      {message.text && <p className="mb-0">{message.text}</p>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
