
import React from 'react';

const BackgroundIllustration: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-pink-100 to-transparent" />
      <div className="absolute top-1/4 -left-12 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30" viewBox="0 0 100 100">
        <defs>
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export default BackgroundIllustration;
