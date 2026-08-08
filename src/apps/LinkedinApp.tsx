import { MapPin, Building, Briefcase } from "lucide-react";

export default function LinkedinApp() {
  return (
    <div className="w-full h-full bg-[#f3f2ef] text-black overflow-y-auto">
      <div className="max-w-4xl mx-auto py-8 px-4 flex flex-col gap-4">
        
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-32 bg-gray-300 relative">
            <img 
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1000&auto=format&fit=crop&q=60" 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-6 pb-6 relative">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-white absolute -top-16 shadow-sm overflow-hidden">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/512px-LinkedIn_logo_initials.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
            </div>
            
            <div className="flex justify-end pt-4 gap-2">
              <a 
                href="https://linkedin.com/in/ishaanjha-2b6977340"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-1.5 bg-[#0a66c2] text-white rounded-full font-semibold hover:bg-[#004182] transition-colors"
              >
                Connect on LinkedIn
              </a>
            </div>

            <div className="mt-8">
              <h1 className="text-2xl font-bold">Ishaan Jha</h1>
              <p className="text-lg text-gray-800 mt-1">Student at Indian Institute of Management Bangalore</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                <MapPin size={14} /> Bengaluru, Karnataka, India
              </div>
            </div>
          </div>
        </div>

        {/* Experience Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4">Experience</h2>
          
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center shrink-0">
              <Briefcase size={24} className="text-gray-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Developer</h3>
              <p className="text-gray-800">DBE-OS</p>
              <p className="text-sm text-gray-500">2023 - Present · Bengaluru</p>
              <p className="mt-2 text-sm text-gray-700">Building core infrastructure and web experiences.</p>
            </div>
          </div>
          
          <hr className="my-4 border-gray-200" />
          
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center shrink-0">
              <Briefcase size={24} className="text-gray-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Developer</h3>
              <p className="text-gray-800">Nova Unplugged</p>
              <p className="text-sm text-gray-500">2023 - Present · Bengaluru</p>
              <p className="mt-2 text-sm text-gray-700">Event management platform development.</p>
            </div>
          </div>
        </div>

        {/* Education Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
          <h2 className="text-xl font-bold mb-4">Education</h2>
          
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center shrink-0">
              <Building size={24} className="text-gray-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Indian Institute of Management Bangalore</h3>
              <p className="text-gray-800">Degree</p>
              <p className="text-sm text-gray-500">Dates</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
