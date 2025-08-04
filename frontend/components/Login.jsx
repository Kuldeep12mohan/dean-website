const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-10 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">Teacher's Login</h2>
        <p className="text-base text-gray-600 font-semibold mb-6">
          If you are not able to login, first try with your permanent ID as Password. If it fails, mail your name, department, designation and permanent ID at{" "}
          <a href="mailto:rpunit@zhcet.ac.in" className="text-blue-600 italic underline">rpunit@zhcet.ac.in</a>
        </p>
        <form className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-fit px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-md"
          >
            Sign In
          </button>
        </form>
        <div className="mt-5">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
