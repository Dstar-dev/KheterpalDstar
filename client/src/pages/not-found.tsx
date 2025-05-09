import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useEffect } from "react";

export default function NotFound() {
  // AOS initialization
  useEffect(() => {
    // This will refresh AOS animations when the NotFound page mounts
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.refresh();
    }
  }, []);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen w-full flex items-center justify-center dark:bg-black bg-white cyber-grid overflow-hidden relative"
      variants={backgroundVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Neon glow effects */}
      <motion.div 
        className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full dark:bg-cyan-500/10 bg-orange-500/10 filter blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full dark:bg-fuchsia-500/10 bg-amber-500/10 filter blur-3xl"
        animate={{ 
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
      
      <motion.div
        className="z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <Card className="w-full max-w-md mx-4 overflow-hidden card-3d">
          <CardContent className="p-8">
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                variants={itemVariants}
                className="mb-6"
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-full dark:bg-black bg-orange-50 dark:border-cyan-400 border-orange-500 border flex items-center justify-center dark:animate-pulse-custom">
                    <AlertCircle className="h-12 w-12 dark:text-cyan-400 text-orange-500" />
                  </div>
                  <motion.div 
                    className="absolute -right-2 -top-2 dark:bg-black bg-white dark:text-cyan-400 text-orange-500 w-8 h-8 rounded-full flex items-center justify-center font-bold dark:border-cyan-400 border-orange-500 border dark:animate-pulse-custom"
                    animate={{ 
                      rotate: [0, 10, 0, -10, 0],
                      scale: [1, 1.1, 1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    !
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-3xl font-heading font-bold neon-text mb-2"
              >
                404 - Page Not Found
              </motion.h1>
              
              <motion.div 
                variants={itemVariants}
                className="accent-line wavy mb-4"
              />
              
              <motion.p 
                variants={itemVariants}
                className="mt-2 dark:text-gray-300 text-gray-600 mb-8"
              >
                Oops! The page you're looking for seems to have disappeared into the digital void.
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="flex gap-4"
              >
                <Link href="/">
                  <Button className="btn-primary">
                    <Home size={16} className="mr-2" />
                    Go Home
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="btn-secondary"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Go Back
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
