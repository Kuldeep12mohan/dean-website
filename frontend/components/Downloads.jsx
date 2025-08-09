import { useState } from "react";
import axios from "axios";

const Downloads = () => {
  const categories = [
    { label: "Registration List", folder: "Registration" },
    { label: "Attendance List", folder: "Award" },
    { label: "Exam Attendance List", folder: "Attendance" },
    { label: "Award List", folder: "ExamAttendance" },
  ];

  const [courseNumber, setCourseNumber] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFiles([]);
    setSubmitted(false);

    if (!courseNumber.trim()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("teacherToken");
      const response = await axios.get(
        `http://localhost:3000/teacher/files/${courseNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const foundFiles = response.data.files || [];

      // Map all categories to include either file info or "not available"
      const allFilesWithStatus = categories.map((cat) => {
        const match = foundFiles.find((f) => f.label === cat.label);
        return match
          ? { ...match, available: true }
          : {
              label: cat.label,
              available: false,
              message:
                "Course not in the list of running courses for the current semester.",
            };
      });

      setFiles(allFilesWithStatus);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to fetch files. Please check course number or login again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (file) => {
    try {
      const token = localStorage.getItem("teacherToken");
      const res = await axios.get(`http://localhost:3000${file.url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${file.label}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download file.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Download Course Files
      </h2>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4">
        <label className="text-lg font-medium text-gray-700">
          Enter Course Number:
        </label>
        <input
          type="text"
          value={courseNumber}
          onChange={(e) => setCourseNumber(e.target.value)}
          placeholder="e.g. CS101"
          className="px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white py-3 px-6 rounded-md transition w-fit self-end ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Loading..." : "Get Files"}
        </button>
      </form>

      {error && <p className="text-red-600 mb-4 font-medium">{error}</p>}

      {submitted && (
        <div className="space-y-4">
          {files.map((file) => (
            <div
              key={file.label}
              className="flex items-center justify-between border p-4 rounded-md bg-gray-50"
            >
              <span className="text-gray-700 text-md font-medium">
                {file.label}
              </span>
              {file.available ? (
                <button
                  onClick={() => handleDownload(file)}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Download
                </button>
              ) : (
                <span className="text-red-500 text-sm">{file.message}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Downloads;
