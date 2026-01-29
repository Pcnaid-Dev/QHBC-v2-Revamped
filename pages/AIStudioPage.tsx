import React from 'react';
import AITryOnStudio from '../components/AITryOnStudio';

const AIStudioPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-ivory py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <span className="text-pink font-bold uppercase tracking-widest text-sm">Beta v1.0</span>
           <h1 className="font-serif text-5xl text-charcoal mb-4">AI Beauty Studio</h1>
           <p className="text-muted max-w-xl mx-auto">Upload a photo and explore different styles using our advanced generative AI. It's like a magic mirror for your next look.</p>
        </div>
        <AITryOnStudio />
        
        <div className="mt-16 text-center bg-white p-8 rounded-2xl border border-gold/10 shadow-sm max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl mb-4 text-charcoal">Love your virtual look?</h3>
          <p className="text-muted mb-6">Our expert stylists can bring it to life. Save your photo and show it to us at the salon.</p>
          <a href="/book" className="inline-block bg-charcoal text-white px-8 py-3 rounded-full font-bold hover:bg-pink transition-colors">Book Reality</a>
        </div>
      </div>
    </div>
  );
};

export default AIStudioPage;
