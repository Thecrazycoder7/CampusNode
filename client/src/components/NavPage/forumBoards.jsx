import { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ForumBoards() {
  const [form, setForm] = useState({
    name: "",
    topic: "",
    duration: "15",
  });

  const [meetLink, setMeetLink] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSchedule = () => {
    // In real app, integrate Google Meet API or calendar
    const dummyLink = `https://meet.google.com/xyz-${Math.floor(
      Math.random() * 1000
    )}`;
    setMeetLink(dummyLink);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <Card className="shadow p-3">
        <h4 className="mb-3">Schedule a Forum Meeting</h4>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Discussion Topic</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Web Dev doubts"
              name="topic"
              value={form.topic}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duration</Form.Label>
            <Form.Select
              name="duration"
              value={form.duration}
              onChange={handleChange}
            >
              <option value="15">15 Minutes</option>
              <option value="20">20 Minutes</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" onClick={handleSchedule}>
            Generate Google Meet Link
          </Button>
        </Form>

        {meetLink && (
          <div className="mt-4">
            <h6>Meet Scheduled!</h6>
            <p>
              <strong>Topic:</strong> {form.topic} <br />
              <strong>Duration:</strong> {form.duration} mins
            </p>
            <a href={meetLink} target="_blank" rel="noopener noreferrer">
              🔗 Join Meet
            </a>
          </div>
        )}
      </Card>
    </div>
  );
}
