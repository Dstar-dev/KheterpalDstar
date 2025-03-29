
import React from 'react';

const BackgroundIllustration: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute w-full h-full bg-gradient-to-br from-rose-50 via-white to-slate-50" />
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
};

export default BackgroundIllustration;
