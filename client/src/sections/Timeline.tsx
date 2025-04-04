import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GlassCard from '@/components/ui/glass-card';
import { FaCalendarAlt, FaCertificate, FaCode, FaLaptopCode, FaSearch, FaFlask, FaBug } from 'react-icons/fa';
import { useTheme } from '@/components/ThemeProvider';

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  icon: keyof typeof icons;
  category: 'research' | 'certification' | 'career' | 'discovery';
}

const icons = {
  calendar: FaCalendarAlt,
  certificate: FaCertificate,
  code: FaCode,
  laptop: FaLaptopCode,
  search: FaSearch,
  lab: FaFlask,
  bug: FaBug
};

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: '2018',
    title: 'Started Career in Cybersecurity',
    description: 'Began working as a Security Analyst at a major tech company, focusing on threat detection and vulnerability management.',
    icon: 'calendar',
    category: 'career'
  },
  {
    id: 2,
    year: '2019',
    title: 'CISSP Certification',
    description: 'Obtained the Certified Information Systems Security Professional certification after months of study and preparation.',
    icon: 'certificate',
    category: 'certification'
  },
  {
    id: 3,
    year: '2020',
    title: 'Published First Research Paper',
    description: 'Published research on advanced persistent threats and their detection in enterprise environments.',
    icon: 'search',
    category: 'research'
  },
  {
    id: 4,
    year: '2021',
    title: 'Discovered Critical Vulnerability',
    description: 'Found and responsibly disclosed a critical zero-day vulnerability in a popular enterprise software.',
    icon: 'bug',
    category: 'discovery'
  },
  {
    id: 5,
    year: '2022',
    title: 'Advanced Penetration Testing',
    description: 'Led a team in developing new penetration testing methodologies for cloud-native applications.',
    icon: 'laptop',
    category: 'research'
  },
  {
    id: 6,
    year: '2023',
    title: 'Machine Learning in Threat Detection',
    description: 'Pioneered new approaches to using machine learning for identifying previously unknown attack patterns.',
    icon: 'lab',
    category: 'research'
  },
  {
    id: 7,
    year: '2024',
    title: 'Security Architecture Design',
    description: 'Designed comprehensive security architecture for critical infrastructure protection against advanced threats.',
    icon: 'code',
    category: 'career'
  }
];

const TimelineEvent = ({ event, index }: { event: TimelineEvent, index: number }) => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const Icon = icons[event.icon];
  const isEven = index % 2 === 0;
  
  const getIconBgColor = (category: TimelineEvent['category']) => {
    const baseColors = {
      research: theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-200',
      certification: theme === 'dark' ? 'bg-green-500/20' : 'bg-green-200',
      career: theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-200',
      discovery: theme === 'dark' ? 'bg-red-500/20' : 'bg-red-200',
    };
    return baseColors[category];
  };
  
  const getIconColor = (category: TimelineEvent['category']) => {
    const colors = {
      research: theme === 'dark' ? 'text-purple-400' : 'text-purple-600',
      certification: theme === 'dark' ? 'text-green-400' : 'text-green-600',
      career: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
      discovery: theme === 'dark' ? 'text-red-400' : 'text-red-600',
    };
    return colors[category];
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex items-center mb-16 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Timeline line */}
      <div className="relative flex-grow">
        <div 
          className={`h-0.5 w-full ${theme === 'dark' ? 'bg-accent/30' : 'bg-orange-300/50'}`}
        ></div>
        <div 
          className={`absolute top-1/2 ${isEven ? 'right-0' : 'left-0'} transform -translate-y-1/2 w-4 h-4 rounded-full ${theme === 'dark' ? 'bg-accent' : 'bg-orange-500'} z-10`}
        ></div>
      </div>
      
      {/* Year marker */}
      <div 
        className={`flex-shrink-0 w-24 font-bold text-xl font-['Space_Grotesk'] ${isEven ? 'text-right mr-8' : 'text-left ml-8'} ${theme === 'dark' ? 'text-accent' : 'text-orange-500'}`}
      >
        {event.year}
      </div>
      
      {/* Content card */}
      <motion.div 
        className="flex-grow"
        whileHover={{ y: -5 }}
      >
        <GlassCard className="p-6">
          <div className="flex items-start">
            <div className={`p-3 rounded-full mr-4 ${getIconBgColor(event.category)}`}>
              <Icon className={`text-xl ${getIconColor(event.category)}`} />
            </div>
            <div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{event.title}</h3>
              <p className={`${theme === 'dark' ? 'text-white/80' : 'text-gray-700'}`}>{event.description}</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

const Timeline = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredEvents, setFilteredEvents] = useState<TimelineEvent[]>(timelineEvents);
  const { scrollYProgress } = useScroll();
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredEvents(timelineEvents);
    } else {
      setFilteredEvents(timelineEvents.filter(event => event.category === activeFilter));
    }
  }, [activeFilter]);
  
  const FilterButton = ({ filter, label }: { filter: string, label: string }) => (
    <button
      onClick={() => setActiveFilter(filter)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        activeFilter === filter 
          ? theme === 'dark'
            ? 'bg-accent text-black'
            : 'bg-orange-500 text-white'
          : theme === 'dark'
            ? 'bg-gray-800 text-white/70 hover:text-white'
            : 'bg-gray-200 text-gray-700 hover:text-gray-900'
      }`}
    >
      {label}
    </button>
  );

  return (
    <section id="timeline" className="py-20 relative">
      <div 
        className={`fixed left-2 top-1/2 transform -translate-y-1/2 w-1 h-1/3 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'} z-10 hidden lg:block`}
      >
        <motion.div 
          className={`w-full ${theme === 'dark' ? 'bg-accent' : 'bg-orange-500'}`} 
          style={{ height: progressHeight }}
        />
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 font-['Space_Grotesk'] ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Security Research Timeline
          </h2>
          <p className={`max-w-3xl mx-auto text-xl ${
            theme === 'dark' ? 'text-white/80' : 'text-gray-700'
          }`}>
            A journey through my career milestones, research achievements, and security discoveries.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <FilterButton filter="all" label="All Events" />
            <FilterButton filter="research" label="Research" />
            <FilterButton filter="certification" label="Certifications" />
            <FilterButton filter="discovery" label="Discoveries" />
            <FilterButton filter="career" label="Career" />
          </div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {filteredEvents.map((event, index) => (
            <TimelineEvent key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;