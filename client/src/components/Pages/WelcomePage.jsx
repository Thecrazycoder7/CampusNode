import { useState } from "react";
import { Pencil, HandThumbsUp, ChatDots } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

export default function WelcomePage() {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="d-flex vh-100 w-100 bg-white text-black">
      {/* Sidebar */}
      <aside
        className="p-4 d-flex flex-column"
        style={{
          width: "250px",
          minHeight: "100vh",
          backgroundColor: "#004aad",
        }}
      >
        <img
          src="/node-blue.png"
          alt="CampusNode Logo"
          className="mb-3 mx-auto"
          style={{ width: "150px", objectFit: "contain" }}
        />
        <nav className="nav flex-column flex-grow-1">
          {[
            "Home",
            "Profile",
            "Chat",
            "Event Calendar",
            "Forum Boards",
            "Meeting Room",
            "E-Learning",
          ].map((item) => (
            <a key={item} href="#" className="nav-link text-white">
              {item}
            </a>
          ))}
        </nav>
        <button className="btn btn-light w-100 mt-3">Signout</button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        <h1 className="fw-semibold">Hi, user!</h1>

        {/* Post Card */}
        <div
          className="card mt-4 text-black"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-dark"
                  style={{ width: "40px", height: "40px" }}
                ></div>
                <div className="ms-2">
                  <p className="mb-0 fw-medium">Suman Kumari</p>
                  <p className="mb-0 text-muted">RTCIT</p>
                </div>
              </div>
              <p className="text-muted">12:00 PM</p>
            </div>
            <div
              className="mt-3 d-flex justify-content-center align-items-center"
              style={{
                height: "150px",
                borderRadius: "10px",
                backgroundColor: "#004aad",
              }}
            >
              <p className="text-white">📷 Image Placeholder</p>
            </div>
            <p className="mt-2">Details...</p>
            <div className="d-flex justify-content-between mt-2">
              <div className="d-flex gap-3">
                <HandThumbsUp className="cursor-pointer" />
                <ChatDots className="cursor-pointer" />
              </div>
              <Pencil
                className="cursor-pointer"
                onClick={() => setShowEdit(!showEdit)}
              />
            </div>
          </div>
        </div>

        {/* Edit Post Modal */}
        {showEdit && (
          <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50 d-flex justify-content-center align-items-center">
            <div
              className="card p-4 text-black"
              style={{ width: "300px", backgroundColor: "#f8f9fa" }}
            >
              <h5 className="fw-bold">Edit Post Details</h5>
              <div
                className="mt-3 d-flex justify-content-center align-items-center"
                style={{
                  height: "100px",
                  borderRadius: "10px",
                  backgroundColor: "#004aad",
                }}
              >
                <p className="text-white">📷 Image Placeholder</p>
              </div>
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => setShowEdit(false)}
              >
                Update Details
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
