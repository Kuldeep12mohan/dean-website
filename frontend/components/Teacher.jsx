import { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const Teacher = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  // Download format template
  const handleDownloadFormat = () => {
    const formatData = [
      {
        "Roll Number": "",
        Name: "",
        Date: "",
        Status: "Present / Absent",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(formatData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Format");

    XLSX.writeFile(workbook, "Attendance_Format.xlsx");
  };

  // Upload filled attendance file
  const handleFileUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a file.");
      return;
    }

    const teacher = JSON.parse(localStorage.getItem("teacher"));
    const token = localStorage.getItem("teacherToken");

    if (!teacher || !token) {
      setMessage("❌ Unauthorized: Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("teacherId", teacher._id);

    try {
      const res = await axios.post("http://localhost:3000/teacher/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(`✅ ${res.data.message || "Upload successful!"}`);
      setFile(null);
      setFileName("");
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.message || "Upload failed!"}`);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6 bg-white shadow-xl rounded-2xl mt-10">
      <h1 className="text-2xl font-semibold text-center text-blue-800">Teacher Panel</h1>

      {/* Download Format Button */}
      <div className="flex justify-center">
        <button
          onClick={handleDownloadFormat}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Download Excel Format
        </button>
      </div>

      {/* Upload Form */}
      <div className="space-y-3">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0]?.name || "");
          }}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {fileName && (
          <p className="text-sm text-gray-600 italic text-center">
            Selected: {fileName}
          </p>
        )}

        <button
          onClick={handleFileUpload}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 w-full"
        >
          Upload Attendance
        </button>

        {message && (
          <p
            className={`text-center text-sm font-medium mt-2 ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Teacher;
