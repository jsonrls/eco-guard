import React from 'react';
import { Bell, Menu, MapPin, Camera } from 'lucide-react';

const DemoPreview: React.FC = () => {
  return (
    <section className="py-32 bg-[#F8FAF9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-5 mb-16 lg:mb-0">
            <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              A Seamless <br />
              <span className="text-primary">Civic Experience.</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Designed for speed and clarity. From citizen reporting to LGU command dashboards, EcoGuard connects the dots effortlessly.
            </p>
            <div className="space-y-6">
              {[
                "AI-Powered Verification",
                "Anonymous Reporting",
                "Live Status Tracking"
              ].map((item, i) => (
                <div key={i} className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-4">
                    <span className="text-sm font-bold">✓</span>
                  </div>
                  <span className="font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content: Mockups */}
          <div className="lg:col-span-7 relative">
            
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-emerald-100/50 to-teal-50/50 rounded-full blur-3xl -z-10"></div>

            <div className="relative flex items-end justify-center lg:justify-end gap-6 sm:gap-8">
              
              {/* Mobile Mockup (Citizen App) */}
              <div className="relative w-[280px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800 z-20 transform translate-y-8 hover:-translate-y-4 transition-transform duration-700 ease-out">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-slate-800 rounded-b-2xl z-30"></div>
                
                {/* Screen */}
                <div className="bg-slate-50 w-full h-[580px] rounded-[2.5rem] overflow-hidden flex flex-col relative">
                    {/* Header */}
                    <div className="bg-primary h-36 p-6 pt-12 text-white flex justify-between items-start rounded-b-[2.5rem] shadow-lg relative z-10">
                        <div>
                            <div className="text-emerald-100 text-xs font-medium">Good Morning</div>
                            <div className="font-bold text-xl">Juan Dela Cruz</div>
                        </div>
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                            <Bell size={16} />
                        </div>
                    </div>
                    
                    {/* Floating Action Button */}
                    <div className="absolute top-28 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-xl">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-primary rounded-full flex items-center justify-center text-white shadow-inner">
                            <Camera size={28} />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="pt-16 px-6 pb-6 flex-1 overflow-hidden">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="font-bold text-slate-800 text-sm">Your Activity</h3>
                            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg">View All</span>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-2xl shadow-card flex gap-4 items-center">
                                <div className="w-12 h-12 bg-gray-100 rounded-xl flex-shrink-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=100&q=80)'}}></div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Reviewing</div>
                                    </div>
                                    <div className="text-sm font-bold text-slate-800">Clogged Canal</div>
                                    <div className="text-xs text-slate-400">San Felipe • 10m ago</div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-card flex gap-4 items-center">
                                <div className="w-12 h-12 bg-gray-100 rounded-xl flex-shrink-0 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=100&q=80)'}}></div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Resolved</div>
                                    </div>
                                    <div className="text-sm font-bold text-slate-800">Litter Cleaned</div>
                                    <div className="text-xs text-slate-400">Centro • 2h ago</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Nav */}
                    <div className="bg-white border-t border-slate-100 p-4 flex justify-around text-slate-300">
                        <div className="text-primary"><MapPin size={24} /></div>
                        <div className="hover:text-primary"><Menu size={24} /></div>
                    </div>
                </div>
            </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoPreview;