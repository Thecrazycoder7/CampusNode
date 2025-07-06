import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="d-flex flex-column border-end transition-all"
      style={{ width: "100%", maxWidth: "280px", height: "100vh" }}
    >
      {/* Header */}
      <div className="border-bottom w-100 p-3">
        <div className="d-flex align-items-center gap-2">
          <Users size={24} />
          <span className="fw-medium d-none d-lg-inline">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-auto w-100 py-3 px-2">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="d-flex align-items-center gap-3 mb-3 px-2">
            {/* Avatar skeleton */}
            <div
              className="rounded-circle bg-secondary bg-opacity-25"
              style={{ width: "48px", height: "48px" }}
            ></div>

            {/* User info skeleton */}
            <div className="d-none d-lg-block w-100">
              <div
                className="bg-secondary bg-opacity-25 rounded mb-2"
                style={{ width: "130px", height: "12px" }}
              ></div>
              <div
                className="bg-secondary bg-opacity-25 rounded"
                style={{ width: "80px", height: "10px" }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
