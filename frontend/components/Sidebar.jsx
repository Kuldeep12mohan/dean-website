import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

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
    <div className="h-screen w-64 bg-white border-r border-gray-300 flex flex-col shadow-md">
      {/* Header with college style */}
      <div className="relative p-6 border-b border-gray-300 bg-gray-50">
        <h1 className="text-xl font-bold text-blue-900">Teacher Panel</h1>
        {teacher?.username && (
          <p className="text-sm text-gray-600 mt-1">
            Welcome,{" "}
            <span className="font-semibold text-blue-900">{teacher.username}</span>
          </p>
        )}
        {/* Logout at top-right */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 flex items-center space-x-1 text-sm font-medium"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-4 space-y-2 text-gray-700 font-medium">
        <button
          onClick={onShowDownload}
          className={`text-left px-4 py-2 rounded-md transition ${
            activeTab === "downloads"
              ? "bg-blue-100 text-blue-800 font-semibold"
              : "hover:bg-blue-50"
          }`}
        >
          📥 Downloads
        </button>
        <button
          onClick={onShowUpload}
          className={`text-left px-4 py-2 rounded-md transition ${
            activeTab === "uploads"
              ? "bg-blue-100 text-blue-800 font-semibold"
              : "hover:bg-blue-50"
          }`}
        >
          📤 Uploads
        </button>
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 text-center text-xs text-gray-500 border-t border-gray-300">
        © {new Date().getFullYear()} Your College Name
      </div>
    </div>
  );
};

export default Sidebar;
