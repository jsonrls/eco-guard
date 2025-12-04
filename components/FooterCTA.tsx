import React from 'react';
import Button from './ui/Button';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

interface FooterCTAProps {
  onEnterApp?: () => void;
}

const FooterCTA: React.FC<FooterCTAProps> = ({ onEnterApp }) => {
  return (
    <footer>
      {/* Final CTA */}
      <div className="bg-[#F8FAF9] pt-12 pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-secondary to-primary rounded-[2.5rem] p-12 sm:p-20 text-center text-white shadow-2xl shadow-emerald-900/20 relative overflow-hidden group">
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:scale-105 transition-transform duration-1000"></div>
                
                <h2 className="relative text-3xl sm:text-5xl font-bold mb-8 tracking-tight">
                    Ready to transform <br/> Naga City?
                </h2>
                <p className="relative text-emerald-100 text-lg mb-12 max-w-xl mx-auto font-medium">
                    Join thousands of citizens making a difference. Download the app or start reporting directly from your browser.
                </p>
                <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="white" size="lg" className="text-primary hover:bg-emerald-50 px-10" onClick={onEnterApp}>
                        Start Reporting
                    </Button>
                    <button className="px-8 py-4 text-lg font-semibold text-white border border-white/30 rounded-full hover:bg-white/10 transition-colors">
                        Contact Sales
                    </button>
                </div>
            </div>
          </div>
      </div>

      {/* Main Footer */}
      <div className="bg-white border-t border-slate-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
                <div className="col-span-2 md:col-span-1">
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                      EcoGuard <span className="text-primary">Naga</span>
                    </span>
                    <p className="mt-6 text-slate-500 text-sm leading-relaxed max-w-xs">
                        The leading environmental intelligence platform for forward-thinking cities.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mb-6">Platform</h4>
                    <ul className="space-y-4 text-sm text-slate-500 font-medium">
                        <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Integration</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                    <ul className="space-y-4 text-sm text-slate-500 font-medium">
                        <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mb-6">Social</h4>
                    <div className="flex space-x-4 text-slate-400">
                        <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
                <p>&copy; {new Date().getFullYear()} EcoGuard Naga. All rights reserved.</p>
                <div className="flex space-x-8 mt-4 md:mt-0 font-medium">
                    <a href="#" className="hover:text-primary">Privacy</a>
                    <a href="#" className="hover:text-primary">Terms</a>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterCTA;