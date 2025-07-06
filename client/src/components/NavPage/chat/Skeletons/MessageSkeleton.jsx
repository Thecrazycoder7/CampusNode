const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-grow-1 overflow-auto p-3">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`d-flex mb-4 ${
            idx % 2 === 0 ? "justify-content-start" : "justify-content-end"
          }`}
        >
          <div className="d-flex gap-2 align-items-start">
            {/* Avatar Skeleton */}
            <div
              className="rounded-circle bg-secondary bg-opacity-25"
              style={{ width: "40px", height: "40px" }}
            />

            {/* Message Bubble Skeleton */}
            <div>
              <div
                className="bg-secondary bg-opacity-25 rounded mb-2"
                style={{ width: "60px", height: "10px" }}
              ></div>
              <div
                className="bg-secondary bg-opacity-25 rounded"
                style={{ width: "200px", height: "64px" }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
