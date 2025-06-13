
export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950" />
      
      {/* Animated dots pattern */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 border border-green-500/20 rotate-45 animate-spin" 
             style={{ animationDuration: '20s' }} />
        <div className="absolute top-40 right-20 w-16 h-16 border border-green-400/10 rounded-full animate-bounce" 
             style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-32 left-1/4 w-12 h-12 border border-green-300/15 rotate-12 animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-green-500/10 rounded-full animate-ping" 
             style={{ animationDuration: '5s' }} />
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};
