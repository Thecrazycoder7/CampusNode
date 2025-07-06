import { useEffect, useState } from "react";
import { useChatStore } from "../../../store/useChatStore";
import { useAuthStore } from "../../../store/useAuthStore";
import SidebarSkeleton from "./Skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading, // ✅ updated
  } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className="border-end bg-white d-flex flex-column transition-all"
      style={{ width: "100%", maxWidth: "280px", height: "100vh" }}
    >
      <div className="border-bottom p-3">
        <div className="d-flex align-items-center gap-2">
          <Users size={24} />
          <span className="fw-medium d-none d-lg-inline">Contacts</span>
        </div>

        {/* Online toggle */}
        <div className="mt-3 d-none d-lg-flex align-items-center gap-2">
          <div className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              id="onlineOnlyToggle"
            />
            <label
              className="form-check-label small"
              htmlFor="onlineOnlyToggle"
            >
              Show online only
            </label>
          </div>
          <span className="text-muted small">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="overflow-auto py-3 px-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`btn w-100 d-flex align-items-center gap-3 text-start mb-2 ${
              selectedUser?._id === user._id
                ? "btn-outline-primary"
                : "btn-light"
            }`}
          >
            <div className="position-relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="rounded-circle"
                style={{ width: "48px", height: "48px", objectFit: "cover" }}
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white"
                  style={{ width: "10px", height: "10px" }}
                />
              )}
            </div>

            <div className="d-none d-lg-block text-truncate">
              <div className="fw-medium text-truncate">{user.fullName}</div>
              <div className="text-muted small">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-muted py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
