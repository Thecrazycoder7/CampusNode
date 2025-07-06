import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { Modal, Button, Form } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import { useAuthStore } from "../../store/useAuthStore";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [details, setDetails] = useState("");
  const [getPost, setGetPost] = useState([]);

  const { authUser: user } = useAuthStore();
  const userName = user?.name || "Guest";

  // Dummy tech posts
  const dummyPosts = [
    {
      content:
        "Data Structures and Algorithms (DSA) are key to coding interviews.",
      mediaUrl:
        "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
      user: {
        name: "Alice",
        profile: "https://avatars.githubusercontent.com/u/1?v=4",
      },
    },
    {
      content:
        "DevOps bridges the gap between development and operations teams.",
      mediaUrl:
        "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg",
      user: {
        name: "Sumo",
        profile: "https://avatars.githubusercontent.com/u/2?v=4",
      },
    },
    {
      content:
        "AI/ML bridges the gap between development and operations teams.",
      mediaUrl:
        "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg",
      user: {
        name: "Suman Kumari",
        profile: "https://avatars.githubusercontent.com/u/2?v=4",
      },
    },
    // Add same 'user' object to the rest too...
  ];
  

  useEffect(() => {
    setGetPost(dummyPosts); // show dummy data
  }, []);

  return (
    <div
      className="p-4"
      style={{ height: "100vh", overflowY: "auto", width: "100%" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Welcome, {userName}!</h4>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <PlusLg className="me-2" />
          Create Post
        </Button>
      </div>

      <div className="d-flex justify-content-center flex-wrap">
        {getPost.length > 0 ? (
          getPost.map((post, index) => (
            <PostCard
              key={index}
              post={post}
              user={
                post.user || {
                  name: "Dummy User",
                  profile: "https://avatars.githubusercontent.com/u/1?v=4",
                  college: "Test College",
                }
              }
            />
          ))
        ) : (
          <p className="text-center w-100">No posts to display.</p>
        )}
      </div>

      {/* Post Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Image File</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group controlId="formDetails">
              <Form.Label>Post Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write something about your post..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => alert("Post saved (not really)")}
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
