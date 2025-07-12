import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Lock, Activity, Table, GitBranch } from "lucide-react";
import { PROJECTS_DATA } from "@/lib/constants";

export default function ProjectsSection() {
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
    Github: Github,
    ExternalLink: ExternalLink,
    Lock: Lock,
    Activity: Activity,
    Table: Table,
    GitBranch: GitBranch,
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text"
          >
            Featured Projects
          </motion.h2>
          
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-8"
          >
            {PROJECTS_DATA.map((project, index) => {
              const PrimaryIcon = iconMap[project.primaryIcon as keyof typeof iconMap];
              const SecondaryIcon = iconMap[project.secondaryIcon as keyof typeof iconMap];
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glassmorphism p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="mb-6">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 gradient-text">{project.title}</h3>
                  
                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 rounded-full text-sm font-mono ${project.techColors[techIndex]}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button className={`px-4 py-2 rounded-lg transition-all duration-300 ${project.primaryButtonStyle}`}>
                      {PrimaryIcon && <PrimaryIcon className="w-4 h-4 mr-2" />}
                      {project.primaryButtonText}
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="px-4 py-2 glassmorphism rounded-lg hover:bg-white/10 transition-all duration-300 border-white/20"
                    >
                      {SecondaryIcon && <SecondaryIcon className="w-4 h-4 mr-2" />}
                      {project.secondaryButtonText}
                    </Button>
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
