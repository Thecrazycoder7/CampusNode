import {
  HandThumbsUp,
  Chat,
  PencilSquare,
  Trash,
  ThreeDotsVertical,
} from "react-bootstrap-icons";

const PostCard = ({ user, post }) => {
  const handleLike = () => {
    // dummy like logic for testing
    console.log("Liked post:", post.content);
  };

  return (
    <div
      className="card mb-4 shadow-sm"
      style={{ width: "40vw", height: "70vh" }}
    >
      <div className="card-body">
        {/* User Info */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src={
                user?.profile || "https://avatars.githubusercontent.com/u/1?v=4"
              }
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px" }}
            />
            <div>
              <h6 className="mb-0">{user?.name || "Anonymous"}</h6>
              <small className="text-muted">
                {user?.college || "Unknown College"}
              </small>
            </div>
          </div>
          <div className="text-muted d-flex align-items-center">
            <small>
              {post.createdAt
                ? new Date(post.createdAt).toLocaleString()
                : "Just now"}
            </small>
            <ThreeDotsVertical className="ms-2" />
          </div>
        </div>

        {/* Post Text */}
        <p className="mt-2">{post.content}</p>

        {/* Post Image */}
        <img
          src={post.mediaUrl}
          alt="Post"
          className="rounded mb-3"
          style={{ width: "100%", height: "45vh", objectFit: "cover" }}
        />

        {/* Action Buttons */}
        <div className="d-flex justify-content-between py-2">
          <div>
            <HandThumbsUp className="me-3" onClick={handleLike} />
            <Chat className="me-3" />
          </div>
          <div>
            <PencilSquare className="me-2" />
            <Trash />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
