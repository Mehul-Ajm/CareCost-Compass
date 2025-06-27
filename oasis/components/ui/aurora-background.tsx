"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useState } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  intensity?: "low" | "medium" | "high";
  showParticles?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  intensity = "high",
  showParticles = true,
  ...props
}: AuroraBackgroundProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (showParticles) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 100,
      }));
      setParticles(newParticles);
    }
  }, [showParticles]);

  const opacityMap = {
    low: "opacity-30",
    medium: "opacity-60",
    high: "opacity-80",
  };

  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900 aurora-glow",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)",
              "--aurora-secondary":
                "repeating-linear-gradient(100deg,#8b5cf6_10%,#c084fc_15%,#a78bfa_20%,#f0abfc_25%,#8b5cf6_30%)",
              "--aurora-accent":
                "repeating-linear-gradient(100deg,#06b6d4_10%,#22d3ee_15%,#67e8f9_20%,#a5f3fc_25%,#06b6d4_30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",

              "--blue-300": "#93c5fd",
              "--blue-400": "#60a5fa",
              "--blue-500": "#3b82f6",
              "--indigo-300": "#a5b4fc",
              "--violet-200": "#ddd6fe",
              "--purple-400": "#c084fc",
              "--purple-500": "#8b5cf6",
              "--cyan-400": "#22d3ee",
              "--cyan-500": "#06b6d4",
              "--black": "#000",
              "--white": "#fff",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          {/* Primary Aurora Layer */}
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] ${opacityMap[intensity]} blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>

          {/* Secondary Aurora Layer - Different colors and timing */}
          <div
            className={cn(
              `after:animate-aurora-fast pointer-events-none absolute -inset-[15px] [background-image:var(--white-gradient),var(--aurora-secondary)] [background-size:250%,_180%] [background-position:30%_30%,30%_30%] ${opacityMap[intensity]} blur-[15px] invert filter will-change-transform [--aurora-secondary:repeating-linear-gradient(100deg,var(--purple-500)_10%,var(--purple-400)_15%,var(--violet-200)_20%,var(--indigo-300)_25%,var(--purple-500)_30%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora-secondary)] after:[background-size:180%,_80%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora-secondary)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora-secondary)]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_0%_100%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>

          {/* Accent Aurora Layer - Cyan colors */}
          <div
            className={cn(
              `after:animate-aurora-slow pointer-events-none absolute -inset-[20px] [background-image:var(--white-gradient),var(--aurora-accent)] [background-size:200%,_150%] [background-position:70%_70%,70%_70%] ${opacityMap[intensity]} blur-[20px] invert filter will-change-transform [--aurora-accent:repeating-linear-gradient(100deg,var(--cyan-500)_10%,var(--cyan-400)_15%,var(--blue-300)_20%,var(--cyan-400)_25%,var(--cyan-500)_30%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora-accent)] after:[background-size:150%,_60%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora-accent)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora-accent)]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_50%_50%,black_20%,var(--transparent)_60%)]`,
            )}
          ></div>

          {/* Aurora Particles */}
          {showParticles && (
            <div className="aurora-particles">
              {particles.map((particle) => (
                <div
                  key={particle.id}
                  className="aurora-particle"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    animationDelay: `${particle.delay}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
        {children}
      </div>
    </main>
  );
};
