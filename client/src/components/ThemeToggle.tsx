import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full focus:outline-none border border-transparent hover:bg-transparent"
    >
      <span className="sr-only">Toggle theme</span>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : 180,
          opacity: theme === 'dark' ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <Moon
          className={`w-5 h-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-slate-400'}`}
          strokeWidth={1.5}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0, rotate: 180 }}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : -180,
          opacity: theme === 'light' ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <Sun
          className={`w-5 h-5 ${theme === 'light' ? 'text-orange-500' : 'text-slate-400'}`}
          strokeWidth={1.5}
        />
      </motion.div>
      {theme === 'dark' && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ boxShadow: '0 0 0 0 rgba(0, 245, 255, 0)' }}
          animate={{ boxShadow: '0 0 0 2px rgba(0, 245, 255, 0.3)' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      )}
      {theme === 'light' && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ boxShadow: '0 0 0 0 rgba(255, 107, 0, 0)' }}
          animate={{ boxShadow: '0 0 0 2px rgba(255, 107, 0, 0.3)' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      )}
    </Button>
  );
}