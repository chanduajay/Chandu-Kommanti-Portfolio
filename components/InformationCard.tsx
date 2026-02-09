
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { X, Code, Briefcase, GraduationCap, Trophy, Mail, Github, Linkedin, Award, Target, Rocket, Phone, Star, ExternalLink, ShieldCheck, Database, Layout, Brain, Users, FileText, Download, Sparkles } from 'lucide-react';

interface InformationCardProps {
  section: string;
  isVisible: boolean;
  onClose: () => void;
}

export const InformationCard: React.FC<InformationCardProps> = ({ section, isVisible, onClose }) => {
  if (!isVisible) return null;

  const content: Record<string, React.ReactNode> = {
    'Avatar': (
      <div className="space-y-8">
        <div className="space-y-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 text-cyan-500 mb-1">
             <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Sparkles size={20} className="animate-pulse" />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">Verified Identity</span>
          </div>
          
          <div className="space-y-0.5">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-heading leading-none">
              CHANDU AJAY
            </h2>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-cyan-500 font-heading leading-none drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
              KOMMANTI
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-widest border-b border-white/5 pb-6">
            Entry-Level Software Developer <span className="text-white/20 px-2">|</span> AI & Web Technologies
          </p>
        </div>

        <div className="bg-slate-900/40 p-6 rounded-[2rem] border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.2)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors">
                <Rocket size={56} />
            </div>
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.4em] mb-2 italic">Professional Mission</p>
            <h3 className="text-lg font-bold text-white leading-tight">Building Smart, Scalable & Reliable Applications</h3>
        </div>

        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {['Python', 'Java', 'AI & ML', 'Full Stack', 'SQL', 'Cloud Basics'].map(s => (
            <span key={s} className="px-4 py-2 bg-white/5 text-[10px] text-slate-300 font-bold uppercase rounded-xl border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all cursor-default shadow-[0_0_10px_rgba(255,255,255,0.02)]">
              [ <span className="px-1 text-cyan-400">{s}</span> ]
            </span>
          ))}
        </div>

        <div className="space-y-5">
            <p className="text-slate-300 text-[13px] sm:text-sm leading-relaxed font-medium border-l-2 border-cyan-500/40 pl-4">
              I am a Computer Science graduate specializing in AI & Data Science, with strong interest in software development and emerging technologies. I have hands-on experience in building full-stack and AI-based applications through academic projects and internships.
            </p>
            <p className="text-slate-300 text-[13px] sm:text-sm leading-relaxed font-medium border-l-2 border-indigo-500/40 pl-4">
              I am passionate about learning new technologies, solving real-world problems, and contributing to high-quality software solutions in a professional environment.
            </p>
        </div>
      </div>
    ),
    'About': (
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-indigo-400">
          <div className="p-3 bg-indigo-400/10 rounded-2xl border border-indigo-400/30 shadow-[0_0_15px_rgba(129,140,248,0.2)]"><Target size={28} /></div>
          <h2 className="text-xl font-bold uppercase text-white font-heading">About Me</h2>
        </div>
        <div className="p-5 bg-slate-900/40 rounded-[2rem] border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.03)]">
          <p className="text-slate-300 text-sm leading-relaxed font-medium">
            Passionate about building intellectual systems that solve real-world problems. Experienced in coordination as an L1 SPOC and department lead for AI & DS projects.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2">
            {[
                { icon: <ShieldCheck size={14} />, text: "Professional Growth Enthusiast" },
                { icon: <Rocket size={14} />, text: "Innovation Driven Developer" },
                { icon: <Users size={14} />, text: "Collaborative Team Lead" }
            ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2 bg-indigo-500/5 rounded-xl border border-indigo-500/20 text-slate-300 text-[11px] font-bold uppercase tracking-tight shadow-[0_0_10px_rgba(99,102,241,0.1)] transition-all hover:border-indigo-400/40">
                    {item.icon}
                    {item.text}
                </div>
            ))}
        </div>
      </div>
    ),
    'Skills': (
      <div className="space-y-5">
        <div className="flex items-center gap-4 text-emerald-400">
          <div className="p-3 bg-emerald-400/10 rounded-2xl border border-emerald-400/30 shadow-[0_0_20px_rgba(52,211,153,0.2)]"><Code size={28} /></div>
          <h2 className="text-xl font-bold uppercase text-white font-heading">Technical Arsenal</h2>
        </div>
        <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-3 custom-scrollbar">
          {/* Programming Languages */}
          <div className="bg-slate-900/40 p-5 rounded-3xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] group hover:border-emerald-500/40 transition-all">
            <div className="flex items-center gap-2 mb-3">
                <Code size={14} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Programming & Web</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Core Java', 'SQL', 'HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'React.js'].map(s => (
                <span key={s} className="px-3 py-1.5 bg-slate-800 text-[10px] text-slate-200 font-bold uppercase rounded-lg border border-white/5 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors cursor-default">{s}</span>
              ))}
            </div>
          </div>

          {/* Tools & Frameworks */}
          <div className="bg-slate-900/40 p-5 rounded-3xl border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)] group hover:border-cyan-500/40 transition-all">
            <div className="flex items-center gap-2 mb-3">
                <Layout size={14} className="text-cyan-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tools & Frameworks</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Git', 'GitHub', 'Visual Studio', 'Flask', 'MS Office (Word/Excel/PPT)'].map(s => (
                <span key={s} className="px-3 py-1.5 bg-slate-800 text-[10px] text-cyan-200/70 font-bold uppercase rounded-lg border border-white/5 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors cursor-default">{s}</span>
              ))}
            </div>
          </div>

          {/* Databases & Proficiencies */}
          <div className="bg-slate-900/40 p-5 rounded-3xl border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)] group hover:border-amber-500/40 transition-all">
            <div className="flex items-center gap-2 mb-3">
                <Database size={14} className="text-amber-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Databases & Concepts</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['MySQL', 'MongoDB', 'DBMS', 'Data Structures', 'OOP', 'SDLC'].map(s => (
                <span key={s} className="px-3 py-1.5 bg-slate-800 text-[10px] text-amber-200/70 font-bold uppercase rounded-lg border border-white/5 hover:bg-amber-500/10 hover:text-amber-400 transition-colors cursor-default">{s}</span>
              ))}
            </div>
          </div>

          {/* Advanced domains */}
          <div className="bg-slate-900/40 p-5 rounded-3xl border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)] group hover:border-indigo-500/40 transition-all">
            <div className="flex items-center gap-2 mb-3">
                <Brain size={14} className="text-indigo-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Advanced Domains</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['AI and ML', 'Deep Learning', 'Neural Networks', 'Predictive Analysis'].map(s => (
                <span key={s} className="px-3 py-1.5 bg-slate-800 text-[10px] text-indigo-300 font-bold uppercase rounded-lg border border-white/5 hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors cursor-default">{s}</span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-slate-900/40 p-5 rounded-3xl border border-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.05)] transition-all hover:border-rose-500/20">
            <div className="flex items-center gap-2 mb-3">
                <Users size={14} className="text-rose-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interpersonal</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Teamwork', 'Problem-Solving', 'Adaptability', 'Time Management', 'Learning Agility', 'Effective Communication'].map(s => (
                <span key={s} className="px-3 py-1.5 bg-slate-800 text-[9px] text-rose-200/50 font-black uppercase rounded-lg border border-white/5">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    'Projects': (
      <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-3 custom-scrollbar">
        <div className="flex items-center gap-4 text-sky-400 mb-6">
          <div className="p-3 bg-sky-400/10 rounded-2xl border border-sky-400/30 shadow-[0_0_20px_rgba(56,189,248,0.2)]"><Briefcase size={28} /></div>
          <h2 className="text-xl font-bold uppercase text-white tracking-widest font-heading">Academic Projects</h2>
        </div>
        {[
          { 
              t: 'Career Compass Advisor', 
              d: 'Engineered a full-stack application that evaluates resumes using TypeScript and AI-based analysis, delivering 85%+ accurate career recommendations and reducing manual research time by 60%.', 
              l: 'AI Analysis',
              metrics: '85%+ Accuracy'
          },
          { 
              t: 'Real Time Weather Dashboard', 
              d: 'Deployed a real-time application delivering 98% accurate updates for 100,000+ cities with optimized performance and 95%+ cross-device compatibility.', 
              l: 'Data Sync',
              metrics: '98% Accurate'
          },
          { 
              t: 'Covid-19 Diagnostic Web', 
              d: 'Developed a detection system using deep learning (CNN) with 93.3% validation accuracy, processing chest X-rays via Flask web interface with real-time predictions.', 
              l: 'Deep Learning',
              metrics: '100% Precision'
          }
        ].map(p => (
          <div key={p.t} className="p-6 bg-slate-900 rounded-[2rem] border border-sky-500/20 group hover:bg-slate-800 transition-all shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:translate-y-[-2px]">
            <div className="flex justify-between items-start mb-3">
                <h4 className="text-white font-bold text-sm uppercase leading-tight tracking-tight font-heading group-hover:text-sky-400 transition-colors">{p.t}</h4>
                <div className="bg-sky-500/10 px-2 py-0.5 rounded text-[8px] font-bold text-sky-400 uppercase tracking-tighter border border-sky-500/30 shadow-[0_0_10px_rgba(56,189,248,0.2)]">{p.metrics}</div>
            </div>
            <p className="text-[12px] text-slate-400 leading-relaxed mb-4">{p.d}</p>
            <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-sky-500 drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]" />
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">{p.l}</span>
            </div>
          </div>
        ))}
      </div>
    ),
    'Education': (
      <div className="space-y-5">
        <div className="flex items-center gap-4 text-amber-500">
          <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]"><GraduationCap size={28} /></div>
          <h2 className="text-xl font-bold uppercase text-white tracking-widest font-heading">Academic History</h2>
        </div>
        <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-amber-500/20 relative overflow-hidden shadow-[0_0_25px_rgba(245,158,11,0.15)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
            <h4 className="text-white font-bold text-base uppercase leading-tight tracking-tight font-heading">B.Tech in CSE (AI & DS)</h4>
            <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-[0.2em]">Kakinada Institute of Engineering & Technology</p>
            <div className="mt-8 flex items-baseline gap-4">
                <span className="text-6xl font-bold text-white tracking-tighter font-heading drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">7.69</span>
                <span className="text-[12px] font-bold text-amber-500 uppercase tracking-[0.3em]">CGPA</span>
            </div>
            <div className="absolute top-6 right-6 text-[10px] font-bold text-amber-500 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]">2021-2025</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-900/60 rounded-[1.5rem] border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:border-amber-500/30 transition-all">
                <div className="text-[9px] text-slate-500 font-bold uppercase mb-2 tracking-widest">Intermediate</div>
                <div className="text-xl font-bold text-white font-heading">82%</div>
                <div className="text-[8px] text-slate-600 font-bold mt-1">Pragati Junior College</div>
            </div>
            <div className="p-5 bg-slate-900/60 rounded-[1.5rem] border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:border-amber-500/30 transition-all">
                <div className="text-[9px] text-slate-500 font-bold uppercase mb-2 tracking-widest">SSC (10th)</div>
                <div className="text-xl font-bold text-white font-heading">93%</div>
                <div className="text-[8px] text-slate-600 font-bold mt-1">Pragati Little Public-School</div>
            </div>
        </div>
      </div>
    ),
    'Certifications': (
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-yellow-500 mb-6">
            <div className="p-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.2)]"><Award size={28} /></div>
            <h2 className="text-xl font-bold uppercase text-white tracking-widest font-heading">Validation</h2>
          </div>
          {[
            { t: 'AI Digital Skills', i: 'Accenture', d: 'Cloud & AI Ethics' },
            { t: 'Python Professional', i: 'Open EDG Python Institute', d: 'Advanced Logic & Scripting' },
            { t: 'Career Essentials', i: 'GITHUB', d: 'Version Control & Workflow' }
          ].map((cert, idx) => (
              <div key={idx} className="flex items-center gap-5 p-5 bg-slate-900 rounded-[1.5rem] border border-yellow-500/10 group hover:bg-slate-800 transition-all shadow-[0_0_15px_rgba(234,179,8,0.08)] hover:border-yellow-500/30">
                  <div className="p-3 bg-yellow-500/5 rounded-xl border border-yellow-500/20 text-yellow-500 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(234,179,8,0.15)]">
                    <Award size={22} />
                  </div>
                  <div>
                      <div className="text-xs font-bold text-white uppercase leading-tight tracking-tight font-heading group-hover:text-yellow-400 transition-colors">{cert.t}</div>
                      <div className="text-[9px] text-yellow-500/60 font-bold uppercase mt-1 tracking-widest">{cert.i}</div>
                      <div className="text-[8px] text-slate-500 font-medium mt-1 italic">{cert.d}</div>
                  </div>
              </div>
          ))}
        </div>
    ),
    'Achievements': (
        <div className="space-y-5">
          <div className="flex items-center gap-4 text-purple-500 mb-6">
            <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]"><Star size={28} /></div>
            <h2 className="text-xl font-bold uppercase text-white tracking-widest font-heading">Achievements</h2>
          </div>
          <div className="p-10 bg-gradient-to-br from-slate-900 to-black rounded-[3rem] border border-purple-500/30 text-center shadow-[0_0_30px_rgba(168,85,247,0.2)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.15)_0%,_transparent_70%)]" />
              <div className="relative z-10 flex justify-center gap-2 mb-6">
                  {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="#fbbf24" className="text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)] group-hover:scale-110 transition-transform duration-500" style={{ transitionDelay: `${i * 100}ms` }} />)}
              </div>
              <div className="relative z-10 text-3xl font-bold text-white uppercase tracking-tighter leading-none font-heading group-hover:text-purple-300 transition-colors">5-Star Badges</div>
              <p className="relative z-10 text-[10px] text-purple-400 font-bold uppercase mt-3 tracking-[0.3em] drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">Python & SQL Mastery @ HackerRank</p>
          </div>
          <div className="p-6 bg-slate-900/80 border border-white/10 rounded-[2rem] flex items-center gap-5 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:border-cyan-400/30 transition-all">
              <div className="p-3 bg-cyan-400/10 rounded-xl text-cyan-400 border border-cyan-400/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]"><Trophy size={20} /></div>
              <div>
                  <div className="text-[10px] font-bold text-white uppercase tracking-widest">Leadership Role</div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase mt-1 leading-tight">L1 and SPOC for AI & DS Academic Projects Division</p>
              </div>
          </div>
        </div>
    ),
    'Contact': (
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-cyan-400 mb-4">
            <div className="p-3 bg-cyan-400/10 rounded-2xl border border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]"><Phone size={28} /></div>
            <h2 className="text-xl font-bold uppercase text-white tracking-widest font-heading">Connect</h2>
          </div>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              
              {/* DOWNLOAD RESUME BLOCK */}
              <a 
                href="#" 
                target="_blank" 
                className="flex items-center gap-5 p-6 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2rem] hover:from-indigo-500 hover:to-indigo-700 transition-all border border-indigo-300/40 group shadow-[0_0_30px_rgba(99,102,241,0.4)] mb-2"
                onClick={(e) => {
                  const driveLink = ""; // ADD YOUR LINK HERE
                  if(!driveLink) {
                    e.preventDefault();
                    alert("Resume download link is coming soon! Please check back later.");
                  } else {
                    window.open(driveLink, '_blank');
                  }
                }}
              >
                <div className="p-4 bg-white/20 rounded-2xl text-white group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    <Download size={26} strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                    <div className="text-[9px] text-indigo-200 font-bold uppercase mb-1 tracking-widest">Full Portfolio</div>
                    <div className="text-sm sm:text-lg font-bold text-white uppercase tracking-tight font-heading">Download My Resume</div>
                </div>
              </a>

              <a href="mailto:kommantichandu@gmail.com" className="flex items-center gap-5 p-6 bg-slate-900 rounded-[2rem] hover:bg-slate-800 transition-all border border-rose-500/20 group shadow-[0_0_20px_rgba(225,29,72,0.1)] hover:border-rose-500/40">
                <div className="p-4 bg-rose-500/10 rounded-2xl text-rose-500 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(225,29,72,0.2)]">
                    <Mail size={26} strokeWidth={2.5} />
                </div>
                <div className="min-w-0">
                    <div className="text-[9px] text-slate-500 font-bold uppercase mb-1 tracking-widest">Direct Signal</div>
                    <div className="text-xs sm:text-base font-black text-white truncate lowercase">kommantichandu@gmail.com</div>
                </div>
              </a>

              <div className="grid grid-cols-2 gap-4">
                <a href="https://linkedin.com/in/chandu-kommanti" target="_blank" className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-[2.5rem] hover:bg-[#0077b5] transition-all border border-blue-500/20 group shadow-[0_0_20px_rgba(0,119,181,0.2)] hover:border-blue-400/50 overflow-hidden relative">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Linkedin size={32} className="text-blue-400 group-hover:text-white transition-colors relative z-10 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]" strokeWidth={2.5} />
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-white uppercase mt-4 tracking-[0.3em] relative z-10">LinkedIn</span>
                </a>
                <a href="https://github.com/chanduajay" target="_blank" className="flex flex-col items-center justify-center p-8 bg-slate-900 rounded-[2.5rem] hover:bg-[#24292e] transition-all border border-white/10 group shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:border-white/30 overflow-hidden relative">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Github size={32} className="text-white group-hover:scale-110 transition-transform relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" strokeWidth={2.5} />
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-white uppercase mt-4 tracking-[0.3em] relative z-10">GitHub</span>
                </a>
              </div>
              <div className="p-6 bg-slate-900/50 rounded-[2rem] border border-white/5 flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                  <Phone size={14} className="text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em]">9491684273</span>
              </div>
          </div>
        </div>
    )
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center pointer-events-none p-4 sm:p-10">
      {/* Background Mask */}
      <div className={`absolute inset-0 bg-slate-950/40 backdrop-blur-sm pointer-events-auto sm:hidden transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      
      <div 
        className={`
          relative w-full max-w-xl pointer-events-auto shadow-[0_0_80px_rgba(6,182,212,0.25)]
          transition-all duration-700 cubic-bezier-bounce
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-40 opacity-0 sm:scale-90'}
        `}
      >
        {/* Card Container with Luminous Glow */}
        <div className="relative bg-slate-950 border border-cyan-500/30 rounded-[3rem] sm:rounded-[4rem] p-10 sm:p-14 max-h-[85vh] overflow-hidden flex flex-col shadow-[inset_0_0_40px_rgba(6,182,212,0.1)] ring-1 ring-cyan-500/20">
          
          {/* Header Progress indicator with Pulse */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-pulse" />
          
          {/* Close Action */}
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-10 right-10 p-3.5 rounded-2xl bg-white/5 text-slate-400 hover:text-white transition-all active:scale-90 border border-white/10 z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:border-cyan-400/40 hover:bg-cyan-400/10"
          >
            <X size={24} strokeWidth={4} />
          </button>

          {/* Scaled Content Area */}
          <div className="overflow-y-auto custom-scrollbar flex-1 pr-2">
            <div className="sm:hidden w-16 h-1.5 bg-cyan-500/20 rounded-full mx-auto mb-10 shadow-inner" onClick={onClose} />
            <div className="animate-in slide-in-from-bottom-10 fade-in duration-1000 fill-mode-both">
              {content[section] || content['Avatar']}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
