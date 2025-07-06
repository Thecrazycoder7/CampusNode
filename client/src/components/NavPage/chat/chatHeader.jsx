import { X } from "lucide-react";
import { useChatStore } from "../../../store/useChatStore";
import { useAuthStore } from "../../../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="border-bottom p-2">
      <div className="d-flex justify-content-between align-items-center">
        {/* Avatar and user info */}
        <div className="d-flex align-items-center gap-3">
          <div className="position-relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="rounded-circle border"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
          </div>

          <div>
            <h6 className="mb-0 fw-semibold">{selectedUser.fullName}</h6>
            <small className="text-muted">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </small>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-sm btn-outline-secondary"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
