import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const StudentDashboard = () => {
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSheets = async () => {
      const token = localStorage.getItem("studentToken");

      if (!token) {
        setError("Unauthorized: No token found");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/student/sheets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSheets(res.data.sheets || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch sheets");
      } finally {
        setLoading(false);
      }
    };

    fetchSheets();
  }, []);

  const handleDownload = (data, fileName = "Attendance.xlsx") => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, `Downloaded_${fileName}`);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Uploaded Attendance Sheets
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : sheets.length === 0 ? (
        <p className="text-center text-gray-500">No sheets found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-md shadow">
            <thead className="bg-gray-200 text-gray-700 font-semibold">
              <tr>
                <th className="py-3 px-4 border">S.No</th>
                <th className="py-3 px-4 border">File Name</th>
                <th className="py-3 px-4 border">Uploaded By</th>
                <th className="py-3 px-4 border">Uploaded On</th>
                <th className="py-3 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sheets.map((sheet, index) => (
                <tr key={sheet._id} className="text-center border-t">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{sheet.originalFileName}</td>
                  <td className="py-2 px-4 border">
                    {sheet.teacher?.username || "Unknown"}
                  </td>
                  <td className="py-2 px-4 border">
                    {new Date(sheet.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      onClick={() =>
                        alert(
                          JSON.stringify(sheet.data.slice(0, 3), null, 2)
                        )
                      }
                      className="text-blue-600 underline text-sm"
                    >
                      View Sample
                    </button>

                    <button
                      onClick={() =>
                        handleDownload(sheet.data, sheet.originalFileName)
                      }
                      className="text-green-600 underline text-sm"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
