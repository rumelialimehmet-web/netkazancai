import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Zap, Shield, TrendingUp, Users, DollarSign } from 'lucide-react';
import Wizard from './Wizard';
import { UserProfile } from '../types';

interface LandingPageProps {
  onLogin: (profile: UserProfile) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Yurt Dışı Gelirinizi
            <span className="text-blue-600"> 10 Dakikada</span>
            <br />Vergi Uyumlu Hale Getirin
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Stripe, PayPal, Upwork gelirlerinizi otomatik takip edin.
            <strong> Mali müşavirle uğraşmaya son!</strong>
            AI Ajanımız her şeyi halleder.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => setShowWizard(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg"
            >
              Ücretsiz Başla <ArrowRight size={20} />
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-400 transition">
              2 Dakikalık Demo İzle
            </button>
          </div>

          <p className="text-sm text-gray-500">
            ✅ Kredi kartı gerektirmez  |  ✅ 14 gün ücretsiz deneme  |  ✅ İstediğiniz zaman iptal edin
          </p>
        </div>
      </header>

      {/* Social Proof */}
      <section className="bg-white py-12 border-y border-gray-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-gray-600 font-medium">
              <Users className="inline mr-2" size={20} />
              Şu ana kadar <strong>500+ girişimci</strong> vergi cezasından kurtuldu
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
            <div className="text-2xl font-bold text-gray-400">Stripe</div>
            <div className="text-2xl font-bold text-gray-400">PayPal</div>
            <div className="text-2xl font-bold text-gray-400">Upwork</div>
            <div className="text-2xl font-bold text-gray-400">Fiverr</div>
          </div>
        </div>
      </section>

      {/* Problem Section (FOMO + Aciliyet) */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-red-900 mb-4 text-center">
            ⚠️ Vergi Müfettişi Kapınızı Çaldığında Çok Geç Olacak
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">❌</span>
              <span>Yurt dışı geliriniz <strong>67,000 TL</strong>'yi geçtiğinde mali müşavir <strong>zorunlu</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">❌</span>
              <span>İstisna limiti takibi yapmazsanız <strong>%40 vergi</strong> + gecikme faizi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">❌</span>
              <span>Dilekçe vermezseniz <strong>hapis cezası</strong> riski</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          AI Ajanınız 24/7 Sizin İçin Çalışır
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="text-yellow-500" size={32} />}
            title="Otomatik Kur Takibi"
            description="TCMB'den günlük döviz kurlarını çeker, USD/EUR gelirlerinizi TL'ye çevirir."
          />
          <FeatureCard
            icon={<DollarSign className="text-green-500" size={32} />}
            title="Stripe/PayPal Entegrasyonu"
            description="Ödeme platformlarınızdan otomatik gelir çeker, istisna limitini hesaplar."
          />
          <FeatureCard
            icon={<Shield className="text-blue-500" size={32} />}
            title="Tek Tıkla Dilekçe"
            description="Vergi dairesine sunacağınız .docx dilekçeyi AI 10 saniyede oluşturur."
          />
          <FeatureCard
            icon={<TrendingUp className="text-purple-500" size={32} />}
            title="Gelir Tahmini"
            description="Mevcut hızınıza göre yıl sonu istisna limitini aşıp aşmayacağınızı öngörür."
          />
          <FeatureCard
            icon={<CheckCircle className="text-teal-500" size={32} />}
            title="Mail Müşavire Gönder"
            description="Aylık raporları otomatik olarak mali müşavirinize e-postayla gönderir."
          />
          <FeatureCard
            icon={<Users className="text-pink-500" size={32} />}
            title="Çoklu Gelir Kaynağı"
            description="Freelance, SaaS, Dropshipping - tüm gelir kaynaklarını tek yerden yönetin."
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Mali Müşavir = $150/Ay
          </h2>
          <h3 className="text-5xl font-bold text-yellow-300 mb-8">
            SınırSaaS = $5/Ay
          </h3>
          <p className="text-xl text-white mb-8">
            🔥 Erken Kullanıcı İndirimi: İlk 1000 kişiye <strong>ömür boyu %50 indirim</strong>
          </p>
          <button
            onClick={() => setShowWizard(true)}
            className="bg-white text-blue-600 px-10 py-5 rounded-lg font-bold text-xl hover:bg-gray-100 transition shadow-2xl"
          >
            Hemen Başla - İlk 14 Gün Ücretsiz
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Sıkça Sorulan Sorular</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <FAQItem
            question="Mali müşavir yerine AI kullanmak yasal mı?"
            answer="Evet! AI sadece veri toplama ve raporlama yapar. Nihai sorumlu her zaman sizsiniz. İsterseniz oluşturulan belgeleri kendi mali müşavirinizle de paylaşabilirsiniz."
          />
          <FAQItem
            question="Stripe/PayPal şifremi vermem gerekiyor mu?"
            answer="Hayır! Sadece API key'lerinizi kullanıyoruz (OAuth2 ile güvenli bağlantı). Şifrelerinize asla erişmiyoruz."
          />
          <FAQItem
            question="Verilerim güvende mi?"
            answer="Tüm veriler Supabase (PostgreSQL) üzerinde şifrelenerek saklanır. SOC 2 Type II sertifikalı altyapı kullanıyoruz."
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Vergi Cezası Yemeden Önce Harekete Geçin
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Şu anda <strong className="text-yellow-300">127 kişi</strong> siteye bakıyor.
            Fiyat <strong>24 saat içinde</strong> artacak.
          </p>
          <button
            onClick={() => setShowWizard(true)}
            className="bg-blue-500 text-white px-12 py-6 rounded-lg font-bold text-2xl hover:bg-blue-600 transition shadow-2xl"
          >
            Son Şansını Yakala 🔥
          </button>
        </div>
      </section>

      {/* Wizard Modal */}
      {showWizard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <Wizard onComplete={onLogin} onClose={() => setShowWizard(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
  <details className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <summary className="font-bold text-lg cursor-pointer text-gray-900">{question}</summary>
    <p className="mt-4 text-gray-600">{answer}</p>
  </details>
);

export default LandingPage;
