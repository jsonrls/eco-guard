import React from 'react';
import { Zap, Users, Leaf } from 'lucide-react';

const Impact: React.FC = () => {
  return (
    <section id="impact" className="py-32 bg-secondary text-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-secondary to-secondary"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Measurable Change,<br/>Real-Time Impact.</h2>
                <p className="text-emerald-100/80 text-lg leading-relaxed mb-8 max-w-lg">
                    We don't just collect data; we drive action. See how EcoGuard is transforming Naga City's environmental responsiveness.
                </p>
                <div className="flex gap-4">
                    <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
                    <div className="h-1 w-10 bg-emerald-500/30 rounded-full"></div>
                </div>
            </div>

            <div className="grid gap-6">
                {[
                    { icon: Zap, val: "3x", label: "Faster Resolution", desc: "Speed from report to action." },
                    { icon: Leaf, val: "45%", label: "Cleaner Streets", desc: "Reduction in visible waste." },
                    { icon: Users, val: "12k", label: "Active Citizens", desc: "Engaged community monitors." }
                ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <div className="text-3xl font-bold">{stat.val}</div>
                            <div className="font-medium text-emerald-100">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;