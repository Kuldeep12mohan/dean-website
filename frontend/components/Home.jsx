import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
        <div className="fixed z-10 w-screen mb-4">
               <Navbar />
        </div>
   

      <header className="bg-[#004080] text-white py-16 text-center shadow-md">
        <h1 className="text-4xl font-bold">Result Processing Unit</h1>
        <h2 className="text-2xl mt-2">Zakir Husain College of Engineering & Technology (ZHCET)</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          Ensuring accurate, transparent, and efficient evaluation and result publication for all departments of ZHCET.
        </p>
      </header>

      <section className="px-6 md:px-20 py-12 bg-white">
        <h2 className="text-2xl font-semibold mb-4">About the Unit</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          The Result Processing Unit (RPU) of ZHCET is responsible for compiling, verifying, and publishing examination results 
          for all undergraduate and postgraduate programs. We work in coordination with the Examination Controller and departmental coordinators
          to ensure timely and accurate declaration of results.
        </p>
      </section>

      <section className="px-6 md:px-20 py-12 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-6">Key Functions</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white shadow p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Data Verification</h3>
            <p className="text-gray-600">
              Checking uploaded internal/external marks for consistency and accuracy.
            </p>
          </div>
          <div className="bg-white shadow p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Result Compilation</h3>
            <p className="text-gray-600">
              Automated tools to generate student-wise and course-wise result reports.
            </p>
          </div>
          <div className="bg-white shadow p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Publication & Records</h3>
            <p className="text-gray-600">
              Secure archiving and timely publication of results on official portals.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-12 bg-white">
        <h2 className="text-2xl font-semibold mb-4">Contact & Support</h2>
        <p className="text-gray-700 text-lg mb-2">
          For any queries related to marks uploading, discrepancies, or access issues:
        </p>
        <ul className="text-gray-600 text-md list-disc list-inside">
          <li>Email: rpu@zhcet.ac.in</li>
          <li>Office Hours: 10 AM – 4 PM (Monday to Friday)</li>
          <li>Location: Room No. 207, Main Building, ZHCET</li>
        </ul>
      </section>

      <footer className="bg-[#004080] text-white text-center py-6 mt-10">
        <p>&copy; {new Date().getFullYear()} Result Processing Unit, ZHCET. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
