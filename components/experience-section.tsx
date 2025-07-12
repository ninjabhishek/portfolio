import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { EXPERIENCE_DATA } from "@/lib/constants";

export default function ExperienceSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text"
          >
            Experience
          </motion.h2>
          
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#667EEA] to-[#764BA2]" />
            
            <div className="space-y-12">
              {EXPERIENCE_DATA.map((job, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative pl-20"
                >
                  <div className={`absolute left-6 w-4 h-4 rounded-full border-4 border-background ${job.color}`} />
                  
                  <div className="glassmorphism p-8 rounded-2xl hover:bg-white/10 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-[#F093FB]">{job.title}</h3>
                      <span className="text-sm font-mono text-muted-foreground">{job.duration}</span>
                    </div>
                    
                    <h4 className="text-xl text-[#667EEA] mb-4">{job.company}</h4>
                    
                    <ul className="space-y-2 text-muted-foreground">
                      {job.responsibilities.map((responsibility, idx) => (
                        <li key={idx}>• {responsibility}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
