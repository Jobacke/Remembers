// ============================================================
// SPRACHNOTIZEN APP - Main Application
// Firebase-basierte Sprachnotizen mit Kategorien
// ============================================================

const APP_VERSION = '5.1.3';

const FAQ_HTML = `
<div style="padding: 0 8px;">
<h2 style="font-size:1.5rem;margin-bottom:16px;">🎙️ Grundfunktionen</h2>
<h3 style="font-size:1.1rem;margin-top:24px;margin-bottom:8px;">Wie erstelle ich eine neue Sprachnotiz?</h3>
<p>Tippe einfach auf den großen <strong>roten Mikrofon-Button</strong> unten rechts (oder in der Mitte, falls du noch keine Notizen hast).</p>
<ul style="padding-left:20px;margin-top:8px;">
    <li><strong>Starten:</strong> Tippe einmal, um die Aufnahme zu beginnen.</li>
    <li><strong>Stoppen:</strong> Tippe erneut auf den Button oder "Fertig", um die Aufnahme zu beenden.</li>
    <li><strong>Speichern:</strong> Im Anschluss kannst du der Notiz einen Titel geben und eine Kategorie auswählen.</li>
</ul>

<h3 style="font-size:1.1rem;margin-top:24px;margin-bottom:8px;">Wie höre ich meine Notizen an?</h3>
<p>Tippe in der Liste auf den <strong>Play-Button</strong> ▶️ einer Notiz.</p>
<ul style="padding-left:20px;margin-top:8px;">
    <li>Über den <strong>Fortschrittsbalken</strong> kannst du an eine beliebige Stelle springen.</li>
    <li>Mit den Buttons <strong>-15s</strong> und <strong>+15s</strong> spulst du schnell vor oder zurück.</li>
    <li>Die <strong>Geschwindigkeit</strong> kannst du ändern, indem du auf "1x" tippst (Optionen: 1x, 1.5x, 2x).</li>
</ul>

<h3 style="font-size:1.1rem;margin-top:24px;margin-bottom:8px;">Funktionieren die Aufnahmen auch offline?</h3>
<p><strong>Ja!</strong> Die App hat einen intelligenten <strong>Offline-Modus</strong>.</p>
<ul style="padding-left:20px;margin-top:8px;">
    <li>Wenn du kein Internet hast (z.B. im Keller), werden deine Aufnahmen lokal gespeichert.</li>
    <li>Sie erscheinen in der Liste mit einem <strong>"⚠️ Offline"</strong> Hinweis.</li>
    <li>Sobald du wieder Internet hast, werden sie <strong>automatisch hochgeladen</strong> und synchronisiert.</li>
</ul>

<hr style="margin:32px 0;border:0;border-top:1px solid var(--border);">

<h2 style="font-size:1.5rem;margin-bottom:16px;">📂 Kategorien & Organisation</h2>
<p>Du kannst deine Notizen in verschiedene Bereiche (Kategorien) einsortieren, z.B. <em>Privat</em>, <em>Beruf</em>, <em>Einkauf</em>.</p>
<ul style="padding-left:20px;margin-top:8px;">
    <li><strong>Filtern:</strong> Oben in der App findest du Chips für jede Kategorie. Tippe darauf, um nur Notizen dieser Kategorie zu sehen.</li>
    <li><strong>Verwalten:</strong> Über das Menü (dein Profilbild oben rechts) -> "Kategorien verwalten" kannst du neue Kategorien erstellen oder Farben ändern.</li>
</ul>

<hr style="margin:32px 0;border:0;border-top:1px solid var(--border);">

<h2 style="font-size:1.5rem;margin-bottom:16px;">🚑 Spezial-Feature: Kategorie "JUH"</h2>
<p>Für den Dienst bei der Johanniter-Unfall-Hilfe (oder ähnlichen Organisationen) gibt es eine intelligente Sonderfunktion.</p>
<h3 style="font-size:1.1rem;margin-top:24px;margin-bottom:8px;">Automatische Begrüßung</h3>
<p>Wenn du eine Notiz in der Kategorie <strong>"JUH"</strong> speicherst, prüft die App den Text.
Sie fügt <strong>automatisch</strong> einen freundlichen Begrüßungstext für die nachfolgende Schicht oder die Wache hinzu, falls dieser noch nicht vorhanden ist:</p>
<blockquote style="border-left:4px solid var(--primary);padding-left:16px;margin:16px 0;font-style:italic;color:var(--text-primary);">
    "Liebe RD-Besatzung! Wir sind jetzt auf dem Weg zur Wache und würden uns freuen, wenn ihr folgendes Material bereits zum Auffüllen bereitlegt. Vielen Dank für Eure Unterstützung! Herzliche Grüße Eure RD-Kolleginnen und Kollegen"
</blockquote>
<p>Das spart dir Zeit beim Diktieren von Materialanforderungen!</p>

<hr style="margin:32px 0;border:0;border-top:1px solid var(--border);">

<h2 style="font-size:1.5rem;margin-bottom:16px;">➕ Fortgeschrittene Funktionen</h2>
<h3 style="font-size:1.1rem;margin-top:24px;margin-bottom:8px;">Aufnahmen anfügen (Append)</h3>
<p>Du hast etwas vergessen? Kein Problem!</p>
<ol style="padding-left:20px;margin-top:8px;">
    <li>Suche die bestehende Notiz.</li>
    <li>Tippe auf das <strong>Mikrofon-Symbol mit dem Plus (+)</strong> in der Aktionsleiste der Notiz.</li>
    <li>Nimm den Nachtrag auf.</li>
    <li>Die neue Aufnahme wird <strong>nahtlos hinten angehängt</strong>. Beim Abspielen hörst du alles am Stück.</li>
</ol>

<h3 style="font-size:1.1rem;margin-top:24px;margin-bottom:8px;">Transkript bearbeiten</h3>
<p>Die App wandelt Sprache automatisch in Text um (Speech-to-Text).
<ul style="padding-left:20px;margin-top:8px;">
    <li>Falls sich ein Fehler eingeschlichen hat, tippe auf das <strong>Stift-Symbol</strong> ✏️ beim Text.</li>
    <li>Du kannst den Text korrigieren und speichern.</li>
</ul>

<h3 style="font-size:1.1rem;margin-top:24px;margin-bottom:8px;">Titel nachträglich ändern</h3>
<p>Tippe einfach auf den <strong>Stift ✏️ neben dem Titel</strong> der Notiz, um ihn direkt in der Übersicht zu ändern.</p>

<h3 style="font-size:1.1rem;margin-top:24px;margin-bottom:8px;">PDF Export & Teilen</h3>
<ul style="padding-left:20px;margin-top:8px;">
    <li><strong>PDF:</strong> Tippe auf das <strong>PDF-Symbol</strong>, um eine schön formatierte Datei mit Datum, Kategorie und Text zu erstellen. Perfekt zum Ausdrucken oder Weiterleiten.</li>
    <li><strong>Teilen:</strong> Über das <strong>Teilen-Symbol</strong> kannst du den Text der Notiz direkt in WhatsApp, Mail oder andere Apps kopieren.</li>
</ul>

<hr style="margin:32px 0;border:0;border-top:1px solid var(--border);">

<h2 style="font-size:1.5rem;margin-bottom:16px;">📚 Fachbegriffe & Korrekturen</h2>
<p>Die App lernt dazu! Du kannst häufig falsch verstandene Wörter (z.B. medizinische Abkürzungen wie "RTW", "NEF" oder "Viggo") hinterlegen.</p>

<h3 style="font-size:1.1rem;margin-top:24px;margin-bottom:8px;">Fachbegriffe verwalten</h3>
<ul style="padding-left:20px;margin-top:8px;">
    <li>Gehe ins <strong>Menü (Profilbild)</strong> -> <strong>"Fachbegriffe verwalten"</strong>.</li>
    <li>Dort siehst du eine Liste aller hinterlegten Korrekturen.</li>
    <li>Du kannst neue hinzufügen (z.B. Falsch: "rtw", Richtig: "RTW") oder alte löschen.</li>
    <li>Diese Begriffe werden bei <strong>jeder neuen Aufnahme automatisch korrigiert</strong>.</li>
</ul>

<h3 style="font-size:1.1rem;margin-top:24px;margin-bottom:8px;">Direkt beim Bearbeiten korrigieren</h3>
<p>Wenn du im Text einen Fehler entdeckst (z.B. "vigo" statt "Viggo"):</p>
<ol style="padding-left:20px;margin-top:8px;">
    <li>Tippe im Bearbeiten-Fenster auf den Button <strong>"+ Fachbegriff"</strong>.</li>
    <li>Gib das falsche und das richtige Wort ein (oder suche erst danach).</li>
    <li>Tippe auf <strong>+</strong>.</li>
    <li>Der Begriff wird für die Zukunft gespeichert <strong>UND</strong> in der aktuellen Notiz sofort überall korrigiert!</li>
</ol>

<hr style="margin:32px 0;border:0;border-top:1px solid var(--border);">

<h2 style="font-size:1.5rem;margin-bottom:16px;">📱 Installation (Apple User)</h2>
<p>Für das beste Erlebnis auf dem iPhone:</p>
<ol style="padding-left:20px;margin-top:8px;">
    <li>Öffne die Webseite in <strong>Safari</strong>.</li>
    <li>Tippe unten auf den <strong>Teilen-Button</strong> (Viereck mit Pfeil nach oben).</li>
    <li>Wähle <strong>"Zum Home-Bildschirm"</strong>.</li>
    <li>Jetzt hast du die App wie eine normale App auf deinem Screen – ohne Adressleiste und im Vollbild!</li>
</ol>
<div style="height:40px;"></div>
</div>
`;
function getInitials(user) {
    if (!user) return '?';
    const name = user.displayName;
    if (name) {
        const parts = name.trim().split(/\s+/);
        if (parts.length > 1) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        } else if (name.length > 1) {
            return name.substring(0, 2).toUpperCase();
        } else {
            return name[0].toUpperCase();
        }
    }
    // Fallback email
    if (user.email) {
        return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
}

window.onerror = function (msg, url, line, col, error) {
    // Ignore resize loop errors which are harmless
    if (msg.includes('ResizeObserver')) return;

    console.error('Global Error:', msg, error);
    // Try to show toast if possible
    try {
        const toastContainer = document.getElementById('toast-container');
        if (toastContainer) {
            const toast = document.createElement('div');
            toast.className = 'toast error';
            toast.innerHTML = `<span class="toast-icon">⚠️</span> ${msg}`;
            toastContainer.appendChild(toast);
            setTimeout(() => toast.remove(), 5000);
        }
    } catch (e) {
        console.error('Failed to show error toast', e);
    }
};

import { firebaseConfig, DEFAULT_CATEGORIES, CATEGORY_COLORS, CATEGORY_ICONS, TECHNICAL_TERMS_MAPPING } from './config.js';

// Firebase SDK Imports (from CDN)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js';
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js';
import {
    getVertexAI,
    getGenerativeModel
} from 'https://www.gstatic.com/firebasejs/11.3.0/firebase-vertexai.js';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    setDoc,
    deleteDoc,
    doc,
    updateDoc,
    query,
    orderBy,
    where,
    serverTimestamp,
    Timestamp,
    enableIndexedDbPersistence,
    disableNetwork,
    enableNetwork
} from 'https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject
} from 'https://www.gstatic.com/firebasejs/11.3.0/firebase-storage.js';

// ============================================================
// FIREBASE INITIALIZATION
// ============================================================
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Enable Offline Persistence
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a a time.
        console.warn('Persistence failed: Multiple tabs open');
    } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the features required to enable persistence
        console.warn('Persistence not supported by browser');
    }
});

const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// ============================================================
// APP STATE
// ============================================================
const state = {
    isRegistering: false,
    user: null,
    categories: [],
    notes: [],
    // Recording & Pause Detection
    lastFinalEndTime: 0,
    currentSegmentStartTime: 0,
    playbackRate: 1,
    filteredNotes: [],
    activeFilter: 'all',
    searchQuery: '',
    // Recording
    mediaRecorder: null,
    audioChunks: [],
    audioBlob: null,
    isRecording: false,
    recordingStartTime: null,
    recordingDuration: 0,
    transcript: '',
    recognition: null,
    timerInterval: null,
    analyserNode: null,
    audioContext: null,
    mediaStream: null,
    // Playback
    currentAudio: null,
    currentPlayingId: null,
    currentSegmentIndex: 0,
    playbackInterval: null,
    // Appending
    isAppending: false,
    appendingNoteId: null,
    // Category editing
    editingCategoryId: null,
    selectedColor: CATEGORY_COLORS[0],
    selectedIcon: CATEGORY_ICONS[0],
    // Save form
    selectedCategoryId: null,
    // Offline
    isOffline: !navigator.onLine,
    uploadQueue: [],
    // Fachbegriffe
    technicalTerms: { ...TECHNICAL_TERMS_MAPPING },
    // AI & Audio Settings
    aiSettings: {
        geminiApiKey: '',
        groqApiKey: '',
        enableNoiseFilter: true
    },
    wakeLock: null,
    interimTranscript: '',
    sessionTranscriptBase: '',
    sessionSegments: [],
    activeRecognition: null,
    isTranscribingAI: false
};



// ============================================================
// DOM ELEMENTS
// ============================================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const els = {
    loadingScreen: $('#loading-screen'),
    loginScreen: $('#login-screen'),
    loginGoogleBtn: $('#login-google-btn'),
    authForm: $('#auth-form'),
    authEmail: $('#auth-email'),
    authPassword: $('#auth-password'),
    authName: $('#auth-name'),
    authNameGroup: $('#auth-name-group'),
    authSubmitBtn: $('#auth-submit-btn'),
    authToggleBtn: $('#auth-toggle-btn'),
    authForgotBtn: $('#auth-forgot-btn'),
    loginError: $('#login-error'),
    app: $('#app'),
    // Header
    headerAvatar: $('#header-avatar'),
    btnCategories: $('#btn-categories'),
    btnUserMenu: $('#btn-user-menu'),
    searchInput: $('#search-input'),
    userMenu: $('#user-menu'),
    userMenuName: $('#user-menu-name'),
    userMenuEmail: $('#user-menu-email'),
    btnManageCategories: $('#btn-manage-categories'),
    btnManageTerms: $('#btn-manage-terms'),
    btnAiSettings: $('#btn-ai-settings'),
    btnFaq: $('#btn-faq'),
    btnLogout: $('#btn-logout'),
    // Notes
    categoryFilter: $('#category-filter'),
    notesList: $('#notes-list'),
    notesCount: $('#notes-count'),
    // FAB
    fabRecord: $('#fab-record'),
    // Record Modal
    recordModal: $('#record-modal'),
    recordModalClose: $('#record-modal-close'),
    recordTimer: $('#record-timer'),
    recordVisualizer: $('#record-visualizer'),
    recordStatus: $('#record-status'),
    recordBtn: $('#record-btn'),
    recordDiscardBtn: $('#record-discard-btn'),
    recordDoneBtn: $('#record-done-btn'),
    recordSection: $('#record-section'),
    // Save Form
    saveForm: $('#save-form'),
    noteTitle: $('#note-title'),
    categorySelect: $('#category-select'),
    saveCancelBtn: $('#save-cancel-btn'),
    saveBtn: $('#save-btn'),
    // Categories Modal
    categoriesModal: $('#categories-modal'),
    categoriesModalTitle: $('#categories-modal-title'),
    categoriesModalClose: $('#categories-modal-close'),
    categoriesListView: $('#categories-list-view'),
    categoriesList: $('#categories-list'),
    addCategoryBtn: $('#add-category-btn'),
    categoryFormView: $('#category-form-view'),
    categoryName: $('#category-name'),
    colorPicker: $('#color-picker'),
    iconPicker: $('#icon-picker'),
    categoryCancelBtn: $('#category-cancel-btn'),
    categorySaveBtn: $('#category-save-btn'),
    // FAQ Modal
    faqModal: $('#faq-modal'),
    faqContent: $('#faq-content'),
    faqModalClose: $('#faq-modal-close'),
    // Terms Modal
    termsModal: $('#terms-modal'),
    termsModalClose: $('#terms-modal-close'),
    termsCount: $('#terms-count'),
    termsList: $('#terms-list'),
    termWrong: $('#term-wrong'),
    termCorrect: $('#term-correct'),
    addTermBtn: $('#add-term-btn'),
    termSearch: $('#term-search'),
    termSearchAction: $('#term-search-action'),
    useSearchTermBtn: $('#use-search-term-btn'),
    // Confirm
    confirmDialog: $('#confirm-dialog'),
    confirmIcon: $('#confirm-icon'),
    confirmTitle: $('#confirm-title'),
    confirmMessage: $('#confirm-message'),
    confirmCancel: $('#confirm-cancel'),
    confirmOk: $('#confirm-ok'),
    // FAQ
    faqModal: $('#faq-modal'),
    faqContent: $('#faq-content'),
    faqModalClose: $('#faq-modal-close'),
    // Upload
    uploadOverlay: $('#upload-overlay'),
    uploadProgressFill: $('#upload-progress-fill'),
    // Toast
    toastContainer: $('#toast-container'),
    // Transcript
    transcriptPreview: $('#transcript-preview'),
    transcriptPlaceholder: $('#transcript-placeholder'),
    transcriptText: $('#transcript-text'),
    noteTranscript: $('#note-transcript'),
    // Inline Terms
    toggleTermsInline: $('#toggle-terms-inline'),
    inlineTermsContainer: $('#inline-terms-container'),
    inlineTermSearch: $('#inline-term-search'),
    inlineTermAction: $('#inline-term-action'),
    inlineUseTermBtn: $('#inline-use-term-btn'),
    inlineTermWrong: $('#inline-term-wrong'),
    inlineTermCorrect: $('#inline-term-correct'),
    inlineAddTermBtn: $('#inline-add-term-btn'),
    inlineTermsStatus: $('#inline-terms-status'),
    summarizeBtn: $('#summarize-btn'),
    retranscribeAiBtn: $('#retranscribe-ai-btn'),
    aiTranscriptBadge: $('#ai-transcript-badge'),
    // AI Settings Modal
    aiSettingsModal: $('#ai-settings-modal'),
    aiSettingsModalClose: $('#ai-settings-modal-close'),
    aiGeminiKey: $('#ai-gemini-key'),
    aiGroqKey: $('#ai-groq-key'),
    aiNoiseFilterToggle: $('#ai-noise-filter-toggle'),
    aiSettingsTestBtn: $('#ai-settings-test-btn'),
    aiSettingsSaveBtn: $('#ai-settings-save-btn'),
    aiEngineStatusBadge: $('#ai-engine-status-badge'),
    aiEngineStatusDesc: $('#ai-engine-status-desc'),
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function formatDate(timestamp) {
    if (!timestamp) return '';
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return `Heute, ${date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
        return `Gestern, ${date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 7) {
        return date.toLocaleDateString('de-DE', { weekday: 'long', hour: '2-digit', minute: '2-digit' });
    } else {
        return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
}

function truncateText(text, maxLength) {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function generateWaveformData(count = 40) {
    return Array.from({ length: count }, () => Math.random() * 0.8 + 0.2);
}

function showToast(message, type = 'info') {
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type]}</span> ${message}`;
    els.toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function summarizeMaterials(text) {
    if (!text) return text;

    const lines = text.split('\n');
    let outLines = [];

    for (let line of lines) {
        if (!/\d/.test(line)) {
            outLines.push(line);
            continue;
        }

        let parts = line.split(/;/);
        let itemMap = new Map();
        let itemOrder = [];
        let nonItems = [];

        let regex = /^\s*(\d+)\s*(?:[xX×]\s*)*(.+?)\s*$/i;

        for (let part of parts) {
            part = part.trim();
            if (!part) continue;

            // Sub-split e.g. "2 x Laken 2 x Decken" -> ["2 x Laken", "2 x Decken"]
            let subParts = part.split(/\s+(?=\d+\s*x\s+[A-Za-zÄÖÜäöüß]|\d+\s*(?:x\s*)?[A-ZÄÖÜ])/);

            for (let sub of subParts) {
                sub = sub.trim();
                if (!sub) continue;

                let match = sub.match(regex);
                if (match) {
                    let qty = parseInt(match[1], 10);
                    let rawName = match[2].trim();
                    let normName = rawName.toLowerCase().replace(/\s+/g, ' ');

                    if (itemMap.has(normName)) {
                        itemMap.get(normName).qty += qty;
                    } else {
                        itemMap.set(normName, { qty: qty, rawName: rawName });
                        itemOrder.push(normName);
                    }
                } else {
                    nonItems.push(sub);
                }
            }
        }

        if (itemOrder.length === 0) {
            outLines.push(line);
        } else {
            let combined = [];
            if (nonItems.length > 0) {
                combined.push(nonItems.join('; '));
            }
            let summarizedItems = itemOrder.map(name => {
                let item = itemMap.get(name);
                return `${item.qty} x ${item.rawName}`;
            });
            combined.push(summarizedItems.join('; '));
            outLines.push(combined.join('; '));
        }
    }

    return outLines.join('\n');
}

// ============================================================
// OFFLINE MANAGER
// ============================================================

const OfflineManager = {
    dbName: 'notizen-offline-db',
    storeName: 'pending-uploads',
    db: null,

    init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                }
            };
            request.onsuccess = (e) => {
                this.db = e.target.result;
                resolve();
            };
            request.onerror = (e) => reject(e);
        });
    },

    async addToQueue(noteData) {
        return new Promise((resolve, reject) => {
            if (!this.db) { resolve(); return; }
            const tx = this.db.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);
            store.put(noteData);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    },

    async getAll() {
        return new Promise((resolve, reject) => {
            if (!this.db) { resolve([]); return; }
            const tx = this.db.transaction(this.storeName, 'readonly');
            const store = tx.objectStore(this.storeName);
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    async remove(id) {
        return new Promise((resolve, reject) => {
            if (!this.db) { resolve(); return; }
            const tx = this.db.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);
            store.delete(id);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }
};

async function syncOfflineNotes() {
    if (!navigator.onLine) return;

    // Simple lock to prevent double sync
    if (state.isSyncing) return;
    state.isSyncing = true;

    try {
        const queue = await OfflineManager.getAll();
        if (queue.length === 0) {
            state.isSyncing = false;
            return;
        }

        showToast(`Synchronisiere ${queue.length} Notizen...`, 'info');

        for (const item of queue) {
            try {
                if (item.type === 'create') {
                    await saveNote(item.title, item.categoryId, item.audioBlob, item.duration, item.transcript, true);
                } else if (item.type === 'append') {
                    await appendNote(item.noteId, item.audioBlob, item.duration, item.transcript, true);
                }
                await OfflineManager.remove(item.id);
            } catch (e) {
                console.error('Sync failed for item', item.id, e);
            }
        }

        showToast('Synchronisation abgeschlossen', 'success');
        // Refresh local notes list to remove temp items if we were displaying them mixed
        await loadNotes();
        renderNotes();
    } catch (e) {
        console.error('Sync error:', e);
    } finally {
        state.isSyncing = false;
    }
}

// ============================================================
// HELPERS
// ============================================================

async function uploadAudioToStorage(audioBlob, basePath) {
    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const ext = audioBlob.type.includes('webm') ? 'webm' : audioBlob.type.includes('mp4') ? 'mp4' : 'ogg';
    const audioPath = `${basePath}/${fileName}.${ext}`;
    const storageRef = ref(storage, audioPath);

    const uploadTask = uploadBytesResumable(storageRef, audioBlob, {
        contentType: audioBlob.type
    });

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                els.uploadProgressFill.style.width = `${progress}%`;
            },
            (error) => reject(error),
            () => {
                getDownloadURL(storageRef).then((url) => {
                    resolve({ url, path: audioPath });
                }).catch(reject);
            }
        );
    });
}

function applyCategoryTemplate(transcript, categoryId) {
    const cat = state.categories.find(c => c.id === categoryId);
    if (cat && cat.name === 'JUH') {
        const prefix = "Liebe RD-Besatzung!\nWir sind jetzt auf dem Weg zur Wache und würden uns freuen, wenn ihr folgendes Material bereits zum Auffüllen bereitlegt.\nVielen Dank für Eure Unterstützung!\nHerzliche Grüße Eure RD-Kolleginnen und Kollegen\n\n";
        if (transcript && !transcript.startsWith('Liebe RD-Besatzung')) {
            return prefix + transcript;
        }
    }
    return transcript;
}

// ============================================================
// AUTHENTICATION
// ============================================================

async function handleLogin() {
    try {
        els.loginError.classList.add('hidden');
        // Try popup first, fall back to redirect for iOS PWA
        // Try popup first (even on standalone) because cross-domain redirect fails
        // on iOS/macOS PWAs due to Intelligent Tracking Prevention (ITP)
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.error('Login error:', error);
        // If popup blocked, try redirect
        if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
            try {
                await signInWithRedirect(auth, googleProvider);
            } catch (redirectError) {
                showLoginError(redirectError.message);
            }
        } else {
            showLoginError(error.message);
        }
    }
}

async function handleLogout() {
    try {
        stopPlayback();
        await signOut(auth);
    } catch (error) {
        showToast('Fehler beim Abmelden', 'error');
    }
}

function showLoginError(message) {
    els.loginError.textContent = message;
    els.loginError.classList.remove('hidden');
}

// ============================================================
// FIRESTORE OPERATIONS
// ============================================================

// --- Categories ---
async function loadCategories() {
    try {
        const q = query(
            collection(db, 'users', state.user.uid, 'categories'),
            orderBy('name')
        );
        const snap = await getDocs(q);
        state.categories = snap.docs.map(d => ({ id: d.id, ...d.data() }));

        // If no categories exist, create default ones
        if (state.categories.length === 0) {
            await createDefaultCategories();
            return loadCategories();
        }
    } catch (error) {
        console.error('Error loading categories:', error);
        showToast('Fehler beim Laden der Kategorien', 'error');
    }
}

async function loadTechnicalTerms() {
    try {
        const docRef = doc(db, 'users', state.user.uid, 'settings', 'vocabulary');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().terms) {
            // Merge defaults with user terms so new medical terms from config are always included
            state.technicalTerms = { ...TECHNICAL_TERMS_MAPPING, ...docSnap.data().terms };
        } else {
            state.technicalTerms = { ...TECHNICAL_TERMS_MAPPING };
        }
    } catch (e) {
        console.warn('Technical terms load error (offline?):', e);
        // Fallback to defaults already in state
        state.technicalTerms = { ...TECHNICAL_TERMS_MAPPING };
    }
}

async function loadAiSettings() {
    // Load from localStorage first for instant availability
    try {
        const local = localStorage.getItem('notizen_ai_settings');
        if (local) {
            state.aiSettings = { ...state.aiSettings, ...JSON.parse(local) };
        }
    } catch (e) {
        console.warn('Local AI settings load error:', e);
    }

    // Load from Firestore user settings
    try {
        const docRef = doc(db, 'users', state.user.uid, 'settings', 'aiConfig');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            state.aiSettings = {
                geminiApiKey: data.geminiApiKey || state.aiSettings.geminiApiKey || '',
                groqApiKey: data.groqApiKey || state.aiSettings.groqApiKey || '',
                enableNoiseFilter: data.enableNoiseFilter !== undefined ? data.enableNoiseFilter : true
            };
            localStorage.setItem('notizen_ai_settings', JSON.stringify(state.aiSettings));
        }
    } catch (e) {
        console.warn('AI settings Firestore load error:', e);
    }
}

async function saveAiSettings() {
    try {
        state.aiSettings = {
            geminiApiKey: els.aiGeminiKey ? els.aiGeminiKey.value.trim() : '',
            groqApiKey: els.aiGroqKey ? els.aiGroqKey.value.trim() : '',
            enableNoiseFilter: els.aiNoiseFilterToggle ? els.aiNoiseFilterToggle.checked : true
        };
        localStorage.setItem('notizen_ai_settings', JSON.stringify(state.aiSettings));

        if (state.user) {
            const docRef = doc(db, 'users', state.user.uid, 'settings', 'aiConfig');
            await setDoc(docRef, {
                ...state.aiSettings,
                updatedAt: serverTimestamp()
            });
        }
        updateAiSettingsStatusUI();
        showToast('KI- & Audio-Einstellungen gespeichert', 'success');
    } catch (e) {
        console.error('Error saving AI settings:', e);
        showToast('Lokal gespeichert', 'info');
    }
}

async function saveTechnicalTerms() {
    try {
        const docRef = doc(db, 'users', state.user.uid, 'settings', 'vocabulary');
        // We overwrite the document to ensure deleted terms are removed from Firestore
        await setDoc(docRef, { terms: state.technicalTerms });
        showToast('Fachbegriffe gespeichert', 'success');
    } catch (e) {
        console.error('Error saving terms:', e);
        showToast('Fehler beim Speichern: ' + e.message, 'error');
    }
}

async function createDefaultCategories() {
    const batch = DEFAULT_CATEGORIES.map(cat =>
        addDoc(collection(db, 'users', state.user.uid, 'categories'), {
            ...cat,
            createdAt: serverTimestamp()
        })
    );
    await Promise.all(batch);
}

async function saveCategory(data) {
    try {
        if (state.editingCategoryId) {
            await updateDoc(doc(db, 'users', state.user.uid, 'categories', state.editingCategoryId), data);
            showToast('Kategorie aktualisiert', 'success');
        } else {
            await addDoc(collection(db, 'users', state.user.uid, 'categories'), {
                ...data,
                createdAt: serverTimestamp()
            });
            showToast('Kategorie erstellt', 'success');
        }
        await loadCategories();
        renderCategoryFilter();
        renderCategoriesList();
        showCategoriesListView();
    } catch (error) {
        console.error('Error saving category:', error);
        showToast('Fehler beim Speichern', 'error');
    }
}

async function deleteCategory(categoryId) {
    try {
        // Check if any notes use this category
        const notesInCategory = state.notes.filter(n => n.categoryId === categoryId);
        if (notesInCategory.length > 0) {
            showToast('Kategorie enthält Notizen und kann nicht gelöscht werden', 'error');
            return;
        }
        await deleteDoc(doc(db, 'users', state.user.uid, 'categories', categoryId));
        await loadCategories();
        if (state.activeFilter === categoryId) {
            state.activeFilter = 'all';
        }
        renderCategoryFilter();
        renderCategoriesList();
        showToast('Kategorie gelöscht', 'success');
    } catch (error) {
        console.error('Error deleting category:', error);
        showToast('Fehler beim Löschen', 'error');
    }
}

// --- Notes ---
async function loadNotes() {
    try {
        const q = query(
            collection(db, 'users', state.user.uid, 'notes'),
            orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        state.notes = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        filterNotes();
    } catch (error) {
        console.error('Error loading notes:', error);
        showToast('Fehler beim Laden der Notizen', 'error');
    }
}

async function saveNote(title, categoryId, audioBlob, duration, transcript, isSync = false) {
    try {
        if (!audioBlob) {
            showToast('Keine Aufnahme vorhanden', 'error');
            return;
        }

        // Offline Check
        if (!navigator.onLine && !isSync) {
            const tempId = `temp_${Date.now()}`;
            const offlineNote = {
                id: tempId,
                title,
                categoryId,
                audioBlob,
                duration,
                transcript,
                type: 'create',
                createdAt: Date.now()
            };

            await OfflineManager.addToQueue(offlineNote);

            // Add to state for immediate display
            state.notes.unshift({
                id: tempId,
                title,
                categoryId,
                duration,
                transcript,
                createdAt: { toDate: () => new Date() }, // Mock Timestamp
                isOffline: true
            });

            renderNotes();
            showToast('Offline gespeichert (Wird später hochgeladen)', 'info');
            return;
        }

        // Apply Template
        transcript = applyCategoryTemplate(transcript, categoryId);

        els.uploadOverlay.classList.remove('hidden');
        els.uploadProgressFill.style.width = '0%';

        // Upload
        const { url: audioUrl, path: audioPath } = await uploadAudioToStorage(audioBlob, `users/${state.user.uid}/notes`);

        // Save metadata to Firestore
        const waveform = generateWaveformData();
        await addDoc(collection(db, 'users', state.user.uid, 'notes'), {
            title: title || `Notiz vom ${new Date().toLocaleDateString('de-DE')}`,
            categoryId,
            duration,
            audioUrl,
            audioPath,
            audioType: audioBlob.type,
            waveform,
            transcript: transcript || '',
            createdAt: serverTimestamp()
        });

        els.uploadOverlay.classList.add('hidden');
        showToast('Notiz gespeichert!', 'success');
        await loadNotes();
        renderNotes();
    } catch (error) {
        console.error('Error saving note:', error);
        els.uploadOverlay.classList.add('hidden');
        showToast('Fehler beim Speichern der Notiz', 'error');
    }
}

async function appendNote(noteId, audioBlob, duration, transcript, isSync = false) {
    try {
        if (!audioBlob) {
            showToast('Keine Aufnahme vorhanden', 'error');
            return;
        }

        // Offline Check
        if (!navigator.onLine && !isSync) {
            const tempId = `temp_append_${Date.now()}`;
            await OfflineManager.addToQueue({
                id: tempId,
                noteId,
                audioBlob,
                duration,
                transcript,
                type: 'append',
                createdAt: Date.now()
            });
            showToast('Offline angehängt (Wird später hochgeladen)', 'info');
            return;
        }

        els.uploadOverlay.classList.remove('hidden');
        els.uploadProgressFill.style.width = '0%';

        // 1. Upload new segment using helper
        const { url: audioUrl, path: audioPath } = await uploadAudioToStorage(audioBlob, `users/${state.user.uid}/notes`);

        // 2. Fetch existing note data
        const noteRef = doc(db, 'users', state.user.uid, 'notes', noteId);
        const noteSnap = await getDoc(noteRef);

        if (!noteSnap.exists()) {
            throw new Error('Note not found');
        }

        const noteData = noteSnap.data();
        let segments = noteData.audioSegments || [];

        // Setup initial segment if missing
        if (segments.length === 0 && noteData.audioUrl) {
            segments.push({
                audioUrl: noteData.audioUrl,
                audioPath: noteData.audioPath || '',
                duration: noteData.duration || 0,
                transcript: noteData.transcript || '',
                createdAt: noteData.createdAt ? noteData.createdAt.toMillis() : Date.now()
            });
        }

        // Add new segment
        segments.push({
            audioUrl: audioUrl,
            audioPath: audioPath,
            duration: duration,
            transcript: transcript || '',
            createdAt: Date.now()
        });

        // Update Total Duration and Transcript
        const newTotalDuration = segments.reduce((acc, seg) => acc + (seg.duration || 0), 0);
        const newTotalTranscript = segments.map(s => s.transcript).filter(t => t).join('\n');

        await updateDoc(noteRef, {
            audioSegments: segments,
            duration: newTotalDuration,
            transcript: newTotalTranscript,
            updatedAt: serverTimestamp()
        });

        els.uploadOverlay.classList.add('hidden');
        showToast('Aufnahme angehängt!', 'success');

        // Reset Append State
        state.isAppending = false;
        state.appendingNoteId = null;

        await loadNotes();
        renderNotes();

    } catch (error) {
        console.error('Error appending note:', error);
        els.uploadOverlay.classList.add('hidden');
        showToast('Fehler beim Anhängen', 'error');
    }
}

function toggleTitleEdit(noteId) {
    const noteCard = document.querySelector(`.note-card[data-note-id="${noteId}"]`);
    if (!noteCard) return;

    const titleRow = noteCard.querySelector('.note-card-title-row');
    if (!titleRow) return;

    // Check if already editing
    if (titleRow.querySelector('input')) return;

    const titleDiv = titleRow.querySelector('.note-card-title');
    const currentTitle = titleDiv.textContent;
    const editBtn = titleRow.querySelector('.edit-title-btn');

    // Hide title and edit button
    titleDiv.style.display = 'none';
    editBtn.style.display = 'none';

    // Create input form
    const form = document.createElement('form');
    form.style.display = 'flex';
    form.style.gap = '8px';
    form.style.flex = '1';
    form.style.alignItems = 'center';

    form.innerHTML = `
        <input type="text" value="${escapeHtml(currentTitle)}" style="flex:1;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);padding:4px 8px;font-size:14px;color:var(--text-primary);min-width:0;">
        <button type="submit" class="btn-save" title="Speichern" style="background:var(--primary);color:var(--text-on-primary);border:none;border-radius:var(--radius-sm);padding:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;width:28px;height:28px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
        <button type="button" class="btn-cancel" title="Abbrechen" style="background:transparent;border:1px solid var(--border);border-radius:var(--radius-sm);padding:4px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text-muted);width:28px;height:28px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
    `;

    titleRow.insertBefore(form, editBtn); // Insert before the (hidden) edit button

    const input = form.querySelector('input');
    input.focus();
    input.select();

    // Handlers
    const closeEdit = () => {
        form.remove();
        titleDiv.style.display = '';
        editBtn.style.display = '';
    };

    form.querySelector('.btn-cancel').addEventListener('click', (e) => {
        e.stopPropagation();
        closeEdit();
    });

    form.querySelector('input').addEventListener('click', (e) => e.stopPropagation());

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newTitle = input.value.trim();
        if (newTitle && newTitle !== currentTitle) {
            // Optimistic update
            titleDiv.textContent = newTitle;
            closeEdit();
            // Call backend
            await updateNoteTitle(noteId, newTitle);
        } else {
            closeEdit();
        }
    });
}

async function saveTranscript(noteId, newText) {
    try {
        const noteRef = doc(db, 'users', state.user.uid, 'notes', noteId);
        await updateDoc(noteRef, {
            transcript: newText,
            updatedAt: serverTimestamp()
        });
        showToast('Transkript gespeichert', 'success');
        await loadNotes();
        renderNotes();
    } catch (error) {
        console.error('Error saving transcript:', error);
        showToast('Fehler beim Speichern', 'error');
    }
}

function toggleTranscriptEdit(noteId) {
    const noteCard = document.querySelector(`.note-card[data-note-id="${noteId}"]`);
    if (!noteCard) return;

    const contentDiv = noteCard.querySelector('.transcript-content');
    if (!contentDiv) return;

    if (contentDiv.querySelector('textarea')) return;

    const note = state.notes.find(n => n.id === noteId);
    if (!note) return;

    const currentText = note.transcript || '';

    const editor = document.createElement('div');
    editor.className = 'transcript-editor-container';

    // Stop propagation on clicks inside user interface
    editor.addEventListener('click', e => e.stopPropagation());

    editor.innerHTML = `
        <div style="display:flex; justify-content:flex-end; gap:8px; margin-bottom:8px;">
            <button class="btn-summarize-inline" style="font-size:13px; padding:6px 12px; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-sm); cursor:pointer; color:var(--text-secondary);" title="Materialien zusammenzählen">✨ Aufsummieren</button>
            <button class="btn-toggle-terms" style="font-size:13px; padding:6px 12px; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-sm); cursor:pointer; color:var(--text-secondary);">+ Fachbegriff</button>
        </div>
        
        <div class="inline-terms-container hidden" style="margin-bottom:12px; padding:12px; background:var(--bg-elevated); border-radius:var(--radius-md); border:1px solid var(--border);">
             <div style="margin-bottom: 12px; position: relative;">
                  <input class="term-search" type="text" placeholder="Wort suchen..." style="width:100%;padding:10px;font-size:16px;border-radius:var(--radius-sm);border:1px solid var(--border);color:var(--text-primary);background:var(--bg);">
                  <div class="term-action hidden" style="position:absolute; right:6px; top:50%; transform:translateY(-50%);">
                    <button class="btn-use-term" style="padding:6px 10px; font-size:12px; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-sm); cursor:pointer;color:var(--text-primary);">Als "Falsch"</button>
                  </div>
             </div>
             
             <div style="display:flex; flex-direction:column; gap:8px;">
                  <input class="term-wrong" type="text" placeholder="Falsch" style="padding:10px; font-size:16px;border-radius:var(--radius-sm);border:1px solid var(--border);color:var(--text-primary);background:var(--bg);">
                  <input class="term-correct" type="text" placeholder="Richtig" style="padding:10px; font-size:16px;border-radius:var(--radius-sm);border:1px solid var(--border);color:var(--text-primary);background:var(--bg);">
                  <button class="btn-add-term" style="width:100%; padding:10px; font-size:14px; font-weight:600; background:var(--primary); border:none; border-radius:var(--radius-sm); cursor:pointer; color:var(--text-on-primary, black);">Hinzufügen (+)</button>
             </div>
             <div class="terms-status" style="font-size:12px; color:var(--text-muted); margin-top:8px; min-height:16px;"></div>
        </div>

        <textarea style="width:100%;min-height:100px;background:var(--surface-sunken);border:1px solid var(--border);border-radius:var(--radius-sm);padding:8px;color:var(--text-primary);font-family:inherit;resize:vertical;font-size:16px;line-height:1.5;">${escapeHtml(currentText)}</textarea>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px;">
            <button class="btn-cancel" style="padding:6px 12px;font-size:13px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;color:var(--text-secondary);">Abbrechen</button>
            <button class="btn-save" style="padding:6px 12px;font-size:13px;background:var(--primary);border:none;border-radius:var(--radius-sm);cursor:pointer;color:var(--text-on-primary, black);">Speichern</button>
        </div>
    `;

    contentDiv.innerHTML = '';
    contentDiv.appendChild(editor);

    const textarea = editor.querySelector('textarea');
    textarea.focus();

    // -- Terms Logic --
    const termsContainer = editor.querySelector('.inline-terms-container');
    const toggleBtn = editor.querySelector('.btn-toggle-terms');
    const termSearch = editor.querySelector('.term-search');
    const termAction = editor.querySelector('.term-action');
    const btnUseTerm = editor.querySelector('.btn-use-term');
    const termWrong = editor.querySelector('.term-wrong');
    const termCorrect = editor.querySelector('.term-correct');
    const btnAddTerm = editor.querySelector('.btn-add-term');
    const status = editor.querySelector('.terms-status');

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        termsContainer.classList.toggle('hidden');
        if (!termsContainer.classList.contains('hidden')) termSearch.focus();
    });

    termSearch.addEventListener('input', (e) => {
        e.stopPropagation();
        const val = termSearch.value.trim().toLowerCase();
        if (state.technicalTerms[val]) {
            status.textContent = `Bereits bekannt: ${state.technicalTerms[val]}`;
            status.style.color = 'var(--text-muted)';
            termAction.classList.add('hidden');
        } else {
            status.textContent = '';
            if (val) termAction.classList.remove('hidden');
            else termAction.classList.add('hidden');
        }
    });

    // Prevent clicks in inputs from closing card
    [termSearch, termWrong, termCorrect].forEach(el => el.addEventListener('click', e => e.stopPropagation()));

    btnUseTerm.addEventListener('click', (e) => {
        e.stopPropagation();
        termWrong.value = termSearch.value.trim();
        termCorrect.focus();
        termAction.classList.add('hidden');
    });

    btnAddTerm.addEventListener('click', (e) => {
        e.stopPropagation();
        const w = termWrong.value.trim().toLowerCase();
        const c = termCorrect.value.trim();
        if (!w || !c) {
            status.textContent = 'Beides ausfüllen';
            status.style.color = 'var(--error)';
            return;
        }

        // Save
        state.technicalTerms[w] = c;
        saveTechnicalTerms();

        // Correct in textarea
        const current = textarea.value;
        const escW = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const reg = new RegExp(`(?<![\\wÄÖÜäöüß])${escW}(?![\\wÄÖÜäöüß])`, 'gi');
        const matchCount = (current.match(reg) || []).length;

        if (matchCount > 0) {
            textarea.value = current.replace(reg, c);
            status.textContent = `Gespeichert & ${matchCount}x korrigiert: ${w} -> ${c}`;
        } else {
            status.textContent = `Gespeichert: ${w} -> ${c}`;
        }
        status.style.color = 'var(--success)';

        // Clear
        termWrong.value = '';
        termCorrect.value = '';
        termSearch.value = '';
        termAction.classList.add('hidden');
    });

    const btnSummarize = editor.querySelector('.btn-summarize-inline');
    if (btnSummarize) {
        btnSummarize.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = textarea.value;
            const summarized = summarizeMaterials(text);
            if (text !== summarized) {
                textarea.value = summarized;
                showToast('Mengen erfolgreich zusammengefasst!', 'success');
            } else {
                showToast('Keine aufsummierbaren Mengen gefunden.', 'info');
            }
        });
    }

    editor.querySelector('.btn-cancel').addEventListener('click', (e) => {
        e.stopPropagation();
        contentDiv.innerHTML = escapeHtml(note.transcript).replace(/\n\n/g, '\n');
    });

    editor.querySelector('.btn-save').addEventListener('click', async (e) => {
        e.stopPropagation();
        const newText = textarea.value.trim();
        editor.querySelector('.btn-save').textContent = '...';
        await saveTranscript(noteId, newText);
    });
}



async function exportPdf(noteId) {
    const note = state.notes.find(n => n.id === noteId);
    if (!note) return;

    if (!window.jspdf) { showToast('PDF Export nicht verfügbar', 'error'); return; }
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(note.title || 'Notiz', 20, 20);

    doc.setFontSize(10);
    const dateStr = note.createdAt ? new Date(note.createdAt.seconds * 1000).toLocaleString() : new Date().toLocaleString(); // Firebase Timestamp to Date
    // If createdAt is already milli (from local optimistic update)? Check type.
    // Usually it is object with seconds.
    // Wait, loadNotes maps data.
    // Let's safe check.
    let d = new Date();
    if (note.createdAt && note.createdAt.seconds) d = new Date(note.createdAt.seconds * 1000);
    else if (note.createdAt) d = new Date(note.createdAt);

    const catName = state.categories.find(c => c.id === note.categoryId)?.name || 'Unkategorisiert';

    // Format Date: 24h format (de-DE)
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
    const dateStrFormatted = d.toLocaleString('de-DE', options) + ' Uhr';

    doc.text(`Datum: ${dateStrFormatted}`, 20, 30);
    doc.text(`Kategorie: ${catName}`, 20, 35);

    doc.setFontSize(12);
    // splitTextToSize handles line breaks
    const text = (note.transcript || '');
    const splitText = doc.splitTextToSize(text, 170);
    doc.text(splitText, 20, 50);

    doc.save(`Notiz.pdf`);
}

function toggleSpeed() {
    state.playbackRate = (state.playbackRate === 1) ? 1.5 : (state.playbackRate === 1.5 ? 2 : 1);
    if (state.currentAudio) state.currentAudio.playbackRate = state.playbackRate;
    document.querySelectorAll('.speed-btn').forEach(btn => btn.textContent = state.playbackRate + 'x');
}

async function shareTranscript(noteId) {
    const note = state.notes.find(n => n.id === noteId);
    if (!note || !note.transcript) return;

    const text = note.transcript;

    if (navigator.share) {
        try {
            await navigator.share({
                text: text
            });
        } catch (err) {
            console.log('Share canceled or failed', err);
        }
    } else {
        try {
            await navigator.clipboard.writeText(text);
            showToast('Text kopiert!', 'success');
        } catch (err) {
            showToast('Konnte Text nicht kopieren', 'error');
        }
    }
}

async function deleteNote(noteId) {
    try {
        const note = state.notes.find(n => n.id === noteId);
        if (!note) return;

        // Stop playback if playing
        if (state.currentPlayingId === noteId) {
            stopPlayback();
        }

        // Delete audio from Storage
        if (note.audioPath) {
            try {
                const storageRef = ref(storage, note.audioPath);
                await deleteObject(storageRef);
            } catch (e) {
                console.warn('Audio file could not be deleted (may not exist):', e);
            }
        }

        // Delete metadata from Firestore
        await deleteDoc(doc(db, 'users', state.user.uid, 'notes', noteId));

        // Remove from local state
        state.notes = state.notes.filter(n => n.id !== noteId);
        filterNotes();
        renderNotes();
        renderCategoryFilter();
        showToast('Notiz gelöscht', 'success');
    } catch (error) {
        console.error('Error deleting note:', error);
        showToast('Fehler beim Löschen', 'error');
    }
}

async function updateNoteTitle(noteId, newTitle) {
    try {
        await updateDoc(doc(db, 'users', state.user.uid, 'notes', noteId), {
            title: newTitle
        });
        const note = state.notes.find(n => n.id === noteId);
        if (note) note.title = newTitle;
    } catch (error) {
        console.error('Error updating note title:', error);
        showToast('Fehler beim Aktualisieren', 'error');
    }
}

// ============================================================
// MEDICAL VOCABULARY & SMART POST-PROCESSING
// ============================================================

const NUMBER_WORDS_DE = {
    'ein': '1', 'eine': '1', 'einen': '1', 'eins': '1',
    'zwei': '2', 'zwo': '2',
    'drei': '3',
    'vier': '4',
    'fünf': '5',
    'sechs': '6',
    'sieben': '7',
    'acht': '8',
    'neun': '9',
    'zehn': '10',
    'elf': '11',
    'zwölf': '12',
    'fünfzehn': '15',
    'zwanzig': '20'
};

function applyMedicalPostProcessing(rawText) {
    if (!rawText) return '';
    let text = rawText;

    // 1. Magic Words: "neue Zeile" / "Zeile" -> \n, "neuer Absatz" / "Absatz" -> \n\n, "Semikolon" / "Strichpunkt" -> ;
    text = text.replace(/\b(?:neue\s+)?zeile\b/gi, '\n');
    text = text.replace(/\b(?:neuer\s+)?absatz\b/gi, '\n\n');
    text = text.replace(/\b(?:semikolon|strichpunkt)\b/gi, '; ');

    // 2. Number words before "mal" or "x" or medical items: e.g. "zwei mal" -> "2 x", "dreimal" -> "3 x"
    text = text.replace(/\b(ein|eine|einen|eins|zwei|zwo|drei|vier|fünf|sechs|sieben|acht|neun|zehn|elf|zwölf)\s*(?:mal|x)\b/gi, (m, numWord) => {
        const digit = NUMBER_WORDS_DE[numWord.toLowerCase()] || numWord;
        return `${digit} x`;
    });
    text = text.replace(/\b(\d+)\s*(?:mal|x)\b/gi, '$1 x');

    // Also convert standalone number words followed by common medical supplies or uppercase nouns (e.g. "zwei Laken" -> "2 x Laken")
    // Negative lookahead (?!x\b|mal\b) prevents matching if "x" or "mal" is already there
    text = text.replace(/\b(zwei|zwo|drei|vier|fünf|sechs|sieben|acht|neun|zehn)\s+(?!x\b|mal\b)(?=[A-ZÄÖÜ][a-zäöüß]+)/gi, (m, numWord) => {
        const digit = NUMBER_WORDS_DE[numWord.toLowerCase()] || numWord;
        return `${digit} x `;
    });

    // 3. Fachbegriffe korrigieren (longest keys first so multi-word phrases match before single words)
    const termsToUse = state.technicalTerms && Object.keys(state.technicalTerms).length > 0
        ? { ...TECHNICAL_TERMS_MAPPING, ...state.technicalTerms }
        : TECHNICAL_TERMS_MAPPING;

    const sortedEntries = Object.entries(termsToUse).sort((a, b) => b[0].length - a[0].length);

    for (const [wrong, correct] of sortedEntries) {
        if (!wrong) continue;
        const escapedWrong = wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?<![\\wÄÖÜäöüß])${escapedWrong}(?![\\wÄÖÜäöüß])`, 'gi');
        text = text.replace(regex, correct);
    }

    // 4. Deduplicate accidental multiple "x" after numbers (e.g., if user term had "x System" or "5 x x System" -> "5 x System")
    text = text.replace(/\b(\d+)\s*(?:[xX×]\s*){2,}/g, '$1 x ');

    // 5. Separate consecutive quantity items in one utterance with "; " (e.g. "2 x Laken 3 x Decken" or "2 x Laken, 3 x Decken" -> "2 x Laken; 3 x Decken")
    text = text.replace(/([A-Za-zÄÖÜäöüß0-9%])\s*,?\s+(?=\d+\s*x\s+[A-Za-zÄÖÜäöüß])/g, '$1; ');

    // 6. Clean up spacing around punctuation & newlines
    text = text.replace(/[ \t]+\n/g, '\n');
    text = text.replace(/\n[ \t]+/g, '\n');
    text = text.replace(/;\s*;/g, ';');
    return text;
}

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result;
            const base64 = dataUrl.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

function buildMedicalPromptContext(liveDraft = '') {
    const customTerms = Object.entries({ ...TECHNICAL_TERMS_MAPPING, ...(state.technicalTerms || {}) })
        .map(([w, c]) => `${c}`)
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 120)
        .join(', ');

    return `Du bist ein hochpräzises medizinisches Transkriptionssystem für den deutschen Rettungsdienst (JUH / Notfallmedizin) und allgemeine Sprachnotizen.
Aufgabe: Transkribiere die folgende Sprachaufnahme wortgetreu, klar und fehlerfrei ins Deutsche.
Wichtige Regeln:
1. Ignoriere Hintergrundgeräusche (Motor, Martinshorn, Funk, Wind, Rascheln). Gib NIEMALS Halluzinationen oder Erklärungen aus – gib NUR den gesprochenen Text zurück!
2. Wenn die Aufnahme komplett still ist oder nur aus Störgeräuschen besteht, gib exakt einen leeren String zurück.
3. Erkenne medizinische Fachbegriffe, Medikamente, Abkürzungen und Rettungsdienst-Materialien präzise. Wichtige bekannte Begriffe: ${customTerms}.
4. Wenn Mengen oder Materialien aufgezählt werden (z. B. zum Auffüllen auf der Wache), formatiere Mengenangaben einheitlich als "2 x Laken; 1 x Viggo; 3 x Jonosteril" (getrennt durch Semikolon "; " bei kurzen Pausen zwischen Artikeln).
5. Gesprochene Steuerbefehle wie "Neue Zeile" oder "Absatz" als echten Zeilenumbruch umsetzen.
${liveDraft ? `Hinweis aus der Live-Vorerkennung (kann Hörfehler bei Fachbegriffen enthalten, bitte anhand des Audios prüfen und korrigieren): "${liveDraft}"` : ''}`;
}

async function transcribeWithAI(audioBlob, liveDraft = '') {
    if (!audioBlob || audioBlob.size < 1000 || !navigator.onLine) {
        return null;
    }

    const prompt = buildMedicalPromptContext(liveDraft);
    const mimeType = (audioBlob.type || 'audio/webm').split(';')[0];

    // Tier 1: Direct Groq Whisper Large v3 (if Groq API Key configured)
    if (state.aiSettings?.groqApiKey) {
        try {
            const formData = new FormData();
            const ext = mimeType.includes('mp4') ? 'm4a' : mimeType.includes('ogg') ? 'ogg' : 'webm';
            formData.append('file', audioBlob, `recording.${ext}`);
            formData.append('model', 'whisper-large-v3-turbo');
            formData.append('language', 'de');
            const vocabHint = Object.values({ ...TECHNICAL_TERMS_MAPPING, ...(state.technicalTerms || {}) })
                .filter((v, i, a) => a.indexOf(v) === i)
                .slice(0, 80)
                .join(', ');
            formData.append('prompt', `Rettungsdienst, Notfallmedizin, JUH, Materialauffüllung: ${vocabHint}`);
            formData.append('temperature', '0');

            const resp = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${state.aiSettings.groqApiKey}`
                },
                body: formData
            });

            if (resp.ok) {
                const data = await resp.json();
                if (data.text && data.text.trim()) {
                    return applyMedicalPostProcessing(data.text.trim());
                }
            } else {
                console.warn('Groq Whisper response not ok:', resp.status);
            }
        } catch (e) {
            console.warn('Groq transcription failed, falling back:', e);
        }
    }

    // Prepare base64 for Gemini Multimodal Audio
    let base64Audio = null;
    try {
        base64Audio = await blobToBase64(audioBlob);
    } catch (e) {
        console.warn('Base64 conversion failed:', e);
        return null;
    }

    // Tier 2: Direct Gemini API (if Gemini API Key configured or using project key if enabled)
    const geminiKeyToTry = state.aiSettings?.geminiApiKey || firebaseConfig.apiKey;
    if (geminiKeyToTry) {
        try {
            const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKeyToTry}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: prompt },
                            {
                                inlineData: {
                                    mimeType: mimeType,
                                    data: base64Audio
                                }
                            }
                        ]
                    }],
                    generationConfig: {
                        temperature: 0.1
                    }
                })
            });

            if (resp.ok) {
                const data = await resp.json();
                const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (aiText !== undefined && aiText.trim()) {
                    return applyMedicalPostProcessing(aiText.trim());
                }
            }
        } catch (e) {
            console.warn('Direct Gemini API call failed:', e);
        }
    }

    // Tier 3: Firebase Vertex AI in Firebase SDK (uses authenticated Firebase project)
    try {
        const vertexAI = getVertexAI(firebaseApp);
        const model = getGenerativeModel(vertexAI, { model: 'gemini-2.0-flash' });
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    mimeType: mimeType,
                    data: base64Audio
                }
            }
        ]);
        const responseText = result.response.text();
        if (responseText && responseText.trim()) {
            return applyMedicalPostProcessing(responseText.trim());
        }
    } catch (e) {
        console.warn('Firebase Vertex AI fallback info:', e.message || e);
    }

    return null;
}

async function acquireWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            state.wakeLock = await navigator.wakeLock.request('screen');
        } catch (e) {
            console.warn('WakeLock request failed:', e);
        }
    }
}

function releaseWakeLock() {
    if (state.wakeLock) {
        state.wakeLock.release().catch(() => {});
        state.wakeLock = null;
    }
}

// ============================================================
// AUDIO RECORDING
// ============================================================

async function startRecording() {
    try {
        // Stop any active playback before recording
        stopPlayback();

        state.audioChunks = [];
        state.audioBlob = null;
        state.transcript = '';
        state.interimTranscript = '';
        state.sessionTranscriptBase = '';
        state.sessionSegments = [];
        state.lastFinalEndTime = Date.now();
        state.currentSegmentStartTime = null;
        els.transcriptText.textContent = '';
        els.transcriptText.classList.add('hidden');
        els.transcriptPlaceholder.textContent = 'Spreche, um Text zu sehen...';
        els.transcriptPlaceholder.classList.remove('hidden');
        els.transcriptPreview.classList.remove('hidden');
        if (els.aiTranscriptBadge) els.aiTranscriptBadge.classList.add('hidden');

        // CRITICAL FOR iOS / SAFARI:
        // SpeechRecognition.start() MUST be called synchronously inside the user's tap gesture handler
        // BEFORE any `await` (like getUserMedia or wakeLock)!
        // If called after `await`, iOS Safari drops the user-activation token and silently blocks speech recognition on subsequent recordings!
        state.isRecording = true;
        state.recordingStartTime = Date.now();
        initLiveSpeechRecognition();

        // Keep screen awake during dictation
        acquireWakeLock();

        // 1. Request microphone access (standard iOS-compatible constraints)
        state.mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }
        });

        // If user already cancelled while waiting for mic permission, abort cleanly
        if (!state.isRecording) {
            state.mediaStream.getTracks().forEach(t => t.stop());
            state.mediaStream = null;
            return;
        }

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

        let streamToRecord = state.mediaStream;

        // CRITICAL FOR iOS / SAFARI:
        // Do NOT create or attach WebAudio AudioContext / MediaStreamAudioSourceNode on iOS during recording!
        // On iOS WebKit, attaching AudioContext to the mic stream and suspending/resuming it locks AVAudioSession
        // and blocks Apple's SFSpeechRecognizer (webkitSpeechRecognition) on subsequent recordings!
        if (!isIOS) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;

            if (!state.audioContext || state.audioContext.state === 'closed') {
                try {
                    if (state.audioContext) state.audioContext.close().catch(() => { });
                    state.audioContext = new AudioContext();
                } catch (e) {
                    console.error('Context creation failed', e);
                }
            }

            if (state.audioContext && state.audioContext.state === 'suspended') {
                await state.audioContext.resume().catch(e => console.warn('Resume warning:', e));
            }

            if (state.audioContext) {
                if (state.sourceNode) {
                    try { state.sourceNode.disconnect(); } catch (e) { }
                    state.sourceNode = null;
                }
                const source = state.audioContext.createMediaStreamSource(state.mediaStream);
                state.sourceNode = source;
                state.analyserNode = state.audioContext.createAnalyser();
                state.analyserNode.fftSize = 256;

                if (state.aiSettings?.enableNoiseFilter !== false && state.audioContext.createMediaStreamDestination) {
                    try {
                        const highPass = state.audioContext.createBiquadFilter();
                        highPass.type = 'highpass';
                        highPass.frequency.value = 85;
                        highPass.Q.value = 0.7;

                        const lowPass = state.audioContext.createBiquadFilter();
                        lowPass.type = 'lowpass';
                        lowPass.frequency.value = 7500;
                        lowPass.Q.value = 0.7;

                        const presenceFilter = state.audioContext.createBiquadFilter();
                        presenceFilter.type = 'peaking';
                        presenceFilter.frequency.value = 2800;
                        presenceFilter.Q.value = 1.0;
                        presenceFilter.gain.value = 3.0;

                        const compressor = state.audioContext.createDynamicsCompressor();
                        compressor.threshold.value = -24;
                        compressor.knee.value = 30;
                        compressor.ratio.value = 4;
                        compressor.attack.value = 0.003;
                        compressor.release.value = 0.25;

                        const destination = state.audioContext.createMediaStreamDestination();

                        source.connect(highPass);
                        highPass.connect(presenceFilter);
                        presenceFilter.connect(lowPass);
                        lowPass.connect(compressor);
                        compressor.connect(state.analyserNode);
                        compressor.connect(destination);

                        if (destination.stream && destination.stream.getAudioTracks().length > 0) {
                            streamToRecord = destination.stream;
                        }
                    } catch (filterErr) {
                        console.warn('Audio filter chain fallback to raw stream:', filterErr);
                        source.connect(state.analyserNode);
                    }
                } else {
                    source.connect(state.analyserNode);
                }
            }
        }

        // 3. Choose best supported MIME type
        const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
            ? 'audio/webm;codecs=opus'
            : MediaRecorder.isTypeSupported('audio/mp4')
                ? 'audio/mp4'
                : MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')
                    ? 'audio/ogg;codecs=opus'
                    : '';

        const options = mimeType ? { mimeType } : {};
        try {
            state.mediaRecorder = new MediaRecorder(streamToRecord, options);
        } catch (recErr) {
            state.mediaRecorder = new MediaRecorder(state.mediaStream);
        }

        state.mediaRecorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
                state.audioChunks.push(e.data);
            }
        };

        state.mediaRecorder.start(100); // Collect data every 100ms
        state.recordingStartTime = Date.now();

        // Update UI
        els.recordBtn.classList.add('recording');
        els.recordStatus.textContent = '● Aufnahme läuft…';
        els.recordStatus.classList.add('recording-active');
        els.recordDiscardBtn.classList.remove('hidden');
        els.recordDoneBtn.classList.remove('hidden');

        // Start timer & visualizer
        state.timerInterval = setInterval(updateRecordingTimer, 100);
        updateVisualizer();

    } catch (error) {
        console.error('Error starting recording:', error);
        state.isRecording = false;
        if (state.recognition) {
            try { state.recognition.stop(); } catch (e) { }
            state.recognition = null;
        }
        releaseWakeLock();
        if (error.name === 'NotAllowedError') {
            showToast('Mikrofonzugriff nicht erlaubt. Bitte in den Einstellungen aktivieren.', 'error');
        } else {
            showToast('Fehler beim Starten der Aufnahme: ' + error.message, 'error');
        }
    }
}

function initLiveSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        els.transcriptPlaceholder.textContent = 'Live-Vorschau im Browser nicht verfügbar (Audio wird gespeichert).';
        return;
    }

    // Cleanly stop any previous instance synchronously (no await!)
    if (state.activeRecognition) {
        try {
            state.activeRecognition.onresult = null;
            state.activeRecognition.onend = null;
            state.activeRecognition.onerror = null;
            state.activeRecognition.stop();
        } catch (e) { }
        state.activeRecognition = null;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    state.sessionTranscriptBase = '';
    state.sessionSegments = [];

    // Rebuilds state.transcript deterministically from sessionTranscriptBase + current session segments
    // Uses "; " after each recognized segment/term to clearly separate parts!
    const rebuildTranscriptFromSession = () => {
        let combined = (state.sessionTranscriptBase || '').trim();

        for (let idx = 0; idx < state.sessionSegments.length; idx++) {
            const seg = state.sessionSegments[idx];
            if (!seg || !seg.text) continue;

            // Guard against overlapping cumulative results (where result[i] contains result[i-1])
            let segText = seg.text.trim();
            const prevSeg = idx > 0 ? state.sessionSegments[idx - 1] : null;
            if (prevSeg && prevSeg.text) {
                const prevText = prevSeg.text.trim();
                if (segText.toLowerCase() === prevText.toLowerCase()) {
                    continue;
                }
                if (segText.toLowerCase().startsWith(prevText.toLowerCase())) {
                    segText = segText.slice(prevText.length).replace(/^[;,\s]+/, '').trim();
                    if (!segText) continue;
                }
            }

            if (!segText) continue;

            // Clean trailing comma/semicolon from segment so we can add a clean "; "
            segText = segText.replace(/[;,]+\s*$/, '').trim();
            if (!segText) continue;

            if (combined === '') {
                combined = segText;
            } else if (segText.startsWith('\n') || combined.endsWith('\n')) {
                combined += segText;
            } else {
                combined = combined.replace(/[;,]+\s*$/, '') + '; ' + segText;
            }
        }

        // Ensure trailing "; " after the last recognized term (unless empty or ending with newline)
        if (combined && !combined.endsWith('\n')) {
            combined = combined.replace(/[;,]+\s*$/, '') + '; ';
        }

        state.transcript = combined;
    };

    // Always instantiate a brand-new SpeechRecognition object (never reuse an ended instance on iOS WebKit!)
    const startFreshRecognitionSession = () => {
        if (!state.isRecording) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'de-DE';

        state.recognition = recognition;
        state.activeRecognition = recognition;

        recognition.onresult = (event) => {
            let currentInterim = '';

            for (let i = 0; i < event.results.length; ++i) {
                const result = event.results[i];
                const bestTranscript = result[0].transcript;

                if (result.isFinal) {
                    let text = applyMedicalPostProcessing(bestTranscript.trim());
                    const existing = state.sessionSegments[i];
                    state.sessionSegments[i] = {
                        text: text,
                        startTime: existing?.startTime || state.currentSegmentStartTime || Date.now(),
                        endTime: existing?.endTime || Date.now()
                    };
                    state.currentSegmentStartTime = null;
                } else {
                    if (!state.sessionSegments[i]) {
                        state.sessionSegments[i] = {
                            text: '',
                            startTime: Date.now(),
                            endTime: null
                        };
                    }
                    currentInterim += bestTranscript;
                    if (!state.currentSegmentStartTime) {
                        state.currentSegmentStartTime = Date.now();
                    }
                }
            }

            rebuildTranscriptFromSession();

            // If interimTranscript is identical to the end of final transcript (Safari quirk), hide interim duplicate
            const cleanInterim = applyMedicalPostProcessing(currentInterim.trim()).replace(/[;,]+\s*$/, '').trim();
            const cleanFinal = state.transcript.replace(/[;,]+\s*$/, '').trim();
            if (cleanInterim && cleanFinal.toLowerCase().endsWith(cleanInterim.toLowerCase())) {
                state.interimTranscript = '';
            } else {
                state.interimTranscript = currentInterim;
            }

            renderLiveTranscriptPreview();
        };

        recognition.onerror = (event) => {
            if (event.error === 'no-speech' || event.error === 'aborted') {
                return;
            }
            console.warn('Speech recognition warning:', event.error);
        };

        recognition.onend = () => {
            if (state.activeRecognition === recognition) {
                state.activeRecognition = null;
            }
            if (state.isRecording && state.recognition === recognition) {
                if (state.interimTranscript && state.interimTranscript.trim()) {
                    const flushed = applyMedicalPostProcessing(state.interimTranscript.trim()).replace(/[;,]+\s*$/, '').trim();
                    const cleanFinal = state.transcript.replace(/[;,]+\s*$/, '').trim();
                    if (flushed && !cleanFinal.toLowerCase().endsWith(flushed.toLowerCase())) {
                        const prefix = (state.transcript === '' || state.transcript.endsWith('\n') || state.transcript.endsWith('; ')) ? '' : '; ';
                        state.transcript += prefix + flushed + '; ';
                    }
                    state.interimTranscript = '';
                }
                state.sessionTranscriptBase = state.transcript;
                state.sessionSegments = [];
                renderLiveTranscriptPreview();

                setTimeout(() => {
                    if (state.isRecording && state.recognition === recognition) {
                        startFreshRecognitionSession();
                    }
                }, 150);
            }
        };

        try {
            recognition.start();
        } catch (e) {
            console.warn('Could not start SpeechRecognition synchronously:', e);
        }
    };

    // Call startFreshRecognitionSession() synchronously while still inside the user's tap gesture!
    startFreshRecognitionSession();
}

function renderLiveTranscriptPreview() {
    const finalHtml = escapeHtml(state.transcript);
    const interimHtml = escapeHtml(state.interimTranscript || '');
    if (finalHtml || interimHtml) {
        els.transcriptText.innerHTML = `${finalHtml}${interimHtml ? ` <span style="color:var(--text-muted)">${interimHtml}</span>` : ''}`;
        els.transcriptText.classList.remove('hidden');
        els.transcriptPlaceholder.classList.add('hidden');
        els.transcriptPreview.scrollTop = els.transcriptPreview.scrollHeight;
    }
}

function stopRecording() {
    return new Promise((resolve) => {
        releaseWakeLock();

        // Always ensure SpeechRecognition and MediaStream are cleaned up even if mediaRecorder wasn't ready
        const pendingInterim = state.interimTranscript ? state.interimTranscript.trim() : '';
        state.interimTranscript = '';

        if (state.recognition || state.activeRecognition) {
            const rec = state.recognition || state.activeRecognition;
            state.recognition = null; // Prevent onend watchdog from restarting
            state.activeRecognition = null;
            try {
                rec.onresult = null;
                rec.onend = null;
                rec.onerror = null;
                // Use standard rec.stop() (NOT abort() - abort() puts iOS SFSpeechRecognizer into a locked error state)
                rec.stop();
            } catch (e) { }
        }

        // Flush any remaining interim transcript only if it wasn't already finalized at the end of state.transcript
        if (pendingInterim) {
            const flushed = applyMedicalPostProcessing(pendingInterim).replace(/[;,]+\s*$/, '').trim();
            const cleanFinal = state.transcript.replace(/[;,]+\s*$/, '').trim();
            if (flushed && !cleanFinal.toLowerCase().endsWith(flushed.toLowerCase())) {
                const prefix = (state.transcript === '' || state.transcript.endsWith('\n') || state.transcript.endsWith('; ')) ? '' : '; ';
                state.transcript += prefix + flushed + '; ';
            }
            renderLiveTranscriptPreview();
        }

        if (state.mediaRecorder && state.isRecording) {
            state.isRecording = false;

            // Capture duration before stopping
            state.recordingDuration = state.recordingStartTime
                ? (Date.now() - state.recordingStartTime) / 1000
                : 0;

            let resolved = false;
            const finishResolve = () => {
                if (resolved) return;
                resolved = true;
                if (!state.audioBlob && state.audioChunks.length > 0) {
                    const actualMime = (state.mediaRecorder && state.mediaRecorder.mimeType) || 'audio/mp4';
                    state.audioBlob = new Blob(state.audioChunks, { type: actualMime });
                }
                resolve(state.audioBlob);
            };

            // Set onstop to create the blob and resolve the promise
            state.mediaRecorder.onstop = () => {
                const actualMime = state.mediaRecorder.mimeType || 'audio/mp4';
                state.audioBlob = new Blob(state.audioChunks, { type: actualMime });
                finishResolve();
            };

            try {
                if (state.mediaRecorder.state !== 'inactive') {
                    state.mediaRecorder.stop();
                } else {
                    finishResolve();
                }
            } catch (e) {
                console.warn('Recorder stop error:', e);
                finishResolve();
            }

            // Fallback safety timer in case iOS Safari delays onstop
            setTimeout(finishResolve, 600);

            // Immediately stop media stream tracks (critical for iOS AVAudioSession release!)
            if (state.mediaStream) {
                state.mediaStream.getTracks().forEach(track => track.stop());
                state.mediaStream = null;
            }

            // Disconnect audio nodes and suspend context cleanly
            if (state.sourceNode) {
                try { state.sourceNode.disconnect(); } catch (e) { }
                state.sourceNode = null;
            }
            if (state.analyserNode) {
                try { state.analyserNode.disconnect(); } catch (e) { }
                state.analyserNode = null;
            }
            if (state.audioContext && state.audioContext.state !== 'closed') {
                try {
                    state.audioContext.suspend().catch(e => console.warn('Context suspend warning:', e));
                } catch (e) {
                    console.warn(e);
                }
            }

            // Clear timer
            clearInterval(state.timerInterval);

            // Update UI
            els.recordBtn.classList.remove('recording');
            els.recordStatus.textContent = 'Aufnahme beendet';
            els.recordStatus.classList.remove('recording-active');
        } else {
            state.isRecording = false;
            if (state.mediaStream) {
                state.mediaStream.getTracks().forEach(track => track.stop());
                state.mediaStream = null;
            }
            resolve(state.audioBlob);
        }
    });
}

function discardRecording() {
    stopRecording();
    resetRecordingUI();
}

function resetRecordingUI() {
    state.audioChunks = [];
    state.audioBlob = null;
    state.isRecording = false;
    state.recordingStartTime = null;
    clearInterval(state.timerInterval);

    els.recordTimer.textContent = '00:00';
    els.recordBtn.classList.remove('recording');
    els.recordStatus.textContent = 'Tippe zum Aufnehmen';
    els.recordStatus.classList.remove('recording-active');
    els.recordDiscardBtn.classList.add('hidden');
    els.recordDoneBtn.classList.add('hidden');
    els.saveForm.classList.add('hidden');
    els.recordSection.classList.remove('hidden');

    // Reset visualizer bars
    const bars = els.recordVisualizer.querySelectorAll('.viz-bar');
    bars.forEach(bar => bar.style.height = '4px');
}

function updateRecordingTimer() {
    if (!state.recordingStartTime) return;
    const elapsed = (Date.now() - state.recordingStartTime) / 1000;
    els.recordTimer.textContent = formatDuration(elapsed);
}

function updateVisualizer() {
    if (!state.isRecording) return;

    const bars = els.recordVisualizer.querySelectorAll('.viz-bar');
    if (!bars.length) return;

    if (state.analyserNode) {
        const bufferLength = state.analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        state.analyserNode.getByteFrequencyData(dataArray);
        const step = Math.floor(bufferLength / bars.length);

        bars.forEach((bar, i) => {
            const value = dataArray[i * step] || 0;
            const height = Math.max(4, (value / 255) * 56);
            bar.style.height = `${height}px`;
        });
    } else {
        // iOS-safe visualizer animation (avoids WebAudio AudioContext locking AVAudioSession)
        const now = Date.now() / 140;
        bars.forEach((bar, i) => {
            const wave = Math.sin(now + i * 0.45) * 0.5 + 0.5;
            const pulse = Math.cos(now * 1.6 - i * 0.3) * 0.35 + 0.35;
            const height = Math.max(4, Math.min(48, 6 + wave * 22 + pulse * 14));
            bar.style.height = `${height.toFixed(1)}px`;
        });
    }

    requestAnimationFrame(updateVisualizer);
}

// ============================================================
// ============================================================
// AUDIO PLAYBACK
// ============================================================

function togglePlayback(noteId) {
    if (state.currentPlayingId === noteId) {
        // Pause/resume
        if (state.currentAudio && !state.currentAudio.paused) {
            state.currentAudio.pause();
            clearInterval(state.playbackInterval);
            updatePlayButtonUI(noteId, false);
        } else if (state.currentAudio) {
            state.currentAudio.play();
            startPlaybackProgressUpdate(noteId);
            updatePlayButtonUI(noteId, true);
        }
        return;
    }

    // Stop current playback
    stopPlayback();

    // Start new playback
    const note = state.notes.find(n => n.id === noteId);
    if (!note) return;

    // Support for multiple segments or single audioUrl
    const segments = note.audioSegments || (note.audioUrl ? [{ audioUrl: note.audioUrl }] : []);
    if (segments.length === 0) return;

    state.currentPlayingId = noteId;
    state.currentSegmentIndex = 0;
    playSegment(noteId, segments, 0);
}

function playSegment(noteId, segments, index) {
    if (index >= segments.length) {
        stopPlayback();
        renderNotes(); // Reset UI state fully
        return;
    }

    const url = segments[index].audioUrl;
    state.currentAudio = new Audio(url);
    state.currentAudio.playbackRate = state.playbackRate || 1;
    state.currentSegmentIndex = index;

    state.currentAudio.play().then(() => {
        updatePlayButtonUI(noteId, true);
        startPlaybackProgressUpdate(noteId);
    }).catch(err => {
        console.error('Playback error:', err);
        showToast('Fehler bei der Wiedergabe: ' + err.message, 'error');
        stopPlayback();
    });

    state.currentAudio.onended = () => {
        playSegment(noteId, segments, index + 1);
    };
}

function startPlaybackProgressUpdate(noteId) {
    clearInterval(state.playbackInterval);
    state.playbackInterval = setInterval(() => {
        if (!state.currentAudio) return;

        const note = state.notes.find(n => n.id === noteId);
        const segments = note.audioSegments || (note.audioUrl ? [{ duration: note.duration }] : []);

        // Progress within current segment
        const progress = (state.currentAudio.currentTime / state.currentAudio.duration) * 100;

        const progressBar = document.querySelector(`[data-note-id="${noteId}"] .audio-progress-fill`);
        const timeDisplay = document.querySelector(`[data-note-id="${noteId}"] .note-duration`);

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        if (timeDisplay) {
            const currentSegDuration = state.currentAudio.duration || 0;
            const currentSegTime = state.currentAudio.currentTime || 0;

            // If multiple segments, show Part indicator
            if (segments.length > 1) {
                timeDisplay.textContent = `Teil ${state.currentSegmentIndex + 1}/${segments.length}: ${formatDuration(currentSegTime)}`;
            } else {
                timeDisplay.textContent = `${formatDuration(currentSegTime)} / ${formatDuration(currentSegDuration)}`;
            }
        }
    }, 100);
}

function updatePlayButtonUI(noteId, isPlaying) {
    const btn = document.querySelector(`[data-note-id="${noteId}"] .note-play-btn`);
    if (!btn) return;

    if (isPlaying) {
        btn.classList.add('playing');
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
    } else {
        btn.classList.remove('playing');
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
    }
}

function stopPlayback() {
    if (state.currentAudio) {
        state.currentAudio.pause();
        state.currentAudio.src = '';
        state.currentAudio = null;
    }
    clearInterval(state.playbackInterval);
    state.currentPlayingId = null;
    state.currentSegmentIndex = 0;
}

function seekAudio(noteId, e) {
    if (state.currentPlayingId !== noteId || !state.currentAudio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || e.touches?.[0]?.clientX;
    const pct = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
    state.currentAudio.currentTime = pct * state.currentAudio.duration;
}

function seekRelative(noteId, diff) {
    if (state.currentPlayingId === noteId && state.currentAudio) {
        state.currentAudio.currentTime = Math.min(Math.max(0, state.currentAudio.currentTime + diff), state.currentAudio.duration);
    }
}

function stopAndRestart(noteId) {
    if (state.currentPlayingId === noteId) {
        stopPlayback();
    }
    togglePlayback(noteId);
}
// ============================================================
// FILTERING & SEARCH
// ============================================================

function filterNotes() {
    let filtered = [...state.notes];

    // Filter by category
    if (state.activeFilter !== 'all') {
        filtered = filtered.filter(n => n.categoryId === state.activeFilter);
    }

    // Filter by search
    if (state.searchQuery.trim()) {
        const q = state.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(n => {
            const title = (n.title || '').toLowerCase();
            const cat = getCategoryById(n.categoryId);
            const catName = cat ? cat.name.toLowerCase() : '';
            return title.includes(q) || catName.includes(q);
        });
    }

    state.filteredNotes = filtered;
}

function getCategoryById(id) {
    return state.categories.find(c => c.id === id);
}

// ============================================================
// UI RENDERING
// ============================================================

function renderCategoryFilter() {
    const noteCounts = {};
    state.notes.forEach(n => {
        noteCounts[n.categoryId] = (noteCounts[n.categoryId] || 0) + 1;
    });

    let html = `
    <button class="filter-chip ${state.activeFilter === 'all' ? 'active' : ''}" data-filter="all">
      Alle <span class="chip-count">${state.notes.length}</span>
    </button>
  `;

    state.categories.forEach(cat => {
        const count = noteCounts[cat.id] || 0;
        html += `
      <button class="filter-chip ${state.activeFilter === cat.id ? 'active' : ''}" data-filter="${cat.id}">
        <span class="chip-dot" style="background:${cat.color}"></span>
        ${cat.icon || ''} ${cat.name}
        <span class="chip-count">${count}</span>
      </button>
    `;
    });

    els.categoryFilter.innerHTML = html;

    // Bind events
    els.categoryFilter.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            state.activeFilter = chip.dataset.filter;
            filterNotes();
            renderCategoryFilter();
            renderNotes();
        });
    });
}

function renderNotes() {
    filterNotes();

    els.notesCount.textContent = `${state.filteredNotes.length} ${state.filteredNotes.length === 1 ? 'Notiz' : 'Notizen'}`;

    const isEmpty = state.filteredNotes.length === 0;

    // Toggle FAB visibility
    if (isEmpty && !state.searchQuery) {
        els.fabRecord.classList.add('hidden');
    } else {
        els.fabRecord.classList.remove('hidden');
    }

    if (isEmpty) {
        els.notesList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🎙️</div>
        <h3>${state.searchQuery ? 'Keine Ergebnisse' : 'Noch keine Notizen'}</h3>
        <p>${state.searchQuery ? 'Versuch es mit einem anderen Suchbegriff.' : 'Tippe auf den Aufnahme-Button, um deine erste Sprachnotiz zu erstellen.'}</p>
        ${!state.searchQuery ? `
        <button class="empty-state-record-btn" title="Neue Aufnahme" style="margin:24px auto 0;width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg, #ef4444, #dc2626);color:white;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(239, 68, 68, 0.4);cursor:pointer;transition:transform 0.2s;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
            <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
            </svg>
        </button>
        ` : ''}
      </div>
    `;
        return;
    }

    els.notesList.innerHTML = state.filteredNotes.map(note => {
        const cat = getCategoryById(note.categoryId);
        const isPlaying = state.currentPlayingId === note.id;
        const waveform = note.waveform || generateWaveformData();
        const catColor = cat ? cat.color : '#EAB308';

        return `
      <div class="note-card" data-note-id="${note.id}" style="--cat-color: ${catColor}">
        <div style="position:absolute;top:0;left:0;width:4px;height:100%;background:${catColor};border-radius:4px 0 0 4px;"></div>
        <div class="note-card-top">
          <div class="note-card-info">
            <div class="note-card-title-row" style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px;">
                <div class="note-card-title" style="margin-bottom:0;flex:1;">${escapeHtml(note.title || 'Unbenannte Notiz')}</div>
                <button class="edit-title-btn" data-edit-title-id="${note.id}" title="Titel bearbeiten" style="opacity:0.6;border:none;background:none;cursor:pointer;padding:4px;color:var(--text-muted);">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
            </div>
            <div class="note-card-meta">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${formatDate(note.createdAt)}
              </span>
              ${note.isOffline ? '<span style="color:var(--warning);font-weight:bold;margin-left:8px;">⚠️ Offline</span>' : ''}
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            ${cat ? `<span class="note-card-category" style="background:${catColor}20;color:${catColor}">${cat.icon || ''} ${cat.name}</span>` : ''}
            <div class="note-card-actions">
              <button class="note-action-btn append" data-append-id="${note.id}" title="Anhängen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </button>
              <button class="note-action-btn delete" data-delete-id="${note.id}" title="Löschen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="note-card-bottom">
          <div style="display:flex;align-items:center;">
             <button class="restart-btn" data-restart-id="${note.id}" title="Neustart" style="background:none;border:none;cursor:pointer;color:var(--text-muted);width:32px;height:32px;margin-right:4px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
             </button>
             <button class="seek-btn" data-seek-note="${note.id}" data-val="-15" title="-15s" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:11px;font-weight:600;margin-right:8px;">-15s</button>
             
             <button class="note-play-btn ${isPlaying ? 'playing' : ''}" data-play-id="${note.id}">
            ${isPlaying
                ? '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
                : '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>'}
             </button>

             <button class="seek-btn" data-seek-note="${note.id}" data-val="15" title="+15s" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:11px;font-weight:600;margin-left:8px;">+15s</button>
             <button class="speed-btn" data-speed-id="${note.id}" title="Geschwindigkeit" style="background:none;border:1px solid var(--border);border-radius:4px;cursor:pointer;color:var(--text-muted);font-size:10px;font-weight:600;margin-left:8px;padding:2px 4px;min-width:24px;">${state.playbackRate}x</button>
          </div>
          <div class="audio-progress" data-seek-id="${note.id}">
            <div class="audio-progress-fill" style="width:${isPlaying && state.currentAudio ? (state.currentAudio.currentTime / state.currentAudio.duration * 100) : 0}%"></div>
          </div>
          <span class="note-duration">${formatDuration(note.duration || 0)}</span>
        </div>
        ${note.transcript ? `
        <div class="note-transcript" data-transcript-container="${note.id}">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span class="note-transcript-label">Transkript</span>
                <div style="display:flex;gap:4px;">
                    <button class="pdf-btn" data-pdf-id="${note.id}" title="Als PDF speichern" style="background:none;border:none;cursor:pointer;color:var(--text-muted);width:24px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:4px;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    </button>
                    <button class="share-transcript-btn" data-share-id="${note.id}" title="Teilen" style="background:none;border:none;cursor:pointer;color:var(--text-muted);width:24px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:4px;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                    </button>
                    <button class="edit-transcript-btn" data-edit-id="${note.id}" title="Bearbeiten" style="background:none;border:none;cursor:pointer;color:var(--text-muted);width:24px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:4px;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                </div>
            </div>
            <div class="transcript-content" style="white-space:pre-wrap;">${escapeHtml(note.transcript).replace(/\n\n/g, '\n')}</div>
        </div>` : ''}
      </div>
    `;
    }).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderCategorySelect() {
    els.categorySelect.innerHTML = state.categories.map(cat => `
    <div class="category-option ${state.selectedCategoryId === cat.id ? 'selected' : ''}" data-cat-id="${cat.id}">
      <span class="cat-dot" style="background:${cat.color}"></span>
      <span class="cat-name">${cat.icon || ''} ${cat.name}</span>
    </div>
  `).join('');

    els.categorySelect.querySelectorAll('.category-option').forEach(opt => {
        opt.addEventListener('click', () => {
            state.selectedCategoryId = opt.dataset.catId;
            renderCategorySelect();
        });
    });
}

function renderCategoriesList() {
    const noteCounts = {};
    state.notes.forEach(n => {
        noteCounts[n.categoryId] = (noteCounts[n.categoryId] || 0) + 1;
    });

    els.categoriesList.innerHTML = state.categories.map(cat => `
    <div class="category-item" data-cat-id="${cat.id}">
      <div class="category-item-icon" style="background:${cat.color}20;color:${cat.color}">${cat.icon || '📝'}</div>
      <div class="category-item-info">
        <div class="category-item-name">${escapeHtml(cat.name)}</div>
        <div class="category-item-count">${noteCounts[cat.id] || 0} Notizen</div>
      </div>
      <div class="category-item-actions">
        <button class="note-action-btn" data-edit-cat="${cat.id}" title="Bearbeiten">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button class="note-action-btn delete" data-delete-cat="${cat.id}" title="Löschen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');

    // Bind events
    els.categoriesList.querySelectorAll('[data-edit-cat]').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = state.categories.find(c => c.id === btn.dataset.editCat);
            if (cat) showCategoryForm(cat);
        });
    });

    els.categoriesList.querySelectorAll('[data-delete-cat]').forEach(btn => {
        btn.addEventListener('click', () => {
            showConfirmDialog(
                '🗂️',
                'Kategorie löschen?',
                'Kategorien mit Notizen können nicht gelöscht werden.',
                () => deleteCategory(btn.dataset.deleteCat)
            );
        });
    });
}

function renderColorPicker() {
    els.colorPicker.innerHTML = CATEGORY_COLORS.map(color => `
    <div class="color-option ${state.selectedColor === color ? 'selected' : ''}" data-color="${color}" style="background:${color}"></div>
  `).join('');

    els.colorPicker.querySelectorAll('.color-option').forEach(opt => {
        opt.addEventListener('click', () => {
            state.selectedColor = opt.dataset.color;
            renderColorPicker();
        });
    });
}

function renderIconPicker() {
    els.iconPicker.innerHTML = CATEGORY_ICONS.map(icon => `
    <div class="icon-option ${state.selectedIcon === icon ? 'selected' : ''}" data-icon="${icon}">${icon}</div>
  `).join('');

    els.iconPicker.querySelectorAll('.icon-option').forEach(opt => {
        opt.addEventListener('click', () => {
            state.selectedIcon = opt.dataset.icon;
            renderIconPicker();
        });
    });
}

function initVisualizer() {
    const barCount = 30;
    els.recordVisualizer.innerHTML = Array.from({ length: barCount }, () =>
        '<div class="viz-bar" style="height:4px"></div>'
    ).join('');
}

// ============================================================
// MODAL MANAGEMENT
// ============================================================

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function openRecordModalForAppend(noteId) {
    if (!state.user) {
        showToast('Bitte erst einloggen', 'error');
        return;
    }
    openRecordModal(true, noteId);
}

function openRecordModal(isAppend = false, noteId = null) {
    if (typeof isAppend === 'object') isAppend = false; // Handle event object if passed directly

    resetRecordingUI();

    state.isAppending = isAppend;
    state.appendingNoteId = noteId;

    if (isAppend) {
        const note = state.notes.find(n => n.id === noteId);
        els.recordStatus.textContent = `Anhängen an: ${note ? truncateText(note.title, 20) : 'Notiz'}`;

        const groups = els.saveForm.querySelectorAll('.form-group');
        if (groups.length > 1) {
            groups[0].classList.add('hidden'); // Title
            groups[1].classList.add('hidden'); // Category
        }
    } else {
        const groups = els.saveForm.querySelectorAll('.form-group');
        if (groups.length > 1) {
            groups[0].classList.remove('hidden');
            groups[1].classList.remove('hidden');
        }
    }

    if (state.activeFilter && state.activeFilter !== 'all') {
        state.selectedCategoryId = state.activeFilter;
    } else {
        // Default to "JUH" if available, else first category
        const juhCat = state.categories.find(c => c.name === 'JUH');
        if (juhCat) {
            state.selectedCategoryId = juhCat.id;
        } else {
            state.selectedCategoryId = state.categories.length > 0 ? state.categories[0].id : null;
        }
    }
    els.noteTitle.value = '';
    initVisualizer();
    renderCategorySelect();
    openModal(els.recordModal);
}

function closeRecordModal() {
    if (state.isRecording) {
        stopRecording();
    }
    resetRecordingUI();
    closeModal(els.recordModal);
}

function openCategoriesModal() {
    showCategoriesListView();
    renderCategoriesList();
    openModal(els.categoriesModal);
}

function closeCategoriesModal() {
    closeModal(els.categoriesModal);
}

function showCategoriesListView() {
    els.categoriesListView.classList.remove('hidden');
    els.categoryFormView.classList.add('hidden');
    els.categoriesModalTitle.textContent = 'Kategorien';
    state.editingCategoryId = null;
}

function showCategoryForm(category = null) {
    els.categoriesListView.classList.add('hidden');
    els.categoryFormView.classList.remove('hidden');

    if (category) {
        state.editingCategoryId = category.id;
        els.categoriesModalTitle.textContent = 'Kategorie bearbeiten';
        els.categoryName.value = category.name;
        state.selectedColor = category.color;
        state.selectedIcon = category.icon || CATEGORY_ICONS[0];
    } else {
        state.editingCategoryId = null;
        els.categoriesModalTitle.textContent = 'Neue Kategorie';
        els.categoryName.value = '';
        state.selectedColor = CATEGORY_COLORS[0];
        state.selectedIcon = CATEGORY_ICONS[0];
    }

    renderColorPicker();
    renderIconPicker();
}

async function showSaveForm() {
    if (!state.audioBlob) {
        showToast('Keine Aufnahme vorhanden', 'error');
        return;
    }
    els.recordSection.classList.add('hidden');
    els.transcriptPreview.classList.add('hidden'); // Hide preview in modal
    els.saveForm.classList.remove('hidden');
    renderCategorySelect();

    // Fill text area with captured live transcript immediately (processed with medical dictionary)
    let initialDraft = applyMedicalPostProcessing(state.transcript.trim());
    if (initialDraft && !initialDraft.endsWith(';')) {
        initialDraft = initialDraft.replace(/[;,]+\s*$/, '') + ';';
    }
    els.noteTranscript.value = initialDraft;

    if (!state.isAppending) {
        els.noteTitle.focus();
    }

    // Automatically run AI high-precision audio transcription in background if online
    await runAiTranscriptionPass(false);
}

async function runAiTranscriptionPass(isManualTrigger = false) {
    if (!state.audioBlob || state.isTranscribingAI) return;
    const hasConfiguredCloudKey = !!(state.aiSettings?.groqApiKey || state.aiSettings?.geminiApiKey);
    if (!isManualTrigger && !hasConfiguredCloudKey) {
        return;
    }
    if (!navigator.onLine) {
        if (isManualTrigger) showToast('Offline – KI-Transkription benötigt Internet', 'info');
        return;
    }

    state.isTranscribingAI = true;
    const origBtnText = els.retranscribeAiBtn ? els.retranscribeAiBtn.innerHTML : '🎙️ KI-Präzision';
    if (els.retranscribeAiBtn) {
        els.retranscribeAiBtn.innerHTML = '⏳ KI analysiert Audio…';
        els.retranscribeAiBtn.disabled = true;
    }

    try {
        const currentText = els.noteTranscript.value.trim();
        const aiTranscript = await transcribeWithAI(state.audioBlob, currentText);

        if (aiTranscript && aiTranscript.trim()) {
            els.noteTranscript.value = aiTranscript.trim();
            state.transcript = aiTranscript.trim();
            if (els.aiTranscriptBadge) {
                els.aiTranscriptBadge.classList.remove('hidden');
            }
            if (isManualTrigger) {
                showToast('Audio erfolgreich mit medizinischer KI transkribiert!', 'success');
            }
        } else if (isManualTrigger) {
            // Even if cloud AI isn't configured with a dedicated key yet, re-apply medical post-processing dictionary
            const refined = applyMedicalPostProcessing(els.noteTranscript.value);
            els.noteTranscript.value = refined;
            showToast('Medizinisches Fachwörterbuch angewendet (für Cloud-Audio-KI optional API-Key in Einstellungen hinterlegen)', 'info');
        }
    } catch (e) {
        console.warn('AI pass error:', e);
        if (isManualTrigger) {
            showToast('KI-Analyse nicht erreichbar, nutze Live-Transkript', 'error');
        }
    } finally {
        state.isTranscribingAI = false;
        if (els.retranscribeAiBtn) {
            els.retranscribeAiBtn.innerHTML = origBtnText;
            els.retranscribeAiBtn.disabled = false;
        }
    }
}

function updateAiSettingsStatusUI() {
    if (!els.aiEngineStatusBadge || !els.aiEngineStatusDesc) return;
    const hasGroq = !!(state.aiSettings?.groqApiKey);
    const hasGemini = !!(state.aiSettings?.geminiApiKey);
    const filterActive = state.aiSettings?.enableNoiseFilter !== false;

    if (hasGroq || hasGemini) {
        els.aiEngineStatusBadge.textContent = 'Cloud-KI + Live Hybrid';
        els.aiEngineStatusBadge.style.background = 'rgba(52, 211, 153, 0.2)';
        els.aiEngineStatusBadge.style.color = 'var(--success)';
        const engines = [];
        if (hasGroq) engines.push('Groq Whisper Large v3');
        if (hasGemini) engines.push('Gemini 2.5 Flash Audio');
        els.aiEngineStatusDesc.textContent = `Aktive KI-Modelle: ${engines.join(' & ')} + Live-Erkennung (${Object.keys(state.technicalTerms || {}).length} medizinische Fachbegriffe) ${filterActive ? '+ RTW-Störgeräuschfilter (85Hz–7.5kHz)' : ''}.`;
    } else {
        els.aiEngineStatusBadge.textContent = 'Live-Hybrid + Fachwörterbuch';
        els.aiEngineStatusBadge.style.background = 'rgba(234, 179, 8, 0.2)';
        els.aiEngineStatusBadge.style.color = 'var(--primary-light)';
        els.aiEngineStatusDesc.textContent = `Aktiv: Stabilisierte Echtzeit-Spracherkennung mit Auto-Restart, ${Object.keys(state.technicalTerms || {}).length} medizinischen Fachbegriffen${filterActive ? ' & aktivem RTW-Störgeräuschfilter' : ''}. Für zusätzliche KI-Nachberechnung der Audiodatei kannst du unten kostenlose Gemini/Groq Keys hinterlegen.`;
    }
}

function openAiSettingsModal() {
    if (els.aiGeminiKey) els.aiGeminiKey.value = state.aiSettings?.geminiApiKey || '';
    if (els.aiGroqKey) els.aiGroqKey.value = state.aiSettings?.groqApiKey || '';
    if (els.aiNoiseFilterToggle) els.aiNoiseFilterToggle.checked = state.aiSettings?.enableNoiseFilter !== false;
    updateAiSettingsStatusUI();
    openModal(els.aiSettingsModal);
}

function showConfirmDialog(icon, title, message, onConfirm) {
    els.confirmIcon.textContent = icon;
    els.confirmTitle.textContent = title;
    els.confirmMessage.textContent = message;
    els.confirmDialog.classList.remove('hidden');

    const handleConfirm = () => {
        els.confirmDialog.classList.add('hidden');
        onConfirm();
        els.confirmOk.removeEventListener('click', handleConfirm);
        els.confirmCancel.removeEventListener('click', handleCancel);
    };

    const handleCancel = () => {
        els.confirmDialog.classList.add('hidden');
        els.confirmOk.removeEventListener('click', handleConfirm);
        els.confirmCancel.removeEventListener('click', handleCancel);
    };

    els.confirmOk.addEventListener('click', handleConfirm);
    els.confirmCancel.addEventListener('click', handleCancel);
}

// ============================================================
// EVENT HANDLERS
// ============================================================

/* AUTHENTICATION LOGIC */

async function handleGoogleLogin() {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.error('Google Login Error:', error);

        let msg = 'Google Login fehlgeschlagen.';
        if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
            msg = 'Du hast das Login-Fenster geschlossen, bevor die Anmeldung abgeschlossen war.';
        } else if (error.code === 'auth/popup-blocked') {
            msg = 'Das Login-Fenster wurde vom Browser blockiert. Bitte Popups zulassen.';
        } else {
            msg += ' ' + error.message;
        }

        els.loginError.textContent = msg;
        els.loginError.classList.remove('hidden');
    }
}

async function handleAuthSubmit(e) {
    e.preventDefault();
    const email = els.authEmail.value.trim();
    const password = els.authPassword.value.trim();
    const name = els.authName.value.trim();

    if (!email || !password) return;

    els.loginError.classList.add('hidden');

    try {
        if (state.isRegistering) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (name) {
                await updateProfile(userCredential.user, { displayName: name });
            }
            try {
                await sendEmailVerification(userCredential.user);
                showToast('Bestätigungs-E-Mail wurde gesendet. Bitte prüfe deinen Posteingang.', 'success');
            } catch (err) {
                console.error('Error sending verification email:', err);
                showToast('Konto erstellt, aber Bestätigungs-E-Mail konnte nicht gesendet werden.', 'error');
            }
            // Sign out implicitly so they have to verify first
            await signOut(auth);

            // Switch back to login mode
            if (state.isRegistering) {
                toggleAuthMode();
            }
            els.loginError.textContent = 'Bitte bestätige deine E-Mail-Adresse, bevor du dich einloggst.';
            els.loginError.classList.remove('hidden');
            return;
        } else {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Force reload before checking verified state to ensure it's not cached
            await userCredential.user.reload();

            if (!userCredential.user.emailVerified) {
                await signOut(auth);
                els.loginError.textContent = 'Bitte bestätige zuerst deine E-Mail-Adresse über den Link in deinem Posteingang.';
                els.loginError.classList.remove('hidden');
                return;
            }
        }
    } catch (error) {
        console.error('Auth Error:', error);
        let msg = 'Ein Fehler ist aufgetreten.';
        const code = error.code;
        if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
            msg = 'E-Mail oder Passwort falsch.';
        } else if (code === 'auth/email-already-in-use') {
            msg = 'Diese E-Mail wird bereits verwendet.';
        } else if (code === 'auth/weak-password') {
            msg = 'Passwort ist zu schwach (min 6 Zeichen).';
        }
        els.loginError.textContent = msg;
        els.loginError.classList.remove('hidden');
    }
}

function toggleAuthMode() {
    state.isRegistering = !state.isRegistering;
    els.loginError.classList.add('hidden');

    if (state.isRegistering) {
        els.authNameGroup.classList.remove('hidden');
        els.authSubmitBtn.textContent = 'Registrieren';
        els.authToggleBtn.textContent = 'Bereits ein Konto? Anmelden';
        els.authForgotBtn.classList.add('hidden');
    } else {
        els.authNameGroup.classList.add('hidden');
        els.authSubmitBtn.textContent = 'Anmelden';
        els.authToggleBtn.textContent = 'Noch kein Konto? Registrieren';
        els.authForgotBtn.classList.remove('hidden');
    }
}

async function handleForgotPassword() {
    const email = els.authEmail.value.trim();
    if (!email) {
        els.loginError.textContent = 'Bitte gib deine E-Mail-Adresse ein und klicke erneut auf Passwort vergessen.';
        els.loginError.classList.remove('hidden');
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        showToast('Passwort-Reset E-Mail gesendet!', 'success');
        els.loginError.classList.add('hidden');
    } catch (error) {
        console.error('Reset Password Error:', error);
        let msg = 'Fehler beim Senden der E-Mail (evtl. ungültige Adresse?).';
        if (error.code === 'auth/user-not-found') {
            msg = 'Es gibt kein Konto mit dieser E-Mail-Adresse.';
        } else if (error.code === 'auth/invalid-email') {
            msg = 'Die eingegebene E-Mail-Adresse ist ungültig.';
        }
        els.loginError.textContent = msg;
        els.loginError.classList.remove('hidden');
    }
}

function bindEvents() {
    // Terms
    initTermsEvents();

    // Auth Listeners
    if (els.loginGoogleBtn) els.loginGoogleBtn.addEventListener('click', handleGoogleLogin);
    if (els.authForm) els.authForm.addEventListener('submit', handleAuthSubmit);
    if (els.authToggleBtn) els.authToggleBtn.addEventListener('click', toggleAuthMode);
    if (els.authForgotBtn) els.authForgotBtn.addEventListener('click', handleForgotPassword);

    // User Menu
    els.btnUserMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        els.userMenu.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        els.userMenu.classList.remove('active');
    });

    els.btnLogout.addEventListener('click', handleLogout);

    // Categories
    els.btnCategories.addEventListener('click', openCategoriesModal);
    els.btnManageCategories.addEventListener('click', () => {
        els.userMenu.classList.remove('active');
        openCategoriesModal();
    });
    if (els.btnAiSettings) {
        els.btnAiSettings.addEventListener('click', () => {
            els.userMenu.classList.remove('active');
            openAiSettingsModal();
        });
    }
    if (els.aiSettingsModalClose) {
        els.aiSettingsModalClose.addEventListener('click', () => closeModal(els.aiSettingsModal));
    }
    if (els.aiSettingsModal) {
        els.aiSettingsModal.addEventListener('click', (e) => {
            if (e.target === els.aiSettingsModal) closeModal(els.aiSettingsModal);
        });
    }
    if (els.aiSettingsSaveBtn) {
        els.aiSettingsSaveBtn.addEventListener('click', async () => {
            await saveAiSettings();
            closeModal(els.aiSettingsModal);
        });
    }
    if (els.aiSettingsTestBtn) {
        els.aiSettingsTestBtn.addEventListener('click', async () => {
            await saveAiSettings();
            const gKey = state.aiSettings?.geminiApiKey || firebaseConfig.apiKey;
            const groqKey = state.aiSettings?.groqApiKey;
            els.aiSettingsTestBtn.textContent = 'Prüfe…';
            els.aiSettingsTestBtn.disabled = true;
            try {
                let successMsg = [];
                if (groqKey) {
                    const r = await fetch('https://api.groq.com/openai/v1/models', {
                        headers: { 'Authorization': `Bearer ${groqKey}` }
                    });
                    if (r.ok) successMsg.push('Groq Whisper v3 bereit');
                }
                if (gKey) {
                    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash?key=${gKey}`);
                    if (r.ok) successMsg.push('Gemini 2.5 Flash bereit');
                }
                if (successMsg.length > 0) {
                    showToast(`Verbindung erfolgreich: ${successMsg.join(' & ')}`, 'success');
                } else {
                    showToast('Live-Hybrid & Medizin-Wörterbuch aktiv (für Cloud-KI bitte gültigen Gemini/Groq API-Key eingeben)', 'info');
                }
            } catch (err) {
                showToast('Verbindungstest fehlgeschlagen: ' + err.message, 'error');
            } finally {
                els.aiSettingsTestBtn.textContent = 'Verbindung testen';
                els.aiSettingsTestBtn.disabled = false;
            }
        });
    }
    els.btnFaq.addEventListener('click', () => {
        els.userMenu.classList.remove('active');
        els.faqContent.innerHTML = FAQ_HTML;
        openModal(els.faqModal);
    });
    els.faqModalClose.addEventListener('click', () => {
        closeModal(els.faqModal);
    });
    els.faqModal.addEventListener('click', (e) => {
        if (e.target === els.faqModal) closeModal(els.faqModal);
    });
    els.categoriesModalClose.addEventListener('click', closeCategoriesModal);
    els.addCategoryBtn.addEventListener('click', () => showCategoryForm());
    els.categoryCancelBtn.addEventListener('click', showCategoriesListView);
    els.categorySaveBtn.addEventListener('click', () => {
        const name = els.categoryName.value.trim();
        if (!name) {
            showToast('Bitte gib einen Namen ein', 'error');
            return;
        }
        saveCategory({
            name,
            color: state.selectedColor,
            icon: state.selectedIcon
        });
    });

    // Search
    els.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        filterNotes();
        renderNotes();
    });

    // FAB
    els.fabRecord.addEventListener('click', openRecordModal);

    // Record Modal
    els.recordModalClose.addEventListener('click', closeRecordModal);
    els.recordModal.addEventListener('click', (e) => {
        if (e.target === els.recordModal) closeRecordModal();
    });

    els.recordBtn.addEventListener('click', async () => {
        if (state.isRecording) {
            await stopRecording();
        } else {
            startRecording();
        }
    });

    els.recordDiscardBtn.addEventListener('click', discardRecording);
    els.recordDoneBtn.addEventListener('click', async () => {
        if (state.isRecording) {
            await stopRecording();
        }
        showSaveForm();
    });

    // Save Form
    els.saveCancelBtn.addEventListener('click', () => {
        els.saveForm.classList.add('hidden');
        els.recordSection.classList.remove('hidden');
        els.transcriptPreview.classList.remove('hidden'); // Show preview again
    });

    if (els.retranscribeAiBtn) {
        els.retranscribeAiBtn.addEventListener('click', () => {
            runAiTranscriptionPass(true);
        });
    }

    els.summarizeBtn.addEventListener('click', () => {
        const text = els.noteTranscript.value;
        const summarized = summarizeMaterials(text);
        if (text !== summarized) {
            els.noteTranscript.value = summarized;
            showToast('Mengen erfolgreich zusammengefasst!', 'success');
        } else {
            showToast('Keine aufsummierbaren Mengen gefunden.', 'info');
        }
    });

    els.saveBtn.addEventListener('click', async () => {
        if (!state.audioBlob) {
            showToast('Keine Aufnahme vorhanden', 'error');
            return;
        }

        const duration = state.recordingDuration || 0;
        const blob = state.audioBlob;
        const transcript = els.noteTranscript.value.trim();

        if (state.isAppending && state.appendingNoteId) {
            closeRecordModal();
            await appendNote(state.appendingNoteId, blob, duration, transcript);
            return;
        }

        if (!state.selectedCategoryId) {
            showToast('Bitte wähle eine Kategorie', 'error');
            return;
        }

        const title = els.noteTitle.value.trim();
        const categoryId = state.selectedCategoryId;

        closeRecordModal();
        await saveNote(title, categoryId, blob, duration, transcript);
        renderCategoryFilter();
    });

    // Categories Modal backdrop
    els.categoriesModal.addEventListener('click', (e) => {
        if (e.target === els.categoriesModal) closeCategoriesModal();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!els.confirmDialog.classList.contains('hidden')) {
                els.confirmDialog.classList.add('hidden');
            } else if (els.recordModal.classList.contains('active')) {
                closeRecordModal();
            } else if (els.categoriesModal.classList.contains('active')) {
                closeCategoriesModal();
            } else if (els.faqModal.classList.contains('active')) {
                closeModal(els.faqModal);
            } else if (els.aiSettingsModal && els.aiSettingsModal.classList.contains('active')) {
                closeModal(els.aiSettingsModal);
            }
        }
    });

    // Note List Event Delegation
    els.notesList.addEventListener('click', (e) => {
        const target = e.target;

        // Play
        const playBtn = target.closest('.note-play-btn');
        if (playBtn) {
            e.stopPropagation();
            togglePlayback(playBtn.dataset.playId);
            return;
        }

        // Restart
        const restartBtn = target.closest('.restart-btn');
        if (restartBtn) {
            e.stopPropagation();
            stopAndRestart(restartBtn.dataset.restartId);
            return;
        }

        // Seek (+/- 15s)
        const seekBtn = target.closest('.seek-btn');
        if (seekBtn) {
            e.stopPropagation();
            seekRelative(seekBtn.dataset.seekNote, parseInt(seekBtn.dataset.val));
            return;
        }

        // Speed
        const speedBtn = target.closest('.speed-btn');
        if (speedBtn) {
            e.stopPropagation();
            toggleSpeed(speedBtn.dataset.speedId);
            return;
        }

        // Append
        const appendBtn = target.closest('.note-action-btn.append');
        if (appendBtn) {
            e.stopPropagation();
            openRecordModalForAppend(appendBtn.dataset.appendId);
            return;
        }

        // Delete
        const deleteBtn = target.closest('.note-action-btn.delete');
        if (deleteBtn) {
            e.stopPropagation();
            showConfirmDialog(
                '🗑️',
                'Notiz löschen?',
                'Die Aufnahme wird unwiderruflich gelöscht.',
                () => deleteNote(deleteBtn.dataset.deleteId)
            );
            return;
        }

        // PDF
        const pdfBtn = target.closest('.pdf-btn');
        if (pdfBtn) {
            e.stopPropagation();
            exportPdf(pdfBtn.dataset.pdfId);
            return;
        }

        // Share
        const shareBtn = target.closest('.share-transcript-btn');
        if (shareBtn) {
            e.stopPropagation();
            shareTranscript(shareBtn.dataset.shareId);
            return;
        }

        // Edit Transcript
        const editTransBtn = target.closest('.edit-transcript-btn');
        if (editTransBtn) {
            e.stopPropagation();
            toggleTranscriptEdit(editTransBtn.dataset.editId);
            return;
        }

        // Edit Title
        const editTitleBtn = target.closest('.edit-title-btn');
        if (editTitleBtn) {
            e.stopPropagation();
            toggleTitleEdit(editTitleBtn.dataset.editTitleId);
            return;
        }

        // Seek Bar (Click)
        const seekBar = target.closest('.audio-progress');
        if (seekBar) {
            e.stopPropagation();
            seekAudio(seekBar.dataset.seekId, e);
            return;
        }

        // Empty State Record Button
        const emptyRecordBtn = target.closest('.empty-state-record-btn');
        if (emptyRecordBtn) {
            e.stopPropagation();
            openRecordModal();
            return;
        }
    });

    // Touchstart for scrubbing (passive)
    els.notesList.addEventListener('touchstart', (e) => {
        const seekBar = e.target.closest('.audio-progress');
        if (seekBar) {
            seekAudio(seekBar.dataset.seekId, e);
        }
    }, { passive: true });
}

// ============================================================
// APP INITIALIZATION
// ============================================================

async function initApp(user) {
    state.user = user;

    // Update header
    if (user.photoURL) {
        els.headerAvatar.style.backgroundImage = `url(${user.photoURL})`;
        els.headerAvatar.textContent = '';
    } else {
        els.headerAvatar.style.backgroundImage = 'none';
        els.headerAvatar.textContent = getInitials(user);
    }
    els.userMenuName.textContent = user.displayName || 'Benutzer';
    els.userMenuEmail.textContent = user.email || '';

    // Load data
    await Promise.all([loadCategories(), loadNotes(), loadTechnicalTerms(), loadAiSettings()]);

    // Color Migration (visual only, for old purple data)
    state.categories.forEach(c => {
        // Aggressive check for ANY purple variant or default
        const oldPurples = ['#8b5cf6', '#8B5CF6', '#7c3aed', '#6366f1', 'rgb(139, 92, 246)'];
        if (!c.color || oldPurples.includes(c.color) || c.color.toLowerCase() === '#8b5cf6') {
            console.log('Migrating purple category:', c.name);
            c.color = '#EAB308';
        }
    });

    // Default Filter: JUH
    const juhCat = state.categories.find(c => c.name === 'JUH');
    if (juhCat) {
        state.activeFilter = juhCat.id;
        state.selectedCategoryId = juhCat.id;
        filterNotes();
    }

    // Render
    renderCategoryFilter();
    renderNotes();

    // Show app
    els.loadingScreen.classList.add('hidden');
    els.loginScreen.classList.add('hidden');
    els.app.classList.remove('hidden');

    // Set Version
    const verEl = document.getElementById('app-version-display');
    if (verEl) verEl.textContent = APP_VERSION;
    const verOverlay = document.getElementById('version-overlay');
    if (verOverlay) verOverlay.textContent = 'v ' + APP_VERSION;
}

function showLogin() {
    els.loadingScreen.classList.add('hidden');
    els.app.classList.add('hidden');
    els.loginScreen.classList.remove('hidden');
}

// Main entry point
async function main() {
    bindEvents();

    // Check for redirect result (iOS PWA)
    try {
        const result = await getRedirectResult(auth);
        if (result) {
            // User just logged in via redirect
        }
    } catch (error) {
        console.error('Redirect result error:', error);
    }

    // Init Offline Manager
    await OfflineManager.init();

    // Online Status Listeners
    window.addEventListener('online', () => {
        state.isOffline = false;
        showToast('Du bist wieder online', 'success');
        syncOfflineNotes();
    });
    window.addEventListener('offline', () => {
        state.isOffline = true;
        showToast('Du bist offline', 'info');
    });

    // Initial Sync Check
    if (navigator.onLine) {
        setTimeout(syncOfflineNotes, 2000);
    }

    // Listen for auth state changes
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                await user.reload();
            } catch (e) {
                // If it fails (e.g. network error), we just use the current state
            }
            if (user.emailVerified) {
                await initApp(user);
                return;
            }
        }

        // Unverified or not logged in
        state.user = null;
        state.categories = [];
        state.notes = [];
        stopPlayback();
        showLogin();
    });

    // Register Service Worker
    // Register Service Worker - RE-ENABLED v3.1.16
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('/sw.js');
        } catch (e) {
            console.warn('SW registration failed:', e);
        }
    }
}

// ============================================================
// TECHNICAL TERMS MANAGEMENT
// ============================================================

function renderTermsList() {
    const list = els.termsList;
    list.innerHTML = '';

    // Check if search exists
    const filter = els.termSearch ? els.termSearch.value.trim().toLowerCase() : '';

    const terms = Object.entries(state.technicalTerms);

    // Update count
    if (els.termsCount) {
        els.termsCount.textContent = `(${terms.length})`;
    }

    // Sort terms
    terms.sort((a, b) => a[0].localeCompare(b[0]));

    let visibleCount = 0;

    terms.forEach(([wrong, correct]) => {
        // Filter
        if (filter) {
            if (!wrong.toLowerCase().includes(filter) && !correct.toLowerCase().includes(filter)) {
                return;
            }
        }
        visibleCount++;

        const item = document.createElement('div');
        item.className = 'term-item';
        item.innerHTML = `
            <div class="term-item-info">
                <div style="display:flex;align-items:center;">
                    <span class="term-wrong">${escapeHtml(wrong)}</span>
                    <span class="term-arrow">➜</span>
                    <span class="term-correct">${escapeHtml(correct)}</span>
                </div>
            </div>
            <div class="term-actions">
                <button class="note-action-btn delete" title="Löschen">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    </svg>
                </button>
            </div>
        `;

        // Delete handler
        item.querySelector('.delete').addEventListener('click', () => {
            deleteTerm(wrong);
        });

        list.appendChild(item);
    });

    if (visibleCount === 0) {
        if (filter) {
            list.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-muted);">Kein Treffer für "${escapeHtml(filter)}".</div>`;
            if (els.termSearchAction) els.termSearchAction.classList.remove('hidden');
        } else {
            list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">Keine Fachbegriffe definiert.</div>';
            if (els.termSearchAction) els.termSearchAction.classList.add('hidden');
        }
    } else {
        if (els.termSearchAction) els.termSearchAction.classList.add('hidden');
    }
}



function addTerm() {
    const wrong = els.termWrong.value.trim().toLowerCase();
    const correct = els.termCorrect.value.trim();

    if (!wrong || !correct) {
        showToast('Bitte beides ausfüllen', 'error');
        return;
    }

    if (state.technicalTerms[wrong]) {
        if (!confirm(`Der Begriff "${wrong}" existiert bereits. Überschreiben?`)) return;
    }

    // Update state
    state.technicalTerms[wrong] = correct;

    // Clear inputs
    els.termWrong.value = '';
    els.termCorrect.value = '';
    if (els.termSearch) els.termSearch.value = ''; // Clear search

    els.termWrong.focus();

    // Render & Save
    renderTermsList();
    saveTechnicalTerms();
}

function deleteTerm(wrong) {
    if (confirm(`"${wrong}" wirklich löschen?`)) {
        delete state.technicalTerms[wrong];
        renderTermsList();
        saveTechnicalTerms();
    }
}

// Event Listeners for Terms
function initTermsEvents() {
    if (els.btnManageTerms) {
        els.btnManageTerms.addEventListener('click', () => {
            if (els.userMenu) els.userMenu.classList.remove('active');
            renderTermsList();
            openModal(els.termsModal);
        });
    }

    if (els.termsModalClose) {
        els.termsModalClose.addEventListener('click', () => {
            closeModal(els.termsModal);
        });
    }

    if (els.termsModal) {
        els.termsModal.addEventListener('click', (e) => {
            if (e.target === els.termsModal) closeModal(els.termsModal);
        });
    }

    if (els.addTermBtn) {
        els.addTermBtn.addEventListener('click', addTerm);
    }

    // Search events
    if (els.termSearch) {
        els.termSearch.addEventListener('input', () => {
            renderTermsList();
        });
    }

    if (els.useSearchTermBtn) {
        els.useSearchTermBtn.addEventListener('click', () => {
            const searchVal = els.termSearch.value.trim();
            if (searchVal) {
                els.termWrong.value = searchVal;
                // Focus correct input
                els.termCorrect.focus();
                // Hide button, but search remains in search box to explain why list is empty
                els.termSearchAction.classList.add('hidden');
            }
        });
    }

    // Inline Terms Logic
    if (els.toggleTermsInline) {
        els.toggleTermsInline.addEventListener('click', () => {
            els.inlineTermsContainer.classList.toggle('hidden');
            if (!els.inlineTermsContainer.classList.contains('hidden')) {
                if (els.inlineTermSearch) els.inlineTermSearch.focus();
            }
        });
    }

    if (els.inlineTermSearch) {
        els.inlineTermSearch.addEventListener('input', () => {
            const val = els.inlineTermSearch.value.trim().toLowerCase();
            // Simple check if already exists
            if (state.technicalTerms[val]) {
                els.inlineTermsStatus.textContent = `Bereits bekannt als: ${state.technicalTerms[val]}`;
                els.inlineTermsStatus.style.color = 'var(--text-muted)';
                els.inlineTermAction.classList.add('hidden');
            } else {
                els.inlineTermsStatus.textContent = '';
                if (val) {
                    els.inlineTermAction.classList.remove('hidden');
                } else {
                    els.inlineTermAction.classList.add('hidden');
                }
            }
        });
    }

    if (els.inlineUseTermBtn) {
        els.inlineUseTermBtn.addEventListener('click', () => {
            els.inlineTermWrong.value = els.inlineTermSearch.value.trim();
            els.inlineTermCorrect.focus();
            els.inlineTermAction.classList.add('hidden');
        });
    }

    if (els.inlineAddTermBtn) {
        els.inlineAddTermBtn.addEventListener('click', () => {
            const wrong = els.inlineTermWrong.value.trim().toLowerCase();
            const correct = els.inlineTermCorrect.value.trim();

            if (!wrong || !correct) {
                els.inlineTermsStatus.textContent = 'Bitte beides ausfüllen';
                els.inlineTermsStatus.style.color = 'var(--error)';
                return;
            }

            // Save
            state.technicalTerms[wrong] = correct;
            saveTechnicalTerms();

            // Correct existing transcript immediately
            const currentTranscript = els.noteTranscript.value;
            const escapedWrong = wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(?<![\\wÄÖÜäöüß])${escapedWrong}(?![\\wÄÖÜäöüß])`, 'gi');

            // Check if matches exist
            const matchCount = (currentTranscript.match(regex) || []).length;

            if (matchCount > 0) {
                const newTranscript = currentTranscript.replace(regex, correct);
                els.noteTranscript.value = newTranscript;
                // Feedback
                els.inlineTermsStatus.textContent = `Gespeichert & ${matchCount}x korrigiert: ${wrong} -> ${correct}`;
            } else {
                // Feedback only
                els.inlineTermsStatus.textContent = `Gespeichert: ${wrong} -> ${correct}`;
            }

            els.inlineTermsStatus.style.color = 'var(--success)';

            // Clear
            els.inlineTermWrong.value = '';
            els.inlineTermCorrect.value = '';
            els.inlineTermSearch.value = '';
            els.inlineTermAction.classList.add('hidden');

            // Refresh main list just in case
            renderTermsList();
        });
    }
}

main();
