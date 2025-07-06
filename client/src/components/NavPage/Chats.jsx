import { useChatStore } from "../../store/useChatStore";

import Sidebar from "./chat/sideChatBar";
import NoChatSelected from "./chat/NoChatSelected";
import ChatContainer from "./chat/ChatContainer";

const chats = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center py-5 px-3">
      <div
        className="bg-white rounded shadow w-100"
        style={{ maxWidth: "1200px", height: "calc(100vh - 8rem)" }}
      >
        <div className="d-flex h-100 rounded overflow-hidden">
          <Sidebar />

          <div className="flex-grow-1 d-flex flex-column">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default chats;
