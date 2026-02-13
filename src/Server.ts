// src/Server.ts
export class Server {
    id: number;
    baseLatency: number;

    constructor(id: number, baseLatency: number = 50) {
        this.id = id;
        this.baseLatency = baseLatency;
    }

    // İstek gönderildiğinde dönen gecikme süresi (ms cinsinden)
    simulateRequest(currentTime: number): number {
        // Non-stationary: Zamanla değişen yük (Sinüs dalgası) - Yük sürekli değişiyor
        const timeFactor = Math.sin(currentTime / 1000) * 20;

        // Noise: Rastgele gürültü (+/- 10ms) - İnternet dalgalanması gibi
        const noise = (Math.random() - 0.5) * 20;

        // Ani tıkanıklık (Spike) ihtimali %5 - Sunucu bazen takılır
        const spike = Math.random() < 0.05 ? 100 : 0;

        let latency = this.baseLatency + timeFactor + noise + spike;
        // Gecikme süresi eksi olamaz, en az 5ms olsun
        return Math.max(5, latency);
    }
}