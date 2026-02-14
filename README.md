# 🚀 Dağıtık Sistemler İçin Softmax Load Balancer

Bu proje **Agentic Coding (Yapay Zeka Destekli Kodlama)** yaklaşımı kullanılarak geliştirilmiştir.

Projenin temel amacı; performansları zamanla değişen (non-stationary) ve gürültülü (noisy) sunuculardan oluşan dağıtık bir sistemde, toplam gecikmeyi (latency) minimize eden akıllı bir yük dengeleyici (Load Balancer) tasarlamaktır.

---

## 🎯 Proje Hakkında

Klasik yük dengeleme algoritmaları (**Round-Robin**, **Random**) sunucuların anlık performans durumundan habersizdir.

Bu projede implemente edilen **Softmax Action Selection** algoritması, **Pekiştirmeli Öğrenme (Reinforcement Learning)** prensiplerini kullanarak geçmiş performans verilerinden öğrenir ve olasılıksal seçim yapar.

### 🔍 Temel Özellikler

- **Non-Stationary Ortam:** Sunucuların yanıt süreleri sabit değildir. Sinüs dalgası simülasyonu ile zamanla değişim modellenmiştir.
- **Gürültü ve Spike:** Ağ gecikmeleri rastgele gürültü ve ani sıçramalar (spike) içerir.
- **Softmax Algoritması:**  
  P(ai) = e^(Qi / tau) / Σ e^(Qj / tau)
- **Nümerik Stabilite:** Taşmayı (overflow) önlemek için Shift-Invariance (max değer çıkarma) tekniği uygulanmıştır.
- **Sürekli Öğrenme:** Learning Rate (alpha) ile algoritma değişen performansa adapte olur.
- **Exploration / Exploitation Dengesi:** Temperature (tau) parametresi ile keşif-kullanım dengesi ayarlanabilir.

---

## 🛠 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm

### 1) Projeyi Klonlayın

```bash
git clone https://github.com/KULLANICI_ADINIZ/softmax-load-balancer.git
cd softmax-load-balancer
```

### 2) Bağımlılıkları Yükleyin

```bash
npm install
```

### 3) Simülasyonu Başlatın

TypeScript dosyasını doğrudan çalıştırmak için:

```bash
npx ts-node src/Simulation.ts
```

Alternatif olarak derleyip çalıştırabilirsiniz:

```bash
npm run build
node dist/Simulation.js
```

---

## 📊 Test Sonuçları

5 sunucu ve 10.000 istek ile yapılan simülasyon sonuçları:

| Algoritma    | Ortalama Gecikme | Performans |
|--------------|------------------|------------|
| Random       | ~82.85 ms        | Başarısız (Kör seçim) |
| Round-Robin  | ~82.62 ms        | Başarısız (Statik seçim) |
| Softmax      | ~56.10 ms        | Başarılı (Öğrenen seçim) |

### Sonuç

Softmax algoritması, performansı yüksek sunucuları zamanla keşfederek trafiği optimize etmiş ve ortalama gecikmeyi %30’dan fazla azaltmıştır.

Bu sonuç, klasik statik algoritmalara kıyasla öğrenen yaklaşımların dağıtık sistemlerde önemli avantaj sağladığını göstermektedir.

---

## 📂 Proje Yapısı

```
src/
├── Server.ts        # Değişken performanslı sunucu simülasyonu
├── LoadBalancer.ts  # Random, Round-Robin ve Softmax implementasyonu
└── Simulation.ts    # Algoritmaların test edildiği ana dosya
```

---

## 💻 Kullanılan Teknolojiler

- Dil: TypeScript
- Çalışma Ortamı: Node.js
- IDE: JetBrains WebStorm
- Agentic AI: Agentic AI: Google AI Studio (Gemini 3 Pro - Kod üretimi ve mimari tasarım desteği)

---

## 🧠 Teknik Katkılar

- Reinforcement Learning tabanlı karar mekanizması
- Nümerik stabil Softmax implementasyonu
- Non-stationary ortam modellemesi
- Çalışma zamanı analizi ve performans karşılaştırması
- Modüler ve genişletilebilir mimari yapı

---

## 👩‍💻 Geliştirici

Bu proje, dağıtık sistemlerde adaptif algoritmaların performans avantajını göstermek amacıyla akademik çalışma kapsamında geliştirilmiştir.

⭐ Eğer projeyi beğendiyseniz repo'ya star vermeyi unutmayın.
