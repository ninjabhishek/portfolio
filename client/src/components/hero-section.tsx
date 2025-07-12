import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const handleScrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#667EEA]/20 to-[#764BA2]/20" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#F093FB]/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#38BDF8]/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#667EEA]/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">Senior Software Engineer</span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-semibold mb-8"
          >
            Building scalable solutions at <span className="text-[#F093FB]">Mastercard</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl mb-12 text-muted-foreground"
          >
            Full-stack developer passionate about creating innovative fintech solutions
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button
              onClick={() => handleScrollToSection("#projects")}
              className="px-8 py-4 bg-gradient-to-r from-[#667EEA] to-[#764BA2] hover:shadow-lg hover:shadow-[#667EEA]/30 transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </Button>
            
            <Button
              onClick={() => handleScrollToSection("#contact")}
              variant="outline"
              className="px-8 py-4 glassmorphism hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border-white/20"
            >
              Get In Touch
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={() => handleScrollToSection("#about")}
          className="flex flex-col items-center text-muted-foreground hover:text-[#667EEA] transition-colors duration-300"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
