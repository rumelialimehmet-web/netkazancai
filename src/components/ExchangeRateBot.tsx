import React, { useEffect, useState } from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { ExchangeRate } from '../types';

const ExchangeRateBot: React.FC = () => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  // Mock data (Backend API hazır olunca burası değişecek)
  const fetchRates = async () => {
    setLoading(true);
    setTimeout(() => {
      // Gerçek TCMB API'sine bağlanınca bu mock data yerine API'den gelecek
      setRates([
        { code: 'USD', name: 'Amerikan Doları', buying: '34.1250', selling: '34.2150' },
        { code: 'EUR', name: 'Euro', buying: '37.0520', selling: '37.1580' },
        { code: 'GBP', name: 'İngiliz Sterlini', buying: '43.2180', selling: '43.3450' }
      ]);
      setLastUpdate(new Date().toLocaleString('tr-TR'));
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="text-blue-500" size={24} />
          TCMB Döviz Kurları
        </h3>
        <button
          onClick={fetchRates}
          disabled={loading}
          className="text-blue-600 hover:text-blue-700 disabled:text-gray-400"
        >
          <RefreshCw className={loading ? 'animate-spin' : ''} size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {rates.map((rate) => (
          <div key={rate.code} className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div>
              <p className="font-bold text-gray-900">{rate.code}</p>
              <p className="text-xs text-gray-600">{rate.name}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">{rate.buying} ₺</p>
              <p className="text-xs text-gray-500">Alış</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Son güncelleme: {lastUpdate || 'Yükleniyor...'}
      </p>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-900">
          💡 <strong>Pro İpucu:</strong> Backend API hazır olunca burası TCMB'den otomatik güncellenecek!
        </p>
      </div>
    </div>
  );
};

export default ExchangeRateBot;
