import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: 'Merhaba! Ben SınırSaaS AI Asistanınız. Size nasıl yardımcı olabilirim?',
      sender: 'ai'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Kullanıcı mesajını ekle
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };
    setMessages([...messages, userMessage]);

    // Simüle edilmiş AI yanıtı (Backend API hazır olunca değişecek)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: messages.length + 2,
        text: getAIResponse(input),
        sender: 'ai'
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    setInput('');
  };

  const getAIResponse = (question: string): string => {
    const lowerQ = question.toLowerCase();
    if (lowerQ.includes('istisna') || lowerQ.includes('limit')) {
      return '67.000 TL istisna limiti, yurt dışı kaynaklı gelirlerin vergiden muaf tutulduğu miktardır. Bu limiti aşarsanız mali müşavir tutmanız gerekir.';
    }
    if (lowerQ.includes('dilekçe')) {
      return 'Dilekçe oluşturmak için sol menüden "Dilekçe Oluştur" butonuna tıklayabilirsiniz. Otomatik olarak .docx formatında hazırlanacak.';
    }
    if (lowerQ.includes('stripe') || lowerQ.includes('paypal')) {
      return 'Stripe/PayPal entegrasyonu için API anahtarlarınızı ayarlar kısmından girebilirsiniz. Sistem otomatik olarak ödemelerinizi çekecek.';
    }
    return 'Anlamadım, daha açık sorabilir misiniz? Ayrıca "istisna limiti", "dilekçe" veya "Stripe entegrasyonu" gibi konularda yardımcı olabilirim.';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col h-[500px]">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b">
        <Bot className="text-purple-500" size={24} />
        <h3 className="text-xl font-bold">AI Asistan</h3>
        <span className="ml-auto text-xs text-green-600 flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Çevrimiçi
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`p-2 rounded-full ${
                msg.sender === 'ai' ? 'bg-purple-100' : 'bg-blue-100'
              }`}
            >
              {msg.sender === 'ai' ? (
                <Bot className="text-purple-600" size={20} />
              ) : (
                <User className="text-blue-600" size={20} />
              )}
            </div>
            <div
              className={`px-4 py-3 rounded-lg max-w-[80%] ${
                msg.sender === 'ai'
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-blue-600 text-white'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Bir soru sorun..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Send size={18} />
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-2 text-center">
        💡 Backend API hazır olunca gerçek AI yanıtları gelecek!
      </p>
    </div>
  );
};

export default AIAssistant;
