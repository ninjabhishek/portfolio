import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function AboutSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text"
            >
              About Me
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={itemVariants}
                className="glassmorphism p-8 rounded-2xl"
              >
                <p className="text-lg leading-relaxed mb-6 text-muted-foreground">
                  I'm a passionate Senior Software Engineer at Mastercard with 5+ years of experience in building scalable, secure financial technology solutions. My expertise spans full-stack development, microservices architecture, and cloud technologies.
                </p>
                
                <p className="text-lg leading-relaxed mb-6 text-muted-foreground">
                  I thrive on solving complex problems and creating innovative solutions that impact millions of users worldwide. My journey in fintech has taught me the importance of building resilient, secure, and user-focused applications.
                </p>
                
                <div className="flex space-x-6">
                  <a
                    href="#"
                    className="text-2xl hover:text-[#667EEA] transition-colors duration-300 transform hover:scale-110"
                  >
                    <Linkedin />
                  </a>
                  <a
                    href="#"
                    className="text-2xl hover:text-[#667EEA] transition-colors duration-300 transform hover:scale-110"
                  >
                    <Github />
                  </a>
                  <a
                    href="#"
                    className="text-2xl hover:text-[#667EEA] transition-colors duration-300 transform hover:scale-110"
                  >
                    <Twitter />
                  </a>
                </div>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                  alt="Professional software engineer workspace"
                  className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#667EEA]/20 to-transparent rounded-2xl" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
