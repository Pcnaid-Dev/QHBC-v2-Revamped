import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaText }) => {
  return (
    <section className="relative w-full h-[85vh] overflow-hidden flex items-center justify-center text-center">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 z-0 bg-ivory"></div>
      
      {/* Gradient Meshes */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-pink/20 rounded-full blur-[100px] animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-lavender/30 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-gold/10 rounded-full blur-[80px] animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-charcoal mb-6 leading-tight drop-shadow-sm">
          {title}
        </h1>
        <p className="text-lg md:text-2xl text-muted max-w-2xl mb-10 font-light">
          {subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/book" 
            className="bg-gradient-to-r from-pink to-orchid text-white px-10 py-4 rounded-full font-bold text-lg shadow-glow hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            {ctaText}
          </Link>
          <Link 
            to="/ai-studio" 
            className="bg-white/80 backdrop-blur border border-gold text-gold2 px-10 py-4 rounded-full font-bold text-lg hover:bg-gold hover:text-white transition-all duration-300 flex items-center gap-2"
          >
            <span>✨</span> Try AI Studio
          </Link>
        </div>
      </div>

      {/* Decorative Arch Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-ivory to-transparent z-20"></div>
    </section>
  );
};

export default Hero;
