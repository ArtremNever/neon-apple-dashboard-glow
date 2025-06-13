
export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950" />
      
      {/* Animated dots pattern with movement */}
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
              transform: `translate(${Math.sin(i) * 20}px, ${Math.cos(i) * 15}px)`,
            }}
          />
        ))}
      </div>

      {/* Flying geometric shapes with smooth movement */}
      <div className="absolute inset-0">
        {/* Large rotating square that moves diagonally */}
        <div 
          className="absolute w-20 h-20 border border-green-500/20 rotate-45" 
          style={{ 
            animationDuration: '20s',
            animation: 'spin 20s linear infinite, fly-diagonal 25s ease-in-out infinite'
          }} 
        />
        
        {/* Bouncing circle that moves horizontally */}
        <div 
          className="absolute top-40 w-16 h-16 border border-green-400/10 rounded-full" 
          style={{ 
            animationDuration: '3s, 18s',
            animation: 'bounce 3s ease-in-out infinite, fly-horizontal 18s ease-in-out infinite'
          }} 
        />
        
        {/* Pulsing square that moves in a curve */}
        <div 
          className="absolute w-12 h-12 border border-green-300/15 rotate-12" 
          style={{ 
            animationDuration: '4s, 22s',
            animation: 'pulse 4s ease-in-out infinite, fly-curve 22s ease-in-out infinite'
          }} 
        />
        
        {/* Pinging circle that moves vertically */}
        <div 
          className="absolute w-8 h-8 bg-green-500/10 rounded-full" 
          style={{ 
            animationDuration: '5s, 15s',
            animation: 'ping 5s ease-in-out infinite, fly-vertical 15s ease-in-out infinite'
          }} 
        />

        {/* Additional flying objects for more dynamic effect */}
        <div 
          className="absolute w-6 h-6 border border-green-600/15 rounded-full" 
          style={{ 
            animationDuration: '12s',
            animation: 'fly-zigzag 12s ease-in-out infinite'
          }} 
        />
        
        <div 
          className="absolute w-10 h-10 border border-green-400/20" 
          style={{ 
            animationDuration: '28s',
            animation: 'fly-circle 28s linear infinite'
          }} 
        />
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

      {/* Custom keyframes styles */}
      <style jsx>{`
        @keyframes fly-diagonal {
          0%, 100% { transform: translate(10vw, 20vh) rotate(45deg); }
          25% { transform: translate(80vw, 10vh) rotate(135deg); }
          50% { transform: translate(90vw, 70vh) rotate(225deg); }
          75% { transform: translate(20vw, 80vh) rotate(315deg); }
        }
        
        @keyframes fly-horizontal {
          0%, 100% { transform: translateX(0vw); }
          50% { transform: translateX(85vw); }
        }
        
        @keyframes fly-curve {
          0%, 100% { transform: translate(25vw, 32vh) rotate(12deg); }
          25% { transform: translate(60vw, 20vh) rotate(72deg); }
          50% { transform: translate(75vw, 50vh) rotate(132deg); }
          75% { transform: translate(40vw, 65vh) rotate(192deg); }
        }
        
        @keyframes fly-vertical {
          0%, 100% { transform: translate(75vw, 20vh); }
          50% { transform: translate(65vw, 80vh); }
        }
        
        @keyframes fly-zigzag {
          0% { transform: translate(0vw, 50vh); }
          20% { transform: translate(20vw, 30vh); }
          40% { transform: translate(40vw, 70vh); }
          60% { transform: translate(60vw, 25vh); }
          80% { transform: translate(80vw, 60vh); }
          100% { transform: translate(100vw, 40vh); }
        }
        
        @keyframes fly-circle {
          0% { transform: translate(50vw, 50vh) rotate(0deg) translateX(30vw) rotate(0deg); }
          100% { transform: translate(50vw, 50vh) rotate(360deg) translateX(30vw) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};
