import React, { useState, useRef, useEffect } from 'react';
import {
  SlidersHorizontal,
  FileText,
  RotateCcw,
  Sparkles,
  Droplets,
  Type,
  Subtitles,
  Music2,
  CheckCircle2,
  Play,
  Pause,
  Rewind,
  FastForward,
  Maximize2,
  ChevronDown,
  ShieldCheck,
  Zap,
  Globe,
  Languages,
  User,
  Volume2,
  Home,
  Clapperboard,
  Users,
  Settings,
  X,
  Upload,
  Download,
  Check,
  Palette,
  Film
} from 'lucide-react';

export default function App() {
  // Navigation / Views
  const [currentView, setCurrentView] = useState('editor'); // 'editor' | 'settings' | 'subtitles' | 'voices'
  const [activeDockTab, setActiveDockTab] = useState('dubbed'); // 'home' | 'dubbed' | 'sub' | 'voice' | 'profile'

  // Video State
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoName, setVideoName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [aspectRatio, setAspectRatio] = useState('9:16'); // '9:16' | '16:9' | '1:1'
  const [colorFilter, setColorFilter] = useState('normal'); // 'normal' | 'cyber' | 'warm' | 'noir' | 'vibrant'
  const [showBlur, setShowBlur] = useState(false);

  // Subtitle State
  const [showSubModal, setShowSubModal] = useState(false);
  const [burnSubtitles, setBurnSubtitles] = useState(true);
  const [subtitleText, setSubtitleText] = useState('ស្វាគមន៍មកកាន់ Panharith Dubbing V1.0');
  const [subColor, setSubColor] = useState('#facc15'); // Yellow as in screenshot
  const [subFontSize, setSubFontSize] = useState(15);
  const [subBg, setSubBg] = useState(true);

  // Settings State (Image 2)
  const [userEmail, setUserEmail] = useState('tongchhunleng772@gmail.com');
  const [daysRemaining, setDaysRemaining] = useState(29);
  const [transcriptModel, setTranscriptModel] = useState('Whisper Large-V3 Turbo + Silero VAD (Tr...');
  const [spokenLang, setSpokenLang] = useState('🇨🇳 ចិន (Chinese - zh)');
  const [translateModel, setTranslateModel] = useState('Trabekprey-Turbo-Server (AI Turbo លឿន...');
  const [targetVoiceLang, setTargetVoiceLang] = useState('🇰🇭 ខ្មែរ (Khmer - km)');
  const [voiceActor, setVoiceActor] = useState('piseth'); // 'piseth' | 'sreymom' | 'auto_detect'

  // Auto Run Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState('');
  const [processProgress, setProcessProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Show toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Video time formatting (mm:ss)
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Toggle Video Play/Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Seek video
  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  // Skip video
  const skipTime = (delta) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + delta));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle custom video upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoName(file.name);
      setIsPlaying(false);
      showToast(`បានបញ្ចូលវីដេអូ: ${file.name}`);
    }
  };

  // Load a demo video
  const loadDemoVideo = () => {
    setVideoSrc('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
    setVideoName('Demo_Video_Dubbing.mp4');
    setSubtitleText('អត្ថបទបញ្ចូលសម្លេងស្វ័យប្រវត្តិកំពុងដំណើរការ...');
    showToast('បានបើកវីដេអូគំរូ Demo!');
  };

  // Voice Actor preview using SpeechSynthesis
  const previewVoice = (actor) => {
    setVoiceActor(actor);
    const name = actor === 'piseth' ? 'ពិសិដ្ឋ (Piseth)' : actor === 'sreymom' ? 'ស្រីមុំ (Sreymom)' : 'ស្វ័យប្រវត្តិ';
    showToast(`ជ្រើសរើសសម្លេង: ${name}`);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        actor === 'piseth' 
          ? 'ជំរាបសួរ ខ្ញុំបាទឈ្មោះ ពិសិដ្ឋ ជាសម្លេងតួអង្គប្រុស' 
          : 'ជំរាបសួរ នាងខ្ញុំឈ្មោះ ស្រីមុំ ជាសម្លេងតួអង្គស្រី'
      );
      utterance.rate = 1.0;
      utterance.pitch = actor === 'piseth' ? 0.9 : 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Simulate Auto-Run Dubbing workflow
  const startAutoRun = () => {
    setIsProcessing(true);
    setProcessProgress(10);
    setProcessStep('កំពុងទាញយកសម្លេងពីវីដេអូ (Extracting Audio)...');

    setTimeout(() => {
      setProcessProgress(35);
      setProcessStep(`ដំណើរការ Transcript ដោយ ${transcriptModel.slice(0, 20)}...`);
    }, 1200);

    setTimeout(() => {
      setProcessProgress(65);
      setProcessStep(`បកប្រែ ${spokenLang} ទៅជា ${targetVoiceLang} ដោយ AI...`);
    }, 2400);

    setTimeout(() => {
      setProcessProgress(90);
      setProcessStep(`បង្កើតសម្លេងបញ្ចូលថ្មី (Dubbing Voice: ${voiceActor.toUpperCase()})...`);
    }, 3600);

    setTimeout(() => {
      setProcessProgress(100);
      setProcessStep('ការបកប្រែ និងបញ្ចូលសម្លេងបានជោគជ័យ ១០០%!');
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentView('editor');
        setSubtitleText('នេះជាសម្លេងដែលបាន Dubbed រួចរាល់ដោយជោគជ័យ!');
        showToast('🎉 ការបញ្ចូលសម្លេងបានជោគជ័យរួចរាល់!');
      }, 900);
    }, 4800);
  };

  // Cycle aspect ratios
  const cycleAspectRatio = () => {
    const ratios = ['9:16', '16:9', '1:1'];
    const nextIdx = (ratios.indexOf(aspectRatio) + 1) % ratios.length;
    setAspectRatio(ratios[nextIdx]);
    showToast(`ទម្រង់អេក្រង់: ${ratios[nextIdx]}`);
  };

  // Cycle color filters
  const cycleColorFilter = () => {
    const filters = ['normal', 'cyber', 'warm', 'noir'];
    const nextIdx = (filters.indexOf(colorFilter) + 1) % filters.length;
    setColorFilter(filters[nextIdx]);
    showToast(`ម៉ូតពណ៌: ${filters[nextIdx].toUpperCase()}`);
  };

  // CSS filter string for video preview
  const getFilterStyle = () => {
    switch (colorFilter) {
      case 'cyber': return 'hue-rotate(180deg) saturate(1.4) contrast(1.1)';
      case 'warm': return 'sepia(0.3) saturate(1.3) brightness(1.05)';
      case 'noir': return 'grayscale(1) contrast(1.2)';
      default: return 'none';
    }
  };

  return (
    <div className="mobile-frame select-none">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-[#0f172a]/95 text-cyan-300 border border-cyan-500/60 px-4 py-2 rounded-full text-xs font-semibold shadow-lg shadow-cyan-500/30 flex items-center gap-2 backdrop-blur-md animate-fade-in whitespace-nowrap">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hidden file input for video */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="video/*"
        className="hidden"
      />

      {/* Top Mobile Status Header */}
      <div className="px-5 pt-3 pb-1 flex items-center justify-between text-xs text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <span className="font-bold text-cyan-400 text-sm tracking-wide">Panharith Dubbing</span>
          <span className="text-[10px] bg-cyan-950/80 text-cyan-300 border border-cyan-600/40 px-1.5 py-0.5 rounded font-mono font-semibold">V1.0</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Online</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* VIEW 1: EDITOR (Image 1) */}
        {currentView === 'editor' && (
          <div className="flex-1 flex px-3 py-1 gap-2.5 overflow-hidden">
            {/* Left Vertical Sidebar */}
            <div className="w-12 flex flex-col items-center justify-between py-2 bg-[#0c1220]/70 border border-slate-800/80 rounded-2xl backdrop-blur-md">
              <div className="flex flex-col items-center gap-4 w-full">
                {/* Setting / Adjustments Icon -> opens Setting screen */}
                <button
                  onClick={() => setCurrentView('settings')}
                  title="ការកំណត់ Auto Run"
                  className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/80 transition-all shadow-sm active:scale-90"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>

                {/* Document / Subtitle Script */}
                <button
                  onClick={() => setShowSubModal(true)}
                  title="កែសម្រួលអត្ថបទ Subtitle"
                  className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/80 transition-all active:scale-90"
                >
                  <FileText className="w-5 h-5" />
                </button>

                {/* Refresh / Reset Video */}
                <button
                  onClick={loadDemoVideo}
                  title="បើកវីដេអូ Demo ឬ Reset"
                  className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-cyan-300 hover:text-cyan-200 transition-all active:scale-90"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                {/* AI Magic FX with cyan active underline */}
                <div className="flex flex-col items-center w-full">
                  <button
                    onClick={() => {
                      showToast('ដំណើរការ AI Auto Dubbing...');
                      startAutoRun();
                    }}
                    title="AI Auto Dubbing"
                    className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/70 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-500/20 active:scale-90"
                  >
                    <Sparkles className="w-5 h-5" />
                  </button>
                  <div className="w-4 h-1 bg-cyan-400 rounded-full mt-1.5 shadow-[0_0_8px_#00f2fe]"></div>
                </div>
              </div>

              {/* Bottom Quick Voice Switch */}
              <button
                onClick={() => previewVoice(voiceActor === 'piseth' ? 'sreymom' : 'piseth')}
                title="ប្តូរសម្លេងតួអង្គ"
                className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-purple-400 active:scale-90"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Right Main Editor Body */}
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              {/* Top Horizontal Tool Pills Bar */}
              <div className="flex items-center justify-between gap-1.5 px-0.5 pb-2 pt-0.5">
                {/* Blur */}
                <button
                  onClick={() => {
                    setShowBlur(!showBlur);
                    showToast(showBlur ? 'បិទ Blur' : 'បើក Blur');
                  }}
                  className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-1 rounded-full text-xs font-medium border transition-all ${
                    showBlur 
                      ? 'bg-purple-950/80 border-purple-500 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                      : 'bg-[#121829] border-purple-600/40 text-purple-300 hover:border-purple-500'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span className="text-[11px]">Blur</span>
                </button>

                {/* Text */}
                <button
                  onClick={() => setShowSubModal(true)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 px-1 rounded-full text-xs font-medium bg-[#121829] border border-blue-500/50 text-blue-300 hover:border-blue-400 transition-all active:scale-95"
                >
                  <Type className="w-3 h-3 text-blue-400" />
                  <span className="text-[11px]">Text</span>
                </button>

                {/* Sub (Active highlighted green button in screenshot) */}
                <button
                  onClick={() => setShowSubModal(true)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 px-1 rounded-full text-xs font-medium bg-emerald-950/90 border border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-all active:scale-95"
                >
                  <Subtitles className="w-3 h-3 text-emerald-300" />
                  <span className="text-[11px] font-bold">Sub</span>
                </button>

                {/* Med */}
                <button
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 px-1 rounded-full text-xs font-medium bg-[#121829] border border-cyan-600/40 text-cyan-300 hover:border-cyan-400 transition-all active:scale-95"
                >
                  <Music2 className="w-3 h-3 text-cyan-400" />
                  <span className="text-[11px]">Med</span>
                </button>

                {/* Sav (Save & Export) */}
                <button
                  onClick={() => {
                    showToast('💾 បានរក្សាទុក និង Export វីដេអូ!');
                  }}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 px-1 rounded-full text-xs font-medium bg-emerald-900/60 border border-emerald-500/60 text-emerald-300 hover:border-emerald-400 transition-all active:scale-95"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-[11px]">Sav</span>
                </button>
              </div>

              {/* Video Preview Container (Neon Cyan Rounded Box from Screenshot) */}
              <div 
                className="flex-1 flex flex-col justify-between items-center relative rounded-3xl overflow-hidden neon-border-cyan bg-[#0a0f1d] p-3 text-center transition-all duration-300"
                style={{
                  aspectRatio: aspectRatio === '9:16' ? '9/15.5' : aspectRatio === '16:9' ? '16/9' : '1/1',
                  maxHeight: 'calc(100% - 95px)'
                }}
              >
                {/* Background Video Element if loaded */}
                {videoSrc ? (
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    onTimeUpdate={() => {
                      if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
                    }}
                    onLoadedMetadata={() => {
                      if (videoRef.current) setDuration(videoRef.current.duration || 30);
                    }}
                    onEnded={() => setIsPlaying(false)}
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                    style={{
                      filter: `${getFilterStyle()} ${showBlur ? 'blur(4px)' : 'none'}`
                    }}
                    playsInline
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0e162b] to-[#070b16] opacity-90 rounded-3xl flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2">
                      <Film className="w-8 h-8 opacity-70" />
                    </div>
                  </div>
                )}

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none rounded-3xl" />

                {/* Top Center: 9:16 Video Preview & Click to select text */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative z-10 pt-16 cursor-pointer flex flex-col items-center group transition-transform active:scale-95"
                >
                  <h3 className="text-base font-bold text-slate-200 tracking-wide drop-shadow-md">
                    {aspectRatio} Video Preview
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 font-normal tracking-wide group-hover:text-cyan-300 transition-colors">
                    ( ជ្រើសរើសវីដេអូដើម្បី Preview )
                  </p>
                  {videoName && (
                    <span className="text-[10px] text-cyan-300 bg-cyan-950/70 border border-cyan-600/40 px-2 py-0.5 rounded-full mt-1">
                      {videoName}
                    </span>
                  )}
                </div>

                {/* Bottom Center: Subtitle Position Box (Yellow text from Screenshot) */}
                <div
                  onClick={() => setShowSubModal(true)}
                  className="relative z-10 w-full pb-4 px-2 cursor-pointer group"
                >
                  {burnSubtitles && (
                    <div className={`p-2.5 rounded-xl transition-all border ${
                      subBg ? 'bg-black/75 border-yellow-500/40 backdrop-blur-sm' : 'border-transparent'
                    } group-hover:border-yellow-400/80`}>
                      <p 
                        className="font-semibold leading-relaxed tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                        style={{
                          color: subColor,
                          fontSize: `${subFontSize}px`,
                        }}
                      >
                        {subtitleText}
                      </p>
                      <p className="text-[11px] text-yellow-400/90 font-medium mt-1">
                        ( ទីតាំង Subtitle / ចុចកែ Style & Font )
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Video Player Controls & Timecode Scrubber */}
              <div className="mt-2 flex flex-col gap-1.5 px-1">
                {/* Timecode Scrubber Bar: 0:00 --- [===O====] --- 0:00 */}
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <div className="flex-1 relative flex items-center">
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      step={0.1}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full"
                    />
                  </div>
                  <span>{formatTime(duration)}</span>
                </div>

                {/* Floating Capsule Bar with Color, <<, Play, >>, 9:16 selector */}
                <div className="h-11 rounded-full bg-[#0d1424]/90 border border-slate-800/90 flex items-center justify-between px-3 shadow-lg shadow-black/60 backdrop-blur-md">
                  {/* Color Filter Button with Pink dot */}
                  <button
                    onClick={cycleColorFilter}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs text-slate-300 hover:text-white bg-slate-900/60 border border-slate-700/50 active:scale-95 transition-all"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff007f] shadow-[0_0_8px_#ff007f]"></span>
                    <span className="text-[11px] font-medium">Color</span>
                  </button>

                  {/* Playback Controls (<< , Play Glow , >>) */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => skipTime(-5)}
                      className="text-slate-400 hover:text-cyan-300 active:scale-90 transition-all p-1"
                    >
                      <Rewind className="w-4 h-4" />
                    </button>

                    {/* Glowing Blue Play / Pause Round Button */}
                    <button
                      onClick={togglePlay}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.7)] hover:scale-105 active:scale-95 transition-all"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={() => skipTime(5)}
                      className="text-slate-400 hover:text-cyan-300 active:scale-90 transition-all p-1"
                    >
                      <FastForward className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Aspect Ratio Selector (9:16 Dropdown Pill) */}
                  <button
                    onClick={cycleAspectRatio}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-600/40 hover:border-cyan-400 transition-all active:scale-95"
                  >
                    <Maximize2 className="w-2.5 h-2.5 text-cyan-400" />
                    <span className="text-[11px]">{aspectRatio}</span>
                    <ChevronDown className="w-3 h-3 text-cyan-400 opacity-70" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SETTINGS / AUTO RUN CONFIGURATION (Image 2) */}
        {currentView === 'settings' && (
          <div className="flex-1 flex flex-col px-4 py-2 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between py-2 border-b border-slate-800/80 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚙️</span>
                <h2 className="text-base font-bold text-slate-100 tracking-wide">
                  ការកំណត់រចនាសម្ព័ន្ធ Auto Run
                </h2>
              </div>
              <button
                onClick={() => setCurrentView('editor')}
                className="w-8 h-8 rounded-full bg-slate-800/80 text-slate-400 hover:text-white flex items-center justify-center active:scale-90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* User Account & License Card (Green Glowing rounded box from Image 2) */}
            <div className="rounded-2xl p-3.5 mb-4 neon-border-green bg-[#071318]/90 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-200 break-all leading-tight">
                    {userEmail}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 mt-0.5">
                    អាជ្ញាបណ្ណសកម្ម (នៅសល់ {daysRemaining} ថ្ងៃ)
                  </span>
                </div>
              </div>
              <button
                onClick={() => showToast('អ្នកបានចាកចេញពីគណនី')}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 ml-2 active:scale-95"
              >
                Log out
              </button>
            </div>

            {/* Auto Run Form Fields */}
            <div className="flex flex-col gap-3.5 pb-6">
              {/* Field 1: Transcript Model */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <span>🤖</span>
                  <span>Transcript Model:</span>
                </label>
                <div className="relative">
                  <select
                    value={transcriptModel}
                    onChange={(e) => setTranscriptModel(e.target.value)}
                    className="w-full bg-[#0b1326] border border-blue-600/70 text-blue-200 text-xs rounded-xl px-3 py-2.5 appearance-none focus:outline-none focus:border-cyan-400 shadow-inner font-mono"
                  >
                    <option value="Whisper Large-V3 Turbo + Silero VAD (Tr...">
                      ⚡ Whisper Large-V3 Turbo + Silero VAD (Tr...
                    </option>
                    <option value="Whisper Medium + Silero VAD (Fast)">
                      ⚡ Whisper Medium + Silero VAD (ល្បឿនលឿន)
                    </option>
                    <option value="OpenAI Whisper API Cloud">
                      ⚡ OpenAI Whisper Cloud API (សុក្រិតភាពខ្ពស់)
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-blue-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Field 2: Spoken Language in Video */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <span>🗣️</span>
                  <span>ភាសានិយាយក្នុងវីដេអូ:</span>
                </label>
                <div className="relative">
                  <select
                    value={spokenLang}
                    onChange={(e) => setSpokenLang(e.target.value)}
                    className="w-full bg-[#0b1326] border border-blue-600/70 text-slate-100 text-xs rounded-xl px-3 py-2.5 appearance-none focus:outline-none focus:border-cyan-400 shadow-inner"
                  >
                    <option value="🇨🇳 ចិន (Chinese - zh)">🇨🇳 ចិន (Chinese - zh)</option>
                    <option value="🇺🇸 អង់គ្លេស (English - en)">🇺🇸 អង់គ្លេស (English - en)</option>
                    <option value="🇹🇭 ថៃ (Thai - th)">🇹🇭 ថៃ (Thai - th)</option>
                    <option value="🇰🇷 កូរ៉េ (Korean - ko)">🇰🇷 កូរ៉េ (Korean - ko)</option>
                    <option value="🇯🇵 ជប៉ុន (Japanese - ja)">🇯🇵 ជប៉ុន (Japanese - ja)</option>
                    <option value="🇻🇳 វៀតណាម (Vietnamese - vi)">🇻🇳 វៀតណាម (Vietnamese - vi)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-blue-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Field 3: Translation Model */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                  <span>Model បកប្រែ:</span>
                </label>
                <div className="relative">
                  <select
                    value={translateModel}
                    onChange={(e) => setTranslateModel(e.target.value)}
                    className="w-full bg-[#0b1326] border border-blue-600/70 text-blue-200 text-xs rounded-xl px-3 py-2.5 appearance-none focus:outline-none focus:border-cyan-400 shadow-inner"
                  >
                    <option value="Trabekprey-Turbo-Server (AI Turbo លឿន...">
                      ⚡ Trabekprey-Turbo-Server (AI Turbo លឿន...
                    </option>
                    <option value="Gemini 1.5 Flash (Google Cloud)">
                      ⚡ Google Gemini 1.5 Flash (ខ្មែរស្តង់ដារ)
                    </option>
                    <option value="Claude 3.5 Sonnet (Natural Khmer)">
                      ⚡ Claude 3.5 Sonnet (ភាសាខ្មែររលូន)
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-blue-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Field 4: Target Dubbing Language */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <span>🎭</span>
                  <span>សម្លេងបកប្រែ:</span>
                </label>
                <div className="relative">
                  <select
                    value={targetVoiceLang}
                    onChange={(e) => setTargetVoiceLang(e.target.value)}
                    className="w-full bg-[#0b1326] border border-blue-600/70 text-slate-100 text-xs rounded-xl px-3 py-2.5 appearance-none focus:outline-none focus:border-cyan-400 shadow-inner"
                  >
                    <option value="🇰🇭 ខ្មែរ (Khmer - km)">🇰🇭 ខ្មែរ (Khmer - km)</option>
                    <option value="🇺🇸 អង់គ្លេស (English - en)">🇺🇸 អង់គ្លេស (English - en)</option>
                    <option value="🇹🇭 ថៃ (Thai - th)">🇹🇭 ថៃ (Thai - th)</option>
                    <option value="🇨🇳 ចិន (Chinese - zh)">🇨🇳 ចិន (Chinese - zh)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-blue-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Field 5: Character Voice Actors (Pill buttons from Image 2) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <span>👥</span>
                  <span>សម្លេងតួអង្គ:</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {/* Piseth */}
                  <button
                    onClick={() => previewVoice('piseth')}
                    className={`flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-xs font-medium border transition-all active:scale-95 ${
                      voiceActor === 'piseth'
                        ? 'bg-blue-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                        : 'bg-[#0b1326] border-slate-700/60 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    <span className="text-amber-400">👤</span>
                    <span className="truncate">Piseth (ប្រុ...</span>
                  </button>

                  {/* Sreymom */}
                  <button
                    onClick={() => previewVoice('sreymom')}
                    className={`flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-xs font-medium border transition-all active:scale-95 ${
                      voiceActor === 'sreymom'
                        ? 'bg-blue-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                        : 'bg-[#0b1326] border-slate-700/60 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    <span className="text-amber-400">👩</span>
                    <span className="truncate">Sreymom (...</span>
                  </button>

                  {/* Detect Auto */}
                  <button
                    onClick={() => previewVoice('auto_detect')}
                    className={`flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-xs font-medium border transition-all active:scale-95 ${
                      voiceActor === 'auto_detect'
                        ? 'bg-blue-950/80 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                        : 'bg-[#0b1326] border-slate-700/60 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    <span className="text-blue-400">👥</span>
                    <span className="truncate">Detect ប្រុ...</span>
                  </button>
                </div>
              </div>

              {/* Field 6: Burn Subtitles Checkbox */}
              <div 
                onClick={() => setBurnSubtitles(!burnSubtitles)}
                className="flex items-center gap-2.5 pt-2 cursor-pointer select-none"
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  burnSubtitles 
                    ? 'bg-blue-600 border-cyan-400 text-white shadow-[0_0_8px_rgba(0,242,254,0.6)]' 
                    : 'bg-[#0b1326] border-slate-700'
                }`}>
                  {burnSubtitles && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-200">
                  <span>💬</span>
                  <span>បង្ហាញ ម៉ូត Subtitle លើវីដេអូ (Burn Subtitles)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 pt-3">
                <button
                  onClick={() => {
                    showToast('✅ បានរក្សាទុកការកំណត់ Auto Run រួចរាល់!');
                    setCurrentView('editor');
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 active:scale-98 transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>រក្សាទុកការកំណត់ (Save)</span>
                </button>

                <button
                  onClick={() => startAutoRun()}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(0,242,254,0.4)] active:scale-98 transition-all flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>ចាប់ផ្ដើម Auto Run ឥឡូវនេះ (Start Auto Dub)</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Subtitle Customization Modal */}
      {showSubModal && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-40 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0d1527] border border-yellow-500/50 rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-yellow-400 flex items-center gap-1.5">
                <Subtitles className="w-4 h-4" />
                <span>កែសម្រួល Subtitle & Font</span>
              </h3>
              <button
                onClick={() => setShowSubModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-slate-400 font-medium">អត្ថបទ Subtitle (Text):</label>
              <textarea
                value={subtitleText}
                onChange={(e) => setSubtitleText(e.target.value)}
                rows={3}
                className="w-full bg-[#080d19] border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                placeholder="សរសេរអក្សរ Subtitle នៅទីនេះ..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400">ទំហំអក្សរ: {subFontSize}px</label>
                <input
                  type="range"
                  min={12}
                  max={26}
                  value={subFontSize}
                  onChange={(e) => setSubFontSize(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-400">ពណ៌អក្សរ:</label>
                <div className="flex items-center gap-1.5">
                  {['#facc15', '#ffffff', '#00f2fe', '#34d399', '#f43f5e'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSubColor(c)}
                      className={`w-6 h-6 rounded-full border ${
                        subColor === c ? 'border-white scale-110 shadow-md' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="text-xs text-slate-300 flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={subBg}
                  onChange={(e) => setSubBg(e.target.checked)}
                  className="rounded"
                />
                <span>ផ្ទៃខ្មៅពីក្រោយអក្សរ (Dark Box)</span>
              </label>
            </div>

            <button
              onClick={() => {
                setShowSubModal(false);
                showToast('បានកែសម្រួល Subtitle រួចរាល់!');
              }}
              className="w-full py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs shadow-md mt-1"
            >
              យល់ព្រម (Apply)
            </button>
          </div>
        </div>
      )}

      {/* Auto Run Processing Dialog */}
      {isProcessing && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-5">
          <div className="w-full max-w-xs bg-[#0b1222] border border-cyan-500/80 rounded-3xl p-6 flex flex-col items-center text-center shadow-[0_0_35px_rgba(0,242,254,0.3)]">
            <div className="w-16 h-16 rounded-full bg-cyan-950/70 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 mb-4 animate-spin">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-cyan-300 mb-1">
              Panharith AI Auto Dubbing
            </h3>
            <p className="text-xs text-slate-300 mb-4 min-h-[32px] flex items-center justify-center">
              {processStep}
            </p>
            {/* Progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full transition-all duration-500 rounded-full shadow-[0_0_10px_#00f2fe]"
                style={{ width: `${processProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              {processProgress}%
            </span>
          </div>
        </div>
      )}

      {/* Bottom Floating Navigation Dock (from Image 1) */}
      <div className="px-3 pb-3 pt-1">
        <div className="h-14 rounded-full bg-[#0a0f1d]/95 border border-slate-800/90 flex items-center justify-around px-2 shadow-2xl shadow-black backdrop-blur-lg relative">
          {/* Home Icon */}
          <button
            onClick={() => {
              setActiveDockTab('home');
              setCurrentView('editor');
            }}
            className={`p-2 rounded-full transition-all active:scale-90 ${
              activeDockTab === 'home' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5" />
          </button>

          {/* Dubbed (Mint Green Highlighted Pill from Screenshot) */}
          <button
            onClick={() => {
              setActiveDockTab('dubbed');
              setCurrentView('editor');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all active:scale-95 ${
              activeDockTab === 'dubbed'
                ? 'dock-pill-active'
                : 'bg-slate-800/50 text-slate-300'
            }`}
          >
            <Clapperboard className="w-4 h-4 fill-current" />
            <span className="text-xs font-bold tracking-wide">Dubbed</span>
          </button>

          {/* Subtitles / Script */}
          <button
            onClick={() => {
              setActiveDockTab('sub');
              setShowSubModal(true);
            }}
            className={`p-2 rounded-full transition-all active:scale-90 ${
              activeDockTab === 'sub' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-5 h-5" />
          </button>

          {/* Voice Dubbing Actors */}
          <button
            onClick={() => {
              setActiveDockTab('voice');
              setCurrentView('settings');
            }}
            className={`p-2 rounded-full transition-all active:scale-90 ${
              activeDockTab === 'voice' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <button
            onClick={() => {
              setActiveDockTab('profile');
              setCurrentView('settings');
            }}
            className={`p-2 rounded-full transition-all active:scale-90 ${
              activeDockTab === 'profile' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
