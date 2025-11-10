import React, { useState } from 'react';
import { Plus, DollarSign, TrendingUp } from 'lucide-react';
import { IncomeEntry, NewIncomeEntry } from '../types';

interface IncomeTrackerProps {
  entries: IncomeEntry[];
  onAddEntry: (entry: NewIncomeEntry) => void;
}

const IncomeTracker: React.FC<IncomeTrackerProps> = ({ entries, onAddEntry }) => {
  const [showModal, setShowModal] = useState(false);
  const [newEntry, setNewEntry] = useState<NewIncomeEntry>({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0,
    currency: 'USD',
    exchangeRate: 0,
    tryValue: 0
  });

  const totalTRY = entries.reduce((sum, entry) => sum + entry.tryValue, 0);
  const exceptionLimit = 67000;
  const remaining = exceptionLimit - totalTRY;
  const progressPercentage = Math.min((totalTRY / exceptionLimit) * 100, 100);

  const handleSubmit = () => {
    onAddEntry(newEntry);
    setShowModal(false);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: 0,
      currency: 'USD',
      exchangeRate: 0,
      tryValue: 0
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <DollarSign className="text-green-500" size={24} />
          Gelir Takibi
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} /> Gelir Ekle
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">İstisna Limiti Kullanımı</span>
          <span className="font-bold text-gray-900">
            {totalTRY.toLocaleString('tr-TR')} TL / 67,000 TL
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${
              progressPercentage > 90 ? 'bg-red-500' : progressPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Kalan limit: <strong>{remaining.toLocaleString('tr-TR')} TL</strong>
          {remaining < 0 && <span className="text-red-600 ml-2">⚠️ Limit aşıldı!</span>}
        </p>
      </div>

      {/* Recent Entries */}
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-700 mb-2">Son Gelirler</h4>
        {entries.length === 0 ? (
          <p className="text-gray-500 text-sm">Henüz gelir kaydı yok. Hemen ekleyin!</p>
        ) : (
          <div className="max-h-60 overflow-y-auto space-y-2">
            {entries.map((entry) => (
              <div key={entry.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{entry.description}</p>
                  <p className="text-xs text-gray-500">{entry.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{entry.tryValue.toLocaleString('tr-TR')} TL</p>
                  <p className="text-xs text-gray-500">
                    {entry.amount} {entry.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Income Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Yeni Gelir Ekle</h3>
            <div className="space-y-4">
              <input
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Açıklama (Örn: Stripe ödeme)"
                value={newEntry.description}
                onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Tutar"
                  value={newEntry.amount || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, amount: parseFloat(e.target.value) })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <select
                  value={newEntry.currency}
                  onChange={(e) => setNewEntry({ ...newEntry, currency: e.target.value as 'USD' | 'EUR' | 'GBP' })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
              <input
                type="number"
                step="0.01"
                placeholder="Döviz kuru (Örn: 34.50)"
                value={newEntry.exchangeRate || ''}
                onChange={(e) => {
                  const rate = parseFloat(e.target.value);
                  setNewEntry({
                    ...newEntry,
                    exchangeRate: rate,
                    tryValue: newEntry.amount * rate
                  });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-900">
                  TL Değeri: <strong>{newEntry.tryValue.toLocaleString('tr-TR')} TL</strong>
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeTracker;
