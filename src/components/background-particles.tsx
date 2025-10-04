"use client";

import { Heart } from "lucide-react";
import { useMemo } from "react";

const BackgroundParticles = ({ count = 20 }: { count?: number }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 20 + 10;
      const style = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 10 + 10}s`,
        animationDelay: `${Math.random() * 5}s`,
        width: `${size}px`,
        height: `${size}px`,
        '--tw-translate-x': `${(Math.random() - 0.5) * 200}px`,
      };
      return <div key={i} style={style} className="animate-float absolute bottom-[-20vh] text-primary/30">
        <Heart fill="currentColor" className="w-full h-full" />
      </div>;
    });
  }, [count]);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
      {particles}
    </div>
  );
};

export default BackgroundParticles;
