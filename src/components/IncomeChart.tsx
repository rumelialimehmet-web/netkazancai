import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { IncomeEntry } from '../types';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Download, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface IncomeChartProps {
  entries: IncomeEntry[];
}

const IncomeChart: React.FC<IncomeChartProps> = ({ entries }) => {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');

  // Prepare data for charts - group by month
  const monthlyData = entries.reduce((acc, entry) => {
    const date = new Date(entry.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' });

    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthName,
        totalTRY: 0,
        totalUSD: 0,
        totalEUR: 0,
        count: 0
      };
    }

    acc[monthKey].totalTRY += entry.tryValue;
    if (entry.currency === 'USD') acc[monthKey].totalUSD += entry.amount;
    if (entry.currency === 'EUR') acc[monthKey].totalEUR += entry.amount;
    acc[monthKey].count += 1;

    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.values(monthlyData).sort((a: any, b: any) => {
    return a.month.localeCompare(b.month);
  });

  // Currency distribution for pie chart
  const currencyData = entries.reduce((acc, entry) => {
    const existing = acc.find(item => item.name === entry.currency);
    if (existing) {
      existing.value += entry.tryValue;
    } else {
      acc.push({ name: entry.currency, value: entry.tryValue });
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

  // Export to Excel
  const handleExportExcel = () => {
    const exportData = entries.map(entry => ({
      'Tarih': entry.date,
      'Açıklama': entry.description,
      'Miktar': entry.amount,
      'Para Birimi': entry.currency,
      'Kur': entry.exchangeRate,
      'TL Değeri': entry.tryValue.toFixed(2)
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Gelirler');

    // Add summary sheet
    const summaryData = [
      { 'Özet': 'Toplam Gelir Sayısı', 'Değer': entries.length },
      { 'Özet': 'Toplam TL', 'Değer': entries.reduce((sum, e) => sum + e.tryValue, 0).toFixed(2) },
      { 'Özet': 'İstisna Limiti', 'Değer': '1.900.000 TL' },
      {
        'Özet': 'Kalan Limit',
        'Değer': (1900000 - entries.reduce((sum, e) => sum + e.tryValue, 0)).toLocaleString('tr-TR') + ' TL'
      }
    ];
    const wsSummary = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Özet');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `sinir-saas-gelir-raporu-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Export to CSV (simpler than Excel)
  const handleExportCSV = () => {
    const headers = ['Tarih', 'Açıklama', 'Miktar', 'Para Birimi', 'Kur', 'TL Değeri'];
    const rows = entries.map(entry => [
      entry.date,
      entry.description,
      entry.amount,
      entry.currency,
      entry.exchangeRate,
      entry.tryValue.toFixed(2)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `sinir-saas-gelir-raporu-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const totalIncome = entries.reduce((sum, entry) => sum + entry.tryValue, 0);
  const exceptionLimit = 1900000;
  const remainingLimit = exceptionLimit - totalIncome;
  const usagePercentage = (totalIncome / exceptionLimit) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">Gelir Analizi</h3>
          <p className="text-sm text-gray-500">Aylık gelir trendleri ve dağılımı</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Chart type selector */}
          <button
            onClick={() => setChartType('line')}
            className={`p-2 rounded-lg transition-all ${chartType === 'line' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
            title="Çizgi Grafik"
          >
            <TrendingUp size={18} />
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`p-2 rounded-lg transition-all ${chartType === 'bar' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
            title="Çubuk Grafik"
          >
            <BarChart3 size={18} />
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={`p-2 rounded-lg transition-all ${chartType === 'pie' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
            title="Pasta Grafik"
          >
            <PieChartIcon size={18} />
          </button>

          <div className="h-6 w-px bg-gray-300 mx-2" />

          {/* Export buttons */}
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm"
            title="Excel'e Aktar"
          >
            <FileSpreadsheet size={16} />
            Excel
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all text-sm"
            title="CSV'ye Aktar"
          >
            <Download size={16} />
            CSV
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-600 mb-1">Toplam Gelir</p>
          <p className="text-2xl font-bold text-blue-900">
            {totalIncome.toLocaleString('tr-TR')} TL
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-600 mb-1">Kalan Limit</p>
          <p className="text-2xl font-bold text-green-900">
            {remainingLimit.toLocaleString('tr-TR')} TL
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-sm text-purple-600 mb-1">Limit Kullanımı</p>
          <p className="text-2xl font-bold text-purple-900">
            {usagePercentage.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        {chartType === 'line' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: any) => `${Number(value).toLocaleString('tr-TR')} TL`}
              />
              <Legend />
              <Line type="monotone" dataKey="totalTRY" stroke="#3B82F6" strokeWidth={3} name="TL Gelir" />
            </LineChart>
          </ResponsiveContainer>
        )}

        {chartType === 'bar' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: any) => `${Number(value).toLocaleString('tr-TR')} TL`}
              />
              <Legend />
              <Bar dataKey="totalTRY" fill="#3B82F6" name="TL Gelir" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartType === 'pie' && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currencyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {currencyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => `${Number(value).toLocaleString('tr-TR')} TL`} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">İstisna Limiti Kullanımı</span>
          <span className="text-sm font-semibold text-gray-900">{usagePercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              usagePercentage > 90
                ? 'bg-red-600'
                : usagePercentage > 70
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default IncomeChart;
