// ============================================================
// FIREBASE CONFIGURATION
// ============================================================
// Trage hier deine Firebase-Projektdaten ein.
// Diese findest du in der Firebase Console unter:
// Projekteinstellungen > Allgemein > Deine Apps > Firebase SDK snippet
// ============================================================

export const firebaseConfig = {
    apiKey: "AIzaSyA2Ggdj9gCh652IL3O3ivDAJfjF73hZkgE",
    authDomain: "sprachnotizen-app.firebaseapp.com",
    projectId: "sprachnotizen-app",
    storageBucket: "sprachnotizen-app.firebasestorage.app",
    messagingSenderId: "330737673046",
    appId: "1:330737673046:web:b96c520f186b161762ecf7"
};

// Standard-Kategorien für neue Benutzer
export const DEFAULT_CATEGORIES = [
    { name: 'Allgemein', color: '#8b5cf6', icon: '📝' },
    { name: 'Arbeit', color: '#3b82f6', icon: '💼' },
    { name: 'Privat', color: '#10b981', icon: '🏠' },
    { name: 'Ideen', color: '#f59e0b', icon: '💡' },
    { name: 'Erinnerungen', color: '#ef4444', icon: '⏰' }
];

// Verfügbare Farben für Kategorien
export const CATEGORY_COLORS = [
    '#8b5cf6', '#7c3aed', '#6366f1', '#3b82f6', '#0ea5e9',
    '#06b6d4', '#14b8a6', '#10b981', '#22c55e', '#84cc16',
    '#f59e0b', '#f97316', '#ef4444', '#ec4899', '#d946ef'
];

// Verfügbare Icons für Kategorien
export const CATEGORY_ICONS = [
    '📝', '💼', '🏠', '💡', '⏰', '🎯', '📚', '🎵',
    '🏥', '🛒', '✈️', '🎓', '💪', '🍽️', '🔧', '📱'
];
