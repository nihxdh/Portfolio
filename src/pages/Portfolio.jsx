import React, { useState, useEffect } from 'react';
import { EnvelopeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Layers, Download } from 'lucide-react';
import { FaReact, FaJs } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';
import TextType from '../components/TextType';
import MouseSpotlight from '../components/MouseSpotlight';
import ExpandableProjectCard from '../components/ExpandableProjectCard';
import ContactForm from '../components/ContactForm';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isContactHovered, setIsContactHovered] = useState(false);

  // Smooth scroll function
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for any fixed headers
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Handle navigation clicks
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setActiveSection(sectionId);
    smoothScrollTo(sectionId);
  };

  useEffect(() => {
    // Import Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Calibre:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset contact hover state when scrolling or changing sections
  useEffect(() => {
    const handleScrollReset = () => {
      if (isContactHovered) {
        setIsContactHovered(false);
      }
    };

    window.addEventListener('scroll', handleScrollReset);
    return () => window.removeEventListener('scroll', handleScrollReset);
  }, [isContactHovered]);

  // Reset contact hover state when active section changes
  useEffect(() => {
    if (activeSection !== 'contact' && isContactHovered) {
      setIsContactHovered(false);
    }
  }, [activeSection, isContactHovered]);
  const projects = [
    {
      id: 1,
      title: "HIRA+ Management System",
      description: "HIRA+ Management System is a full-stack organizational management platform designed to streamline the daily operations of community and institutional organizations. It acts as a centralized hub for handling everything from member and staff management to meals, travel, meetings, and billing — transforming traditional manual workflows into efficient, data-driven processes.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "JWT Auth", "AWS S3", "OneSignal", "WhatsApp API"],
      githubLink: "https://github.com/nihxdh/hira-plus",
      liveLink: "https://hira-plus.com",
      category: "Full-Stack",
      detailedContent: (
        <div className="space-y-4">
          <p>
            HIRA+ Management System revolutionizes organizational management by digitizing traditional manual workflows into efficient, data-driven processes. The platform serves as a centralized hub for community and institutional organizations, handling everything from member and staff management to meals, travel, meetings, and billing operations.
          </p>
          <p>
            The system features a dual-portal architecture with an Admin Panel for overall management and a Leaders Portal for meeting coordination and scheduling. Through role-based access control, each user — from administrators to department heads, drivers, and staff — can access features relevant to their responsibilities. Real-time communication is supported through push notifications and WhatsApp integration, ensuring seamless coordination across departments.
          </p>
          <p>
            HIRA+ automates core activities such as meal tracking, vehicle management, meeting scheduling, and billing. It includes smart conflict detection, guest meal billing, and department-wise financial reporting, allowing organizations to operate with greater accuracy and transparency. Reports and analytics can be exported in both PDF and Excel formats for quick review and auditing.
          </p>
          <p>
            Built with modern web technologies including React, Node.js, and MongoDB, the platform ensures scalability and performance. The system integrates with AWS S3 for file storage, OneSignal for push notifications, and WhatsApp API for communication. Overall, HIRA+ serves as a digital office manager, offering a complete, scalable solution that enhances efficiency, minimizes human error, and provides clear visibility into all operations — enabling leadership teams to focus on decision-making rather than administrative tasks.
          </p>
        </div>
      )
    },
    {
      id: 2,
      title: "Zaitoon Kids",
      description: "Zai Toon Kids is a cross-platform mobile app that delivers bilingual educational stories for children ages 5-12 through webtoon-style visuals and 3D animations. Developed with Kerala's Malarvadi Children's Organization, it provides a safe digital reading experience that promotes language development and cultural values.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Flutter", "Dart"],
      category: "Full-Stack",
      detailedContent: (
        <div className="space-y-4">
          <p>
          Zai Toon Kids addresses the need for engaging educational content that bridges traditional storytelling with modern technology for young readers. The app solves the challenge of keeping children interested in reading while developing strong language skills in both English and Malayalam.
          </p>
          <p>
          The platform makes reading accessible for tech-savvy children naturally drawn to visual content, while helping preserve Malayalam language learning and providing parents with a safe, ad-free digital environment. By combining webtoon format with educational stories, it transforms screen time into productive learning time.
          </p>
          <p>
          The project targets the gap in quality bilingual content for Indian children, offering culturally relevant stories that teach moral values and build reading confidence. It serves as a digital bridge between traditional Kerala storytelling culture and modern interactive media for families maintaining cultural connections.
          </p>
          <p>
          As part of my contributions to the project, one of my most notable achievements was developing a comprehensive backend system for the app's quiz functionality that manages the entire assessment workflow seamlessly. The system randomly selects questions from a curated question bank, enforces configurable time limits and question counts set through the backend, and handles real-time answer validation with automated scoring. I built a single, robust API that processes all quiz operations including question delivery, answer submission, correct answer evaluation, and instant result calculation. This backend infrastructure successfully supported large-scale usage, efficiently managing quiz sessions for over 10,000 students while maintaining optimal performance and accurate score processing throughout the assessment periods.
          </p>
        </div>
      )
    },
    {
      id: 3,
      title: "Alba Marine Enterprises",
      description: "Alba Marine Enterprises is an enterprise management system for peeling shed operations that automates employee work tracking, weekly payroll distribution, and dealer billing processes. The system handles token-based work counting, wage calculations with bonus allocations, and streamlines operational workflows from employee management to dealer transactions.",
      technologies: ["React", "Express", "MongoDB", "Node.js", "Tailwind"],
      liveLink: "https://your-task-app-demo.com",
      category: "Full-Stack",
      detailedContent: (
        <div className="space-y-4">
          <p>
          Alba Marine Enterprises digitizes traditional peeling shed operations by replacing manual tracking systems with automated workforce and business management. The platform addresses complex challenges of managing employee productivity, ensuring accurate wage distribution, and maintaining transparent dealer transactions in an industry requiring precision and trust.
          </p>
          <p>
          The system revolutionizes workforce management through token-based tracking, where employees receive tokens for completed work units, enabling precise productivity measurement and fair compensation. This eliminates disputes over work counts while providing management with real-time operational insights and performance analytics across shifts.
          </p>
          <p>
          Beyond payroll automation, the platform manages dealer billing, meat distribution logistics, and vehicle coordination. The intelligent wage calculation incorporates bonus structures, seasonal festival allowances like Onam bonuses, and performance-based incentives, ensuring accurate compensation while maintaining operational profitability.
          </p>
          <p>
          The solution transforms fragmented manual processes into a unified digital ecosystem, providing transparency, accuracy, and efficiency. By automating critical functions from employee management to dealer invoicing, Alba Marine Enterprises enables sustainable growth while preserving fair labor practices and community-centered business values
          </p>
        </div>
      )
    }
  ];



    return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row relative">
      {/* Mouse Spotlight Effect */}
      <MouseSpotlight />

      {/* Fixed Left Side - Hidden on mobile, visible on desktop */}
       <div className={`hidden lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[55%] lg:flex-col lg:justify-between lg:py-22 lg:pl-23 transition-all duration-500 ${isContactHovered ? 'blur-sm' : ''}`}>
         <div className="flex flex-col items-center lg:items-start">
           <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-200 via-white to-slate-300 bg-clip-text text-transparent sm:text-5xl font-calibre">
                <TextType
                  text={[
                    "Hello World! 👋",
                    "K A NIHADH MUHAMMED"
                  ]}
              as="span"
              className="text-3xl font-bold tracking-tight text-slate-200 sm:text-4xl whitespace-nowrap font-calibre"
                  typingSpeed={100}
                  deletingSpeed={50}
                  pauseDuration={3000}
                  loop={false}
                  showCursor={true}
                  cursorCharacter="|"
              cursorClassName="text-slate-200"
              textColors={["#e2e8f0", "#e2e8f0"]}
                  textSizes={["text-2xl sm:text-3xl", "text-3xl sm:text-5xl"]}
                  startOnVisible={true}
                />
          </h1>
                     <div className="w-16 h-px bg-slate-600 mt-4 mb-3"></div>
           <h2 className="text-base font-medium tracking-tight text-slate-300 sm:text-lg text-center lg:text-left font-calibre">
                 Full-Stack Developer
               </h2>
           <p className="mt-3 max-w-xs leading-normal text-slate-400 text-sm text-center lg:text-left font-calibre">
           From vision to version
           </p>
           
           {/* Navigation */}
           <nav className="nav hidden lg:block mt-16 ml-8" aria-label="In-page jump links">
             <ul className="w-max flex flex-col items-center lg:items-start">
              <li>
                <a 
                  className={`group flex items-center py-3 cursor-pointer transition-all duration-300 ${activeSection === 'about' ? 'active' : ''}`} 
                  href="#about"
                  onClick={(e) => handleNavClick(e, 'about')}
                >
                  <span className={`nav-indicator mr-4 h-px w-8 transition-all duration-500 group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${activeSection === 'about' ? 'w-16 bg-slate-200' : 'bg-slate-600'}`}></span>
                  <span className={`nav-text text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:text-slate-200 group-focus-visible:text-slate-200 ${activeSection === 'about' ? 'text-slate-200' : 'text-slate-500'}`}>About</span>
                </a>
              </li>
              <li>
                <a 
                  className={`group flex items-center py-3 cursor-pointer transition-all duration-300 ${activeSection === 'experience' ? 'active' : ''}`} 
                  href="#experience"
                  onClick={(e) => handleNavClick(e, 'experience')}
                >
                  <span className={`nav-indicator mr-4 h-px w-8 transition-all duration-500 group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${activeSection === 'experience' ? 'w-16 bg-slate-200' : 'bg-slate-600'}`}></span>
                  <span className={`nav-text text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:text-slate-200 group-focus-visible:text-slate-200 ${activeSection === 'experience' ? 'text-slate-200' : 'text-slate-500'}`}>Experience</span>
                </a>
              </li>
              <li>
                <a 
                  className={`group flex items-center py-3 cursor-pointer transition-all duration-300 ${activeSection === 'projects' ? 'active' : ''}`} 
                  href="#projects"
                  onClick={(e) => handleNavClick(e, 'projects')}
                >
                  <span className={`nav-indicator mr-4 h-px w-8 transition-all duration-500 group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${activeSection === 'projects' ? 'w-16 bg-slate-200' : 'bg-slate-600'}`}></span>
                  <span className={`nav-text text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:text-slate-200 group-focus-visible:text-slate-200 ${activeSection === 'projects' ? 'text-slate-200' : 'text-slate-500'}`}>Projects</span>
                </a>
              </li>
              
              <li>
                <a 
                  className={`group flex items-center py-3 cursor-pointer transition-all duration-300 ${activeSection === 'contact' ? 'active' : ''}`} 
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                >
                  <span className={`nav-indicator mr-4 h-px w-8 transition-all duration-500 group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${activeSection === 'contact' ? 'w-16 bg-slate-200' : 'bg-slate-600'}`}></span>
                  <span className={`nav-text text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:text-slate-200 group-focus-visible:text-slate-200 ${activeSection === 'contact' ? 'text-slate-200' : 'text-slate-500'}`}>Contact</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        
                 {/* Social Links */}
         <ul className="ml-1 mt-12 flex items-center justify-center lg:justify-start font-calibre" aria-label="Social media">
          <li className="mr-5 shrink-0 text-xs">
            <a className="block hover:text-slate-200" href="https://github.com/nihxdh" target="_blank" rel="noreferrer noopener" aria-label="GitHub (opens in a new tab)" title="GitHub">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
          </li>
          <li className="mr-5 shrink-0 text-xs">
            <a className="block hover:text-slate-200" href="https://www.linkedin.com/in/nihadh-muhammed-244a6122a/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn (opens in a new tab)" title="LinkedIn">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
          </li>
          <li className="mr-5 shrink-0 text-xs">
            <a className="block hover:text-slate-200" href="mailto:nihadabu07@gmail.com" aria-label="Email" title="Email">
              <span className="sr-only">Email</span>
              <Mail className="h-6 w-6" />
            </a>
          </li>
          <li className="mr-0 shrink-0 text-xs">
            <a 
              className="block hover:text-slate-200" 
              href="/K A NIHADH MUHAMMED.pdf" 
              download="K A NIHADH MUHAMMED.pdf"
              aria-label="Download Resume" 
              title="Download Resume"
            >
              <span className="sr-only">Download Resume</span>
              <Download className="h-6 w-6" />
            </a>
          </li>
        </ul>
        
        {/* Location Section */}
        <div className="ml-1 mt-16 flex items-center justify-center lg:justify-start font-calibre">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-slate-500 mr-3" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              KOCHI-KERALA
            </span>
          </div>
        </div>
            </div>

      {/* Mobile Hero Section - Photo with Overlay */}
      <section className="lg:hidden -mt-4 pb-16 px-4 flex flex-col items-center justify-center min-h-screen">
        {/* Large Photo with Overlay */}
        <div className="relative w-[350px] h-[450px] sm:w-[400px] sm:h-[500px] md:w-[450px] md:h-[550px] mx-auto mb-8 ml-0 sm:ml-auto">
          <img 
            src="/Remove background project.png" 
            alt="Nihadh - Full Stack Developer" 
            className="w-full h-full object-cover rounded-2xl filter grayscale hover:grayscale-0 transition-all duration-500 hover:scale-[1.02] shadow-2xl"
          />
          {/* Name Overlay at Bottom of Photo */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-2xl p-4">
             <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-calibre text-center ml-7 sm:ml-0">
              <TextType
                text={[
                  "Hello World! 👋",
                  "K A NIHADH MUHAMMED"
                ]}
                as="span"
                className="text-xl sm:text-2xl font-bold tracking-tight text-white font-calibre"
                typingSpeed={100}
                deletingSpeed={50}
                pauseDuration={3000}
                loop={false}
                showCursor={true}
                cursorCharacter="|"
                cursorClassName="text-white"
                textColors={["#ffffff", "#ffffff"]}
                textSizes={["text-lg sm:text-xl", "text-xl sm:text-2xl"]}
                startOnVisible={true}
              />
            </h1>
          </div>
        </div>
        
        {/* Title and Tagline Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-px bg-slate-600 mx-auto mb-3"></div>
          <h2 className="text-base font-medium tracking-tight text-slate-300 font-calibre">
            Full-Stack Developer
          </h2>
          <p className="mt-3 text-slate-400 text-sm font-calibre">
            From vision to version
          </p>
        </div>
        
        {/* Mobile Navigation Section */}
        <nav className="mb-12" aria-label="In-page jump links">
          <ul className="flex flex-col items-center space-y-4">
            {['about', 'experience', 'projects', 'contact'].map((section) => (
              <li key={section}>
                <a 
                  className={`group flex items-center py-2 cursor-pointer transition-all duration-300 ${activeSection === section ? 'active' : ''}`} 
                  href={`#${section}`}
                  onClick={(e) => handleNavClick(e, section)}
                >
                  <span className={`nav-indicator mr-3 h-px w-6 transition-all duration-500 group-hover:w-12 group-hover:bg-slate-200 group-focus-visible:w-12 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${activeSection === section ? 'w-12 bg-slate-200' : 'bg-slate-600'}`}></span>
                  <span className={`nav-text text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:text-slate-200 group-focus-visible:text-slate-200 ${activeSection === section ? 'text-slate-200' : 'text-slate-500'}`}>{section}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile Social Links */}
        <div className="mb-8 flex items-center justify-center space-x-6">
          <a className="block hover:text-slate-200 transition-colors" href="https://github.com/nihxdh" target="_blank" rel="noreferrer noopener" aria-label="GitHub">
            <Github className="h-6 w-6" />
          </a>
          <a className="block hover:text-slate-200 transition-colors" href="https://linkedin.com" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
            <Linkedin className="h-6 w-6" />
          </a>
          <a className="block hover:text-slate-200 transition-colors" href="mailto:nihadabu07@gmail.com" aria-label="Email">
            <Mail className="h-6 w-6" />
          </a>
          <a 
            className="block hover:text-slate-200 transition-colors" 
            href="/K A NIHADH MUHAMMED.pdf" 
            download="K A NIHADH MUHAMMED.pdf"
            aria-label="Download Resume"
          >
            <Download className="h-6 w-6" />
          </a>
        </div>
        
        {/* Mobile Location */}
        <div className="flex items-center justify-center">
          <MapPin className="h-4 w-4 text-slate-500 mr-2" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 font-calibre">
            KOCHI-KERALA
          </span>
        </div>
      </section>

                   {/* Scrollable Right Side */}
       <div className="lg:w-[68%] lg:py-18 lg:ml-8">
        {/* Desktop Hero Photo Section */}
        <section className="hidden lg:block px-8 md:px-40 pt-0 pb-12 flex items-center justify-center min-h-screen">
          <div className="relative max-w-5xl mx-auto">
                  <img 
                    src="/Remove background project.png" 
                    alt="Nihadh - Full Stack Developer" 
              className="w-[550px] h-[650px] object-cover rounded-2xl filter grayscale hover:grayscale-0 transition-all duration-500 hover:scale-[1.02] shadow-2xl"
                  />
         </div>
       </section>

             {/* About Section */}
         <section id="about" className="px-4 sm:px-8 md:px-24 py-12 lg:py-16 scroll-mt-16 transition-all duration-700 ease-in-out">
           <div className="max-w-4xl mx-auto">
             {/* Mobile Section Heading */}
             <h2 className="lg:hidden text-2xl font-bold text-slate-200 mb-8 text-center font-calibre uppercase tracking-widest">About</h2>
             <div className="space-y-8">
          <div className="transform transition-all duration-700 ease-in-out">
                 <p className="text-gray-300 text-base leading-relaxed mb-4 font-sans transition-all duration-500">
                   I'm a Full-Stack Developer who bridges traditional coding with the AI-powered future, combining foundational web development principles with innovative artificial intelligence integration. Building robust, scalable applications with the MERN stack while actively exploring how artificial intelligence can transform software creation processes is where my passion lies. My approach focuses on creating user-centric solutions that not only meet current needs but also anticipate the evolving landscape of modern web development.
                 </p>
                 <p className="text-gray-300 text-base leading-relaxed mb-4 font-sans transition-all duration-500">
                   I experiment extensively with AI tools throughout my entire development process, from initial code optimization and debugging to creative problem-solving and architectural decision-making. This unique blend of foundational programming skills, modern development practices, and cutting-edge AI exploration allows me to craft innovative, forward-thinking solutions that push the boundaries of what's possible. I believe in leveraging technology to enhance human capability rather than replace it, creating a synergy between traditional coding expertise and AI-assisted development.
                 </p>
                 <p className="text-gray-300 text-base leading-relaxed font-sans transition-all duration-500">
                   My philosophy: the best developers embrace change and never stop learning. Whether debugging React components or testing the latest AI assistant, I approach every challenge with curiosity and creativity.
            </p>
          </div>
             </div>
           </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="px-4 sm:px-8 md:px-16 py-12 lg:py-12 scroll-mt-16 transition-all duration-700 ease-in-out">
          <div className="max-w-4xl mx-auto">
            {/* Mobile Section Heading */}
            <h2 className="lg:hidden text-2xl font-bold text-slate-200 mb-8 text-center font-calibre uppercase tracking-widest">Experience</h2>
            <div className="space-y-8 transform transition-all duration-700 ease-in-out">
              <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-8 hover:bg-gray-800/40 rounded-lg transition-all duration-300 p-4 cursor-pointer group" onClick={() => window.open('https://d4dx.co/', '_blank')}>
                {/* Top Right Arrow */}
                <div className="absolute top-3 right-3 text-gray-400 group-hover:text-white transition-colors duration-300">
                  <ExternalLink className="h-4 w-4" />
                </div>
                
                {/* Left Section - Date */}
                <div className="w-full sm:w-32 flex-shrink-0">
                  <div className="text-left sm:text-right">
                    <div className="text-sm text-gray-400 font-medium">Jun 2025 - Present</div>
                  </div>
                </div>
                
                {/* Right Section - Content */}
                <div className="flex-1">
                  <h4 className="text-xl text-white mb-2 font-bold" style={{ fontFamily: 'Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>MERN Stack Developer</h4>
                  <p className="text-gray-400 text-base mb-2 font-sans">D4DX innovations LLP</p>
                  <p className="text-gray-300 text-sm leading-relaxed font-sans">Proficient in MERN stack with experience building web applications and APIs. Strong JavaScript foundation and collaborative development skills. Committed to delivering quality code and continuous learning.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 hover:bg-gray-800/40 rounded-lg transition-all duration-300 p-4">
                {/* Left Section - Date */}
                <div className="w-full sm:w-32 flex-shrink-0">
                  <div className="text-left sm:text-right">
                    <div className="text-sm text-gray-400 font-medium">Jun - Jul 2024</div>
                  </div>
                </div>
                
                {/* Right Section - Content */}
                <div className="flex-1">
                <h4 className="text-xl text-white mb-2 font-bold" style={{ fontFamily: 'Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Full Stack Developer Intern</h4>
                  <p className="text-gray-400 text-base mb-2 font-sans">Fixware Technologies</p>
                  <p className="text-gray-300 text-sm leading-relaxed font-sans">Completed one-month Flutter internship gaining real-world mobile development experience during my academic career. Developed cross-platform applications and collaborative coding skills. Enhanced industry workflow knowledge and professional development practices.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Projects Section */}
        <section id="projects" className="px-4 sm:px-8 md:px-16 py-12 lg:py-12 scroll-mt-16 transition-all duration-700 ease-in-out">
          <div className="max-w-4xl mx-auto">
            {/* Mobile Section Heading */}
            <h2 className="lg:hidden text-2xl font-bold text-slate-200 mb-8 text-center font-calibre uppercase tracking-widest">Projects</h2>
            <div className="transform transition-all duration-700 ease-in-out">
              <ExpandableProjectCard projects={projects} />
            </div>
          </div>
        </section>



      {/* Contact Section */}
      <section id="contact" className="px-4 sm:px-8 md:px-24 py-12 lg:py-16 scroll-mt-16 transition-all duration-700 ease-in-out">
        <div className="max-w-4xl mx-auto">
          {/* Mobile Section Heading */}
          <h2 className="lg:hidden text-2xl font-bold text-slate-200 mb-8 text-center font-calibre uppercase tracking-widest">Contact</h2>
          <div className="text-center mb-16">
          </div>

                     <div className="transform transition-all duration-700 ease-in-out">
             
             {/* Contact Form */}
             <ContactForm 
               onHoverStart={() => setIsContactHovered(true)}
               onHoverEnd={() => setIsContactHovered(false)}
             />
             
           </div>
        </div>
      </section>
        </div>
        
        {/* Mobile Footer - Always visible at bottom */}
        <footer className="lg:hidden w-full bg-black/80 border-t border-slate-700 backdrop-blur supports-[backdrop-filter]:bg-black/60 py-1">
          <div className="marquee">
            <div className="marquee-content">
              <div className="marquee-track px-2 py-0.5 flex items-center justify-center">
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">Build With</span>
                <FaReact className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">React</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <FaJs className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">JavaScript</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <SiTailwindcss className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">Tailwind</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <EnvelopeIcon className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">EmailJS</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <SparklesIcon className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">ReactBits</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <Layers className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">Aceternity UI</span>
              </div>
              <div className="marquee-track px-2 py-0.5 flex items-center justify-center">
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">Build With</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <FaReact className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">React</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <FaJs className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">JavaScript</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <SiTailwindcss className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">Tailwind</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <EnvelopeIcon className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">EmailJS</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">Styling In</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <SparklesIcon className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">ReactBits</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <Layers className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">Aceternity UI</span>
              </div>
            </div>
          </div>
        </footer>
        
      {activeSection === 'contact' && (
        <footer className="fixed bottom-0 left-0 right-0 bg-black/80 border-t border-slate-700 backdrop-blur supports-[backdrop-filter]:bg-black/60 z-50 py-1">
          <div className="marquee">
            <div className="marquee-content">
              <div className="marquee-track px-2 py-0.5 flex items-center justify-center">
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">Build With</span>
                <FaReact className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">React</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <FaJs className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">JavaScript</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <SiTailwindcss className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">Tailwind</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <EnvelopeIcon className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">EmailJS</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <SparklesIcon className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">ReactBits</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <Layers className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">Aceternity UI</span>
              </div>
              <div className="marquee-track px-2 py-0.5 flex items-center justify-center">
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">Build With</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <FaReact className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">React</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <FaJs className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">JavaScript</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <SiTailwindcss className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">Tailwind</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <EnvelopeIcon className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">EmailJS</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">Styling In</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <SparklesIcon className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">ReactBits</span>
                <span className="text-slate-600 text-xs mx-1">•</span>
                <Layers className="h-3 w-3 text-white mx-1 flex-shrink-0" />
                <span className="nav-text text-[10px] font-bold uppercase tracking-widest text-slate-200 whitespace-nowrap">Aceternity UI</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Portfolio; 
// Footer appears only on the last section (contact)
// Rendered conditionally using existing activeSection state