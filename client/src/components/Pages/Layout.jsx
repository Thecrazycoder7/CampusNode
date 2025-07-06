import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function Layout() {
  const [signOut, setSignOut] = useState(true);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setSignOut(false);
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    navigate("/login");
  };

  return (
    <div className="d-flex vh-100 w-100 bg-white text-black">
      <aside
        className="p-4 d-flex flex-column"
        style={{
          width: "25vw",
          height: "100vh",
          minHeight: "100vh",
          backgroundColor: "#004aad",
          fontSize: "20px",
          zIndex: 1000,
        }}
      >
        <img
          src="/node-blue.png"
          alt="CampusNode Logo"
          className="mb-3 mx-auto"
          style={{ width: "150px", objectFit: "contain" }}
        />
        <nav className="nav flex-column flex-grow-1" style={{paddingLeft: "20px"}}>
          {[
            "Home",
            "Profile",
            "Chats",
            "Forum Boards",
            "Resources",
          ].map((item) => {
            const path =
              item === "Home"
                ? "/start"
                : `/start/${item.toLowerCase().replace(/\s+/g, "")}`;

            return (
              <Link key={item} to={path} className="nav-link text-white">
                {item}
              </Link>
            );
          })}
        </nav>
        <button onClick={handleSignOut} className="btn btn-light w-100 mt-3">
          Signout
        </button>
      </aside>

      <main className="ms-auto"
        style={{
          marginLeft: "25vw",
          width: "75vw",
          height: "100vh",
          overflowY: "auto",
          // padding: "2rem",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Outlet /> {/* Page content will be rendered here */}
      </main>
    </div>
  );
}
