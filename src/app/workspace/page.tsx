'use client';

import { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Center, Environment } from '@react-three/drei';
import { OBJLoader } from 'three-stdlib';
import * as THREE from 'three';

function MaleMannequin3D() {
  const obj = useLoader(OBJLoader, '/FinalBaseMesh.obj');
  
  const model = useMemo(() => {
    const cloned = obj.clone();
    cloned.traverse((child: any) => {
      if (child.isMesh) {
        // Apply a premium studio clay material
        child.material = new THREE.MeshStandardMaterial({ 
          color: 0xf5f5f5,
          roughness: 0.6,
          metalness: 0.1,
          side: THREE.DoubleSide
        });
      }
    });
    // Adjust rotation if needed (sometimes OBJs are lying down)
    // cloned.rotation.x = -Math.PI / 2;
    return cloned;
  }, [obj]);

  // The base scale. The <Center> component will try to normalize the position.
  return <primitive object={model} scale={1} />;
}

function ScreenshotCapturer() {
  const { gl, scene, camera } = useThree();
  
  useEffect(() => {
    const handleCapture = (e: any) => {
      // Force a manual render right before capture to prevent black/empty buffers
      gl.render(scene, camera);
      const dataUrl = gl.domElement.toDataURL('image/jpeg', 1.0);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'fittly-3d-render.jpg';
      a.click();
      
      // Prevent multiple downloads if multiple canvases are mounted
      e.stopImmediatePropagation();
    };
    
    window.addEventListener('capture-3d', handleCapture);
    return () => window.removeEventListener('capture-3d', handleCapture);
  }, [gl, scene, camera]);
  
  return null;
}

export default function FittlyWorkspace() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [workspaceStep, setWorkspaceStep] = useState<'select-mode' | 'take-selfie' | 'prompt'>('select-mode');
  const [selectedModelType, setSelectedModelType] = useState<'mannequin' | 'own' | null>(null);
  const [mannequinGender, setMannequinGender] = useState<'female' | 'male'>('female');
  const [hasSelectedGender, setHasSelectedGender] = useState(false);
  const [showGarmentModal, setShowGarmentModal] = useState(false);
  
  // New states for tools
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };
  
  const handleDownload = async () => {
    try {
      showToast('Preparing download...');
      
      // If 3D Canvas is active
      if (selectedModelType === 'mannequin' && mannequinGender === 'male') {
        // Dispatch event to the ScreenshotCapturer inside the Canvas
        window.dispatchEvent(new CustomEvent('capture-3d'));
        showToast('3D Render downloaded successfully!');
        return;
      }
      
      // If 2D Image is active
      let imageUrl = '';
      if (selectedModelType === 'mannequin' && mannequinGender === 'female') {
        imageUrl = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop";
      } else if (selectedModelType === 'own') {
        imageUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop";
      }
      
      if (imageUrl) {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fittly-preview.jpg';
        a.click();
        window.URL.revokeObjectURL(url);
        showToast('Image downloaded as JPG!');
      }
    } catch (error) {
      console.error("Download failed:", error);
      showToast('Download failed. Please try again.');
    }
  };
  
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    // Initialize states
    v1.style.zIndex = '1';
    v1.style.opacity = '1';
    v1.style.transition = 'none';
    
    v2.style.zIndex = '0';
    v2.style.opacity = '0';
    v2.style.transition = 'none';

    // Start with video 1 playing
    v1.play().catch(e => console.log("Autoplay blocked:", e));

    let isFading = false;

    const handleTimeUpdate = (e: Event) => {
      const current = e.target as HTMLVideoElement;
      const other = current === v1 ? v2 : v1;
      
      if (!current.duration) return;
      const timeLeft = current.duration - current.currentTime;
      
      // Start crossfade 1.5 seconds before the video ends
      if (timeLeft <= 1.5 && !isFading) {
        isFading = true; // Lock so we don't trigger multiple times
        
        // 1. Put the incoming video BEHIND, fully opaque, and start playing
        other.style.transition = 'none';
        other.style.zIndex = '0';
        other.style.opacity = '1';
        other.currentTime = 0;
        other.play().catch(e => console.log("Play interrupted:", e));
        
        // 2. Put the outgoing video in FRONT, and fade it out
        current.style.zIndex = '1';
        current.style.transition = 'opacity 1.5s ease-in-out';
        current.style.opacity = '0';
      }
    };

    const handleEnded = (e: Event) => {
      const current = e.target as HTMLVideoElement;
      current.pause(); 
      isFading = false; // Release lock for the next cycle
    };

    v1.addEventListener("timeupdate", handleTimeUpdate);
    v2.addEventListener("timeupdate", handleTimeUpdate);
    v1.addEventListener("ended", handleEnded);
    v2.addEventListener("ended", handleEnded);

    return () => {
      v1.removeEventListener("timeupdate", handleTimeUpdate);
      v2.removeEventListener("timeupdate", handleTimeUpdate);
      v1.removeEventListener("ended", handleEnded);
      v2.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="bg-[#f8f8f8] text-black font-['Noto_Sans',sans-serif] antialiased relative min-h-screen selection:bg-black/10">
      {/* Video Background Container */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[115%] h-[115%] z-0 pointer-events-none overflow-hidden flex items-start justify-center bg-[#f8f8f8]">
        {/* Video 1 */}
        <video 
          ref={video1Ref}
          muted 
          playsInline 
          className="absolute w-full h-full object-cover object-top blur-[8px] scale-105" 
          style={{ minWidth: '100%', minHeight: '100%', opacity: 1 }}
        >
          <source src="/bg-tropical.mp4" type="video/mp4" />
        </video>
        
        {/* Video 2 (For Crossfading) */}
        <video 
          ref={video2Ref}
          muted 
          playsInline 
          className="absolute w-full h-full object-cover object-top blur-[8px] scale-105" 
          style={{ minWidth: '100%', minHeight: '100%', opacity: 0 }}
        >
          <source src="/bg-tropical.mp4" type="video/mp4" />
        </video>

        {/* Soft light overlay to make text more readable */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
      </div>

      {/* Main Wrapper overlaying the video */}
      <div className="relative z-10 w-full min-h-screen flex">
        
        {/* Floating Toggle Button (Visible when sidebar is closed) */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className={`fixed top-8 left-8 z-50 p-3.5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg shadow-black/5 rounded-2xl text-zinc-600 hover:text-blue-600 hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95 ${isSidebarOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}`}
        >
          <Icon icon="solar:hamburger-menu-bold-duotone" className="text-2xl" />
        </button>

        {/* Sidebar Wrapper */}
        <div className={`hidden md:block sticky top-0 h-screen transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${isSidebarOpen ? 'w-[312px] opacity-100' : 'w-0 opacity-0'}`}>
          <aside className="m-4 flex flex-col h-[calc(100vh-32px)] bg-white/80 backdrop-blur-3xl border border-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[2.5rem] py-8 px-4 justify-between w-[280px]">
            <div>
              {/* Header & Toggle */}
              <div className="font-['Schibsted_Grotesk'] font-bold text-xl tracking-tighter select-none mb-12 flex items-center justify-between px-2 text-black">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
                    <span className="text-white text-base font-black">F</span>
                  </div>
                  <span className="whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600">Fittly Studio</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-zinc-100 rounded-xl transition-all active:scale-95 text-zinc-400 hover:text-zinc-900 shrink-0">
                  <Icon icon="solar:round-alt-arrow-left-bold-duotone" className="text-2xl" />
                </button>
              </div>

              {/* Menu Links */}
              <nav className="flex flex-col gap-3 font-['Schibsted_Grotesk'] font-medium text-sm text-zinc-500 relative">
                
                {/* Active Menu Item */}
                <Link href="#" className="flex items-center px-4 py-3.5 bg-blue-600 text-white rounded-2xl transition-all shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 group">
                  <Icon icon="solar:magic-stick-3-bold-duotone" className="text-2xl shrink-0" />
                  <span className="ml-3 whitespace-nowrap font-semibold">New Try-On</span>
                </Link>

                <Link href="#" className="flex items-center px-4 py-3.5 hover:bg-zinc-100 hover:text-zinc-900 rounded-2xl transition-all group">
                  <Icon icon="solar:gallery-bold-duotone" className="text-2xl shrink-0 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                  <span className="ml-3 whitespace-nowrap">My Collection</span>
                </Link>
                
                <Link href="#" className="flex items-center px-4 py-3.5 hover:bg-zinc-100 hover:text-zinc-900 rounded-2xl transition-all group">
                  <Icon icon="solar:hanger-2-bold-duotone" className="text-2xl shrink-0 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                  <span className="ml-3 whitespace-nowrap">Garments</span>
                </Link>

                <div className="w-full h-px bg-zinc-200/60 my-2"></div>
                
                <Link href="#" className="flex items-center px-4 py-3.5 hover:bg-zinc-100 hover:text-zinc-900 rounded-2xl transition-all group">
                  <Icon icon="solar:settings-bold-duotone" className="text-2xl shrink-0 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                  <span className="ml-3 whitespace-nowrap">Settings</span>
                </Link>
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-4 font-['Schibsted_Grotesk']">
              <Link href="/" className="flex items-center px-4 py-3.5 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 rounded-2xl transition-all text-sm font-medium group">
                <Icon icon="solar:home-angle-bold-duotone" className="text-2xl shrink-0 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                <span className="ml-3 whitespace-nowrap">Back to Home</span>
              </Link>
              
              <div className="w-full p-2 bg-white rounded-[1.25rem] border border-zinc-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center gap-3 px-3 transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5 duration-300">
                <div className="w-10 h-10 bg-gradient-to-tr from-purple-100 to-blue-100 rounded-xl overflow-hidden shrink-0 border border-white shadow-inner flex items-center justify-center p-0.5">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=transparent" alt="Avatar" className="w-full h-full object-cover bg-white rounded-lg" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold text-zinc-800 truncate">Jane Fashion</span>
                  <span className="text-[10px] uppercase tracking-wider text-blue-600 font-black">Pro Plan</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 h-screen overflow-y-auto flex flex-col items-center px-4 py-16 z-20 relative">
          
          {workspaceStep === 'select-mode' ? (
            <div className="flex flex-col items-center justify-center w-full max-w-4xl h-full min-h-[70vh]">
              <div className="flex items-center gap-2 p-1 pr-4 bg-white/80 border border-white rounded-full shadow-sm mb-6 backdrop-blur-md">
                <div className="bg-blue-600 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-['Inter'] font-medium text-xs shadow-inner">
                  <Icon icon="solar:stars-minimalistic-bold" width="16" height="16" />
                  Step 1
                </div>
                <span className="font-['Inter'] font-medium text-sm text-zinc-700">
                  Choose your base model
                </span>
              </div>
              
              <h1 className="font-['Fustat'] font-bold text-4xl md:text-5xl lg:text-6xl text-black text-center mb-4 tracking-tight drop-shadow-sm">
                Who are we fitting today?
              </h1>
              <p className="text-zinc-700 font-medium md:text-lg mb-12 text-center max-w-xl drop-shadow-md bg-white/40 px-6 py-2 rounded-full backdrop-blur-sm border border-white/50">
                Select whether you want to generate try-ons using a standard 3D mannequin or personalize it with your own photo.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                {/* Option 1: 3D Mannequin */}
                <button 
                  onClick={() => {
                    setSelectedModelType('mannequin');
                    setWorkspaceStep('prompt');
                  }}
                  className="group relative flex flex-col items-center text-center p-8 rounded-[2rem] bg-white/70 hover:bg-white/95 backdrop-blur-xl border border-white/60 hover:border-blue-400 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.15)] hover:-translate-y-1"
                >
                  <div className="w-24 h-24 mb-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner border border-blue-100">
                    <Icon icon="solar:accessibility-bold-duotone" className="text-5xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3 font-['Schibsted_Grotesk']">3D Mannequin</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">Use our high-quality default 3D models with perfect proportions and studio lighting.</p>
                </button>

                {/* Option 2: Own Model */}
                <button 
                  onClick={() => {
                    setSelectedModelType('own');
                    setWorkspaceStep('take-selfie');
                  }}
                  className="group relative flex flex-col items-center text-center p-8 rounded-[2rem] bg-white/70 hover:bg-white/95 backdrop-blur-xl border border-white/60 hover:border-purple-400 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)] hover:-translate-y-1"
                >
                  <div className="w-24 h-24 mb-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner border border-purple-100">
                    <Icon icon="solar:user-focus-bold-duotone" className="text-5xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3 font-['Schibsted_Grotesk']">My Own Model</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">Upload a photo of yourself for an ultra-personalized virtual try-on experience.</p>
                </button>
              </div>
            </div>
          ) : workspaceStep === 'take-selfie' ? (
            <div className="flex flex-col items-center w-full max-w-xl animate-in fade-in zoom-in-95 duration-500 mt-2 md:mt-4 pb-8">
              
              {/* Back to selection */}
              <button 
                onClick={() => setWorkspaceStep('select-mode')}
                className="self-start mb-4 flex items-center gap-2 text-zinc-600 hover:text-black bg-white/50 hover:bg-white/80 px-4 py-2 rounded-full backdrop-blur-md transition-all shadow-sm border border-white/40"
              >
                <Icon icon="solar:arrow-left-linear" className="text-lg" />
                <span className="text-sm font-medium">Back</span>
              </button>

              <div className="w-full bg-white/80 backdrop-blur-2xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex flex-col items-center text-center relative overflow-hidden">
                
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="bg-purple-100 text-purple-600 p-2.5 rounded-2xl mb-4 shadow-inner relative z-10 flex shrink-0">
                  <Icon icon="solar:camera-minimalistic-bold-duotone" className="text-3xl" />
                </div>
                
                <h2 className="text-2xl font-bold font-['Fustat'] text-zinc-900 mb-2 relative z-10">
                  Full Body Photo
                </h2>
                <p className="text-zinc-500 text-sm mb-6 max-w-sm relative z-10">
                  Upload a clear, full-body photo of yourself. Wear form-fitting clothes for the best try-on accuracy.
                </p>

                {/* Body Scanner / Camera Area (COMPACT) */}
                <div className="w-[200px] md:w-[240px] h-[280px] md:h-[320px] mx-auto bg-zinc-900 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all duration-500 group mb-6 relative z-10 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-4 border-zinc-800 hover:border-purple-500 shrink-0">
                  
                  {/* Tech Grid Background */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

                  {/* Corner Brackets */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-white/30 rounded-tl-xl group-hover:border-purple-400 group-hover:scale-110 transition-all origin-top-left"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-white/30 rounded-tr-xl group-hover:border-purple-400 group-hover:scale-110 transition-all origin-top-right"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-white/30 rounded-bl-xl group-hover:border-purple-400 group-hover:scale-110 transition-all origin-bottom-left"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-white/30 rounded-br-xl group-hover:border-purple-400 group-hover:scale-110 transition-all origin-bottom-right"></div>

                  {/* Body Silhouette SVG Overlay */}
                  <div className="absolute inset-y-8 inset-x-6 flex items-center justify-center pointer-events-none">
                    <svg className="w-full h-full text-white/20 group-hover:text-purple-400/50 transition-colors duration-700" viewBox="0 0 100 180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" strokeLinecap="round">
                      <path d="M 50,45 C 40,45 35,32 35,22 C 35,12 42,5 50,5 C 58,5 65,12 65,22 C 65,32 60,45 50,45 Z" />
                      <path d="M 25,85 C 25,60 35,55 50,55 C 65,55 75,60 75,85 L 68,175 L 32,175 Z" />
                      <line x1="50" y1="0" x2="50" y2="180" strokeDasharray="2 10" opacity="0.5" />
                    </svg>
                  </div>

                  {/* Scanning Line Animation */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2.5s_ease-in-out_infinite] shadow-[0_0_20px_rgba(168,85,247,1)]"></div>

                  {/* Upload UI Elements */}
                  <div className="relative z-20 flex flex-col items-center bg-black/50 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 group-hover:-translate-y-1 transition-transform">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-purple-500 transition-all">
                      <Icon icon="solar:camera-bold-duotone" className="text-xl text-white" />
                    </div>
                    <span className="font-bold text-white text-sm tracking-wide">Open Camera</span>
                  </div>
                  
                  {/* Instructions */}
                  <div className="absolute bottom-6 left-0 w-full text-center z-20 pointer-events-none">
                    <span className="bg-black/60 backdrop-blur-md text-white/90 text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full font-bold">
                      Align to frame
                    </span>
                  </div>
                </div>

                {/* Privacy Warning (COMPACT) */}
                <div className="w-full bg-emerald-50 border border-emerald-100/50 rounded-xl p-3 flex items-center justify-center gap-2 text-center mb-6 relative z-10 shadow-sm">
                  <Icon icon="solar:shield-check-bold-duotone" className="text-xl text-emerald-500 shrink-0" />
                  <p className="text-xs text-emerald-800 font-medium">
                    100% secure. Processed instantly and never stored or shared.
                  </p>
                </div>

                {/* Proceed Button */}
                <button 
                  onClick={() => setWorkspaceStep('prompt')}
                  className="w-full py-3.5 bg-zinc-900 hover:bg-black text-white rounded-xl font-bold tracking-wide transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 relative z-10"
                >
                  Continue to Studio
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10 items-center lg:items-stretch animate-in fade-in slide-in-from-bottom-4 duration-500 mt-4 lg:mt-0 pt-8 lg:h-[calc(100vh-120px)]">
              {/* Back Button (Floating Top Right) */}
              <button 
                onClick={() => setWorkspaceStep('select-mode')}
                className="fixed top-6 right-6 z-50 flex items-center gap-2 text-zinc-600 hover:text-black bg-white/80 hover:bg-white px-5 py-3 rounded-2xl backdrop-blur-xl transition-all shadow-lg shadow-black/5 border border-white/50 hover:scale-105 active:scale-95 group"
              >
                <Icon icon="solar:user-id-bold-duotone" className="text-2xl text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold font-['Schibsted_Grotesk']">Change Model</span>
              </button>

              {/* Left Side: Prompt Area */}
              <div className="flex-1 flex flex-col items-start w-full justify-center lg:py-8">
                {/* Badge Component */}
                <div className="flex items-center gap-2 p-1 pr-4 bg-white/60 border border-white/60 rounded-full shadow-sm mb-6 backdrop-blur-sm">
                  <div className="bg-blue-600 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-['Inter'] font-medium text-xs shadow-inner">
                    <Icon icon="solar:stars-minimalistic-bold" width="16" height="16" className="text-white" />
                    Fittly AI 2.0
                  </div>
                  <span className="font-['Inter'] font-medium text-sm text-zinc-800">
                    Generate ultra-realistic try-ons
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="font-['Fustat'] font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-black leading-none mb-4 max-w-2xl drop-shadow-sm text-left">
                  Virtual Try-On Studio
                </h1>

                {/* Subtitle */}
                <p className="font-['Fustat'] font-medium text-base lg:text-lg text-zinc-700 w-full max-w-2xl mb-8 leading-relaxed bg-white/40 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                  Describe how you want to wear it or upload your garment image to generate a realistic virtual try-on in seconds.
                </p>

                {/* Search Input Box */}
                <div className="w-full max-w-3xl h-[180px] lg:h-[200px] bg-zinc-900/40 backdrop-blur-2xl rounded-[1.5rem] p-3 flex flex-col justify-between shadow-[0_16px_40px_rgba(0,0,0,0.2)] border border-white/10 relative z-20">
                  
                  {/* Top Row: Credit info */}
                  <div className="flex justify-between items-center px-3 pt-2 pb-2 font-['Schibsted_Grotesk'] font-medium text-xs text-white/90">
                    <div className="flex items-center gap-3">
                      <span>25/100 AI Sessions</span>
                      <button className="bg-blue-500/20 text-blue-200 border border-blue-500/30 px-3 py-1 rounded-lg flex items-center hover:bg-blue-500 hover:text-white transition-all duration-300">
                        Upgrade Plan
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-80">
                      <Icon icon="solar:stars-minimalistic-linear" width="18" height="18" />
                      Powered by Fittly AI
                    </div>
                  </div>

                  {/* Main Input Area (White Container) */}
                  <div className="bg-white flex-1 rounded-[1.25rem] shadow-inner p-3 lg:p-4 flex flex-col justify-between relative overflow-hidden group">
                    
                    <div className="flex items-start justify-between gap-4 h-full">
                      <textarea className="w-full h-full resize-none outline-none font-['Schibsted_Grotesk'] font-normal text-sm lg:text-base placeholder-zinc-400 text-zinc-800 bg-transparent" placeholder="e.g. 'Put this leather jacket over a white t-shirt and blue jeans...'"></textarea>
                      
                      <button className="w-10 h-10 lg:w-12 lg:h-12 shrink-0 bg-blue-600 rounded-xl lg:rounded-2xl flex items-center justify-center text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 self-end md:self-start group-focus-within:bg-blue-700 group-focus-within:shadow-lg group-focus-within:shadow-blue-600/30">
                        <Icon icon="solar:arrow-up-linear" className="text-xl lg:text-2xl" strokeWidth="2" />
                      </button>
                    </div>

                    {/* Bottom Row: Actions & Counter */}
                    <div className="flex justify-between items-end w-full pt-2 lg:pt-3">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setShowGarmentModal(true)}
                          className="bg-zinc-50 text-zinc-600 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-xl px-3 py-1.5 lg:px-3.5 lg:py-2 flex items-center gap-1.5 lg:gap-2 font-['Schibsted_Grotesk'] font-medium text-xs shadow-sm border border-zinc-200 hover:border-blue-200"
                        >
                          <Icon icon="solar:hanger-bold-duotone" className="text-base lg:text-lg" />
                          Upload Garment
                        </button>
                        <button className="hidden sm:flex bg-zinc-50 text-zinc-600 hover:bg-purple-50 hover:text-purple-600 transition-colors rounded-xl px-3 py-1.5 lg:px-3.5 lg:py-2 items-center gap-1.5 lg:gap-2 font-['Schibsted_Grotesk'] font-medium text-xs shadow-sm border border-zinc-200 hover:border-purple-200">
                          <Icon icon="solar:magic-stick-3-bold-duotone" className="text-base lg:text-lg" />
                          Styles
                        </button>
                      </div>
                      <div className="text-xs text-zinc-400 font-['Schibsted_Grotesk'] font-medium pb-1 pr-1">
                        0/3,000
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Model Preview */}
              <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 flex flex-col relative z-10 h-full max-h-[800px]">
                <div className="h-full bg-white/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden group">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 mb-3 bg-white/50 rounded-3xl shrink-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedModelType === 'mannequin' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                        <Icon icon={selectedModelType === 'mannequin' ? 'solar:accessibility-bold-duotone' : 'solar:user-focus-bold-duotone'} className="text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 text-sm">Active Model</h4>
                        <p className="text-xs text-zinc-500 font-medium">
                          {selectedModelType === 'mannequin' ? 'Standard 3D Mannequin' : 'My Uploaded Photo'}
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1 shrink-0">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                      Ready
                    </div>
                  </div>

                  {/* Preview Image Frame */}
                  <div className="relative flex-1 w-full bg-zinc-100 rounded-[2rem] overflow-hidden border border-black/5 shadow-inner min-h-0">
                    
                    {/* Gender Toggle Overlay for Mannequin (Shows only once) */}
                    {selectedModelType === 'mannequin' && !hasSelectedGender && (
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex bg-white/60 backdrop-blur-xl p-1 rounded-[14px] border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all animate-in slide-in-from-top-4">
                        <button 
                          onClick={() => {
                            setMannequinGender('female');
                            setHasSelectedGender(true);
                          }}
                          className={`flex items-center gap-1.5 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${mannequinGender === 'female' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-zinc-600 hover:text-black hover:bg-white/50'}`}
                        >
                          <Icon icon="solar:user-rounded-bold-duotone" className="text-sm" />
                          Female
                        </button>
                        <button 
                          onClick={() => {
                            setMannequinGender('male');
                            setHasSelectedGender(true);
                          }}
                          className={`flex items-center gap-1.5 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${mannequinGender === 'male' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'text-zinc-600 hover:text-black hover:bg-white/50'}`}
                        >
                          <Icon icon="solar:user-bold-duotone" className="text-sm" />
                          Male
                        </button>
                      </div>
                    )}

                    {selectedModelType === 'mannequin' ? (
                      mannequinGender === 'male' ? (
                        <div className="w-full h-full bg-[#f5efe6] flex items-center justify-center relative group animate-in fade-in zoom-in-95 duration-700">
                          <Suspense fallback={
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#a89f91]">
                              <Icon icon="solar:cpu-bolt-bold-duotone" className="text-3xl animate-bounce text-[#d4c5b0]" />
                              <span className="font-bold text-xs uppercase tracking-widest animate-pulse">Loading 3D Model...</span>
                            </div>
                          }>
                            <Canvas 
                              gl={{ preserveDrawingBuffer: true, antialias: true }} 
                              camera={{ position: [0, 0, 10], fov: 45 }}
                              onCreated={({ scene }) => { scene.background = new THREE.Color('#f5efe6') }}
                            >
                              <ambientLight intensity={0.7} />
                              <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
                              <directionalLight position={[-5, 5, -5]} intensity={0.4} />
                              <Environment preset="city" />
                              
                              {/* Manually center the 20.6-unit tall model instead of relying on <Center> which can glitch */}
                              <group scale={0.35} position={[0, -3.6, 0]}>
                                <MaleMannequin3D />
                              </group>

                              <ScreenshotCapturer />

                              <OrbitControls 
                                enableZoom={true} 
                                enablePan={false} 
                                target={[0, 0, 0]}
                                minPolarAngle={Math.PI / 4} 
                                maxPolarAngle={Math.PI / 2 + 0.1}
                                minDistance={5}
                                maxDistance={25}
                                autoRotate 
                                autoRotateSpeed={1.0}
                              />
                            </Canvas>
                          </Suspense>
                          
                          {/* 3D Interactive Badge */}
                          <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg border border-white/20">
                            <Icon icon="solar:mouse-circle-bold-duotone" className="text-white text-lg" />
                            <span className="text-[9px] font-bold text-white uppercase tracking-widest">Interactive 3D</span>
                          </div>
                        </div>
                      ) : (
                        <img 
                          key={mannequinGender}
                          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
                          alt="3D Mannequin Preview" 
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 animate-in fade-in zoom-in-95"
                        />
                      )
                    ) : (
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" 
                        alt="My Selfie Preview" 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    
                    {/* Scanning Line Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent h-[10%] opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite] pointer-events-none z-10"></div>
                    
                    {/* Floating Toolbar (Left) */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 z-20">
                      <button 
                        onClick={handleDownload}
                        className="w-10 h-10 bg-white/70 hover:bg-white backdrop-blur-xl rounded-[14px] flex items-center justify-center text-zinc-700 hover:text-blue-600 shadow-[0_8px_16px_rgba(0,0,0,0.1)] border border-white/50 transition-all hover:scale-110 active:scale-95 group/btn" title="Download"
                      >
                        <Icon icon="solar:download-minimalistic-bold-duotone" className="text-xl group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                      <button 
                        onClick={() => showToast('Resolution upgraded to 4K Ultra HD')}
                        className="w-10 h-10 bg-white/70 hover:bg-white backdrop-blur-xl rounded-[14px] flex items-center justify-center text-zinc-700 hover:text-blue-600 shadow-[0_8px_16px_rgba(0,0,0,0.1)] border border-white/50 transition-all hover:scale-110 active:scale-95 group/btn" title="Resolution"
                      >
                        <Icon icon="solar:monitor-bold-duotone" className="text-xl group-hover/btn:scale-110 transition-transform" />
                      </button>
                      <button 
                        onClick={() => showToast('Render settings opened')}
                        className="w-10 h-10 bg-white/70 hover:bg-white backdrop-blur-xl rounded-[14px] flex items-center justify-center text-zinc-700 hover:text-blue-600 shadow-[0_8px_16px_rgba(0,0,0,0.1)] border border-white/50 transition-all hover:scale-110 active:scale-95 group/btn" title="Settings"
                      >
                        <Icon icon="solar:settings-bold-duotone" className="text-xl group-hover/btn:rotate-45 transition-transform" />
                      </button>
                    </div>

                    {/* Dark gradient overlay at bottom for Full Preview */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none flex flex-col justify-end items-center p-6 z-20">
                      <button 
                        onClick={() => setIsFullscreen(true)}
                        className="flex items-center gap-2.5 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white text-[11px] font-black uppercase tracking-widest transition-all duration-300 border border-white/30 hover:border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 pointer-events-auto hover:scale-105 active:scale-95"
                      >
                        <Icon icon="solar:full-screen-bold-duotone" className="text-lg" />
                        Full Preview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
        
        {/* Garment Upload Modal */}
        {showGarmentModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center p-6 border-b border-zinc-100 bg-zinc-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-inner border border-blue-200">
                    <Icon icon="solar:hanger-bold-duotone" className="text-xl" />
                  </div>
                  <h3 className="font-bold text-xl font-['Fustat'] text-zinc-900 tracking-tight">Add Garment</h3>
                </div>
                <button 
                  onClick={() => setShowGarmentModal(false)} 
                  className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 rounded-xl transition-all active:scale-95"
                >
                  <Icon icon="solar:close-circle-bold-duotone" className="text-2xl" />
                </button>
              </div>
              
              <div className="p-8">
                {/* Upload Area */}
                <div className="w-full h-44 border-2 border-dashed border-zinc-300 hover:border-blue-400 bg-zinc-50/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors group mb-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-14 h-14 bg-white shadow-sm border border-zinc-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 relative z-10">
                    <Icon icon="solar:upload-minimalistic-bold-duotone" className="text-2xl text-blue-600" />
                  </div>
                  <span className="font-bold text-zinc-700 relative z-10">Click or drag image to upload</span>
                  <span className="text-xs text-zinc-400 mt-1.5 font-medium relative z-10">Supports JPG, PNG (Max 10MB)</span>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px bg-zinc-200 flex-1"></div>
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest bg-white px-2">OR IMPORT</span>
                  <div className="h-px bg-zinc-200 flex-1"></div>
                </div>

                {/* Link Area */}
                <div>
                  <label className="block text-sm font-bold text-zinc-800 mb-2 font-['Schibsted_Grotesk']">
                    Paste Product URL
                  </label>
                  <p className="text-xs text-zinc-500 mb-3">
                    Paste a link from Zara, H&M, Nike, or any fashion retailer.
                  </p>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Icon icon="solar:link-circle-bold-duotone" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xl text-zinc-400" />
                      <input 
                        type="url" 
                        placeholder="https://example.com/product..." 
                        className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-[14px] text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-zinc-800 font-medium placeholder-zinc-400 shadow-inner" 
                      />
                    </div>
                    <button className="px-6 py-3.5 bg-zinc-900 hover:bg-black text-white text-sm font-bold rounded-[14px] transition-all hover:shadow-[0_4px_14px_rgba(0,0,0,0.15)] active:scale-95 whitespace-nowrap">
                      Import
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Fullscreen Preview Modal */}
        {isFullscreen && (
          <div className="fixed inset-0 z-[200] bg-zinc-950 flex flex-col animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[210] bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
              <div className="flex items-center gap-3 text-white">
                <Icon icon="solar:full-screen-bold-duotone" className="text-2xl" />
                <h3 className="font-bold tracking-widest uppercase text-sm">Full Preview Mode</h3>
              </div>
              <button 
                onClick={() => setIsFullscreen(false)} 
                className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all active:scale-95 pointer-events-auto border border-white/10 hover:border-white/30"
              >
                <Icon icon="solar:close-circle-bold-duotone" className="text-3xl" />
              </button>
            </div>
            
            {/* Content Area */}
            <div className="flex-1 w-full h-full bg-zinc-900 flex items-center justify-center relative overflow-hidden">
              {selectedModelType === 'mannequin' ? (
                mannequinGender === 'male' ? (
                  <div className="w-full h-full bg-[#f5efe6] flex items-center justify-center">
                    <Canvas 
                      gl={{ preserveDrawingBuffer: true, antialias: true }} 
                      camera={{ position: [0, 0, 10], fov: 45 }}
                      onCreated={({ scene }) => { scene.background = new THREE.Color('#f5efe6') }}
                    >
                      <ambientLight intensity={0.7} />
                      <directionalLight position={[5, 10, 5]} intensity={1.2} />
                      <directionalLight position={[-5, 5, -5]} intensity={0.4} />
                      <Environment preset="city" />
                      <group scale={0.35} position={[0, -3.6, 0]}>
                        <MaleMannequin3D />
                      </group>
                      <ScreenshotCapturer />
                      <OrbitControls 
                        enableZoom={true} 
                        enablePan={true} 
                        target={[0, 0, 0]}
                        minDistance={3}
                        maxDistance={30}
                        autoRotate 
                        autoRotateSpeed={0.5}
                      />
                    </Canvas>
                  </div>
                ) : (
                  <img 
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
                    alt="Female Mannequin Fullscreen" 
                    className="w-full h-full object-contain"
                  />
                )
              ) : (
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop" 
                  alt="My Selfie Fullscreen" 
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        )}

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] bg-zinc-900 text-white px-6 py-3 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-white/10 flex items-center gap-3 animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="font-semibold text-sm tracking-wide">{toastMessage}</span>
          </div>
        )}

      </div>
    </div>
  );
}
