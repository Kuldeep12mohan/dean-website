import { useState } from "react";
import axios from "axios";

const Uploads = () => {
  const [attendanceFile, setAttendanceFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!attendanceFile) {
      setMessage("Please select an attendance file to upload.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("file", attendanceFile);
      formData.append("category", "Attendance");

      const token = localStorage.getItem("teacherToken");

      const res = await axios.post("http://localhost:3000/teacher/upload-file", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message || "Upload successful.");
    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white p-8 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Upload Attendance List
      </h2>

      <div>
        <label className="block mb-2 text-lg font-medium text-gray-700">
          Select Attendance Excel File:
        </label>
        <input
          type="file"
          accept=".xlsx"
          onChange={(e) => setAttendanceFile(e.target.files[0])}
          className="block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      <button
        onClick={uploadFile}
        className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 w-full"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Attendance List"}
      </button>

      {message && (
        <p className="text-center text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
};

export default Uploads;
