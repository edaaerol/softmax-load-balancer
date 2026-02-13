// src/Simulation.ts
import { Server } from "./Server";
import { RandomLB, RoundRobinLB, SoftmaxLB, ILoadBalancer } from "./LoadBalancer";

// Ayarlar
const NUM_SERVERS = 5;       // 5 tane sunucumuz var
const NUM_REQUESTS = 10000;  // 10 bin istek göndereceğiz

// Simülasyon Fonksiyonu
function runSimulation(lb: ILoadBalancer, servers: Server[]) {
    let totalLatency = 0;

    console.log(`--- ${lb.getName()} Algoritmasi Calisiyor ---`);

    for (let t = 0; t < NUM_REQUESTS; t++) {
        // 1. Load Balancer bir sunucu seçer
        const serverIndex = lb.selectServer(servers);

        // 2. İstek o sunucuya gider ve gecikme süresi (latency) ölçülür
        // 't' parametresi zamanı temsil eder, zamanla sunucu yavaşlayabilir
        const latency = servers[serverIndex].simulateRequest(t);

        // 3. Load Balancer sonucuna göre kendini günceller (Öğrenir)
        lb.update(serverIndex, latency);

        totalLatency += latency;
    }

    const avgLatency = totalLatency / NUM_REQUESTS;
    console.log(`SONUC: ${lb.getName()} Ortalama Gecikme: ${avgLatency.toFixed(2)}ms`);
    console.log("--------------------------------------------------\n");
}

// Sunucuları oluşturuyoruz (Farklı hızlarda)
const servers = [
    new Server(0, 30),  // Çok Hızlı Sunucu
    new Server(1, 50),  // Normal Sunucu
    new Server(2, 60),  // Normal Sunucu
    new Server(3, 80),  // Yavaş Sunucu
    new Server(4, 150)  // Çok Yavaş Sunucu (Arızalı gibi)
];

// Test edilecek algoritmaları hazırlıyoruz
const randomLB = new RandomLB();
const rrLB = new RoundRobinLB();
const softmaxLB = new SoftmaxLB(NUM_SERVERS, 10, 0.1);

// Hepsini sırasıyla çalıştır
runSimulation(randomLB, servers);
runSimulation(rrLB, servers);
runSimulation(softmaxLB, servers);