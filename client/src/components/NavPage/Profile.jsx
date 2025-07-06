import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pencil, Image } from "react-bootstrap-icons";
import Modal from "react-modal";
import SkillsSection from "./SkillCard";
import { useAuthStore } from "../../store/useAuthStore";
Modal.setAppElement("#root");

export default function Profile() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const { authUser: user, setAuth } = useAuthStore(); // 🛠️ use correct name

  if (!user) {
    return <div>Loading...</div>;
  }

  const [editForm, setEditForm] = useState({
    name: "",
    about: "",
    linkedin: "",
    github: "",
  });

  const handleShow = () => {
    if (user) {
      setEditForm({
        name: user.name || "",
        about: user.about || "",
        linkedin: user.linkedin || "",
        github: user.github || "",
      });
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      const result = await response.json();
      if (result.success) {
        setUser(result.user);
        localStorage.setItem("loggedInUser", JSON.stringify(result.user));
        toast.success("Profile updated");
      } else {
        toast.error(result.message);
      }
      setShowModal(false);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const posts = [
    {
      id: 1,
      caption: "DSA",
      imageUrl:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    },
    {
      id: 2,
      caption: "DevOps",
      imageUrl:
        "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg",
    },
    {
      id: 3,
      caption: "OOPs",
      imageUrl:
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
    },
    {
      id: 4,
      caption: "AI",
      imageUrl:
        "https://images.pexels.com/photos/8438916/pexels-photo-8438916.jpeg",
    },
    {
      id: 5,
      caption: "ML",
      imageUrl:
        "https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg",
    },
    {
      id: 6,
      caption: "Web Dev",
      imageUrl:
        "https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg",
    },
  ];
  
  return (
    <div
      className="container-fluid py-4"
      style={{ width: "70vw", height: "100vh", overflow: "hidden" }}
    >
      <div className="">
        {/* Left Column - Profile */}
        <div className="w-100">
          <div className="card border border-secondary mb-4">
            <div className="card-body">
              <div className="d-flex align-items-start gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="Profile"
                  className="rounded-circle border border-secondary me-4"
                  width="90"
                  height="90"
                />
                <div className="flex-grow-1">
                  <h5>{user?.name || "Guest"}</h5>
                  <p>{user?.about || "No bio available"}</p>
                  <div className="d-flex gap-2">
                    <a
                      href={user.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-decoration-underline"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={user.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-decoration-underline"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleShow}
                >
                  <Pencil />
                </button>
              </div>

              {/* Education Details */}
              <div className="mt-3 p-3 w-100 border border-secondary rounded">
                <h5 className="mb-3">Education Details</h5>

                <div className=" d-flex justify-content-between mb-2">
                  <p className="mb-0 w-50">Course: {user.course}</p>
                  <p className="mb-0 w-50">College: {user.college}</p>
                </div>

                <div className=" d-flex justify-content-between">
                  <p className="mb-0 w-50">Passing Year: {user.year}</p>
                  <p className="mb-0 w-50">Branch: {user.branch}</p>
                </div>
              </div>

              {/* Skills */}
              <SkillsSection />
            </div>
          </div>

          {/* Posts */}
          <div className="overflow-auto">
            <h5>Posts</h5>
            <div
              style={{
                maxHeight: "250px",
                overflowY: "auto",
                padding: "10px",
              }}
            >
              <div className="d-flex gap-3 flex-wrap">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="border border-secondary rounded text-center"
                    style={{
                      width: "150px",
                      height: "150px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={post.imageUrl}
                      alt={post.caption}
                      className="w-100"
                      style={{ height: "100px", objectFit: "cover" }}
                    />
                    <div className="p-1">
                      <small>{post.caption}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={handleClose}
        style={{
          content: {
            width: "400px",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
          },
        }}
      >
        <div className="modal-header d-flex justify-content-between align-items-center border-0">
          <h5 className="modal-title text-dark mb-0">Edit Profile</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>

        <div className="modal-body text-dark my-3">
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="bio" className="form-label">
                Bio
              </label>
              <textarea
                className="form-control"
                id="bio"
                rows="3"
                value={editForm.about}
                onChange={(e) =>
                  setEditForm({ ...editForm, about: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="linkedin" className="form-label">
                LinkedIn
              </label>
              <input
                type="text"
                className="form-control"
                id="linkedin"
                value={editForm.linkedin}
                onChange={(e) =>
                  setEditForm({ ...editForm, linkedin: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="github" className="form-label">
                GitHub
              </label>
              <input
                type="text"
                className="form-control"
                id="github"
                value={editForm.github}
                onChange={(e) =>
                  setEditForm({ ...editForm, github: e.target.value })
                }
              />
            </div>

            {/* Add a button inside the form/modal body */}
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={handleSave}
            >
              Save Profile
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
