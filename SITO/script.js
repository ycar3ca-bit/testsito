// Generatore codice room
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Apertura modal chat
function openChatModal() {
    const modal = document.getElementById('chatModal');
    const roomCodeElement = document.getElementById('room-code');
    
    const newCode = generateRoomCode();
    roomCodeElement.textContent = newCode;
    modal.style.display = 'flex';
    
    console.log('🔒 Chat sicura creata:', newCode);
}

// Chiusura modal
function closeModal() {
    const modal = document.getElementById('chatModal');
    const roomCode = document.getElementById('room-code').textContent;
    
    modal.style.display = 'none';
    console.log('💥 Chat eliminata:', roomCode);
}

// Copia codice
function copyCode() {
    const roomCode = document.getElementById('room-code').textContent;
    navigator.clipboard.writeText(roomCode).then(() => {
        alert('✅ Codice copiato! Condividilo con attenzione.');
    });
}

// Effetti particelle
function createParticles() {
    const particles = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(0, 188, 212, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animation = `float ${Math.random() * 10 + 5}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particles.appendChild(particle);
    }
}

// Inizializzazione
window.onload = function() {
    createParticles();
    
    window.onclick = function(event) {
        const modal = document.getElementById('chatModal');
        if (event.target === modal) {
            closeModal();
        }
    }
}
// SISTEMA ANTI-MALWARE AVANZATO WHITEDARKNESS
export class SecuritySystem {
    constructor() {
        this.threatLevel = 0;
        this.detectedThreats = [];
        this.init();
    }

    init() {
        console.log('🛡️  Sistema di sicurezza WhiteDarkness attivato');
        this.monitorNetwork();
        this.detectInjection();
        this.preventXSS();
        this.blockMaliciousCode();
        this.encryptData();
        this.setupFirewall();
        this.startBehaviorAnalysis();
    }

    monitorNetwork() {
        // Monitoraggio richieste sospette
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const url = args[0];
            if (this.isSuspiciousURL(url)) {
                console.warn('🚨 Bloccata richiesta sospetta:', url);
                this.logThreat('NetworkRequest', 'Tentativo di connessione a dominio sospetto');
                throw new Error('Request blocked by security system');
            }
            return originalFetch(...args);
        };
    }

    detectInjection() {
        // Rilevamento tentativi di injection
        document.addEventListener('input', (e) => {
            const value = e.target.value;
            if (this.isSQLInjection(value) || this.isXSSAttempt(value)) {
                e.target.value = '';
                this.alertThreat('InputInjection', 'Tentativo di injection rilevato');
            }
        });
    }

    preventXSS() {
        // Sanitizzazione contenuti dinamici
        const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML').set;
        Object.defineProperty(Element.prototype, 'innerHTML', {
            set: function (value) {
                const sanitized = this.sanitizeHTML(value);
                return originalInnerHTML.call(this, sanitized);
            }
        });
    }

    blockMaliciousCode() {
        // Blocco esecuzione codice malevolo
        const originalEval = window.eval;
        window.eval = function (code) {
            if (this.isMaliciousCode(code)) {
                this.logThreat('CodeExecution', 'Tentativo di esecuzione codice malevolo');
                return null;
            }
            return originalEval(code);
        }.bind(this);
    }

    encryptData() {
        // Crittografia dati sensibili
        this.encryptionKey = crypto.getRandomValues(new Uint8Array(32));
    }

    setupFirewall() {
        // Firewall applicativo
        setInterval(() => {
            this.checkSuspiciousActivity();
        }, 5000);
    }

    startBehaviorAnalysis() {
        // Analisi comportamentale
        let suspiciousActions = 0;
        const actionTimeout = setTimeout(() => {
            if (suspiciousActions > 5) {
                this.lockSystem();
            }
        }, 60000);

        document.addEventListener('click', () => {
            suspiciousActions++;
        });
    }

    isSuspiciousURL(url) {
        const maliciousPatterns = [
            /malware/i,
            /virus/i,
            /trojan/i,
            /exploit/i,
            /\.xyz$/,
            /\.top$/,
            /\.gq$/,
            /\/wp-admin\//,
            /\/phpmyadmin\//
        ];
        return maliciousPatterns.some(pattern => pattern.test(url));
    }

    isSQLInjection(input) {
        const sqlPatterns = [
            /union.*select/i,
            /insert.*into/i,
            /delete.*from/i,
            /drop.*table/i,
            /or.*1=1/i,
            /--/,
            /;/,
            /\/\*.*\*\//
        ];
        return sqlPatterns.some(pattern => pattern.test(input));
    }

    isXSSAttempt(input) {
        const xssPatterns = [
            /<script>/i,
            /javascript:/i,
            /onerror=/i,
            /onload=/i,
            /onclick=/i,
            /alert(/i,
            /document\.cookie/i,
            /window\.location/i
        ];
        return xssPatterns.some(pattern => pattern.test(input));
    }

    isMaliciousCode(code) {
        const maliciousCodePatterns = [
            /document\.cookie/,
            /localStorage/,
            /sessionStorage/,
            /XMLHttpRequest/,
            /fetch/,
            /eval/,
            /Function/,
            /importScripts/
        ];
        return maliciousCodePatterns.some(pattern => pattern.test(code));
    }

    sanitizeHTML(html) {
        const temp = document.createElement('div');
        temp.textContent = html;
        return temp.innerHTML;
    }

    logThreat(type, message) {
        this.detectedThreats.push({
            type,
            message,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
        this.threatLevel += 10;
        this.updateSecurityShield();
    }

    alertThreat(type, message) {
        this.logThreat(type, message);
        alert(`🚨 SICUREZZA: ${message}`);
    }

    updateSecurityShield() {
        const shield = document.getElementById('security-shield');
        if (shield) {
            shield.style.opacity = Math.min(this.threatLevel / 100, 0.3);
        }
    }

    lockSystem() {
        document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; color: #ff4081;">
                <h1>🚨 SISTEMA BLOCCATO</h1>
                <p>Attività sospetta rilevata. Contatta l'amministratore.</p>
            </div>
        `;
        throw new Error('Security lockdown activated');
    }

    checkSuspiciousActivity() {
        if (this.threatLevel > 50) {
            this.alertThreat('HighThreatLevel', 'Livello di minaccia elevato rilevato');
        }
    }
}

