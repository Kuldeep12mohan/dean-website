const StudentLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-100 to-gray-200">
      <div className="w-full max-w-xl bg-white border border-gray-300 p-12 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Student Login
        </h2>
        <form className="space-y-6">
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Faculty Number
            </label>
            <input
              type="text"
              placeholder="Enter your faculty number"
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
