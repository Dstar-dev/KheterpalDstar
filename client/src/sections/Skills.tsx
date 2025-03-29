import { motion } from "framer-motion";
import { FaShieldAlt, FaPencilRuler, FaCertificate, FaGraduationCap, FaPaintBrush } from "react-icons/fa";
import GlassCard from "@/components/ui/glass-card";
import ProgressCard from "@/components/ui/progress-card";
import SkillBadge from "@/components/ui/skill-badge";
import { securitySkills, designSkills, securityTools, designTools, certifications } from "@/lib/data";

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="font-['Montserrat'] text-sm uppercase tracking-widest text-accent">Expertise</span>
          <h2 className="font-['Space_Grotesk'] font-bold text-3xl md:text-5xl mt-2">
            My Technical <span className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">Skillset</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/90">
            The technologies, tools and methodologies I use to bring projects to life.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column: Security Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                  <FaShieldAlt className="text-2xl" />
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold">Security Expertise</h3>
              </div>
              
              {/* Skills List */}
              <div className="space-y-6">
                {securitySkills.map((skill, index) => (
                  <ProgressCard
                    key={index}
                    skill={skill.name}
                    level={skill.level}
                    percentage={skill.percentage}
                    accentColor="accent"
                    gradientFrom="secondary"
                    gradientTo="accent"
                  />
                ))}
              </div>
              
              {/* Security Tools */}
              <div className="mt-8">
                <h4 className="font-['Space_Grotesk'] font-medium mb-4">Tools & Technologies</h4>
                <div className="flex flex-wrap gap-3">
                  {securityTools.map((tool, index) => (
                    <SkillBadge key={index} label={tool} />
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
          
          {/* Right Column: Design Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-highlight/20 flex items-center justify-center text-highlight">
                  <FaPencilRuler className="text-2xl" />
                </div>
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold">Design Expertise</h3>
              </div>
              
              {/* Skills List */}
              <div className="space-y-6">
                {designSkills.map((skill, index) => (
                  <ProgressCard
                    key={index}
                    skill={skill.name}
                    level={skill.level}
                    percentage={skill.percentage}
                    accentColor="highlight"
                    gradientFrom="accent"
                    gradientTo="highlight"
                  />
                ))}
              </div>
              
              {/* Design Tools */}
              <div className="mt-8">
                <h4 className="font-['Space_Grotesk'] font-medium mb-4">Tools & Technologies</h4>
                <div className="flex flex-wrap gap-3">
                  {designTools.map((tool, index) => (
                    <SkillBadge key={index} label={tool} />
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
        
        {/* Certifications Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-center mb-8">Certifications & Education</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <GlassCard 
                key={index} 
                className="p-6 transition-all hover:shadow-lg hover:shadow-accent/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${cert.type === 'education' ? 'bg-accent/20' : cert.type === 'design' ? 'bg-highlight/20' : 'bg-accent/20'} flex items-center justify-center ${cert.type === 'education' ? 'text-accent' : cert.type === 'design' ? 'text-highlight' : 'text-accent'}`}>
                    {cert.type === 'security' && <FaCertificate />}
                    {cert.type === 'education' && <FaGraduationCap />}
                    {cert.type === 'design' && <FaPaintBrush />}
                  </div>
                  <h4 className="font-['Space_Grotesk'] font-bold">{cert.title}</h4>
                </div>
                <p className="text-sm text-white/80">{cert.issuer}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>{cert.year}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-highlight/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
    </section>
  );
};

export default Skills;
