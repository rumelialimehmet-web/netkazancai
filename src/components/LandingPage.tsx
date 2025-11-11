import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Zap, Shield, TrendingUp, Users, DollarSign, Menu, X } from 'lucide-react';
import Wizard from './Wizard';
import { UserProfile } from '../types';

interface LandingPageProps {
  onLogin: (profile: UserProfile) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [showWizard, setShowWizard] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SınırSaaS
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Özellikler</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition">Fiyatlandırma</a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600 transition">SSS</a>
              <button
                onClick={() => setShowWizard(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Ücretsiz Başla
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-gray-700"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Özellikler</a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition">Fiyatlandırma</a>
                <a href="#faq" className="text-gray-700 hover:text-blue-600 transition">SSS</a>
                <button
                  onClick={() => setShowWizard(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-left"
                >
                  Ücretsiz Başla
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

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
      <section id="features" className="container mx-auto px-6 py-20">
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
      <section id="pricing" className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
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
      <section id="faq" className="container mx-auto px-6 py-20">
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                SınırSaaS
              </h3>
              <p className="text-sm text-gray-400">
                Yurt dışı gelir sahipleri için AI destekli vergi uyum platformu.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-bold text-white mb-4">Ürün</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-blue-400 transition">Özellikler</a></li>
                <li><a href="#pricing" className="hover:text-blue-400 transition">Fiyatlandırma</a></li>
                <li><a href="#faq" className="hover:text-blue-400 transition">SSS</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Demo</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-white mb-4">Şirket</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">İletişim</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Kariyer</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-white mb-4">Yasal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Gizlilik Politikası</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Kullanım Şartları</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">KVKK</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Çerez Politikası</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2025 SınırSaaS. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

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
