const Sidebar = ({ onShowDownload, onShowUpload }) => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col shadow-xl">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        Teacher Panel
      </div>
      <nav className="flex flex-col p-4 space-y-4">
        <button
          onClick={onShowUpload}
          className="text-left px-4 py-2 rounded-md text-lg font-medium hover:bg-gray-800"
        >
          Uploads
        </button>
        <button
          onClick={onShowDownload}
          className="text-left px-4 py-2 rounded-md text-lg font-medium hover:bg-gray-800"
        >
          Downloads
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
