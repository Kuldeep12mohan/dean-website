import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [facultyNumber, setFacultyNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/student/login", {
        facultyNumber,
        dateOfBirth,
      });

      const { token, student } = response.data;

      // Save token to localStorage (optional)
      localStorage.setItem("studentToken", token);
      localStorage.setItem("student", JSON.stringify(student));

      // Redirect or show success (you can use router here)
      alert("Login successful!");
      navigate("/student-dashboard")
      
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-100 to-gray-200">
      <div className="w-full max-w-xl bg-white border border-gray-300 p-12 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Student Login
        </h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Faculty Number
            </label>
            <input
              type="text"
              value={facultyNumber}
              onChange={(e) => setFacultyNumber(e.target.value)}
              placeholder="Enter your faculty number"
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-center text-md">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
