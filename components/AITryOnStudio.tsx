import React, { useState, useRef } from 'react';
import { generateBeautyEdit, consultationChat } from '../services/geminiService';
import { AIModuleType } from '../types';

const modules: { id: AIModuleType; label: string; icon: string }[] = [
  { id: 'makeup', label: 'Makeup', icon: '💄' },
  { id: 'hair_style', label: 'Hairstyle', icon: '💇‍♀️' },
  { id: 'hair_color', label: 'Hair Color', icon: '🎨' },
  { id: 'nails', label: 'Nails', icon: '💅' },
  { id: 'bridal', label: 'Bridal', icon: '👰' },
  { id: 'skin_perfector', label: 'Skin Glow', icon: '✨' },
];

const AITryOnStudio: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<AIModuleType>('makeup');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [promptInput, setPromptInput] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user'|'bot', text: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImage) return;
    setLoading(true);
    try {
      // Remove data:image/...;base64, prefix for API
      const base64Data = uploadedImage.split(',')[1];
      const resultBase64 = await generateBeautyEdit(base64Data, selectedModule, promptInput);
      setResultImage(`data:image/jpeg;base64,${resultBase64}`);
    } catch (error) {
      alert("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput("");
    
    const botResponse = await consultationChat(userMsg);
    setChatHistory(prev => [...prev, { role: 'bot', text: botResponse }]);
  };

  return (
    <div className="bg-white rounded-3xl shadow-soft overflow-hidden min-h-[800px] flex flex-col lg:flex-row border border-gold/20">
      
      {/* Sidebar Controls */}
      <div className="w-full lg:w-1/4 bg-ivory p-6 border-r border-gold/10 flex flex-col gap-6">
        <h2 className="font-serif text-2xl text-charcoal font-bold">Beauty Lab</h2>
        
        {/* Module Select */}
        <div className="grid grid-cols-2 gap-2">
          {modules.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedModule(m.id)}
              className={`p-3 rounded-xl text-sm font-medium transition-all flex flex-col items-center gap-1
                ${selectedModule === m.id ? 'bg-pink text-white shadow-lg' : 'bg-white text-muted hover:bg-pink/10'}
              `}
            >
              <span className="text-xl">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {/* Prompt Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">Customize Look</label>
          <textarea
            className="w-full p-3 rounded-lg border border-gold/30 bg-white text-sm focus:ring-2 focus:ring-pink focus:border-transparent outline-none resize-none h-24"
            placeholder={`E.g., "Red lips and smokey eyes" or "Platinum blonde bob cut"...`}
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={!uploadedImage || loading}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all
            ${!uploadedImage || loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-pink to-orchid hover:scale-105'}
          `}
        >
          {loading ? '✨ Creating Magic...' : 'Generate New Look'}
        </button>

        {/* Chat Mini */}
        <div className="mt-auto bg-white p-4 rounded-xl border border-gray-100">
          <h3 className="text-xs font-bold uppercase text-gold2 mb-2">Ask Queen Bot</h3>
          <div className="h-32 overflow-y-auto mb-2 text-xs space-y-2">
            {chatHistory.map((msg, i) => (
              <div key={i} className={`${msg.role === 'user' ? 'text-right text-gray-600' : 'text-pink'}`}>
                <span className="bg-gray-50 px-2 py-1 rounded inline-block">{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            <input 
              className="flex-1 text-xs border rounded px-2 py-1" 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask for advice..."
              onKeyDown={(e) => e.key === 'Enter' && handleChat()}
            />
            <button onClick={handleChat} className="text-xs bg-gold text-white px-2 rounded">></button>
          </div>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 bg-gray-50 relative flex items-center justify-center p-4">
        {!uploadedImage ? (
          <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-3xl hover:border-pink transition-colors cursor-pointer bg-white" onClick={() => fileInputRef.current?.click()}>
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-xl font-bold text-charcoal mb-2">Upload Your Selfie</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">For best results, use a clear, well-lit photo looking straight at the camera.</p>
            <button className="bg-charcoal text-white px-6 py-2 rounded-full text-sm font-medium">Select Photo</button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileUpload} 
            />
          </div>
        ) : (
          <div className="relative w-full h-full max-h-[700px] flex items-center justify-center">
             <div className="relative max-w-full max-h-full aspect-[3/4] shadow-2xl rounded-lg overflow-hidden">
                {resultImage ? (
                  <>
                     <img src={resultImage} alt="Result" className="w-full h-full object-cover" />
                     <div className="absolute top-4 right-4 flex gap-2">
                        <a href={resultImage} download="queen-beauty-look.jpg" className="bg-white/90 p-2 rounded-full shadow hover:bg-white text-charcoal">⬇️</a>
                        <button onClick={() => setResultImage(null)} className="bg-white/90 px-3 py-2 rounded-full shadow hover:bg-white text-xs font-bold text-charcoal">Show Original</button>
                     </div>
                  </>
                ) : (
                  <img src={uploadedImage} alt="Original" className="w-full h-full object-cover" />
                )}
                
                {loading && (
                   <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                      <div className="w-12 h-12 border-4 border-pink border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="animate-pulse font-serif italic text-lg">Applying royal touch...</p>
                   </div>
                )}
             </div>
             <button 
                onClick={() => { setUploadedImage(null); setResultImage(null); }} 
                className="absolute top-4 left-4 bg-white/80 p-2 rounded-full shadow hover:bg-white"
             >
               ✕ Clear
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITryOnStudio;
