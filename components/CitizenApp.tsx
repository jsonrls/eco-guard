import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, Upload, X, Check, ArrowLeft, Loader2, Home, User, Bell, AlertTriangle, Info, Calendar, MoreVertical, Trash2, Leaf, Droplets, LogOut, Zap, HelpCircle, Waves, Trees, Construction, Flame, Wind, Ban, LightbulbOff, Mountain, SprayCan, Signpost } from 'lucide-react';
import Button from './ui/Button';
import { GoogleGenAI, Type } from "@google/genai";
import L from 'leaflet';

interface CitizenAppProps {
  onBack: () => void;
}

type ReportStep = 'home' | 'camera' | 'details' | 'success';
type SeverityLevel = 'Low' | 'Medium' | 'High';
type ConfidenceLevel = 'High' | 'Medium' | 'Low';

interface AIResult {
    title: string;
    icon: React.ReactNode;
    confidence: ConfidenceLevel;
    reasoning: string;
    hazardType: string;
    severity: SeverityLevel;
}

const MiniMap = ({ lat, lng }: { lat: number; lng: number }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
  
    useEffect(() => {
      if (mapRef.current && !mapInstanceRef.current) {
          const map = L.map(mapRef.current, {
              center: [lat, lng],
              zoom: 15,
              zoomControl: false,
              attributionControl: false,
              dragging: false, // Static mini map feel
              scrollWheelZoom: false,
              doubleClickZoom: false
          });
  
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);
  
          const icon = L.divIcon({
              className: 'custom-pin',
              html: `<div style="background-color: #059669; width: 1.5rem; height: 1.5rem; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"></div>`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
          });
  
          L.marker([lat, lng], { icon }).addTo(map);
          mapInstanceRef.current = map;
      } else if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([lat, lng], 15);
          mapInstanceRef.current.eachLayer((layer) => {
             if (layer instanceof L.Marker) {
                 mapInstanceRef.current?.removeLayer(layer);
             }
          });
          const icon = L.divIcon({
              className: 'custom-pin',
              html: `<div style="background-color: #059669; width: 1.5rem; height: 1.5rem; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"></div>`,
              iconSize: [24, 24],
              iconAnchor: [12, 12]
          });
          L.marker([lat, lng], { icon }).addTo(mapInstanceRef.current);
      }
  
      return () => {
          if (mapInstanceRef.current) {
              mapInstanceRef.current.remove();
              mapInstanceRef.current = null;
          }
      };
    }, [lat, lng]);
  
    return <div ref={mapRef} className="h-full w-full z-0" />;
};

const CitizenApp: React.FC<CitizenAppProps> = ({ onBack }) => {
  const [step, setStep] = useState<ReportStep>('home');
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [severity, setSeverity] = useState<SeverityLevel>('Low');
  const [description, setDescription] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-location on details step
  useEffect(() => {
    if (step === 'details') {
      setLocating(true);
      setLocationError(null);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            setLocating(false);
          },
          (error) => {
            console.error("Error getting location", error);
            setLocationError("Location access denied.");
            setLocation(null);
            setLocating(false);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else {
        setLocationError("Geolocation not supported.");
        setLocating(false);
      }
    }
  }, [step]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        analyzeImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64Image: string) => {
    setStep('details');
    setAnalyzing(true);
    setAiResult(null);
    setDescription("");

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const base64Data = base64Image.split(',')[1];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: 'image/jpeg',
                            data: base64Data
                        }
                    },
                    {
                        text: `Analyze this image for environmental hazards in a city context. 
                        Classify the hazard into one of these specific types:
                        - Waste: "litter", "illegal_dumping", "bin_overflow"
                        - Water: "flood", "stagnant_water", "water_pollution"
                        - Nature: "vegetation_overgrowth", "fallen_tree", "soil_erosion"
                        - Infrastructure: "pothole", "broken_streetlight", "vandalism", "damaged_signage"
                        - Other: "fire_hazard", "air_pollution", "other"

                        Identify the main hazard.
                        Determine the severity (Low, Medium, High).
                        Write a concise 2-sentence description suitable for an official report.
                        Assess your confidence level (High, Medium, Low).
                        Provide a brief 1-sentence reasoning for your classification.
                        
                        Return JSON with keys: title, description, severity, hazardType (enum value), confidence, reasoning.`
                    }
                ]
            },
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        severity: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
                        hazardType: { 
                            type: Type.STRING, 
                            enum: [
                                "litter", "illegal_dumping", "bin_overflow",
                                "flood", "stagnant_water", "water_pollution",
                                "vegetation_overgrowth", "fallen_tree", "soil_erosion",
                                "pothole", "broken_streetlight", "vandalism", "damaged_signage",
                                "fire_hazard", "air_pollution", "other"
                            ] 
                        },
                        confidence: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                        reasoning: { type: Type.STRING }
                    },
                    required: ["title", "description", "severity", "hazardType", "confidence", "reasoning"]
                }
            }
        });

        const resultText = response.text;
        if (resultText) {
            const data = JSON.parse(resultText);
            
            // Map specific hazard types to appropriate icons and colors
            let icon = <AlertTriangle className="text-slate-500" size={32} />;
            
            // Waste Categories
            if (['litter', 'bin_overflow'].includes(data.hazardType)) {
                icon = <Trash2 className="text-orange-500" size={32} />;
            } else if (data.hazardType === 'illegal_dumping') {
                icon = <Ban className="text-red-600" size={32} />;
            } 
            // Water Categories
            else if (data.hazardType === 'flood') {
                icon = <Waves className="text-blue-600" size={32} />;
            } else if (data.hazardType === 'stagnant_water') {
                icon = <Droplets className="text-teal-600" size={32} />;
            } else if (data.hazardType === 'water_pollution') {
                icon = <AlertTriangle className="text-teal-700" size={32} />;
            }
            // Nature Categories
            else if (data.hazardType === 'vegetation_overgrowth') {
                icon = <Leaf className="text-emerald-500" size={32} />;
            } else if (data.hazardType === 'fallen_tree') {
                icon = <Trees className="text-emerald-700" size={32} />;
            } else if (data.hazardType === 'soil_erosion') {
                icon = <Mountain className="text-amber-700" size={32} />;
            }
            // Infrastructure Categories
            else if (data.hazardType === 'pothole') {
                icon = <Construction className="text-amber-600" size={32} />;
            } else if (data.hazardType === 'broken_streetlight') {
                icon = <LightbulbOff className="text-slate-600" size={32} />;
            } else if (data.hazardType === 'vandalism') {
                icon = <SprayCan className="text-purple-600" size={32} />;
            } else if (data.hazardType === 'damaged_signage') {
                icon = <Signpost className="text-amber-500" size={32} />;
            }
            // Other Categories
            else if (data.hazardType === 'fire_hazard') {
                icon = <Flame className="text-red-600" size={32} />;
            } else if (data.hazardType === 'air_pollution') {
                icon = <Wind className="text-gray-500" size={32} />;
            } else {
                icon = <HelpCircle className="text-slate-400" size={32} />;
            }
            
            setAiResult({
                title: data.title,
                icon: icon,
                confidence: data.confidence as ConfidenceLevel,
                reasoning: data.reasoning,
                hazardType: data.hazardType,
                severity: data.severity as SeverityLevel
            });
            setDescription(data.description);
            setSeverity(data.severity as SeverityLevel);
        } else {
             throw new Error("No response from AI");
        }

    } catch (error) {
        console.error("AI Analysis failed:", error);
        setAiResult({ 
            title: "Manual Review Required", 
            icon: <Info className="text-slate-500" size={32} />,
            confidence: 'Low',
            reasoning: "AI could not process the image.",
            hazardType: 'other',
            severity: 'Medium'
        });
        setDescription("Could not automatically analyze the image. Please provide details manually.");
        setSeverity('Medium');
    } finally {
        setAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const resetForm = () => {
    setImage(null);
    setAiResult(null);
    setLocation(null);
    setSeverity('Low');
    setDescription('');
    setStep('home');
  };

  const getSeverityStyles = (level: SeverityLevel) => {
    const isSelected = severity === level;
    if (level === 'Low') {
        return isSelected 
            ? 'bg-yellow-50 text-yellow-700 border-yellow-200 ring-1 ring-yellow-400' 
            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50';
    }
    if (level === 'Medium') {
        return isSelected 
            ? 'bg-orange-50 text-orange-700 border-orange-200 ring-1 ring-orange-400' 
            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50';
    }
    return isSelected 
        ? 'bg-red-50 text-red-700 border-red-200 ring-1 ring-red-400' 
        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50';
  };

  const getConfidenceBadge = (confidence: ConfidenceLevel) => {
      if (confidence === 'High') {
          return (
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full flex items-center border border-emerald-100">
                <Check size={12} className="mr-1.5" /> High Confidence
            </span>
          );
      }
      if (confidence === 'Medium') {
        return (
          <span className="bg-yellow-50 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full flex items-center border border-yellow-100">
              <Info size={12} className="mr-1.5" /> Medium Confidence
          </span>
        );
      }
      return (
        <span className="bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full flex items-center border border-red-100">
            <AlertTriangle size={12} className="mr-1.5" /> Low Confidence
        </span>
      );
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] font-sans text-slate-900 selection:bg-primary selection:text-white relative overflow-hidden">
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] animate-move-pattern"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20zM20 0h20v20H20V0z' fill='%23059669' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
             }}
      ></div>

      {/* Global App Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => step !== 'details' && setStep('home')}>
                <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Leaf size={20} strokeWidth={2.5} />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:inline">
                    EcoGuard <span className="text-primary">Citizen</span>
                </span>
            </div>
            
            <div className="flex items-center gap-4">
                <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors relative text-slate-500">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                    <div className="text-right hidden sm:block leading-tight">
                        <div className="text-sm font-bold text-slate-900">Juan Dela Cruz</div>
                        <div className="text-xs text-slate-500 font-medium">Naga City</div>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 border border-white rounded-full flex items-center justify-center text-emerald-700 shadow-sm">
                        <User size={18} />
                    </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onBack} className="ml-2 hidden sm:flex">
                    <LogOut size={16} className="mr-2" />
                    Exit
                </Button>
            </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* VIEW: HOME DASHBOARD */}
        {step === 'home' && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back, Juan 👋</h1>
                <p className="text-slate-500 text-lg">Your contributions are making Naga City cleaner.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Action Card */}
                <div className="lg:col-span-2">
                    <div 
                        className="bg-gradient-to-br from-secondary to-primary rounded-[2rem] p-8 sm:p-12 text-white shadow-2xl shadow-emerald-900/10 relative overflow-hidden group cursor-pointer transition-all hover:scale-[1.01]"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {/* Decorative pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        
                        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-8">
                            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-inner border border-white/10">
                                <Camera size={40} strokeWidth={1.5} />
                            </div>
                            <div className="flex-1">
                                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-100 text-xs font-bold mb-4 border border-emerald-500/20">
                                    AI-Powered
                                </div>
                                <h2 className="text-3xl font-bold mb-3">Report Hazard</h2>
                                <p className="text-emerald-100 text-lg mb-8 max-w-lg leading-relaxed">
                                    Spotted a problem? Snap a photo. Our AI identifies the issue and notifies the LGU instantly.
                                </p>
                                <div className="inline-flex items-center bg-white text-primary px-8 py-4 rounded-full font-bold text-sm shadow-lg hover:bg-emerald-50 transition-colors">
                                    Open Camera <Camera size={18} className="ml-2" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid sm:grid-cols-3 gap-6 mt-8">
                         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card flex items-center gap-4">
                             <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                                 <Check size={24} />
                             </div>
                             <div>
                                 <div className="text-2xl font-bold text-slate-900">12</div>
                                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Resolved</div>
                             </div>
                         </div>
                         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card flex items-center gap-4">
                             <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                                 <Loader2 size={24} />
                             </div>
                             <div>
                                 <div className="text-2xl font-bold text-slate-900">3</div>
                                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Pending</div>
                             </div>
                         </div>
                         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card flex items-center gap-4">
                             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                 <Leaf size={24} />
                             </div>
                             <div>
                                 <div className="text-2xl font-bold text-slate-900">Top 5%</div>
                                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Rank</div>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Sidebar: Recent Activity */}
                <div className="lg:col-span-1 bg-white rounded-[2rem] border border-slate-100 p-6 h-fit shadow-card">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-lg text-slate-900">Recent Activity</h3>
                        <button className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full hover:bg-primary/10 transition-colors">View All</button>
                    </div>
                    
                    <div className="space-y-2 relative">
                        {/* Timeline line */}
                        <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-slate-100"></div>

                        <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors relative">
                            <div className="w-10 h-10 rounded-full bg-white border-4 border-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                                <Check size={16} strokeWidth={3} />
                            </div>
                            <div className="flex-1 min-w-0 pt-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-slate-900 text-sm truncate">Trash Collection</h4>
                                    <span className="text-[10px] text-slate-400 font-medium">2h ago</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-1 truncate">Magsaysay Ave • Resolved</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors relative">
                            <div className="w-10 h-10 rounded-full bg-white border-4 border-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                                <Loader2 size={16} strokeWidth={3} />
                            </div>
                            <div className="flex-1 min-w-0 pt-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-slate-900 text-sm truncate">Clogged Drainage</h4>
                                    <span className="text-[10px] text-slate-400 font-medium">1d ago</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-1 truncate">Panganiban Dr • Reviewing</p>
                            </div>
                        </div>

                         <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors relative">
                            <div className="w-10 h-10 rounded-full bg-white border-4 border-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                                <Check size={16} strokeWidth={3} />
                            </div>
                            <div className="flex-1 min-w-0 pt-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-slate-900 text-sm truncate">Minor Flooding</h4>
                                    <span className="text-[10px] text-slate-400 font-medium">2d ago</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-1 truncate">Rizal Park • Resolved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}
      </main>

      {/* FULL SCREEN VIEW: REPORT DETAILS */}
      {step === 'details' && (
        <div className="fixed inset-0 z-50 bg-[#F8FAF9] flex flex-col lg:flex-row animate-in slide-in-from-bottom-5 duration-500">
            
            {/* LEFT COLUMN: Image & Analysis Overlay */}
            <div className="relative h-[40%] lg:h-full lg:w-7/12 flex-shrink-0 bg-slate-900 overflow-hidden">
                {image && (
                    <img src={image} alt="Report Preview" className="w-full h-full object-cover opacity-80 transition-transform duration-[2000ms] hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 lg:bg-gradient-to-r lg:from-black/10 lg:to-black/90"></div>
                
                {/* Header Actions (Mobile Only) */}
                <div className="absolute top-0 left-0 right-0 p-4 pt-6 flex justify-between items-center z-20 lg:hidden">
                    <button 
                        onClick={() => setStep('home')}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30"
                    >
                        <ArrowLeft size={20} />
                    </button>
                </div>

                {/* Analysis Loading State */}
                {analyzing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md text-white z-30">
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-50"></div>
                            <div className="relative bg-white rounded-full p-6 shadow-2xl">
                                <Loader2 size={48} className="animate-spin text-primary" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold mt-8 tracking-tight">Analyzing Scene...</h3>
                        <p className="text-lg text-emerald-100 mt-2 font-medium">Identifying environmental hazards</p>
                    </div>
                )}

                {/* Image Info (Desktop Only) */}
                {!analyzing && (
                    <div className="hidden lg:block absolute bottom-16 left-16 text-white z-20 max-w-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-emerald-500/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/30 flex items-center text-emerald-100">
                                <Check size={14} className="mr-2" /> AI Analysis Complete
                            </div>
                            {location && (
                                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/20 text-white">
                                    GPS Locked
                                </div>
                            )}
                        </div>
                        <h2 className="text-5xl font-bold mb-6 tracking-tight leading-tight">Evidence <br/> Captured</h2>
                        <p className="text-white/80 text-xl leading-relaxed font-light">
                            Our system has automatically detected potential hazards. Please review the details on the right panel.
                        </p>
                    </div>
                )}
            </div>

            {/* RIGHT COLUMN: Form */}
            <form onSubmit={handleSubmit} className="flex-1 relative z-10 flex flex-col lg:w-5/12 bg-white h-full shadow-2xl shadow-black/20">
                
                {/* Desktop Header */}
                <div className="hidden lg:flex items-center justify-between px-10 py-8 border-b border-slate-50 bg-white">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Report Details</h2>
                        <p className="text-sm text-slate-400 font-medium mt-1">Review AI generated information</p>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setStep('home')} 
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-6 lg:px-10 pb-32 pt-8 lg:pt-8 space-y-8">
                    
                    {/* Card 1: AI Analysis Result */}
                    <div className={`bg-slate-50/50 rounded-3xl border p-8 transition-shadow relative overflow-hidden ${
                        aiResult?.confidence === 'Low' ? 'border-orange-200 ring-4 ring-orange-50' : 'border-slate-100'
                    }`}>
                        {aiResult?.confidence === 'Low' && (
                            <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-xs font-bold px-4 py-1 text-center">
                                Low Confidence - Please Verify
                            </div>
                        )}
                        <div className="flex justify-between items-start mb-6 mt-2">
                                <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                                AI Detected Issue
                                </div>
                                {!analyzing && aiResult && getConfidenceBadge(aiResult.confidence)}
                        </div>
                        <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center flex-shrink-0 text-slate-600 shadow-sm">
                                {analyzing ? <div className="w-6 h-6 bg-slate-200 rounded-full animate-pulse"></div> : (aiResult?.icon || <AlertTriangle size={32} />)}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-2">
                                        {analyzing ? "Processing..." : (aiResult?.title || "Unknown")}
                                    </h2>
                                    {!analyzing && aiResult?.reasoning && (
                                        <div className={`mt-4 rounded-xl p-4 text-sm leading-relaxed ${
                                            aiResult.confidence === 'Low' 
                                                ? 'bg-orange-50 border border-orange-100 text-orange-900' 
                                                : 'bg-slate-50 border border-slate-100 text-slate-600'
                                        }`}>
                                            <div className="flex gap-2">
                                                <Info size={16} className={`flex-shrink-0 mt-0.5 ${
                                                    aiResult.confidence === 'Low' ? 'text-orange-600' : 'text-slate-400'
                                                }`} />
                                                <div>
                                                    <span className="font-semibold block mb-1">
                                                        {aiResult.confidence === 'Low' ? 'Analysis Note:' : 'AI Reasoning:'}
                                                    </span>
                                                    {aiResult.reasoning}
                                                </div>
                                            </div>
                                            
                                            {aiResult.confidence === 'Low' && (
                                                <div className="mt-3 pt-3 border-t border-orange-200/60 flex items-start gap-2">
                                                    <HelpCircle size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                                                    <p className="font-medium text-orange-800">
                                                        Confidence is low. Please manually verify the <strong>Hazard Type</strong> and <strong>Severity</strong> below.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                        </div>
                    </div>

                    {/* Card 2: Severity */}
                    <div>
                        <label className="text-sm font-bold text-slate-900 mb-4 block uppercase tracking-wider text-xs">
                            Severity Level
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            {(['Low', 'Medium', 'High'] as SeverityLevel[]).map((level) => {
                                const isAiRecommended = aiResult?.severity === level;
                                return (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setSeverity(level)}
                                    className={`py-4 px-2 rounded-2xl text-sm font-bold border transition-all duration-200 flex flex-col items-center justify-center gap-2 relative ${getSeverityStyles(level)}`}
                                >
                                    {isAiRecommended && (
                                        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shadow-sm z-10 whitespace-nowrap">
                                            AI Choice
                                        </span>
                                    )}
                                    <div className={`w-3 h-3 rounded-full ${
                                        level === 'Low' ? 'bg-yellow-400' : level === 'Medium' ? 'bg-orange-500' : 'bg-red-500'
                                    }`}></div>
                                    {level}
                                </button>
                            )})}
                        </div>
                    </div>

                    {/* Card 3: Location */}
                    <div>
                        <label className="text-sm font-bold text-slate-900 mb-4 block uppercase tracking-wider text-xs">
                            Location
                        </label>
                        <div className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden relative group">
                                <div className="h-48 bg-slate-200 relative">
                                    {location ? (
                                        <MiniMap lat={location.lat} lng={location.lng} />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                            {locating ? <Loader2 className="animate-spin" /> : <MapPin className="opacity-20" size={32} />}
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex items-center justify-between bg-white/80 backdrop-blur-sm border-t border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-800">
                                                {locating ? "Pinpointing..." : (location ? "Lat: " + location.lat.toFixed(4) : "No GPS")}
                                            </div>
                                            <div className="text-xs text-slate-500 font-medium">
                                                {location ? "Lng: " + location.lng.toFixed(4) : "Tap to retry"}
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" className="text-xs font-bold text-primary bg-primary/5 px-4 py-2 rounded-full hover:bg-primary/10 transition-colors">
                                        Edit
                                    </button>
                                </div>
                        </div>
                    </div>

                    {/* Card 4: Description */}
                    <div>
                        <label className="text-sm font-bold text-slate-900 mb-4 flex items-center justify-between uppercase tracking-wider text-xs">
                            Description
                            <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-1 rounded-md">Editable</span>
                        </label>
                        <textarea 
                            className="w-full bg-slate-50/50 border border-slate-200 rounded-3xl p-6 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all resize-none leading-relaxed text-slate-700 placeholder:text-slate-400 hover:bg-white"
                            rows={4}
                            placeholder="Add details to help the response team..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                {/* Sticky Bottom Action Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-white border-t border-slate-50 z-20">
                    <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-full h-16 text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={analyzing || locating || !location}
                        type="submit"
                    >
                        {analyzing ? "Analyzing Scene..." : "Submit Report"}
                    </Button>
                </div>
            </form>
        </div>
      )}

      {/* FULL SCREEN VIEW: SUCCESS */}
      {step === 'success' && (
        <div className="fixed inset-0 z-50 bg-[#F8FAF9] flex flex-col items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="max-w-md w-full text-center">
                <div className="relative mb-10 mx-auto w-32 h-32">
                    <div className="absolute inset-0 bg-emerald-200 rounded-full animate-ping opacity-20 duration-1000"></div>
                    <div className="absolute inset-8 bg-emerald-300 rounded-full animate-ping opacity-40 delay-150 duration-1000"></div>
                    <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary/40 relative z-10">
                        <Check size={56} strokeWidth={4} />
                    </div>
                </div>
                
                <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Report Submitted!</h2>
                <p className="text-slate-500 mb-12 text-lg leading-relaxed px-4">
                    Thank you, Juan. Your report has been verified and sent to the Naga City response team.
                </p>
                
                <div className="bg-white rounded-3xl p-8 border border-slate-100 mb-10 text-left shadow-card">
                     <div className="flex justify-between items-center mb-4">
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reference ID</span>
                         <span className="font-mono text-sm font-bold text-slate-900">#TR-{Math.floor(Math.random()*10000)}</span>
                     </div>
                     <div className="h-px bg-slate-50 w-full mb-4"></div>
                     <div className="flex justify-between items-center">
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Est. Response</span>
                         <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">~24 Hours</span>
                     </div>
                </div>
                
                <div className="space-y-4">
                    <Button variant="primary" className="w-full py-4 text-lg h-16 rounded-2xl shadow-lg shadow-primary/20" onClick={resetForm}>
                        Submit Another Report
                    </Button>
                    <button 
                        onClick={onBack}
                        className="w-full py-4 text-slate-400 hover:text-slate-600 font-bold transition-colors text-sm uppercase tracking-wide"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileChange}
      />
    </div>
  );
};

export default CitizenApp;