import React, { useState, useEffect } from 'react';
import { UserProfile, IncomeEntry, Task, NewIncomeEntry } from '../types';
import IncomeTracker from './IncomeTracker';
import ExchangeRateBot from './ExchangeRateBot';
import TaskManager from './TaskManager';
import AIAssistant from './AIAssistant';
import PetitionGenerator from './PetitionGenerator';
import { useNotifications } from '../contexts/NotificationContext';

interface DashboardProps {
  userProfile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile }) => {
  const { addNotification } = useNotifications();

  // Income entries state
  const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>([
    {
      id: 1,
      date: '2025-01-15',
      description: 'Stripe ödeme',
      amount: 500,
      currency: 'USD',
      exchangeRate: 34.12,
      tryValue: 17060
    },
    {
      id: 2,
      date: '2025-02-01',
      description: 'PayPal müşteri ödemesi',
      amount: 300,
      currency: 'EUR',
      exchangeRate: 37.05,
      tryValue: 11115
    }
  ]);

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      text: 'Ocak ayı gelir bildirimini yap',
      details: 'Vergi dairesine aylık bildirimi gönder',
      completed: false
    },
    {
      id: 2,
      text: 'Stripe API entegrasyonunu tamamla',
      details: 'Ayarlar > Entegrasyonlar bölümünden API key gir',
      completed: false
    },
    {
      id: 3,
      text: 'Mali müşavirle görüşme planla',
      details: 'İstisna limiti aşılmadan önce danış',
      completed: false
    }
  ]);

  const handleAddIncome = (entry: NewIncomeEntry) => {
    const newEntry: IncomeEntry = {
      ...entry,
      id: incomeEntries.length + 1
    };
    setIncomeEntries([newEntry, ...incomeEntries]);

    addNotification({
      title: 'Gelir Eklendi',
      message: `${entry.amount} ${entry.currency} = ${entry.tryValue.toFixed(2)} TL kaydedildi`,
      type: 'success'
    });
  };

  const handleToggleTask = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completedDate: !task.completed ? new Date().toLocaleDateString('tr-TR') : undefined
            }
          : task
      )
    );

    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      addNotification({
        title: 'Görev Tamamlandı!',
        message: task.text,
        type: 'success'
      });
    }
  };

  // Check exception limit warning
  useEffect(() => {
    const totalTRY = incomeEntries.reduce((sum, entry) => sum + entry.tryValue, 0);
    if (totalTRY > 67000) {
      addNotification({
        title: '⚠️ İstisna Limiti Aşıldı',
        message: 'Toplam geliriniz 67.000 TL limitini aştı. Mali müşavir tutmanız gerekebilir.',
        type: 'warning'
      });
    } else if (totalTRY > 60000) {
      addNotification({
        title: '🔔 Limite Yaklaşıyorsunuz',
        message: `Mevcut geliriniz ${totalTRY.toFixed(0)} TL. Limite ${(67000 - totalTRY).toFixed(0)} TL kaldı.`,
        type: 'info'
      });
    }
  }, [incomeEntries]);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Hoş Geldiniz, {userProfile.firstName}! 👋
        </h1>
        <p className="text-blue-100">
          SınırSaaS AI Ajanınız 24/7 sizin için çalışıyor. Vergi uyumunuz güvende.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Tracker */}
        <div className="lg:col-span-1">
          <IncomeTracker entries={incomeEntries} onAddEntry={handleAddIncome} />
        </div>

        {/* Exchange Rate Bot */}
        <div className="lg:col-span-1">
          <ExchangeRateBot />
        </div>

        {/* Task Manager */}
        <div className="lg:col-span-1">
          <TaskManager tasks={tasks} onToggleTask={handleToggleTask} />
        </div>

        {/* Petition Generator */}
        <div className="lg:col-span-1">
          <PetitionGenerator userProfile={userProfile} />
        </div>

        {/* AI Assistant - Full Width */}
        <div className="lg:col-span-2">
          <AIAssistant />
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-900">
          <strong>💡 Pro İpucu:</strong> Backend API hazır olduğunda, Stripe/PayPal gelirleriniz otomatik olarak
          buraya eklenecek. TCMB kurları da günlük güncellenecek!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
