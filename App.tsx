import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Book from './pages/Book';
import AIStudioPage from './pages/AIStudioPage';
import { Language } from './types';

// Placeholder pages for routes not fully detailed in this constrained response
const Offers = () => <div className="p-20 text-center font-serif text-3xl text-charcoal">Offers Coming Soon</div>;
const Contact = () => <div className="p-20 text-center font-serif text-3xl text-charcoal">Contact Page Under Construction</div>;

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);

  return (
    <HashRouter>
      <Layout lang={lang} setLang={setLang}>
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book" element={<Book />} />
          <Route path="/ai-studio" element={<AIStudioPage />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
