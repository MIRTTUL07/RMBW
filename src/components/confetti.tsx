"use client";

import { useMemo } from "react";

const Confetti = ({ count = 100 }: { count?: number }) => {
  const confetti = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 8 + 4;
      const colors = ['bg-primary', 'bg-accent', 'bg-secondary', 'bg-yellow-400', 'bg-rose-400'];
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * -20}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${Math.random() * 0.5}s`,
        animationDuration: `${Math.random() * 3 + 2}s`
      };
      const colorClass = colors[Math.floor(Math.random() * colors.length)];
      return <div key={i} style={style} className={`animate-confetti-fall absolute ${colorClass} rounded-full`}></div>;
    });
  }, [count]);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      {confetti}
    </div>
  );
};

export default Confetti;
