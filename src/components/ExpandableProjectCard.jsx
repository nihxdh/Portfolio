import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, ExternalLink, X, Smartphone } from "lucide-react";

const ExpandableProjectCard = ({ projects }) => {
  const [active, setActive] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // Auto-scroll effect for project images
  useEffect(() => {
    if (active && (active.id === 1 || active.id === 2 || active.id === 3) && scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const scrollWidth = scrollContainer.scrollWidth;
      const halfScrollWidth = scrollWidth / 2; // Since we duplicated the content
      
      if (scrollWidth > 0) {
        const interval = setInterval(() => {
          setScrollPosition(prev => {
            const newPosition = prev + 1;
            // When we reach halfway, reset to 0 instantly
            if (newPosition >= halfScrollWidth) {
              return 0;
            }
            return newPosition;
          });
        }, 20); // Faster scrolling

        return () => clearInterval(interval);
      }
    }
  }, [active]);

  // Apply scroll position with instant reset
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const scrollWidth = scrollContainer.scrollWidth;
      const halfScrollWidth = scrollWidth / 2;
      
      if (scrollPosition === 0 && scrollContainer.scrollLeft > 0) {
        // Instant reset without animation
        scrollContainer.style.scrollBehavior = 'auto';
        scrollContainer.scrollLeft = 0;
        scrollContainer.style.scrollBehavior = 'smooth';
      } else {
        scrollContainer.scrollLeft = scrollPosition;
      }
    }
  }, [scrollPosition]);

  // Custom hook for detecting clicks outside the component
  useEffect(() => {
    const listener = (event) => {
      // DO NOTHING if the element being clicked is the target element or their children
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      setActive(null);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="fixed inset-0 bg-black/80 h-full w-full z-50"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1 
              }}
              className="flex absolute top-6 right-6 lg:hidden items-center justify-center z-[101] hover:opacity-80 transition-opacity drop-shadow-lg"
              onClick={() => setActive(null)}
            >
              <X className="h-5 w-5 text-slate-200" />
            </motion.button>
            
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94],
                layout: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              className="w-full max-w-xs sm:max-w-4xl h-[80vh] md:h-fit md:max-h-[90%] flex flex-col bg-black border border-slate-600 rounded-3xl sm:rounded-3xl overflow-hidden mx-4 my-4 sm:mx-0 sm:my-0"
            >
              {/* Images for Hira Plus project (scrollable) */}
              {active.id === 1 && (
                <div className="py-6">
                  <div 
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-hidden pb-4" 
                    style={{
                      scrollBehavior: 'smooth'
                    }}
                  >
                  {/* First set of images */}
                  <img 
                    src="/hira/hiraCover.png" 
                    alt="Hira Plus Cover" 
                    className="w-32 h-48 sm:w-48 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/home.png" 
                    alt="Home Screen" 
                    className="w-20 h-48 sm:w-30 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/calender.png" 
                    alt="Calendar View" 
                    className="w-20 h-48 sm:w-30 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/mealTick.png" 
                    alt="Meal Tick Screen" 
                    className="w-20 h-48 sm:w-30 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/logout.png" 
                    alt="Logout Screen" 
                    className="w-20 h-48 sm:w-30 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/calanderSchedule.png" 
                    alt="Calendar Schedule" 
                    className="w-80 h-48 sm:w-120 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/adminOverview.png" 
                    alt="Admin Overview" 
                    className="w-80 h-48 sm:w-120 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/conflict.png" 
                    alt="Conflict Management" 
                    className="w-80 h-48 sm:w-120 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/leaderProfile.png" 
                    alt="Leader Profile" 
                    className="w-80 h-48 sm:w-120 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  {/* Duplicate set for infinite scroll */}
                  <img 
                    src="/hira/hiraCover.png" 
                    alt="Hira Plus Cover" 
                    className="w-32 h-48 sm:w-48 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/home.png" 
                    alt="Home Screen" 
                    className="w-20 h-48 sm:w-30 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/calender.png" 
                    alt="Calendar View" 
                    className="w-20 h-48 sm:w-30 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/mealTick.png" 
                    alt="Meal Tick Screen" 
                    className="w-20 h-48 sm:w-30 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/logout.png" 
                    alt="Logout Screen" 
                    className="w-20 h-48 sm:w-30 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/calanderSchedule.png" 
                    alt="Calendar Schedule" 
                    className="w-80 h-48 sm:w-120 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/adminOverview.png" 
                    alt="Admin Overview" 
                    className="w-80 h-48 sm:w-120 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/conflict.png" 
                    alt="Conflict Management" 
                    className="w-80 h-48 sm:w-120 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/hira/leaderProfile.png" 
                    alt="Leader Profile" 
                    className="w-80 h-48 sm:w-120 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  </div>
                </div>
              )}

              {/* Cover Images for Zaitoon Kids project */}
              {active.id === 2 && (
                <div className="py-6">
                  <div 
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-hidden pb-4" 
                    style={{
                      scrollBehavior: 'smooth'
                    }}
                  >
                  {/* First set of images */}
                  <img 
                    src="/zaitoon/zaitoon cover.jpg" 
                    alt="Project Cover" 
                    className="w-32 h-48 sm:w-48 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/zaitoon/zaitoon1.jpg" 
                    alt="Project Screenshot 1" 
                    className="w-24 h-48 sm:w-35 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/zaitoon/zaitoon3.jpg" 
                    alt="Project Screenshot 3" 
                    className="w-22 h-48 sm:w-33 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/zaitoon/zaitoon2.jpg" 
                    alt="Project Screenshot 2" 
                    className="w-23 h-48 sm:w-34 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/zaitoon/quiz result.png" 
                    alt="Quiz Result Screenshot" 
                    className="w-66 h-48 sm:w-99 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/zaitoon/quiz data.png" 
                    alt="Quiz Data Screenshot" 
                    className="w-59 h-48 sm:w-88 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  {/* Duplicate set for infinite scroll */}
                  <img 
                    src="/zaitoon/zaitoon cover.jpg" 
                    alt="Project Cover" 
                    className="w-32 h-48 sm:w-48 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/zaitoon/zaitoon1.jpg" 
                    alt="Project Screenshot 1" 
                    className="w-24 h-48 sm:w-35 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/zaitoon/zaitoon2.jpg" 
                    alt="Project Screenshot 2" 
                    className="w-23 h-48 sm:w-34 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/zaitoon/zaitoon3.jpg" 
                    alt="Project Screenshot 3" 
                    className="w-32 h-48 sm:w-48 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/zaitoon/quiz result.png" 
                    alt="Quiz Result Screenshot" 
                    className="w-66 h-48 sm:w-99 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/zaitoon/quiz data.png" 
                    alt="Quiz Data Screenshot" 
                    className="w-59 h-48 sm:w-88 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  </div>
                </div>
              )}

              {active.id === 3 && (
                <div className="py-6">
                  <div 
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-hidden pb-4" 
                    style={{
                      scrollBehavior: 'smooth'
                    }}
                  >
                  {/* First set of images */}
                  <img 
                    src="/alba/alba1.png" 
                    alt="Project Cover" 
                    className="w-37 h-48 sm:w-55 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/alba/alba2.png" 
                    alt="Project Screenshot 1" 
                    className="w-90 h-48 sm:w-135 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/alba/alba3.png" 
                    alt="Project Screenshot 2" 
                    className="w-90 h-48 sm:w-135 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/alba/alba4.png" 
                    alt="Project Screenshot 3" 
                    className="w-92 h-48 sm:w-138 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/alba/alba5.png" 
                    alt="Project Screenshot 4" 
                    className="w-90 h-48 sm:w-135 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  {/* Duplicate set for infinite scroll */}
                  <img 
                    src="/alba/alba1.png" 
                    alt="Project Cover" 
                    className="w-37 h-48 sm:w-55 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/alba/alba2.png" 
                    alt="Project Screenshot 1" 
                    className="w-90 h-48 sm:w-135 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/alba/alba3.png" 
                    alt="Project Screenshot 2" 
                    className="w-90 h-48 sm:w-135 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/alba/alba4.png" 
                    alt="Project Screenshot 3" 
                    className="w-92 h-48 sm:w-138 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  <img 
                    src="/alba/alba5.png" 
                    alt="Project Screenshot 4" 
                    className="w-90 h-48 sm:w-135 sm:h-65 object-cover rounded-lg border border-slate-600 flex-shrink-0"
                  />
                  </div>
                </div>
              )}
              
              <div className="flex-1 overflow-y-auto" style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#475569 transparent'
              }}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h3
                      className="font-bold text-2xl sm:text-4xl text-white"
                      style={{ fontFamily: 'Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                    >
                      {active.title}
                    </h3>
                    <div className="flex gap-3">
                    {active.id === 1 || active.id === 2 ? (
                      <>
                        <a
                          href={active.id === 1 ? "https://apps.apple.com/in/app/hira-plus/id6745599981" : "https://apps.apple.com/in/app/zai-toon-kids/id6737912105"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 text-white flex items-center justify-center transition-colors hover:opacity-80"
                        >
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                          </svg>
                        </a>
                        <a
                          href={active.id === 1 ? "https://play.google.com/store/apps/details?id=com.d4dx.hiraplus" : "https://play.google.com/store/apps/details?id=co.d4dx.zaitoon"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 text-white flex items-center justify-center transition-colors hover:opacity-80"
                        >
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                          </svg>
                        </a>
                      </>
                    ) : active.id === 3 ? (
                      <>
                        {/* No GitHub button for Alba Marine Enterprises */}
                      </>
                    ) : (
                      <>
                        <a
                          href={active.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 text-sm rounded-full font-bold bg-slate-700 hover:bg-slate-600 text-white flex items-center gap-2 transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          Code
                        </a>
                        <a
                          href={active.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 text-sm rounded-full font-bold bg-green-600 hover:bg-green-500 text-white flex items-center gap-2 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </a>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="px-6 pb-6">
                  <p
                    className="text-slate-300 text-base mb-8"
                  >
                    {active.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {active.technologies.map((tech) => (
                      <span key={tech} className="text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full text-sm border border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="px-6 pb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94], 
                      delay: 0.2 
                    }}
                    className="text-slate-300 text-sm md:text-base leading-relaxed"
                  >
                    {active.detailedContent}
                  </motion.div>
                </div>
              </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      
      <div className="space-y-12">
        {projects.map((project, index) => (
          <motion.div
            key={`card-${project.title}-${id}`}
            onClick={() => setActive(project)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative flex flex-row gap-4 sm:gap-8 hover:bg-gray-800/40 rounded-lg transition-all duration-300 p-4 cursor-pointer group"
          >
            {/* Top Right Arrow */}
            <div className="absolute top-3 right-3 text-gray-400 group-hover:text-white transition-colors duration-300">
              <ExternalLink className="h-4 w-4" />
            </div>
            
            {/* Left Section - Cover Image */}
            <div className="w-24 sm:w-32 flex-shrink-0">
              {project.id === 1 ? (
                <div className="flex items-center justify-center h-full">
                  <img 
                    src="/hira/hiraCover.png" 
                    alt="Project Cover" 
                    className="w-full h-36 sm:h-38 object-cover rounded-lg border border-gray-700"
                  />
                </div>
              ) : project.id === 2 ? (
                <div className="flex items-center justify-center h-full">
                  <img 
                    src="/zaitoon/zaitoon cover.jpg" 
                    alt="Project Cover" 
                    className="w-full h-36 sm:h-38 object-cover rounded-lg border border-gray-700"
                  />
                </div>
              ) : project.id === 3 ? (
                <div className="flex items-center justify-center h-full">
                  <img 
                    src="/alba/alba1.png" 
                    alt="Project Cover" 
                    className="w-full h-36 sm:h-38 object-cover rounded-lg border border-gray-700"
                  />
                </div>
              ) : (
                <div className="text-left sm:text-right">
                  <div className="text-sm text-gray-400 font-medium mb-1">{project.category}</div>
                  <div className="text-xs text-gray-500">Project</div>
                </div>
              )}
            </div>
            
            {/* Right Section - Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4
                  className="text-xl text-white font-bold"
                  style={{ fontFamily: 'Calibre, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                >
                  {project.title}
                </h4>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed font-sans">
                <span className="block sm:hidden">
                  {project.id === 1 
                    ? "HIRA+ Management System is a full-stack platform streamlining organizational operations including member management, staff coordination, meals, travel, meetings, and billing through automated, data-driven workflows."
                    : project.id === 2 
                    ? "Zai Toon Kids is a cross-platform app delivering bilingual educational stories for children ages 5-12 through webtoon visuals and 3D animations, promoting language development and cultural values."
                    : project.id === 3 
                    ? "Alba Marine Enterprises is an enterprise system automating peeling shed operations including employee tracking, payroll distribution, dealer billing, and token-based wage calculations with bonus allocations."
                    : project.description
                  }
                </span>
                <span className="hidden sm:block">
                  {project.description}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default ExpandableProjectCard;
