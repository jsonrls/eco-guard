import React from 'react';
import { ArrowRight, PlayCircle, Leaf, ShieldCheck } from 'lucide-react';
import Button from './ui/Button';

interface HeroProps {
  onEnterApp?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onEnterApp }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#F8FAF9]">
        {/* Moving Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none animate-move-background" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }}
        ></div>

        {/* Background Shapes */}
        <div className="blob-shape bg-emerald-200/40 w-[600px] h-[600px] rounded-full top-[-100px] left-[-200px] blur-[120px] animate-pulse"></div>
        <div className="blob-shape bg-teal-200/30 w-[500px] h-[500px] rounded-full bottom-[-50px] right-[-100px] blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 text-primary text-sm font-semibold mb-8 border border-emerald-100 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Official Partner of Naga City LGU
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight">
              Monitoring for a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">Cleaner Future.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              EcoGuard Naga empowers citizens with AI to detect environmental hazards. Building a resilient city, one report at a time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button variant="primary" size="lg" className="w-full sm:w-auto group rounded-full px-10" onClick={onEnterApp}>
                Launch App
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-200 text-slate-600 hover:text-primary">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-slate-400 text-sm font-semibold">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-primary" />
                    Secure Data
                </div>
                <div className="flex items-center gap-2">
                    <Leaf size={18} className="text-primary" />
                    Carbon Neutral
                </div>
            </div>
          </div>

          {/* Illustration Area */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none perspective-1000">
            <div className="relative rounded-3xl bg-white p-3 shadow-2xl shadow-emerald-900/10 rotate-y-[-5deg] hover:rotate-y-0 transition-transform duration-700 ease-out">
                {/* Image Container */}
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center group">
                   
                   {/* Real Image Background */}
                   <img 
                    src="https://images.unsplash.com/photo-1518005052357-e98470136518?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Green City Aerial View"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.95]"
                   />
                   
                   {/* Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                   
                   {/* Floating Elements - Glassmorphism */}
                   <div className="absolute top-[15%] left-[10%] glass-panel p-4 rounded-2xl shadow-lg flex items-center gap-4 animate-float z-20 max-w-[200px]">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">Alert</div>
                        <div className="text-xs text-slate-600">Flood Risk High</div>
                      </div>
                   </div>

                   <div className="absolute bottom-[15%] right-[10%] glass-panel p-4 rounded-2xl shadow-lg flex items-center gap-4 animate-float-delayed z-20 max-w-[200px]">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">Resolved</div>
                        <div className="text-xs text-slate-600">Waste Cleared</div>
                      </div>
                   </div>
                   
                   {/* Central AI Hub */}
                   <div className="relative z-10 w-24 h-24 flex items-center justify-center">
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                        <div className="absolute inset-2 bg-white/40 backdrop-blur-xl rounded-full shadow-glow"></div>
                        <div className="relative w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                             <Leaf size={24} />
                        </div>
                   </div>
                </div>
            </div>
            
            {/* Soft Shadow below card */}
            <div className="absolute -bottom-10 left-10 right-10 h-20 bg-emerald-900/20 blur-3xl rounded-[100%] z-[-1]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;