import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="d-flex flex-column flex-grow-1 align-items-center justify-content-center p-4 bg-light">
      <div className="text-center" style={{ maxWidth: "400px" }}>
        {/* Icon Display */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <div className="position-relative">
            <div
              className="rounded bg-primary bg-opacity-25 d-flex align-items-center justify-content-center"
              style={{
                width: "64px",
                height: "64px",
                animation: "bounce 1s infinite",
              }}
            >
              <MessageSquare size={32} className="text-primary" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="h4 fw-bold">Welcome to Chatty!</h2>
        <p className="text-muted">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
