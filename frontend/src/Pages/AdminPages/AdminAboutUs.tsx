import { motion } from 'framer-motion';
import AdminNavbar from '../../Components/AdminNavBar';
import Topbar from '../../Components/Topbar';

const AdminAboutUs = () => {
  return (
    <div className="  overflow-y-scroll scrollbar-hide absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="  absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-d3 opacity-20 blur-[100px]"></div>
      <Topbar />
      <AdminNavbar iter={4} />
      <div className=" mx-10 mt-9 rounded-xl min-h-screen text-gray-800">
        {/* Hero Section */}
        <motion.section
          className="relative w-full h-[50vh] flex flex-col justify-center rounded-xl items-center bg-cover bg-center text-center"
          style={{ backgroundImage: "url('/Images/vendor-bg.jpg')" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 rounded-2xl bg-d2 bg-opacity-50"></div>
          <motion.h1
            className="text-4xl font-extrabold text-white relative z-10"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Smart Vendor Management System
          </motion.h1>
          <motion.p
            className="text-lg text-white mt-2 max-w-2xl relative z-10"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            A digital revolution ensuring fairness, transparency, and organization for urban vendors.
          </motion.p>
        </motion.section>

        {/* Our Mission */}
        <motion.section
          className="max-w-5xl mx-auto py-16 px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-gray-600 mt-4 font-l">
            SVMS is designed to **empower street vendors** by providing a **fair and transparent system** for space
            allocation, legal recognition, and digital transactions. We work with **local authorities** to streamline
            vending operations and create **cleaner, more organized cities**.
          </p>
        </motion.section>

        {/* Key Features */}
        <motion.section className="bg-d2 rounded-2xl  py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-d3 text-center">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-10">
              {[
                { title: 'Vendor Registration', desc: 'Quick sign-up using Aadhaar or mobile number.' },
                { title: 'Space Allocation', desc: 'GIS-based tracking to find available vending zones.' },
                { title: 'Permission Management', desc: 'Authorities can approve applications digitally.' },
                { title: 'Secure Digital Payments', desc: 'UPI, card, and online payment integration.' },
                { title: 'Compliance Monitoring', desc: 'Automated notifications for stall maintenance.' },
                { title: 'Grievance Redressal', desc: 'Vendors can file complaints online for quick resolution.' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-100 p-6 rounded-lg shadow-md text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-d3 mt-2">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Our Impact */}
        <motion.section
          className="max-w-5xl mx-auto py-16 px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold">Our Impact</h2>
          <p className="text-gray-600 mt-4">SVMS is actively transforming **urban vending** by ensuring:</p>
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {[
              { label: '50,000+', desc: 'Registered Vendors' },
              { label: '10,000+', desc: 'Digital Transactions Completed' },
              { label: '20+', desc: 'Cities Using SVMS' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="p-6 bg-d3 text-white rounded-lg shadow-md text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold">{stat.label}</h3>
                <p className="text-gray-600">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Meet the Team */}
        <motion.section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold">Meet the Team</h2>
            <p className="text-gray-600 mt-4">A group of passionate individuals working towards vendor empowerment.</p>
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              {[
                { name: 'Aditya Sharma', role: 'Founder & CEO' },
                { name: 'Rohit Verma', role: 'Tech Lead' },
                { name: 'Neha Gupta', role: 'Operations Manager' },
                { name: 'Pooja Mehra', role: 'GIS Analyst' },
              ].map((member, i) => (
                <motion.div
                  key={i}
                  className="p-6 bg-d3 rounded-lg shadow-md text-center text-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="py-16 bg-d2 text-d3 text-center rounded-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold">Join Us in Revolutionizing Street Vending</h2>
          <p className="mt-4">Be a part of the change and help build a better future for urban vendors.</p>
          <motion.button
            className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
            whileHover={{ scale: 1.05 }}
          >
            Get Started
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
};

export default AdminAboutUs;
