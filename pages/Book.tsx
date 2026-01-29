import React, { useState } from 'react';
import { ServicesData } from '../data/services';
import { BusinessInfo } from '../data/business';

const Book: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Queen Hair Beauty, I would like to book an appointment:%0A
    Name: ${formData.name}%0A
    Phone: ${formData.phone}%0A
    Service: ${formData.service}%0A
    Preferred Date: ${formData.date} at ${formData.time}%0A
    Notes: ${formData.notes}`;

    // Clean phone number for link
    const waNumber = BusinessInfo.phonePrimary.replace('+', '').replace(/\s/g, '');
    window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="py-16 bg-ivory min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-soft border border-gold/20">
          <div className="text-center mb-10">
            <h1 className="font-serif text-4xl text-charcoal mb-2">Book Your Visit</h1>
            <p className="text-muted">Fill out the details below and send via WhatsApp to confirm.</p>
          </div>

          <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-muted mb-2">Full Name</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-pink focus:border-transparent outline-none transition-all"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-muted mb-2">Phone Number</label>
                <input 
                  required
                  name="phone"
                  type="tel" 
                  className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-pink focus:border-transparent outline-none transition-all"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-muted mb-2">Service</label>
              <select 
                name="service"
                className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-pink focus:border-transparent outline-none transition-all appearance-none"
                onChange={handleChange}
                required
              >
                <option value="">Select a Service...</option>
                {ServicesData.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-muted mb-2">Preferred Date</label>
                <input 
                  name="date"
                  type="date" 
                  className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-pink focus:border-transparent outline-none transition-all"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-muted mb-2">Time</label>
                <input 
                  name="time"
                  type="time" 
                  className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-pink focus:border-transparent outline-none transition-all"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-muted mb-2">Special Requests</label>
              <textarea 
                name="notes"
                rows={3}
                className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-pink focus:border-transparent outline-none transition-all resize-none"
                onChange={handleChange}
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold text-lg hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Book via WhatsApp</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.654-.698c.991.543 1.957.83 2.806.83 3.181 0 5.768-2.587 5.768-5.767s-2.587-5.766-5.768-5.766zM12 2C6.486 2 2 6.486 2 12c0 2.169.706 4.197 1.932 5.865L2.3 22l4.195-1.556C8.086 21.365 10.003 22 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2z"/></svg>
            </button>
            <p className="text-center text-xs text-muted mt-4">We will confirm your appointment shortly after you send the message.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Book;
