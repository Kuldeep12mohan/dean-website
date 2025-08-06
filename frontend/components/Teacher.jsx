import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Downloads from "./Downloads";
import Uploads from "./Uploads";
import { useNavigate } from "react-router-dom";

const Teacher = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("downloads");
  useEffect(()=>{
    const teacherToken = localStorage.getItem("teacherToken");
    if(!teacherToken)navigate("/teacher-login")
  })

  return (
    <div className="flex min-h-screen">
      <Sidebar
        activeTab={activeTab}
        onShowDownload={() => setActiveTab("downloads")}
        onShowUpload={() => setActiveTab("uploads")}
      />
      <div className="flex-1 p-6 bg-gray-100">
        {activeTab === "downloads" && <Downloads />}
        {activeTab === "uploads" && <Uploads />}
      </div>
    </div>
  );
};

export default Teacher;
