import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full bg-purple-700 py-12 text-center">
        <h1 className="text-4xl font-extrabold text-white">
          About Family Planner
        </h1>
        <p className="text-gray-200 text-lg mt-4">
          Revolutionizing family planning with cutting-edge technology.
        </p>
      </div>

      {/* About Content */}
      <div className="w-full max-w-5xl p-8 md:p-12 text-gray-300">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Our Mission
          </h2>
          <p>
            At Family Planner, our mission is to simplify and streamline family
            planning through innovative technology. Whether it’s scheduling
            events, managing tasks, or integrating with your email services, we
            make staying organized easier than ever.
          </p>
        </div>

        {/* Vision Section */}
        <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
          <div className="md:w-1/2">
            <img
              src="https://www.svgrepo.com/show/331306/calendar-check.svg"
              alt="Calendar Integration"
              className="w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Vision
            </h2>
            <p>
              We envision a world where families can focus on what truly
              matters, while our technology handles the logistics. Our vision
              is to create tools that integrate seamlessly with platforms like
              Google Calendar, Outlook, and more—helping you plan and execute
              with ease.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
          <div className="md:w-1/2 order-2 md:order-1">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Values
            </h2>
            <ul className="list-disc list-inside">
              <li className="mb-2">Innovation: Pushing boundaries in tech.</li>
              <li className="mb-2">Family-Centric: Built for families, by families.</li>
              <li className="mb-2">Reliability: Always there when you need us.</li>
              <li className="mb-2">Integration: Seamlessly connected to your tools.</li>
            </ul>
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <img
              src="https://www.svgrepo.com/show/303233/team.svg"
              alt="Team Collaboration"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Tech and Innovation Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img
              src="https://www.svgrepo.com/show/312242/innovation.svg"
              alt="Innovation in Technology"
              className="w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-4">
              Innovation in Technology
            </h2>
            <p>
              We use cutting-edge technologies to provide the best experience
              for our users. From real-time scheduling to secure integrations
              with popular services like Gmail and Outlook, Family Planner is
              built to deliver unmatched reliability and performance.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-800 py-8">
        <div className="container mx-auto text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Family Planner. All rights
            reserved. | Empowering Families, One Plan at a Time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
