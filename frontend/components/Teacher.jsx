import { useState } from "react";
import Sidebar from "./Sidebar";
import Downloads from "./Downloads";
import Uploads from "./Uploads";

const Teacher = () => {
  const [showDownload, setShowDownload] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const handleShowDownload = () => {
    setShowDownload(true);
    setShowUpload(false);
  };

  const handleShowUpload = () => {
    setShowUpload(true);
    setShowDownload(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar onShowDownload={handleShowDownload} onShowUpload={handleShowUpload} />

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100">
        {showDownload && <Downloads />}
        {showUpload && <Uploads />}
        {!showDownload && !showUpload && (
          <div className="text-gray-600 text-lg font-medium text-center mt-20">
            Please select an option from the sidebar.
          </div>
        )}
      </div>
    </div>
  );
};

export default Teacher;
