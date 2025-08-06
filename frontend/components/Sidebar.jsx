import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, onShowDownload, onShowUpload }) => {
  const [teacher, setTeacher] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const teacherData = localStorage.getItem("teacher");
    if (!teacherData) {
      console.error("Teacher is not logged in");
      return;
    }
    setTeacher(JSON.parse(teacherData));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("teacher");
    localStorage.removeItem("teacherToken");
    window.location.reload();
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col shadow-xl justify-between">
      {/* Top section */}
      <div>
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold mb-1">Teacher Panel</h1>
          {teacher?.username && (
            <p className="text-sm text-gray-400">
              Welcome,{" "}
              <span className="font-semibold text-white">{teacher.username}</span>
            </p>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex flex-col p-4 space-y-4">
          <button
            onClick={onShowDownload}
            className={`text-left px-4 py-2 rounded-md text-lg font-medium transition ${
              activeTab === "downloads" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
          >
            Downloads
          </button>
          <button
            onClick={onShowUpload}
            className={`text-left px-4 py-2 rounded-md text-lg font-medium transition ${
              activeTab === "uploads" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
          >
            Uploads
          </button>
        </nav>
      </div>

      {/* Logout Button at Bottom */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
