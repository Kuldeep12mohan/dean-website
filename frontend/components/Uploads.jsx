import { useState } from "react";
import axios from "axios";

const categories = [
  { label: "Award List", value: "Award" },
  { label: "Attendance List", value: "Attendance" },
];

const Uploads = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!selectedCategory || !file) {
      setMessage("Please select a category and a file.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", selectedCategory);

      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:3000/teacher/upload-file", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message || "Upload successful.");
    } catch (error) {
      console.error(error);
      setMessage("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Upload Files</h2>

      {/* Dropdown for selecting category */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">Select File Type:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        >
          <option value="">-- Choose --</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* File input */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">Select File:</label>
        <input
          type="file"
          accept=".xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      {/* Upload button */}
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>

      {/* Message */}
      {message && (
        <p className="text-center text-gray-700 font-medium mt-2">{message}</p>
      )}
    </div>
  );
};

export default Uploads;
