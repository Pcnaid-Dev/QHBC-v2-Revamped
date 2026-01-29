import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BusinessInfo } from '../data/business';
import { Socials } from '../data/socials';
import { Translations } from '../data/i18n';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (l: Language) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, lang, setLang }) => {
  const t = Translations[lang];
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path ? 'text-pink font-semibold' : 'text-charcoal hover:text-pink';

  const NavLinks = () => (
    <>
      <Link to="/" className={`${isActive('/')} transition-colors`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
      <Link to="/services" className={`${isActive('/services')} transition-colors`} onClick={() => setMobileMenuOpen(false)}>{t.services}</Link>
      <Link to="/offers" className={`${isActive('/offers')} transition-colors`} onClick={() => setMobileMenuOpen(false)}>{t.offers}</Link>
      <Link to="/ai-studio" className={`${isActive('/ai-studio')} transition-colors`} onClick={() => setMobileMenuOpen(false)}>{t.aiStudio}</Link>
      <Link to="/contact" className={`${isActive('/contact')} transition-colors`} onClick={() => setMobileMenuOpen(false)}>{t.contact}</Link>
    </>
  );

  return (
    <div className={`min-h-screen flex flex-col ${lang === Language.AR ? 'font-arabic' : 'font-sans'}`} dir={lang === Language.AR ? 'rtl' : 'ltr'}>
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md shadow-sm border-b border-gold/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white font-serif text-xl font-bold group-hover:bg-pink transition-colors">Q</div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg tracking-wide text-charcoal leading-none">QUEEN</span>
              <span className="text-[10px] uppercase tracking-widest text-gold2">Beauty Center</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wide">
            <NavLinks />
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setLang(lang === Language.EN ? Language.AR : Language.EN)}
              className="text-xs font-bold border border-gold/50 px-2 py-1 rounded text-gold2 hover:bg-gold hover:text-white transition-colors"
            >
              {lang === Language.EN ? 'العربية' : 'EN'}
            </button>
            <Link to="/book" className="hidden md:block bg-gradient-to-r from-pink to-orchid text-white px-5 py-2 rounded-full font-medium text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all">
              {t.bookNow}
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-2xl text-charcoal" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gold/20 py-4 px-6 flex flex-col gap-4">
            <NavLinks />
            <Link to="/book" className="bg-pink text-white text-center py-3 rounded-lg font-bold shadow-md" onClick={() => setMobileMenuOpen(false)}>
              {t.bookNow}
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-ivory py-12 border-t-4 border-gold">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-serif text-2xl text-gold mb-4">Queen Beauty</h3>
            <p className="text-gray-400 mb-4">{t.footerText}</p>
            <div className="flex gap-4">
              {Socials.map(s => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink transition-colors">
                  {s.platform}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-gold font-bold uppercase tracking-wider mb-4">{t.contact}</h4>
            <p className="mb-2 text-sm text-gray-300">{BusinessInfo.address}</p>
            <a href={`tel:${BusinessInfo.phonePrimary}`} className="block mb-1 text-white hover:text-pink transition-colors">{BusinessInfo.phonePrimary}</a>
            <a href={`tel:${BusinessInfo.phoneSecondary}`} className="block text-white hover:text-pink transition-colors">{BusinessInfo.phoneSecondary}</a>
          </div>

          <div>
            <h4 className="text-gold font-bold uppercase tracking-wider mb-4">Hours</h4>
            <p className="text-gray-300 text-sm">{BusinessInfo.hours}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-gray-500">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 text-gray-600 text-xs">
          © {new Date().getFullYear()} {BusinessInfo.name}. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
