import { SecuritySystem } from "./script";

const { } = require("./script");

// Inizializzazione sistema sicurezza
const securitySystem = new SecuritySystem();

// Protezioni aggiuntive
document.addEventListener('DOMContentLoaded', function() {
    // Blocco screenshot
    document.addEventListener('keydown', function(e) {
        if (e.key === 'PrintScreen' || (e.ctrlKey && e.shiftKey && e.key === 'S')) {
            e.preventDefault();
            securitySystem.alertThreat('ScreenshotAttempt', 'Tentativo di screenshot bloccato');
        }
    });

    // Blocco tasto destro
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        securitySystem.logThreat('RightClickAttempt', 'Tentativo di accesso menu contestuale');
    });

    // Blocco ispezione elemento
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            securitySystem.alertThreat('InspectionAttempt', 'Tentativo di ispezione elemento bloccato');
        }
        if (e.key === 'F12') {
            e.preventDefault();
            securitySystem.alertThreat('DevToolsAttempt', 'Tentativo di aprire DevTools bloccato');
        }
    });

    // Monitoraggio modifiche DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                securitySystem.logThreat('DOMModification', 'Modifica DOM sospetta rilevata');
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
    });
});

