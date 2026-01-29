import React, { useState } from 'react';
import { ServicesData, ServiceCategories } from '../data/services';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = activeCategory === "All" 
    ? ServicesData 
    : ServicesData.filter(s => s.category === activeCategory);

  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl text-charcoal mb-4">Our Services</h1>
          <p className="text-muted max-w-2xl mx-auto">Discover our range of premium beauty treatments designed to make you shine.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            onClick={() => setActiveCategory("All")}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all
              ${activeCategory === "All" ? 'bg-pink text-white shadow-lg' : 'bg-white text-muted hover:bg-gray-100'}
            `}
          >
            All
          </button>
          {ServiceCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all
                ${activeCategory === cat ? 'bg-pink text-white shadow-lg' : 'bg-white text-muted hover:bg-gray-100'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <div key={service.id} className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-xl transition-shadow duration-300 group border border-gold/10">
              <div className="h-64 overflow-hidden relative">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-charcoal shadow-sm">
                  From {service.priceStart} JOD
                </div>
              </div>
              <div className="p-8">
                <span className="text-gold text-xs font-bold uppercase tracking-wider mb-2 block">{service.category}</span>
                <h3 className="font-serif text-2xl text-charcoal mb-3 group-hover:text-pink transition-colors">{service.name}</h3>
                <p className="text-muted text-sm mb-6 leading-relaxed">{service.description}</p>
                <Link to="/book" className="block w-full text-center border-2 border-charcoal text-charcoal py-3 rounded-xl font-bold hover:bg-charcoal hover:text-white transition-colors">
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
