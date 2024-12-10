// Définition du composant A-Frame pour capturer les messages de la console
AFRAME.registerComponent('log-console', {
    schema: {
        // Pas de données à passer pour ce composant
    },

    init: function () {
        // Référence à l'élément a-text où les logs seront affichés
        this.textElement = this.el.querySelector('a-text');

        // Liste des logs capturés
        this.logs = [];

        // Sauvegarde des méthodes console originales
        const originalLog = console.log;
        const originalWarn = console.warn;
        const originalError = console.error;

        // Redéfinir console.log pour ajouter des logs
        console.log = (message) => {
            this.addLog(message, 'log');
            originalLog.apply(console, arguments);
        };

        // Redéfinir console.warn pour ajouter des logs
        console.warn = (message) => {
            this.addLog(message, 'warn');
            originalWarn.apply(console, arguments);
        };

        // Redéfinir console.error pour ajouter des logs
        console.error = (message) => {
            this.addLog(message, 'error');
            originalError.apply(console, arguments);
        };
    },

    // Fonction pour ajouter un log et mettre à jour l'affichage
    addLog: function (message, type) {
        // Ajouter le log à la liste
        this.logs.push(`[${type.toUpperCase()}] ${message}`);
        if (this.logs.length > 10) {
            this.logs.shift(); // Garder seulement les 10 derniers logs
        }

        // Mettre à jour l'affichage du texte dans a-text
        if (this.textElement) {
            this.textElement.setAttribute('value', this.logs.join('\n'));
        }
    }
});