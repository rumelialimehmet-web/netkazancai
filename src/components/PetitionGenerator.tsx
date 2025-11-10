import React, { useState } from 'react';
import { FileText, Download, Loader } from 'lucide-react';
import { Document, Paragraph, TextRun, AlignmentType, Packer } from 'docx';
import { saveAs } from 'file-saver';
import { UserProfile } from '../types';

interface PetitionGeneratorProps {
  userProfile: UserProfile;
}

const PetitionGenerator: React.FC<PetitionGeneratorProps> = ({ userProfile }) => {
  const [loading, setLoading] = useState(false);
  const [petitionType, setPetitionType] = useState<'income_declaration' | 'exception_request'>('income_declaration');

  const generatePetition = async () => {
    setLoading(true);

    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'DİLEKÇE',
                    bold: true,
                    size: 32
                  })
                ]
              }),
              new Paragraph({ text: '' }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `Tarih: ${new Date().toLocaleDateString('tr-TR')}`
                  })
                ]
              }),
              new Paragraph({ text: '' }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${userProfile.taxOffice} Vergi Dairesi Başkanlığı'na`,
                    bold: true
                  })
                ]
              }),
              new Paragraph({ text: '' }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Adı Soyadı: ${userProfile.firstName} ${userProfile.lastName}`
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `TC Kimlik No: ${userProfile.tcKimlikNo}`
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Adres: ${userProfile.address}`
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Telefon: ${userProfile.phone}`
                  })
                ]
              }),
              new Paragraph({ text: '' }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'KONU: Yurt Dışı Kaynaklı Gelir Bildirimi',
                    bold: true
                  })
                ]
              }),
              new Paragraph({ text: '' }),
              new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                  new TextRun({
                    text: `Sayın Yetkili,\n\nYurt dışı kaynaklı dijital platform gelirlerim hakkında bilgilendirme yapmak ve Gelir Vergisi Kanunu'nun ilgili maddeleri kapsamında istisna talebinde bulunmak amacıyla dilekçemi arz ediyorum.\n\n`
                  }),
                  new TextRun({
                    text: `Gelir Kaynağım: `,
                    bold: true
                  }),
                  new TextRun({
                    text: `${userProfile.incomeSource || 'Dijital platformlar (Stripe, PayPal vb.)'}\n\n`
                  }),
                  new TextRun({
                    text: `Şirket Durumu: `,
                    bold: true
                  }),
                  new TextRun({
                    text: `${userProfile.companyStatus === 'individual' ? 'Şahıs Şirketi' : userProfile.companyStatus === 'limited' ? 'Limited Şirket' : 'Şahıs'}\n\n`
                  }),
                  new TextRun({
                    text: `Gelir Vergisi Kanunu'nun 23. maddesi uyarınca, yıllık brüt 67.000 TL'ye kadar olan yurt dışı kaynaklı gelirlerimin vergiden istisna tutulmasını talep ediyorum.\n\nEklediğim belgeler:\n- Gelir detay raporu\n- TCMB döviz kuru hesaplamaları\n- Ödeme platformu ekstreleri\n\nGereğini saygılarımla arz ederim.`
                  })
                ]
              }),
              new Paragraph({ text: '' }),
              new Paragraph({ text: '' }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: `${userProfile.firstName} ${userProfile.lastName}\n`
                  }),
                  new TextRun({
                    text: `İmza: __________________`
                  })
                ]
              })
            ]
          }
        ]
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `dilekce_${userProfile.tcKimlikNo}_${new Date().toISOString().split('T')[0]}.docx`);
    } catch (error) {
      console.error('Dilekçe oluşturma hatası:', error);
      alert('Dilekçe oluşturulurken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-indigo-500" size={24} />
        <h3 className="text-xl font-bold">Dilekçe Oluşturucu</h3>
      </div>

      <p className="text-gray-600 mb-4 text-sm">
        Vergi dairesine sunacağınız resmi dilekçeyi AI ile 10 saniyede oluşturun.
      </p>

      <div className="space-y-4">
        <select
          value={petitionType}
          onChange={(e) => setPetitionType(e.target.value as any)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="income_declaration">Gelir Bildirimi</option>
          <option value="exception_request">İstisna Talebi</option>
        </select>

        <button
          onClick={generatePetition}
          disabled={loading}
          className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 disabled:bg-gray-400"
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={20} />
              Oluşturuluyor...
            </>
          ) : (
            <>
              <Download size={20} />
              Dilekçe Oluştur (.docx)
            </>
          )}
        </button>
      </div>

      <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <p className="text-sm text-indigo-900">
          <strong>✨ Dahil Edilen Bilgiler:</strong>
        </p>
        <ul className="text-xs text-indigo-800 mt-2 space-y-1 ml-4 list-disc">
          <li>TC Kimlik No ve adres bilgileriniz</li>
          <li>Gelir kaynağı detayları</li>
          <li>67.000 TL istisna talebi</li>
          <li>Yasal dayanak (GVK Madde 23)</li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        💡 Oluşturulan dilekçeyi indirip düzenleyebilir, ardından vergi dairesine sunabilirsiniz.
      </p>
    </div>
  );
};

export default PetitionGenerator;
