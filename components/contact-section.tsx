import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/google-sheets";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContactForm(data);
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    }
  };

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
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text"
          >
            Get In Touch
          </motion.h2>
          
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-12"
          >
            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="glassmorphism p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                I'm always interested in discussing new opportunities, innovative projects, 
                and collaborating with fellow developers. Let's build something amazing together!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="text-[#667EEA] text-xl mr-4" />
                  <span className="font-mono">engineer@mastercard.com</span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="text-[#667EEA] text-xl mr-4" />
                  <span className="font-mono">+1 (555) 123-4567</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="text-[#667EEA] text-xl mr-4" />
                  <span className="font-mono">New York, NY</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
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
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="glassmorphism p-8 rounded-2xl"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-background/50 border-border focus:border-[#667EEA] focus:ring-[#667EEA]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="bg-background/50 border-border focus:border-[#667EEA] focus:ring-[#667EEA]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-background/50 border-border focus:border-[#667EEA] focus:ring-[#667EEA]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={5}
                            className="bg-background/50 border-border focus:border-[#667EEA] focus:ring-[#667EEA]/20 resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#667EEA] to-[#764BA2] hover:shadow-lg hover:shadow-[#667EEA]/30 transition-all duration-300 transform hover:scale-[1.02] font-medium"
                  >
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
