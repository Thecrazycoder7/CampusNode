import React, { useState } from "react";
import { Pencil } from "react-bootstrap-icons";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuthStore } from "../../store/useAuthStore";

Modal.setAppElement("#root");

export default function SkillsSection() {
  const { authUser: user } = useAuthStore();

  const [skill, setSkill] = useState(user?.skills || []);

  const [showModal, setShowModal] = useState(false);
  const [inputSkills, setInputSkills] = useState(
    user?.skills ? user.skills.join(", ") : ""
  );


  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSave = () => {
    const updatedSkills = inputSkills.split(",").map((skill) => skill.trim());
    setSkill(updatedSkills);
    setInputSkills(updatedSkills.join(", "));
    handleClose();
  };

  return (
    <div className="mt-4 p-3 border border-secondary rounded">
      <div className="d-flex justify-content-between align-items-center">
        <h5>Skills</h5>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={handleShow}
        >
          <Pencil />
        </button>
      </div>

      <div className="d-flex flex-wrap gap-2 mt-2">
        {(skill ? skill : skills).map((skill, index) => (
          <span key={index} className="text-black">
            {skill}
          </span>
        ))}
      </div>

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
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Edit Skills</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </div>
        <div>
          <label htmlFor="skillsInput" className="form-label">
            Enter skills (comma separated)
          </label>
          <input
            id="skillsInput"
            type="text"
            className="form-control"
            value={inputSkills}
            onChange={(e) => setInputSkills(e.target.value)}
          />
          <button className="btn btn-primary w-100 mt-3" onClick={handleSave}>
            Save Skills
          </button>
        </div>
      </Modal>
    </div>
  );
}
