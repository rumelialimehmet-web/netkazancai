import React, { useState, useEffect } from 'react';
import { UserProfile, IncomeEntry, Task, NewIncomeEntry } from '../types';
import IncomeTracker from './IncomeTracker';
import IncomeChart from './IncomeChart';
import ExchangeRateBot from './ExchangeRateBot';
import TaskManager from './TaskManager';
import AIAssistant from './AIAssistant';
import PetitionGenerator from './PetitionGenerator';
import TaxCalendar from './TaxCalendar';
import OnboardingTour from './OnboardingTour';
import { useNotifications } from '../contexts/NotificationContext';
import { Lightbulb } from 'lucide-react';

interface DashboardProps {
  userProfile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile }) => {
  const { addNotification } = useNotifications();

  // Onboarding tour state
  const [showTour, setShowTour] = useState(false);
  const [tourCompleted, setTourCompleted] = useState(false);

  // Check if tour was completed before
  useEffect(() => {
    const completed = localStorage.getItem('sinir-saas-tour-completed');
    if (completed === 'true') {
      setTourCompleted(true);
    } else {
      // Auto-start tour for first-time users after 2 seconds
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleTourComplete = () => {
    setShowTour(false);
    setTourCompleted(true);
    localStorage.setItem('sinir-saas-tour-completed', 'true');
    addNotification({
      title: '🎉 Tebrikler!',
      message: 'Başlangıç turunu tamamladınız. Artık SınırSaaS\'ı kullanmaya hazırsınız!',
      type: 'success'
    });
  };

  const handleTourSkip = () => {
    setShowTour(false);
    setTourCompleted(true);
    localStorage.setItem('sinir-saas-tour-completed', 'true');
  };

  const handleRestartTour = () => {
    setShowTour(true);
  };

  // Tour steps definition
  const tourSteps = [
    {
      target: '[data-tour="welcome"]',
      title: '👋 Hoş Geldiniz!',
      description: 'SınırSaaS\'a hoş geldiniz! Bu hızlı tur ile platformumuzun tüm özelliklerini keşfedeceksiniz. Her adımda, vergi uyumunuzu kolaylaştıracak araçları tanıyacaksınız.',
      position: 'bottom' as const
    },
    {
      target: '[data-tour="income-tracker"]',
      title: '💰 İstisna Takibi',
      description: 'Yurt dışı gelirlerinizi buradan takip edin. GVK 20/B kapsamında 1.900.000 TL\'ye kadar istisna hakkınız var. Limit aşımından önce sizi uyarırız!',
      position: 'right' as const
    },
    {
      target: '[data-tour="exchange-rate"]',
      title: '💱 TCMB Kur Botu',
      description: 'Türkiye Cumhuriyet Merkez Bankası\'nın günlük döviz kurlarını burada görebilirsiniz. Gelirleriniz otomatik olarak resmi kurdan TL\'ye çevrilir.',
      position: 'left' as const
    },
    {
      target: '[data-tour="income-chart"]',
      title: '📊 Gelir Analizi & Raporlama',
      description: 'Gelirlerinizi görselleştirin! Çizgi, çubuk veya pasta grafiği ile aylık trendleri görün. Excel/CSV formatında rapor alın ve mali müşavirinizle paylaşın.',
      position: 'bottom' as const
    },
    {
      target: '[data-tour="tax-calendar"]',
      title: '📅 Vergi Takvimi',
      description: 'Yaklaşan vergi beyannamesi ve ödeme tarihlerini kaçırmayın. Önemli tarihleri size hatırlatıyoruz ve son dakika stresini önlüyoruz.',
      position: 'right' as const
    },
    {
      target: '[data-tour="task-manager"]',
      title: '✅ Görev Yöneticisi',
      description: 'Vergi uyumu için yapmanız gereken görevleri buradan takip edin. API entegrasyonları, beyanname tarihleri ve diğer önemli işlemler.',
      position: 'left' as const
    },
    {
      target: '[data-tour="petition"]',
      title: '📄 Dilekçe Oluşturucu',
      description: 'Vergi dairesine sunacağınız dilekçeleri otomatik olarak oluşturun. Bilgileriniz otomatik doldurulur, siz sadece indirin!',
      position: 'right' as const
    },
    {
      target: '[data-tour="ai-assistant"]',
      title: '🤖 AI Vergi Asistanı',
      description: 'Vergi mevzuatı, istisna limitleri ve beyanname süreçleri hakkında sorularınızı AI asistanımıza sorun. 7/24 size yardımcı olmaya hazır!',
      position: 'top' as const
    }
  ];

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

  // Check exception limit warning (GVK 20/B - 2025 yılı için 1.900.000 TL)
  useEffect(() => {
    const exceptionLimit = 1900000; // GVK 20/B - Sosyal Medya İstisnası
    const totalTRY = incomeEntries.reduce((sum, entry) => sum + entry.tryValue, 0);
    if (totalTRY > exceptionLimit) {
      addNotification({
        title: '⚠️ İstisna Limiti Aşıldı',
        message: `Toplam geliriniz ${exceptionLimit.toLocaleString('tr-TR')} TL (GVK 20/B) limitini aştı. Mali müşavir tutmanız gerekebilir.`,
        type: 'warning'
      });
    } else if (totalTRY > exceptionLimit * 0.9) {
      addNotification({
        title: '🔔 Limite Yaklaşıyorsunuz',
        message: `Mevcut geliriniz ${totalTRY.toFixed(0)} TL. Limite ${(exceptionLimit - totalTRY).toLocaleString('tr-TR')} TL kaldı.`,
        type: 'info'
      });
    }
  }, [incomeEntries]);

  return (
    <div className="space-y-6">
      {/* Onboarding Tour */}
      {showTour && (
        <OnboardingTour
          steps={tourSteps}
          onComplete={handleTourComplete}
          onSkip={handleTourSkip}
        />
      )}

      {/* Welcome Banner */}
      <div
        data-tour="welcome"
        className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-xl p-6 text-white animate-slideUp"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Hoş Geldiniz, {userProfile.firstName}! 👋
            </h1>
            <p className="text-blue-100">
              SınırSaaS AI Ajanınız 24/7 sizin için çalışıyor. Vergi uyumunuz güvende.
            </p>
          </div>
          {tourCompleted && (
            <button
              onClick={handleRestartTour}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all backdrop-blur-sm"
            >
              <Lightbulb size={18} />
              <span className="text-sm font-medium">Başlangıç Turu</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Tracker */}
        <div className="lg:col-span-1 animate-fadeIn" style={{ animationDelay: '0.1s' }} data-tour="income-tracker">
          <IncomeTracker entries={incomeEntries} onAddEntry={handleAddIncome} />
        </div>

        {/* Exchange Rate Bot */}
        <div className="lg:col-span-1 animate-fadeIn" style={{ animationDelay: '0.2s' }} data-tour="exchange-rate">
          <ExchangeRateBot />
        </div>

        {/* Income Chart - Full Width */}
        <div className="lg:col-span-2 animate-fadeIn" style={{ animationDelay: '0.3s' }} data-tour="income-chart">
          <IncomeChart entries={incomeEntries} />
        </div>

        {/* Tax Calendar */}
        <div className="lg:col-span-1 animate-fadeIn" style={{ animationDelay: '0.4s' }} data-tour="tax-calendar">
          <TaxCalendar />
        </div>

        {/* Task Manager */}
        <div className="lg:col-span-1 animate-fadeIn" style={{ animationDelay: '0.5s' }} data-tour="task-manager">
          <TaskManager tasks={tasks} onToggleTask={handleToggleTask} />
        </div>

        {/* Petition Generator */}
        <div className="lg:col-span-1 animate-fadeIn" style={{ animationDelay: '0.6s' }} data-tour="petition">
          <PetitionGenerator userProfile={userProfile} />
        </div>

        {/* AI Assistant - Full Width */}
        <div className="lg:col-span-2 animate-fadeIn" style={{ animationDelay: '0.7s' }} data-tour="ai-assistant">
          <AIAssistant />
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
        <p className="text-sm text-yellow-900 dark:text-yellow-200">
          <strong>💡 Pro İpucu:</strong> Backend API hazır olduğunda, Stripe/PayPal gelirleriniz otomatik olarak
          buraya eklenecek. TCMB kurları da günlük güncellenecek!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
