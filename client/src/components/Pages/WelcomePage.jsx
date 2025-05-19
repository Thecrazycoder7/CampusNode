import { useState, useEffect } from "react";
import { Pencil, HandThumbsUp, ChatDots } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const [showEdit, setShowEdit] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/start", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("User  fetch result:", data);

      if (data.success) {
        setUser(data.user);
      } else {
        console.log("No user found");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to load user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);
  
  

  const handleSignout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login
  };
  

  if (loading) return <p>Loading user data...</p>;
  if (!user) return <p>No user found or failed to load user data</p>;
  
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
        <button className="btn btn-light w-100 mt-3" onClick={handleSignout}>
          Signout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        <h2 className="fw-semibold">Hi, {user.name}!</h2>

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
