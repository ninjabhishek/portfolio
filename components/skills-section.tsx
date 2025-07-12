import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Server, Code, Cloud } from "lucide-react";
import { SKILLS_DATA } from "@/lib/constants";

export default function SkillsSection() {
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

  const iconMap = {
    Server: Server,
    Code: Code,
    Cloud: Cloud,
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text"
          >
            Technical Skills
          </motion.h2>
          
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {SKILLS_DATA.map((category, index) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap];
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glassmorphism p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center mb-6">
                    <IconComponent className={`text-3xl mr-4 ${category.color}`} />
                    <h3 className="text-2xl font-bold">{category.category}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center justify-between">
                        <span className="font-mono text-sm">{skill.name}</span>
                        <div className="flex space-x-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < skill.level
                                  ? category.color.replace('text-', 'bg-')
                                  : 'bg-gray-400'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
