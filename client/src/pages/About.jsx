import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, Globe, Users, Award, BookOpen, 
  Linkedin, MapPin, Sparkles, Shield, Activity, 
  Cpu, Zap, Check, Settings, ArrowLeft, ArrowUpRight,
  TrendingUp, Workflow, Compass, CheckCircle2,
  Mail, Star, Layers, Calendar, Landmark, ShieldCheck
} from 'lucide-react'

// --- 1. Stat Counter Component ---
const Counter = ({ target, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const targetVal = parseFloat(target);
        const duration = 2000;
        let startTime = null;

        const animate = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const current = progress * targetVal;
          
          if (target.toString().includes('.')) {
            setCount(current.toFixed(1));
          } else {
            setCount(Math.floor(current));
          }

          if (progress < 1) {
            window.requestAnimationFrame(animate);
          } else {
            setCount(target);
          }
        };

        window.requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [target]);

  return <span ref={elementRef}>{prefix}{count}{suffix}</span>;
};

// --- 2. Canvas-based 3D Network Globe ---
const NetworkGlobe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);

    const logoColors = ['#A702CC', '#D301A8', '#FF6F00', '#36A9FA'];

    // Spherical node distribution (increased quantity)
    const nodeCount = 80;
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.acos(-1 + (2 * i) / nodeCount);
      const phi = Math.sqrt(nodeCount * Math.PI) * theta;
      nodes.push({
        x3d: Math.cos(phi) * Math.sin(theta),
        y3d: Math.sin(phi) * Math.sin(theta),
        z3d: Math.cos(theta),
        offset: Math.random() * Math.PI * 2,
        color: logoColors[i % logoColors.length]
      });
    }

    // Increased quantity of floating background particles
    const particleCount = 40;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1.2 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        alpha: 0.2 + Math.random() * 0.45,
        color: logoColors[i % logoColors.length]
      });
    }

    // Increased rotation speed values
    let angleX = 0.0025;
    let angleY = 0.005;
    let targetRotationX = 0.0025;
    let targetRotationY = 0.005;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetRotationY = (x / width) * 0.025;
      targetRotationX = (y / height) * 0.025;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', () => {
      targetRotationX = 0.0025;
      targetRotationY = 0.005;
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      angleX += (targetRotationX - angleX) * 0.05;
      angleY += (targetRotationY - angleY) * 0.05;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected = nodes.map(node => {
        let x1 = node.x3d * cosY - node.z3d * sinY;
        let z1 = node.x3d * sinY + node.z3d * cosY;

        let y2 = node.y3d * cosX - z1 * sinX;
        let z2 = node.y3d * sinX + z1 * cosX;

        const radius = Math.min(width, height) * 0.38;
        const depth = 2.8;
        const scale = depth / (depth - z2);
        
        // Increased wave amplitude & speed
        const animOffset = Math.sin(Date.now() * 0.002 + node.offset) * 8;

        return {
          x: x1 * scale * radius + width / 2,
          y: y2 * scale * radius + height / 2 + animOffset,
          z: z2,
          scale: scale,
          color: node.color
        };
      });

      // Background particles (glowing bubbles in logo colors)
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // Connections
      ctx.lineWidth = 0.55;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = Math.min(width, height) * 0.22;
          if (dist < maxDist) {
            const depthFactor = (p1.z + p2.z + 2) / 4; 
            const alpha = (1 - dist / maxDist) * 0.15 * depthFactor;
            ctx.strokeStyle = `rgba(167, 2, 204, ${alpha})`; // Soft logo-purple connections
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      projected.forEach((p, idx) => {
        const size = Math.max(1.0, (p.z + 1.4) * 2.2);
        const depthFactor = (p.z + 1) / 2;

        if (idx % 3 === 0) { // Increased outer pulse quantity
          const pulse = Math.sin(Date.now() * 0.0025 + idx) * 4 + 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size + pulse * 0.4, 0, Math.PI * 2);
          ctx.globalAlpha = 0.05 * depthFactor;
          ctx.fillStyle = p.color;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = idx % 8 === 0 ? '#0f172a' : p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = idx % 8 === 0 ? 0 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-[320px] sm:h-[400px] lg:h-[450px] relative flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.85)_75%)] pointer-events-none" />
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing" 
        style={{ display: 'block' }}
      />
    </div>
  );
};

// --- 3. Interactive World Map ---
const GlobalPresenceMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const canvasRef = useRef(null);

  const locations = [
    {
      id: 'usa',
      city: 'USA',
      flag: 'https://flagcdn.com/us.svg',
      focus: 'Global Client Labs',
      description: 'Shaping enterprise compliance policies, multi-agent collaboration structures, and strategic Fortune 500 integrations.',
      contact: 'usa@agentfloww.com',
      // Mercator-projected positions on 1000x500 viewBox
      mapX: 240,
      mapY: 175,
    },
    {
      id: 'uae',
      city: 'Dubai',
      flag: 'https://flagcdn.com/ae.svg',
      focus: 'MENA Operations Hub',
      description: 'Directing large-scale manufacturing automations, food processing flows, and logistics systems across the Gulf region.',
      contact: 'uae@agentfloww.com',
      mapX: 580,
      mapY: 220,
    },
    {
      id: 'india',
      city: 'Pune',
      flag: 'https://flagcdn.com/in.svg',
      focus: 'Core R&D & Systems Engineering',
      description: 'Our engineering headquarters powering SAP-native workflows, LLM writebacks, and casting line telemetry integrations.',
      contact: 'india@agentfloww.com',
      mapX: 710,
      mapY: 240,
    }
  ];

  // Render dot-matrix world map on canvas dynamically
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const dpr = window.devicePixelRatio || 1;

    const drawMap = () => {
      const w = canvas.clientWidth || canvas.offsetWidth || 800;
      const h = canvas.clientHeight || canvas.offsetHeight || 400;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, w, h);

      // Higher visibility settings
      const dotSpacing = 10;
      const dotRadius = 2.2;
      const cols = Math.floor(w / dotSpacing);
      const rows = Math.floor(h / dotSpacing);

      const continentData = generateContinentDots(cols, rows);

      continentData.forEach(([col, row]) => {
        const x = col * dotSpacing + dotSpacing / 2;
        const y = row * dotSpacing + dotSpacing / 2;
        
        // Map current pixel coordinates back to the 1000x500 map space
        const mapSpaceX = (x / w) * 1000;
        const mapSpaceY = (y / h) * 500;

        // Highlight dots near our main hubs for a cool connected-net effect
        let isNearOffice = false;
        locations.forEach(loc => {
          const dx = mapSpaceX - loc.mapX;
          const dy = mapSpaceY - loc.mapY;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 90) {
            isNearOffice = true;
          }
        });

        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        if (isNearOffice) {
          ctx.fillStyle = 'rgba(34, 197, 94, 0.45)'; // Distinct green highlight dots
        } else {
          ctx.fillStyle = 'rgba(15, 23, 42, 0.16)'; // Clearly visible slate gray land dots
        }
        ctx.fill();
      });
    };

    // Draw map after layout settles
    const timer = setTimeout(drawMap, 150);

    const handleResize = () => {
      drawMap();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const arcs = [
    { from: locations[0], to: locations[1] }, // USA → UAE
    { from: locations[1], to: locations[2] }, // UAE → India
    { from: locations[0], to: locations[2] }, // USA → India
  ];

  return (
    <div className="relative w-full aspect-[2.1/1] min-h-[440px] bg-gradient-to-b from-slate-50 to-white rounded-3xl border border-gray-150 shadow-md overflow-hidden">
      {/* Subtle grid underlay */}
      <div className="absolute inset-0 about-grid-bg opacity-70 pointer-events-none" />

      {/* Dot matrix world map canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ display: 'block' }}
      />

      {/* SVG overlay for arcs, pins, and animated particles */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#22C55E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0.2" />
          </linearGradient>
          <filter id="pin-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connecting arcs with animated traveling particles */}
        {arcs.map((arc, idx) => {
          const x1 = arc.from.mapX;
          const y1 = arc.from.mapY;
          const x2 = arc.to.mapX;
          const y2 = arc.to.mapY;
          const cpX = (x1 + x2) / 2;
          const cpY = Math.min(y1, y2) - 70 - (idx === 2 ? 30 : 0);
          const pathD = `M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`;

          return (
            <g key={`arc-${idx}`}>
              <path
                d={pathD}
                fill="none"
                stroke="url(#arc-grad)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                opacity="0.8"
              />
              <circle r="4.5" fill="#22C55E" opacity="0.95" filter="url(#pin-glow)">
                <animateMotion
                  dur={`${3.8 + idx * 0.7}s`}
                  repeatCount="indefinite"
                  path={pathD}
                />
              </circle>
              <circle r="3" fill="#22C55E" opacity="0.6">
                <animateMotion
                  dur={`${4.5 + idx * 0.5}s`}
                  repeatCount="indefinite"
                  path={`M ${x2} ${y2} Q ${cpX} ${cpY} ${x1} ${y1}`}
                />
              </circle>
            </g>
          );
        })}

        {/* Location markers */}
        {locations.map((loc) => (
          <g key={`pin-${loc.id}`}>
            <circle cx={loc.mapX} cy={loc.mapY} r="18" fill="none" stroke="#22C55E" strokeWidth="1.5" opacity="0.3">
              <animate attributeName="r" values="10;22;10" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.45;0;0.45" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx={loc.mapX} cy={loc.mapY} r="10" fill="rgba(34, 197, 94, 0.12)" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="1" />
            <circle cx={loc.mapX} cy={loc.mapY} r="6" fill="#22C55E" filter="url(#pin-glow)" />
            <circle cx={loc.mapX} cy={loc.mapY} r="2" fill="#ffffff" />
          </g>
        ))}
      </svg>

      {/* Clickable overlay pins with labels */}
      {locations.map((loc) => {
        const leftPct = (loc.mapX / 1000) * 100;
        const topPct = (loc.mapY / 500) * 100;

        return (
          <div
            key={`label-${loc.id}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            style={{ left: `${leftPct}%`, top: `${topPct}%` }}
            onClick={() => setSelectedLocation(selectedLocation?.id === loc.id ? null : loc)}
          >
            <div className="w-10 h-10" />
            {/* Highly visible Label badge */}
            <div className="absolute top-7 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-white/95 backdrop-blur-md border border-gray-200 text-gray-900 font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-md whitespace-nowrap w-max transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:border-green-300">
              <img src={loc.flag} alt={loc.city} className="h-3.5 w-auto object-contain rounded-sm border border-gray-150/80 shadow-sm" />
              <span className="tracking-wide">{loc.city}</span>
            </div>
          </div>
        );
      })}

      {/* Floating detail panel */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute bottom-5 right-5 left-5 sm:left-auto sm:w-[370px] bg-white border border-gray-200 p-6 rounded-2xl shadow-xl z-30"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-bold text-green-600 tracking-wider uppercase block mb-0.5">{selectedLocation.focus}</span>
                <h4 className="text-base font-extrabold text-gray-950 flex items-center gap-2">
                  <img src={selectedLocation.flag} alt={selectedLocation.city} className="h-4 w-auto object-contain rounded-sm border border-gray-150/80 shadow-sm" />
                  {selectedLocation.city}
                </h4>
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-gray-400 hover:text-gray-700 transition-colors p-1.5 rounded-lg hover:bg-gray-50"
              >
                ✕
              </button>
            </div>
            
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              {selectedLocation.description}
            </p>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-150">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Mail size={12} className="text-green-600" />
                <a href={`mailto:${selectedLocation.contact}`} className="text-green-600 hover:underline font-semibold">{selectedLocation.contact}</a>
              </div>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Soft vignette edges */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ boxShadow: 'inset 0 0 60px 20px rgba(255,255,255,0.6)' }} />
    </div>
  );
};

// Generate dot coordinates for a simplified world map
function generateContinentDots(cols, rows) {
  const dots = [];

  // Helper: check if a normalized point (0-1, 0-1) falls on land
  const isLand = (nx, ny) => {
    // North America
    if (nx > 0.06 && nx < 0.30 && ny > 0.12 && ny < 0.20) return true; 
    if (nx > 0.10 && nx < 0.28 && ny > 0.20 && ny < 0.38) return true; 
    if (nx > 0.12 && nx < 0.24 && ny > 0.38 && ny < 0.46) return true; 
    if (nx > 0.05 && nx < 0.14 && ny > 0.12 && ny < 0.25) return true; 
    if (nx > 0.22 && nx < 0.30 && ny > 0.12 && ny < 0.22) return true; 

    // Central America & Caribbean
    if (nx > 0.16 && nx < 0.22 && ny > 0.42 && ny < 0.52) return true;
    if (nx > 0.22 && nx < 0.28 && ny > 0.42 && ny < 0.48) return true; 

    // South America
    if (nx > 0.22 && nx < 0.36 && ny > 0.52 && ny < 0.62) return true; 
    if (nx > 0.26 && nx < 0.38 && ny > 0.55 && ny < 0.72) return true; 
    if (nx > 0.24 && nx < 0.32 && ny > 0.68 && ny < 0.82) return true; 
    if (nx > 0.26 && nx < 0.30 && ny > 0.82 && ny < 0.90) return true; 

    // Europe
    if (nx > 0.42 && nx < 0.56 && ny > 0.10 && ny < 0.20) return true; 
    if (nx > 0.44 && nx < 0.54 && ny > 0.18 && ny < 0.30) return true; 
    if (nx > 0.46 && nx < 0.52 && ny > 0.28 && ny < 0.36) return true; 
    if (nx > 0.50 && nx < 0.58 && ny > 0.16 && ny < 0.28) return true; 

    // Africa
    if (nx > 0.44 && nx < 0.56 && ny > 0.36 && ny < 0.46) return true; 
    if (nx > 0.46 && nx < 0.58 && ny > 0.44 && ny < 0.58) return true; 
    if (nx > 0.50 && nx < 0.60 && ny > 0.55 && ny < 0.70) return true; 
    if (nx > 0.54 && nx < 0.58 && ny > 0.68 && ny < 0.76) return true; 

    // Middle East
    if (nx > 0.56 && nx < 0.64 && ny > 0.30 && ny < 0.42) return true;

    // Russia / Central Asia
    if (nx > 0.54 && nx < 0.90 && ny > 0.08 && ny < 0.20) return true; 
    if (nx > 0.58 && nx < 0.78 && ny > 0.18 && ny < 0.28) return true; 

    // South Asia (India)
    if (nx > 0.64 && nx < 0.72 && ny > 0.32 && ny < 0.38) return true; 
    if (nx > 0.66 && nx < 0.74 && ny > 0.36 && ny < 0.50) return true; 
    if (nx > 0.68 && nx < 0.70 && ny > 0.48 && ny < 0.54) return true; 

    // Southeast Asia
    if (nx > 0.72 && nx < 0.82 && ny > 0.34 && ny < 0.48) return true; 
    if (nx > 0.76 && nx < 0.86 && ny > 0.48 && ny < 0.56) return true; 

    // East Asia
    if (nx > 0.74 && nx < 0.86 && ny > 0.22 && ny < 0.36) return true; 
    if (nx > 0.84 && nx < 0.88 && ny > 0.26 && ny < 0.34) return true; 

    // Australia
    if (nx > 0.80 && nx < 0.92 && ny > 0.62 && ny < 0.78) return true;
    if (nx > 0.90 && nx < 0.94 && ny > 0.66 && ny < 0.74) return true; 

    // Greenland
    if (nx > 0.32 && nx < 0.42 && ny > 0.04 && ny < 0.14) return true;

    return false;
  };

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const nx = c / cols;
      const ny = r / rows;
      if (isLand(nx, ny)) {
        dots.push([c, r]);
      }
    }
  }

  return dots;
}

// --- 4. Interactive Orbital Value System ---
const OrbitalValues = () => {
  const values = [
    { name: "Innovation", desc: "Pushing limits of what AI can solve" },
    { name: "Ownership", desc: "Responsible for client success end-to-end" },
    { name: "Precision", desc: "No room for error in database writebacks" },
    { name: "Automation", desc: "Driving 24/7 background productivity" },
    { name: "Trust", desc: "Bank-grade isolation and reliability" },
    { name: "Partnership", desc: "Working side-by-side with operations teams" }
  ];

  const [angleOffset, setAngleOffset] = useState(0);
  const [hoveredValue, setHoveredValue] = useState(null);

  useEffect(() => {
    let animationId;
    const animate = () => {
      setAngleOffset(prev => (prev + 0.0008) % (Math.PI * 2));
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  const radius = 125;

  return (
    <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] flex items-center justify-center bg-transparent border border-gray-100 rounded-full mx-auto shadow-inner">
      <div className="relative z-10 w-24 h-24 sm:w-26 sm:h-26 rounded-full bg-white border border-gray-150/80 shadow-md flex flex-col items-center justify-center p-3 text-center">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#A702CC]/10 to-[#D301A8]/10 rounded-full blur pointer-events-none animate-pulse" />
        <span className="text-[9px] font-bold tracking-widest text-[#A702CC] uppercase mb-0.5">CORE</span>
        <span className="text-xs font-black text-gray-900 leading-tight">Agentfloww</span>
      </div>

      <svg className="absolute w-full h-full pointer-events-none" viewBox="0 0 380 380">
        <circle cx="190" cy="190" r="125" fill="none" stroke="rgba(167, 2, 204, 0.12)" strokeWidth="1.2" strokeDasharray="6 8" />
      </svg>

      {values.map((v, i) => {
        const angle = (i * 2 * Math.PI) / values.length + angleOffset;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <motion.div
            key={v.name}
            className="absolute z-20 cursor-pointer"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              translateX: '-50%',
              translateY: '-50%'
            }}
            whileHover={{ scale: 1.12 }}
          >
            <div 
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center p-2 border text-center transition-all ${
                hoveredValue === v.name 
                  ? 'bg-purple-50/90 border-[#A702CC] shadow-md shadow-purple-100/10' 
                  : 'bg-white border-gray-200 shadow-sm'
              }`}
              onMouseEnter={() => setHoveredValue(v.name)}
              onMouseLeave={() => setHoveredValue(null)}
            >
              <span className={`text-[10px] sm:text-xs font-bold leading-tight ${hoveredValue === v.name ? 'text-[#A702CC]' : 'text-gray-700'}`}>
                {v.name}
              </span>
            </div>
          </motion.div>
        );
      })}

      <AnimatePresence>
        {hoveredValue && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="absolute bottom-[-45px] left-1/2 -translate-x-1/2 w-[260px] bg-white/95 backdrop-blur-md border border-gray-200/60 p-3 rounded-xl shadow-md text-center z-30"
          >
            <h4 className="text-xs font-bold text-gray-900">{hoveredValue}</h4>
            <p className="text-[10px] text-gray-500 mt-0.5">{values.find(v => v.name === hoveredValue).desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 5. Interactive 3D Cursor Tilt Component ---
const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rotateX = -(mouseY / height) * 12;
    const rotateY = (mouseX / width) * 12;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 transition-all duration-300 ${className}`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          scale: isHovered ? 1.015 : 1
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        className="w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- 6. Image-based Logo Marquee ---
const LogoWall = () => {
  const logos = [
    { src: '/images/logo/sap.png', brandName: 'SAP', heightClass: 'h-12 md:h-14' },
    { src: '/images/logo/oracle.png', brandName: 'Oracle', heightClass: 'h-12 md:h-14' },
    { src: '/images/logo/dynamics.png', brandName: 'Dynamics 365', heightClass: 'h-16 md:h-20' },
    { src: '/images/logo/netsuite.png', brandName: 'NetSuite', heightClass: 'h-16 md:h-20' },
    { src: '/images/logo/odoo.png', brandName: 'Odoo', heightClass: 'h-12 md:h-14' },
    { src: '/images/logo/epicor.png', brandName: 'Epicor', heightClass: 'h-12 md:h-14' }
  ];

  const logoList = [...logos, ...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-gray-100 bg-white/50 backdrop-blur-sm">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
      
      <div className="flex w-max items-center space-x-24 px-4 animate-scroll-logos hover:[animation-play-state:paused]">
        {logoList.map((logo, index) => {
          return (
            <div 
              key={index}
              className="flex items-center justify-center min-w-[160px]"
              title={logo.brandName}
            >
              <img 
                src={logo.src}
                alt={logo.brandName}
                className={`${logo.heightClass} w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300 transform hover:scale-108 cursor-pointer`}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
};

// --- Main Redesigned About Component ---
const About = () => {
  // Global Presence office selection fallback state
  const [selectedMapLoc, setSelectedMapLoc] = useState('india');

  // Capability hover expand state
  const [expandedCapability, setExpandedCapability] = useState(null);

  // Industry tiles data
  const industries = [
    {
      name: "Manufacturing",
      story: "Optimized shop-floor logistics and material workflows. Auto-synchronized inventory updates on SAP.",
      icon: Cpu
    },
    {
      name: "Automotive",
      story: "Synced assembly parts queues with CRM schedules. Cut vendor procurement lag by 35%.",
      icon: Settings
    },
    {
      name: "Food Processing",
      story: "Maintained cold-chain audit logs and compliance tags autonomously, zeroing reporting issues.",
      icon: Activity
    },
    {
      name: "Government",
      story: "Locked down encrypted logs and secure vendor evaluations, exceeding policy compliance metrics.",
      icon: Landmark
    },
    {
      name: "Logistics",
      story: "Reconciled warehouse manifests and transport invoices instantly on writeback commands.",
      icon: Compass
    },
    {
      name: "Energy",
      story: "Automated grid billing telemetry data writebacks directly into backend Oracle databases.",
      icon: Zap
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Agentfloww</title>
        <meta name="description" content="Redefining enterprise automation. Meet Agentfloww's leadership, values, global presence, and the visionary AI Operating System built for modern business processes." />
      </Helmet>

      <div className="min-h-screen bg-white text-gray-900 selection:bg-purple-100 selection:text-purple-800">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-12 pb-20 sm:pb-24 overflow-hidden border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-15">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column Content */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
                <div className="inline-flex items-center space-x-2 bg-purple-50 border border-purple-200/40 rounded-full px-3 py-1.5 text-xs font-semibold text-purple-700">
                  <Sparkles size={13} className="text-[#A702CC] animate-pulse" />
                  <span>The Enterprise AI Operating System</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.08]">
                  Building the AI Operating System for
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#A702CC] via-[#D301A8] to-[#FF6F00] mt-1">
                    Modern Enterprises
                  </span>
                </h1>
                
                <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                  Agentfloww integrates cognitive AI layers directly into core SAP, Oracle, and enterprise systems, turning legacy operational bottlenecks into self-optimizing autonomous networks.
                </p>

                {/* Stat Cards below hero */}
                <div className="grid grid-cols-3 gap-4 pt-4 sm:pt-6">
                  <div className="bg-slate-50/80 border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
                    <div className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                      <Counter target={60} suffix="+" />
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Projects Delivered</div>
                  </div>
                  
                  <div className="bg-slate-50/80 border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
                    <div className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                      <Counter target={3} />
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Countries Served</div>
                  </div>

                  <div className="bg-slate-50/80 border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
                    <div className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                      <Counter target={1000} suffix="+" />
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Companies Helped</div>
                  </div>
                </div>
              </div>

              {/* Right Column Rotating Globe */}
              <div className="lg:col-span-5 relative">
                <NetworkGlobe />
              </div>

            </div>
          </div>
        </section>

        {/* --- COMPANY STORY TIMELINE --- */}
        <section className="py-20 sm:py-24 bg-slate-50/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <span className="text-xs font-bold text-[#A702CC] uppercase tracking-widest">Our Journey</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2">Company Story</h2>
              <p className="text-sm text-gray-600 mt-2">From concept to global enterprise execution, mapping milestones along the path of autonomous innovation.</p>
            </motion.div>

            {/* Vertical timeline line */}
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2" />

              {/* Milestones cards */}
              <div className="space-y-12 sm:space-y-16">
                {[
                  {
                    year: "2023",
                    title: "Founded",
                    desc: "Agentfloww launched with a pioneering mandate to develop deterministic cognitive layers connecting to enterprise ERP databases safely."
                  },
                  {
                    year: "2023",
                    title: "First Enterprise Customer",
                    desc: "Integrated custom invoice matching and procurement agent loops for a leading heavy industrial equipment developer, establishing instant ROI."
                  },
                  {
                    year: "2024",
                    title: "Manufacturing Expansion",
                    desc: "Expanded workflows into automated plant shopfloors, connecting IoT telemetry flows directly into SAP Business One transaction logs."
                  },
                  {
                    year: "2025",
                    title: "International Projects",
                    desc: "Launched strategic customer operations out of USA and UAE offices, integrating ERP databases across global cloud zones."
                  },
                  {
                    year: "Today",
                    title: "Enterprise AI OS",
                    desc: "Leading the global movement for safe enterprise autonomy, managing workflows for Fortune 500 partners."
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`relative flex flex-col sm:flex-row items-start ${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}
                  >
                    {/* Node marker */}
                    <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#A702CC] border-4 border-white shadow z-10 top-1.5" />

                    {/* Timeline card container */}
                    <div className="w-full sm:w-[45%] pl-10 sm:pl-0 sm:px-6">
                      <div className="bg-white/80 backdrop-blur-md border border-gray-150 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                        <span className="inline-block text-xs font-bold bg-purple-50 text-purple-750 px-2.5 py-1 rounded-md mb-2">
                          {item.year}
                        </span>
                        <h3 className="text-base font-bold text-gray-950 mb-1">{item.title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* --- COMPANY IMPACT BENTO GRID --- */}
        <section className="py-20 sm:py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-xl mx-auto mb-16"
            >
              <span className="text-xs font-bold text-[#A702CC] uppercase tracking-widest">Our Footprint</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2">Company Impact</h2>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              {/* Card 1 - Projects Delivered (Col Span 2) */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="md:col-span-2 bg-slate-55/30 border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all glow-card-purple relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A702CC]/5 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="text-5xl font-black text-gray-950 tracking-tight">
                    <Counter target={60} suffix="+" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-950 mt-2">Projects Delivered</h3>
                  <p className="text-xs text-gray-500 mt-2 max-w-md">
                    Seamless workflow integrations across high-precision databases, resolving inventory errors and transaction pipelines securely.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="text-[10px] bg-white border border-gray-100 text-gray-600 px-2.5 py-1 rounded-md">SAP S/4HANA</span>
                  <span className="text-[10px] bg-white border border-gray-100 text-gray-600 px-2.5 py-1 rounded-md">Oracle Integration</span>
                  <span className="text-[10px] bg-white border border-gray-100 text-gray-600 px-2.5 py-1 rounded-md">Manufacturing IoT</span>
                </div>
              </motion.div>

              {/* Card 2 - Experts (Col Span 1) */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-slate-55/30 border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all glow-card-purple"
              >
                <div>
                  <div className="text-5xl font-black text-gray-950 tracking-tight">
                    <Counter target={30} suffix="+" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-950 mt-2">Experts</h3>
                  <p className="text-xs text-gray-500 mt-2">
                    Engineers, business analysts, and CX consultants pushing the frontiers of enterprise workflow automation.
                  </p>
                </div>
              </motion.div>

              {/* Card 3 - Countries (Col Span 1) */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-slate-55/30 border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all glow-card-purple"
              >
                <div>
                  <div className="text-5xl font-black text-gray-950 tracking-tight">
                    <Counter target={3} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-950 mt-2">Countries</h3>
                  <p className="text-xs text-gray-500 mt-2">
                    Active operational locations across India, UAE, and the USA scaling enterprise systems.
                  </p>
                </div>
              </motion.div>

              {/* Card 4 - Satisfaction (Col Span 2) */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="md:col-span-2 bg-slate-55/30 border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all glow-card-purple relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A702CC]/5 rounded-full blur-2xl pointer-events-none" />
                <div>
                  <div className="text-5xl font-black text-gray-950 tracking-tight flex items-baseline">
                    <Counter target={9.5} />
                    <span className="text-2xl text-gray-400 font-bold ml-1">/10</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-950 mt-2">Client Satisfaction</h3>
                  <p className="text-xs text-gray-500 mt-2">
                    Average metric feedback score from enterprise manufacturing partners praising transaction reliability and deployment speeds.
                  </p>
                </div>
                <div className="mt-5 w-full bg-gray-100 rounded-full h-2 overflow-hidden border border-gray-200">
                  <div className="bg-gradient-to-r from-[#A702CC] via-[#D301A8] to-[#FF6F00] h-full rounded-full w-[95%]" />
                </div>
              </motion.div>

              {/* Card 5               {/* Card 5 - Awards (Col Span 3 - Wide banner for neat alignment) */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="md:col-span-3 bg-slate-55/30 border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 hover:shadow-md transition-all glow-card-purple relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A702CC]/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="text-5xl font-black text-gray-950 tracking-tight flex-shrink-0">
                    <Counter target={5} suffix="+" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-950">Industry Awards</h3>
                    <p className="text-xs text-gray-500 mt-1 max-w-2xl">
                      Recognized globally for enterprise-grade database automation interfaces, client-side CX workflow compliance architectures, and software engineering safety.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-[10px] text-[#A702CC] font-bold uppercase tracking-wider bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-lg flex-shrink-0 self-start sm:self-auto">
                  <span>🏆 Vetted Worldwide</span>
                </div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* --- WHAT WE BUILD (CAPABILITIES) --- */}
        <section className="py-20 sm:py-24 bg-slate-50/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <span className="text-xs font-bold text-[#A702CC] uppercase tracking-widest">Our Solutions</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2">What We Build</h2>
              <p className="text-sm text-gray-600 mt-2">Replacing static dashboards with active cognitive frameworks that run on autopilot.</p>
            </motion.div>

            {/* Capability Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  id: 'ai',
                  title: "AI & Automation",
                  icon: Cpu,
                  desc: "Intelligent autonomous agents trained to handle document flows, parse invoices, match lines, and coordinate CRM customer data securely.",
                  features: ["Grids & logs automation", "Predictive OCR parsing", "Secure transactional execution"]
                },
                {
                  id: 'mfg',
                  title: "Manufacturing & ERP",
                  icon: Settings,
                  desc: "Shop-floor pipeline automation linking IoT endpoints directly with central ERP tables like SAP S/4HANA or Oracle Business One.",
                  features: ["IoT data synchronization", "Automatic material costing", "Vendor ledger updates"]
                },
                {
                  id: 'intel',
                  title: "Enterprise Intelligence",
                  icon: Activity,
                  desc: "Strategic anomaly engines checking transaction compliance, zeroing policy drifts, and providing live risk assessments.",
                  features: ["Anomalies detection", "Spend compliance audits", "Database telemetry logs"]
                }
              ].map((cap) => {
                const IconComp = cap.icon;
                const isHovered = expandedCapability === cap.id;

                return (
                  <motion.div
                    key={cap.id}
                    className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-sm relative overflow-hidden glow-card-purple"
                    onMouseEnter={() => setExpandedCapability(cap.id)}
                    onMouseLeave={() => setExpandedCapability(null)}
                    layout
                  >
                    <div>
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#A702CC] mb-6">
                        <IconComp size={22} />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-950 mb-2">{cap.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed mb-6">{cap.desc}</p>
                    </div>

                    {/* Interactive Slide-down Sublist */}
                    <div className="overflow-hidden transition-all duration-300 mt-2">
                      <div className="border-t border-gray-100 pt-4 space-y-2">
                        {cap.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A702CC] mr-2 flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* --- WHY AGENTFLOWW Feature Cards --- */}
        <section className="py-20 sm:py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-xl mx-auto mb-16"
            >
              <span className="text-xs font-bold text-[#A702CC] uppercase tracking-widest">Our Edge</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2">Why Agentfloww</h2>
              <p className="text-sm text-gray-600 mt-2">High-security integration layers built to survive enterprise governance protocols.</p>
            </motion.div>

            {/* 6 Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "ERP-Native Integration",
                  desc: "Runs directly within SAP and Oracle pipelines. Does not require fragile external middleware layers.",
                  icon: Cpu
                },
                {
                  title: "Zero Policy Drift",
                  desc: "Hard-coded compliance validation audits transactions in real time to lock down governance rules.",
                  icon: Shield
                },
                {
                  title: "High ROI Sprints",
                  desc: "Deployment loops target immediate productivity metrics, proving cost reduction in the first week.",
                  icon: TrendingUp
                },
                {
                  title: "Bank-Grade Encryption",
                  desc: "Enterprise data is isolated, encrypted in transit, and secured to ensure private processing logs.",
                  icon: ShieldCheck
                },
                {
                  title: "24/7 Autopilot Operations",
                  desc: "Background loops monitor invoice flow, material logs, and CRM deals while you sleep.",
                  icon: Workflow
                },
                {
                  title: "Vetted AI Guardrails",
                  desc: "Ensures agent decisions are safe, deterministic, and always trace back to audit pathways.",
                  icon: CheckCircle2
                }
              ].map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm flex flex-col justify-between glow-card-purple relative group transition-all"
                  >
                    {/* Glowing Accent Border overlay */}
                    <div className="absolute inset-0 border border-purple-500/0 rounded-2xl group-hover:border-purple-500/20 transition-colors pointer-events-none" />
                    
                    <div className="space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-50/80 flex items-center justify-center text-[#A702CC]">
                        <Icon size={18} />
                      </div>
                      
                      <h3 className="text-base font-bold text-gray-950">{feat.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* --- INDUSTRIES WE TRANSFORM --- */}
        <section className="py-20 sm:py-24 bg-slate-50/40 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-xl mx-auto mb-16"
            >
              <span className="text-xs font-bold text-[#A702CC] uppercase tracking-widest">Sectors</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2">Industries We Transform</h2>
            </motion.div>

            {/* Horizontal Showcase Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {industries.map((ind, idx) => {
                const Icon = ind.icon;
                return (
                  <div 
                    key={idx}
                    className="group bg-white border border-gray-150 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between glow-card-purple"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-gray-950 font-bold">
                        <span className="text-[#A702CC] bg-purple-50 p-2 rounded-lg"><Icon size={16} /></span>
                        <h3 className="text-sm font-bold">{ind.name}</h3>
                      </div>
                      <p className="text-xs text-gray-655 leading-relaxed pt-2">
                        {ind.story}
                      </p>
                    </div>
                    {/* Glassy hover slide highlight */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#A702CC] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* --- GLOBAL PRESENCE (MAP) --- */}
        <section className="py-20 sm:py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-xl mx-auto mb-12"
            >
              <span className="text-xs font-bold text-[#A702CC] uppercase tracking-widest">Global Network</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 mt-2">Global Presence</h2>
              <p className="text-sm text-gray-600 mt-2">Collaborative office centers syncing product architecture and enterprise support.</p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <GlobalPresenceMap />
            </div>

          </div>
        </section>

        {/* --- TRUSTED BY LOGO WALL --- */}
        <section className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-8">Integrated and Syncing with</span>
            <LogoWall />
          </div>
        </section>

        {/* --- COMPANY VALUES ORBITAL LAYOUT --- */}
        <section className="py-20 sm:py-24 bg-slate-50/40 border-t border-gray-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Content */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <span className="text-xs font-bold text-[#A702CC] uppercase tracking-widest">Our DNA</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950">Company Values</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Enterprise automation requires strict rules. We build our solutions around six core operating principles, keeping customer database security and software precision at the center of every system writeback.
                </p>
                <div className="space-y-4 pt-4 border-t border-gray-100 text-xs text-gray-600">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 size={16} className="text-[#A702CC] mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900 block font-bold">Innovation & Safety</strong>
                      <span>Pioneering cognitive agents that comply strictly with enterprise role policies.</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 size={16} className="text-[#A702CC] mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900 block font-bold">Absolute Ownership</strong>
                      <span>We take full engineering responsibility for pipeline security and integration logs.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Orbital Circle */}
              <div className="lg:col-span-6 relative pb-12 sm:pb-0">
                <OrbitalValues />
              </div>

            </div>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="py-20 sm:py-28 bg-white border-t border-gray-100 relative overflow-hidden about-grid-bg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(167,2,204,0.015)_0%,rgba(255,255,255,1)_70%)] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                Ready to Build Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#A702CC] via-[#D301A8] to-[#FF6F00] mt-1">
                  AI Workforce?
                </span>
              </h2>
              
              <p className="text-base sm:text-lg text-gray-655 max-w-2xl mx-auto leading-relaxed">
                Connect with our systems consultants to build secure automations connecting your SAP/Oracle databases with autonomous agents.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  to="/live-demo"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-[#A702CC] via-[#D301A8] to-[#FF6F00] hover:scale-[1.02] text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-md shadow-purple-500/20 text-sm"
                >
                  Schedule Demo
                  <ArrowRight size={16} className="ml-2" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 font-bold py-3.5 px-8 rounded-xl border border-gray-300 hover:border-purple-300 hover:text-[#A702CC] transition-all duration-300 shadow-sm hover:scale-[1.02] text-sm"
                >
                  Talk to an Expert
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;
