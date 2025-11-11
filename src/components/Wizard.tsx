import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { UserProfile } from '../types';
import { signUp, createUserProfile } from '../utils/supabase';

interface WizardProps {
  onComplete: (profile: UserProfile) => void;
  onClose: () => void;
}

const Wizard: React.FC<WizardProps> = ({ onComplete, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    tcKimlikNo: '',
    taxOffice: '',
    address: '',
    taxId: '',
    phone: '',
    email: '',
    password: '',
    incomeSource: '',
    companyStatus: ''
  });

  const totalSteps = 4;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // Demo mode check: Eğer env var yoksa, direkt frontend-only mode
      const isDemoMode = !import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (isDemoMode) {
        // Demo mode: Supabase'i bypass et, direkt login yap
        console.log('🎭 Demo Mode: Supabase bypass ediliyor, direkt dashboard açılıyor...');

        // 1 saniye fake loading (UX için)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Direkt dashboard'a geç
        onComplete(formData);
      } else {
        // Production mode: Gerçek Supabase kayıt
        const { data, error: signUpError } = await signUp(
          formData.email,
          formData.password || '',
          {
            firstName: formData.firstName,
            lastName: formData.lastName
          }
        );

        if (signUpError) {
          setError(signUpError.message);
          setLoading(false);
          return;
        }

        // User profile oluştur
        if (data.user) {
          const profileData = { ...formData };
          delete profileData.password;
          await createUserProfile(data.user.id, profileData);
        }

        // Dashboard'a geç
        onComplete(formData);
      }
    } catch (err: any) {
      // Hata olsa bile demo mode'da dashboard'a git
      if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.warn('⚠️ Supabase hatası ama demo mode aktif, dashboard açılıyor:', err.message);
        onComplete(formData);
      } else {
        setError(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-8">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <X size={24} />
      </button>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 mx-1 rounded ${
                s <= step ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-600 text-center">
          Adım {step} / {totalSteps}
        </p>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Önce Tanışalım 👋</h2>
            <p className="text-gray-600 mb-6">Kişisel bilgilerinizi girin</p>

            <div className="space-y-4">
              <input
                type="text"
                name="firstName"
                placeholder="Ad"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Soyad"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                name="tcKimlikNo"
                placeholder="TC Kimlik No"
                value={formData.tcKimlikNo}
                onChange={handleInputChange}
                maxLength={11}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Telefon (0555 123 4567)"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Vergi Bilgileriniz 📄</h2>
            <p className="text-gray-600 mb-6">Vergi dairesi ve adres bilgilerinizi girin</p>

            <div className="space-y-4">
              <input
                type="text"
                name="taxOffice"
                placeholder="Vergi Dairesi (Örn: Kadıköy)"
                value={formData.taxOffice}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                name="taxId"
                placeholder="Vergi Kimlik Numarası (Opsiyonel)"
                value={formData.taxId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                name="address"
                placeholder="Adres"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Gelir Kaynağınız 💰</h2>
            <p className="text-gray-600 mb-6">AI Ajanınızı kişiselleştirmek için</p>

            <div className="space-y-4">
              <select
                name="incomeSource"
                value={formData.incomeSource}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Gelir kaynağınızı seçin</option>
                <option value="freelance">Freelance (Upwork, Fiverr vb.)</option>
                <option value="saas">SaaS Ürünü</option>
                <option value="ecommerce">E-ticaret / Dropshipping</option>
                <option value="consulting">Danışmanlık</option>
                <option value="other">Diğer</option>
              </select>

              <select
                name="companyStatus"
                value={formData.companyStatus}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Şirket durumunuz</option>
                <option value="individual">Şahıs Şirketi</option>
                <option value="limited">Limited Şirket</option>
                <option value="none">Henüz şirketim yok</option>
              </select>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <p className="text-sm text-blue-900">
                  <CheckCircle className="inline mr-2" size={16} />
                  <strong>AI Önerisi:</strong> Yıllık geliriniz 67.000 TL'yi geçiyorsa mali müşavir tutmanız gerekir.
                  SınırSaaS ile bu maliyeti %95 düşürebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Hesabınızı Oluşturun 🎉</h2>
            <p className="text-gray-600 mb-6">Son adım! E-posta ve şifrenizi belirleyin</p>

            <div className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="E-posta"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Şifre (min. 6 karakter)"
                value={formData.password}
                onChange={handleInputChange}
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {!import.meta.env.VITE_SUPABASE_ANON_KEY && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-yellow-900">
                    <strong>🎭 Demo Mode:</strong> Supabase bağlantısı yok. "Tamamla" butonuna tıklayınca direkt dashboard açılacak.
                    Gerçek authentication için Vercel'de <code className="bg-yellow-100 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> ekleyin.
                  </p>
                </div>
              )}

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                <p className="text-sm text-green-900">
                  <CheckCircle className="inline mr-2 text-green-600" size={16} />
                  14 gün boyunca <strong>tamamen ücretsiz</strong>. Kredi kartı bilgisi istemiyoruz.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold ${
            step === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <ArrowLeft size={20} /> Geri
        </button>

        {step < totalSteps ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            İleri <ArrowRight size={20} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? 'Kaydediliyor...' : 'Tamamla'} <CheckCircle size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Wizard;
