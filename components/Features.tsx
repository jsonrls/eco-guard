import React from 'react';
import { Camera, Activity, ShieldCheck, Map, ArrowUpRight } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Camera size={24} />,
      title: "AI Detection",
      description: "Instantly classifies waste, pollution, and hazards with 99% accuracy.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      pulseColor: "bg-emerald-400",
      active: true
    },
    {
      icon: <Activity size={24} />,
      title: "Rapid Response",
      description: "Real-time dispatch to LGU teams with transparent progress tracking.",
      color: "text-teal-600",
      bg: "bg-teal-50",
      pulseColor: "bg-teal-400",
      active: true
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Civic Action",
      description: "Empower communities to verify reports and maintain neighborhood hygiene.",
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      pulseColor: "bg-cyan-400",
      active: true
    },
    {
      icon: <Map size={24} />,
      title: "Data Heatmaps",
      description: "Geospatial visualization for smarter urban planning and resilience.",
      color: "text-lime-600",
      bg: "bg-lime-50",
      pulseColor: "bg-lime-400",
      active: true
    }
  ];

  return (
    <section id="features" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">Eco-Intelligence Suite</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Advanced tools designed for the modern citizen and the responsive government.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-[#FAFAFA] rounded-3xl p-8 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300"
            >
              <div className={`relative w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                {feature.active && (
                   <span className={`absolute inset-0 rounded-2xl ${feature.pulseColor} opacity-40 animate-ping`}></span>
                )}
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-6 text-sm">
                {feature.description}
              </p>
              <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                <ArrowUpRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;