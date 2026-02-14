// ============================================================
// SPRACHNOTIZEN APP - Main Application
// Firebase-basierte Sprachnotizen mit Kategorien
// ============================================================

const APP_VERSION = '3.1.30';

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
    "Liebe RD-Besatzung! Wir sind jetzt auf dem Weg zur Wache und würden uns freuen, wenn ihr folgendes Material bereits zum Auffüllen bereitlegt. Vielen Dank für Eure Unterstützung! Herzliche Grüße Johannes"
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
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js';
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
    technicalTerms: { ...TECHNICAL_TERMS_MAPPING }
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
    termsList: $('#terms-list'),
    termWrong: $('#term-wrong'),
    termCorrect: $('#term-correct'),
    addTermBtn: $('#add-term-btn'),
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
        const prefix = "Liebe RD-Besatzung!\nWir sind jetzt auf dem Weg zur Wache und würden uns freuen, wenn ihr folgendes Material bereits zum Auffüllen bereitlegt.\nVielen Dank für Eure Unterstützung!\nHerzliche Grüße Johannes\n\n";
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
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true;
        if (isStandalone) {
            await signInWithRedirect(auth, googleProvider);
        } else {
            await signInWithPopup(auth, googleProvider);
        }
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
            state.technicalTerms = docSnap.data().terms;
        } else {
            state.technicalTerms = { ...TECHNICAL_TERMS_MAPPING };
        }
    } catch (e) {
        console.warn('Technical terms load error (offline?):', e);
        // Fallback to defaults already in state
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

    editor.innerHTML = `
        <textarea style="width:100%;min-height:100px;background:var(--surface-sunken);border:1px solid var(--border);border-radius:var(--radius-sm);padding:8px;color:var(--text-primary);font-family:inherit;resize:vertical;font-size:14px;line-height:1.5;">${escapeHtml(currentText)}</textarea>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px;">
            <button class="btn-cancel" style="padding:4px 8px;font-size:12px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;color:var(--text-secondary);">Abbrechen</button>
            <button class="btn-save" style="padding:4px 8px;font-size:12px;background:var(--primary);border:none;border-radius:var(--radius-sm);cursor:pointer;color:var(--text-on-primary, black);">Speichern</button>
        </div>
    `;

    contentDiv.innerHTML = '';
    contentDiv.appendChild(editor);

    const textarea = editor.querySelector('textarea');
    textarea.focus();

    textarea.addEventListener('click', e => e.stopPropagation());

    editor.querySelector('.btn-cancel').addEventListener('click', (e) => {
        e.stopPropagation();
        contentDiv.innerHTML = escapeHtml(note.transcript);
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
// AUDIO RECORDING
// ============================================================

async function startRecording() {
    try {
        state.audioChunks = [];
        state.audioBlob = null;
        state.transcript = '';
        state.lastFinalEndTime = Date.now();
        state.currentSegmentStartTime = null;
        els.transcriptText.textContent = '';
        els.transcriptText.classList.add('hidden');
        els.transcriptPlaceholder.classList.remove('hidden');
        els.transcriptPreview.classList.remove('hidden');

        // Initialize Speech Recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            state.recognition = new SpeechRecognition();
            state.recognition.continuous = true;
            state.recognition.interimResults = true;
            state.recognition.lang = 'de-DE';

            state.recognition.onresult = (event) => {
                let interimTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    const result = event.results[i];
                    const transcriptPart = result[0].transcript;

                    if (result.isFinal) {
                        let text = transcriptPart.trim();

                        // Magic Words: "Zeile" -> \n, "Absatz" -> \n\n
                        // Using word boundaries \b to avoid matching inside other words
                        text = text.replace(/\bzeile\b/gi, '\n');
                        text = text.replace(/\babsatz\b/gi, '\n\n');

                        // Fachbegriffe korrigieren
                        const termsToUse = state.technicalTerms && Object.keys(state.technicalTerms).length > 0
                            ? state.technicalTerms
                            : TECHNICAL_TERMS_MAPPING;

                        for (const [wrong, correct] of Object.entries(termsToUse)) {
                            // Erstelle Regex für das falsche Wort (case insensitive, word boundaries)
                            const escapedWrong = wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                            const regex = new RegExp(`\\b${escapedWrong}\\b`, 'gi');
                            text = text.replace(regex, correct);
                        }

                        // Clean up potential double newlines if trimmed
                        // If text became ONLY whitespace/newlines, we keep it?
                        // "Neue Zeile" -> "\n".  trim() would make it empty?
                        // No, we trimmed BEFORE replace.
                        // But now text contains "\n".
                        // Wait, my logic below says: if (text) ...
                        // If text is "\n", it is truthy.

                        if (text) {
                            let prefix = ' ';
                            if (state.lastFinalEndTime > 0) {
                                const segmentStart = state.currentSegmentStartTime || Date.now();
                                // If pause > 0.4s (adjusted for API latency), insert semicolon
                                // But NOT if we just inserted a newline via magic word!
                                // Check if text starts with \n?
                                if (!text.startsWith('\n') && (segmentStart - state.lastFinalEndTime > 400)) {
                                    prefix = '; ';
                                }
                            }

                            // Prevent semicolon at the start of a new line
                            if (state.transcript === '' || text.startsWith('\n') || state.transcript.endsWith('\n')) prefix = '';

                            state.transcript += prefix + text;
                            state.lastFinalEndTime = Date.now();
                        }
                        state.currentSegmentStartTime = null;
                    } else {
                        interimTranscript += transcriptPart;
                        if (!state.currentSegmentStartTime) {
                            state.currentSegmentStartTime = Date.now();
                        }
                    }
                }

                els.transcriptText.innerHTML = `${state.transcript} <span style="color:var(--text-muted)">${interimTranscript}</span>`;
                els.transcriptText.classList.remove('hidden');
                els.transcriptPlaceholder.classList.add('hidden');
                // Auto-scroll to bottom
                els.transcriptPreview.scrollTop = els.transcriptPreview.scrollHeight;
            };

            state.recognition.onerror = (event) => {
                console.warn('Speech recognition error', event.error);
            };

            state.recognition.start();
        } else {
            console.log('Speech recognition not supported in this browser.');
            els.transcriptPlaceholder.textContent = 'Transkription in diesem Browser nicht verfügbar.';
        }

        // Request microphone access
        state.mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }
        });

        // Set up audio analyser for visualizer
        state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = state.audioContext.createMediaStreamSource(state.mediaStream);
        state.analyserNode = state.audioContext.createAnalyser();
        state.analyserNode.fftSize = 256;
        source.connect(state.analyserNode);

        // Choose best supported MIME type
        const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
            ? 'audio/webm;codecs=opus'
            : MediaRecorder.isTypeSupported('audio/mp4')
                ? 'audio/mp4'
                : MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')
                    ? 'audio/ogg;codecs=opus'
                    : '';

        const options = mimeType ? { mimeType } : {};
        state.mediaRecorder = new MediaRecorder(state.mediaStream, options);

        state.mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                state.audioChunks.push(e.data);
            }
        };

        // onstop is set dynamically in stopRecording() to support Promise-based waiting

        state.mediaRecorder.start(100); // Collect data every 100ms
        state.isRecording = true;
        state.recordingStartTime = Date.now();

        // Update UI
        els.recordBtn.classList.add('recording');
        els.recordStatus.textContent = '● Aufnahme läuft…';
        els.recordStatus.classList.add('recording-active');
        els.recordDiscardBtn.classList.remove('hidden');
        els.recordDoneBtn.classList.remove('hidden');

        // Start timer
        state.timerInterval = setInterval(updateRecordingTimer, 100);

        // Start visualizer
        updateVisualizer();

    } catch (error) {
        console.error('Error starting recording:', error);
        if (error.name === 'NotAllowedError') {
            showToast('Mikrofonzugriff nicht erlaubt. Bitte in den Einstellungen aktivieren.', 'error');
        } else {
            showToast('Fehler beim Starten der Aufnahme', 'error');
        }
    }
}

function stopRecording() {
    return new Promise((resolve) => {
        if (state.mediaRecorder && state.isRecording) {
            // Capture duration before stopping
            state.recordingDuration = state.recordingStartTime
                ? (Date.now() - state.recordingStartTime) / 1000
                : 0;

            // Set onstop to create the blob and resolve the promise
            state.mediaRecorder.onstop = () => {
                state.audioBlob = new Blob(state.audioChunks, { type: state.mediaRecorder.mimeType });
                resolve(state.audioBlob);
            };

            state.mediaRecorder.stop();
            state.isRecording = false;

            // Stop Speech Recognition
            if (state.recognition) {
                state.recognition.stop();
                state.recognition = null;
            }

            // Stop the media stream
            if (state.mediaStream) {
                state.mediaStream.getTracks().forEach(track => track.stop());
            }

            // Close audio context
            if (state.audioContext) {
                state.audioContext.close();
            }

            // Clear timer
            clearInterval(state.timerInterval);

            // Update UI
            els.recordBtn.classList.remove('recording');
            els.recordStatus.textContent = 'Aufnahme beendet';
            els.recordStatus.classList.remove('recording-active');
        } else {
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
    if (!state.isRecording || !state.analyserNode) return;

    const bufferLength = state.analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    state.analyserNode.getByteFrequencyData(dataArray);

    const bars = els.recordVisualizer.querySelectorAll('.viz-bar');
    const step = Math.floor(bufferLength / bars.length);

    bars.forEach((bar, i) => {
        const value = dataArray[i * step] || 0;
        const height = Math.max(4, (value / 255) * 56);
        bar.style.height = `${height}px`;
    });

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

function showSaveForm() {
    if (!state.audioBlob) {
        showToast('Keine Aufnahme vorhanden', 'error');
        return;
    }
    els.recordSection.classList.add('hidden');
    els.transcriptPreview.classList.add('hidden'); // Hide preview in modal
    els.saveForm.classList.remove('hidden');
    renderCategorySelect();

    // Fill text area with captured transcript
    els.noteTranscript.value = state.transcript.trim();

    els.noteTitle.focus();
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
        els.loginError.textContent = error.message;
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
        } else {
            await signInWithEmailAndPassword(auth, email, password);
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
        els.loginError.textContent = 'Bitte gib deine E-Mail-Adresse ein, um das Passwort zurückzusetzen.';
        els.loginError.classList.remove('hidden');
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        showToast('Passwort-Reset E-Mail gesendet!', 'success');
        els.loginError.classList.add('hidden');
    } catch (error) {
        console.error('Reset Password Error:', error);
        els.loginError.textContent = 'Fehler beim Senden der E-Mail (ungültige Adresse?).';
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
    await Promise.all([loadCategories(), loadNotes(), loadTechnicalTerms()]);

    // Color Migration (visual only, for old purple data)
    state.categories.forEach(c => {
        // Aggressive check for ANY purple variant or default
        const oldPurples = ['#8b5cf6', '#8B5CF6', '#7c3aed', '#6366f1', 'rgb(139, 92, 246)'];
        if (!c.color || oldPurples.includes(c.color) || c.color.toLowerCase() === '#8b5cf6') {
            console.log('Migrating purple category:', c.name);
            c.color = '#EAB308';
        }
    });

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
            await initApp(user);
        } else {
            state.user = null;
            state.categories = [];
            state.notes = [];
            stopPlayback();
            showLogin();
        }
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

    const terms = Object.entries(state.technicalTerms);

    if (terms.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">Keine Fachbegriffe definiert.</div>';
        return;
    }

    terms.forEach(([wrong, correct]) => {
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
}

main();
