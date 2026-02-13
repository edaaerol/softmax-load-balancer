// src/LoadBalancer.ts
import { Server } from "./Server";

// Tüm Load Balancer'ların uyması gereken şablon (Interface)
export interface ILoadBalancer {
    selectServer(servers: Server[]): number; // Hangi sunucuyu seçti? (Index döner)
    update(serverIndex: number, latency: number): void; // Sonuçtan ne öğrendi?
    getName(): string; // Algoritmanın adı ne?
}

// 1. Random (Rastgele) Load Balancer
export class RandomLB implements ILoadBalancer {
    selectServer(servers: Server[]): number {
        // Rastgele bir sunucu seç
        return Math.floor(Math.random() * servers.length);
    }
    update(serverIndex: number, latency: number): void {
        // Random algoritması öğrenmez, o yüzden burası boş.
    }
    getName() { return "Random"; }
}

// 2. Round Robin (Sıralı) Load Balancer
export class RoundRobinLB implements ILoadBalancer {
    private currentIndex = 0;

    selectServer(servers: Server[]): number {
        const index = this.currentIndex;
        // Sıradaki sunucuya geç, sona geldiyse başa dön (%)
        this.currentIndex = (this.currentIndex + 1) % servers.length;
        return index;
    }
    update(serverIndex: number, latency: number): void {
        // Round Robin de öğrenmez, sadece sırayı takip eder.
    }
    getName() { return "Round-Robin"; }
}

// 3. Softmax Action Selection Load Balancer (Akıllı Algoritma)
export class SoftmaxLB implements ILoadBalancer {
    private qValues: number[]; // Her sunucu için tahmini puanımız (Q-Value)
    private temperature: number; // Tau: Keşif parametresi
    private learningRate: number; // Alpha: Öğrenme hızı

    constructor(numServers: number, temperature: number = 10, learningRate: number = 0.1) {
        // Başlangıçta tüm sunuculara eşit puan (100) veriyoruz (İyimser başlangıç)
        this.qValues = new Array(numServers).fill(100);
        this.temperature = temperature;
        this.learningRate = learningRate;
    }

    selectServer(servers: Server[]): number {
        // --- Softmax Formülü Uygulaması ---

        // ADIM 1: Nümerik Stabilite (Taşmayı önlemek için)
        // Matematiksel hile: Tüm değerlerden en büyüğünü çıkarırsak sonuç oranları değişmez ama sayılar küçülür.
        const maxQ = Math.max(...this.qValues);

        // ADIM 2: Exponent (e üzeri Q) hesapla
        const expValues = this.qValues.map(q => Math.exp((q - maxQ) / this.temperature));

        // ADIM 3: Toplamı bul
        const sumExp = expValues.reduce((a, b) => a + b, 0);

        // ADIM 4: Olasılıkları hesapla (Her bir değeri toplama böl)
        const probabilities = expValues.map(v => v / sumExp);

        // ADIM 5: Olasılıklara göre seçim yap (Rulet tekerleği mantığı)
        const rand = Math.random();
        let cumulative = 0;
        for (let i = 0; i < probabilities.length; i++) {
            cumulative += probabilities[i];
            if (rand <= cumulative) {
                return i;
            }
        }
        return probabilities.length - 1; // Güvenlik için sonuncuyu döndür
    }

    update(serverIndex: number, latency: number): void {
        // Latency (gecikme) ne kadar düşükse, Ödül (Reward) o kadar yüksek olmalı.
        // Ödül = 1000 / Gecikme Süresi
        const reward = 1000 / Math.max(1, latency);

        // Q-Learning Güncelleme Kuralı:
        // Yeni Değer = Eski Değer + ÖğrenmeHızı * (Gerçekleşen Ödül - Eski Değer)
        const oldQ = this.qValues[serverIndex];
        this.qValues[serverIndex] = oldQ + this.learningRate * (reward - oldQ);
    }

    getName() { return "Softmax"; }
}