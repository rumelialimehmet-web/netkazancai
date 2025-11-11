import React from 'react';
import { Calendar, AlertCircle, Clock } from 'lucide-react';

interface TaxDate {
  date: string;
  title: string;
  description: string;
  type: 'deadline' | 'payment' | 'declaration';
  daysLeft: number;
}

const TaxCalendar: React.FC = () => {
  // Calculate days until date
  const getDaysLeft = (dateStr: string): number => {
    const target = new Date(dateStr);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const upcomingDates: TaxDate[] = [
    {
      date: '2025-11-25',
      title: 'Kasım Ayı KDV Beyannamesi',
      description: 'Kasım ayı KDV beyannamesinin verilmesi ve ödenmesi',
      type: 'deadline',
      daysLeft: getDaysLeft('2025-11-25')
    },
    {
      date: '2025-12-01',
      title: 'Sosyal Güvenlik Primi Ödemesi',
      description: 'Kasım ayı SGK primlerinin ödenmesi',
      type: 'payment',
      daysLeft: getDaysLeft('2025-12-01')
    },
    {
      date: '2025-12-25',
      title: 'Aralık Ayı KDV Beyannamesi',
      description: 'Aralık ayı KDV beyannamesinin verilmesi',
      type: 'declaration',
      daysLeft: getDaysLeft('2025-12-25')
    },
    {
      date: '2026-01-31',
      title: '2025 Yıllık Gelir Vergisi Beyannamesi',
      description: '2025 yılı gelir vergisi beyannamesinin verilme tarihi',
      type: 'deadline',
      daysLeft: getDaysLeft('2026-01-31')
    },
    {
      date: '2026-03-01',
      title: 'Gelir Vergisi Birinci Taksit',
      description: '2025 yılı gelir vergisi 1. taksit ödeme tarihi',
      type: 'payment',
      daysLeft: getDaysLeft('2026-03-01')
    }
  ].sort((a, b) => a.daysLeft - b.daysLeft);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deadline':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'payment':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'declaration':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'deadline':
        return 'Son Tarih';
      case 'payment':
        return 'Ödeme';
      case 'declaration':
        return 'Beyanname';
      default:
        return 'Genel';
    }
  };

  const getUrgencyColor = (daysLeft: number) => {
    if (daysLeft < 0) return 'text-red-600 font-bold';
    if (daysLeft <= 7) return 'text-red-600 font-semibold';
    if (daysLeft <= 14) return 'text-orange-600 font-semibold';
    if (daysLeft <= 30) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-3 rounded-lg">
            <Calendar className="text-purple-600" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Yaklaşan Resmi Tarihler</h3>
            <p className="text-sm text-gray-500">Önemli vergi ve beyanname tarihleri</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {upcomingDates.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(item.type)}`}>
                    {getTypeLabel(item.type)}
                  </span>
                  <Clock size={14} className="text-gray-400" />
                  <span className={`text-xs ${getUrgencyColor(item.daysLeft)}`}>
                    {item.daysLeft < 0
                      ? `${Math.abs(item.daysLeft)} gün geçti!`
                      : item.daysLeft === 0
                        ? 'BUGÜN!'
                        : `${item.daysLeft} gün kaldı`}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-semibold text-gray-900">
                  {new Date(item.date).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'short'
                  })}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(item.date).getFullYear()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex items-start gap-2 bg-blue-50 p-3 rounded-lg">
        <AlertCircle size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-900">
          <strong>Not:</strong> Bu tarihler genel hatırlatma amaçlıdır. Kişisel beyannamenizin
          kesin tarihleri için mali müşavirinize danışın.
        </p>
      </div>
    </div>
  );
};

export default TaxCalendar;
