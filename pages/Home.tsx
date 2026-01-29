import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { Translations } from '../data/i18n';
import { Language } from '../types';
import { ServicesData } from '../data/services';
import { BusinessInfo } from '../data/business';

interface HomeProps {
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const t = Translations[lang];
  const featuredServices = ServicesData.slice(0, 3);

  return (
    <div className="flex flex-col gap-0">
      <Hero title={t.heroTitle} subtitle={t.heroSub} ctaText={t.bookNow} />

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-charcoal mb-4">Why Queen Beauty?</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[3rem] bg-ivory text-center hover:-translate-y-2 transition-transform duration-300 border border-gold/10">
              <div className="text-5xl mb-6">👑</div>
              <h3 className="font-serif text-2xl mb-4 text-charcoal">Royal Treatment</h3>
              <p className="text-muted">Every guest is treated like royalty with premium amenities and personalized care.</p>
            </div>
            <div className="p-8 rounded-[3rem] bg-ivory text-center hover:-translate-y-2 transition-transform duration-300 border border-gold/10">
              <div className="text-5xl mb-6">🌿</div>
              <h3 className="font-serif text-2xl mb-4 text-charcoal">Premium Products</h3>
              <p className="text-muted">We use only top-tier international brands that are safe, effective, and luxurious.</p>
            </div>
            <div className="p-8 rounded-[3rem] bg-ivory text-center hover:-translate-y-2 transition-transform duration-300 border border-gold/10">
              <div className="text-5xl mb-6">💅</div>
              <h3 className="font-serif text-2xl mb-4 text-charcoal">Expert Artists</h3>
              <p className="text-muted">Our team consists of certified professionals passionate about modern beauty trends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-ivory relative">
         {/* Decorative blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-4xl text-charcoal mb-2">Signature Services</h2>
              <p className="text-muted">Curated for your elegance.</p>
            </div>
            <Link to="/services" className="text-gold2 font-bold hover:text-pink transition-colors border-b border-gold2 hover:border-pink pb-1">View All</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map(service => (
              <div key={service.id} className="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-lg">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span className="text-gold text-xs font-bold uppercase tracking-widest mb-1 block">{service.category}</span>
                  <h3 className="text-white font-serif text-2xl mb-2">{service.name}</h3>
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{service.description}</p>
                    <Link to="/book" className="inline-block bg-white text-charcoal px-6 py-2 rounded-full text-sm font-bold hover:bg-pink hover:text-white transition-colors">Book This</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Teaser */}
      <section className="py-24 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?blur=10')] opacity-20 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <span className="text-pink font-bold uppercase tracking-widest mb-2 block">New Technology</span>
            <h2 className="font-serif text-5xl mb-6">AI Beauty Studio</h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Unsure about a new hair color or makeup look? Try our virtual beauty lab powered by advanced AI. Upload your photo and see the magic before you commit.
            </p>
            <Link to="/ai-studio" className="inline-flex items-center gap-2 bg-pink text-white px-8 py-3 rounded-full font-bold shadow-glow hover:bg-white hover:text-pink transition-all">
              Try It Now <span>✨</span>
            </Link>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src="https://picsum.photos/600/600?beauty" alt="AI transformation" className="rounded-2xl w-full" />
              <div className="absolute top-8 right-8 bg-white text-charcoal px-3 py-1 rounded-full text-xs font-bold shadow-lg">Before / After</div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink rounded-full blur-[80px]"></div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 relative w-full">
         <iframe
           width="100%"
           height="100%"
           style={{ border: 0 }}
           loading="lazy"
           allowFullScreen
           referrerPolicy="no-referrer-when-downgrade"
           src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GEMINI_API_KEY}&q=${BusinessInfo.address}`}
           className="grayscale hover:grayscale-0 transition-all duration-500"
           title="Salon Location"
         >
         {/* Note: In a real scenario without a Maps API Key enabled for embed, use a standard link or static map. 
             Since I cannot use a real API key here, I will fallback to a static placeholder representation if this fails, 
             but for the code structure I'm showing the iframe intention. 
             Actually, better to use a direct OSM or placeholder for the build if no key is guaranteed for Maps.
             Let's use a nice styled div with a link for safety in this demo.
          */}
         </iframe>
         <div className="absolute inset-0 bg-gray-200 flex items-center justify-center pointer-events-none">
            {/* Fallback visual since generic API key might not work for Maps Embed without billing */}
            <div className="text-center pointer-events-auto">
               <h3 className="text-2xl font-serif text-charcoal mb-2">Visit Us</h3>
               <p className="text-muted mb-4">{BusinessInfo.address}</p>
               <a 
                href={`https://www.google.com/maps/search/?api=1&query=${BusinessInfo.locationCoords.lat},${BusinessInfo.locationCoords.lng}`} 
                target="_blank" 
                rel="noreferrer"
                className="bg-charcoal text-white px-6 py-2 rounded-full text-sm font-bold"
               >
                 Open in Google Maps
               </a>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
