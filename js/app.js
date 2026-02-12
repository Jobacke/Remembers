// ============================================================
// SPRACHNOTIZEN APP - Main Application
// Firebase-basierte Sprachnotizen mit Kategorien
// ============================================================

import { firebaseConfig, DEFAULT_CATEGORIES, CATEGORY_COLORS, CATEGORY_ICONS } from './config.js';

// Firebase SDK Imports (from CDN)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js';
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut
} from 'https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    deleteDoc,
    doc,
    updateDoc,
    query,
    orderBy,
    where,
    serverTimestamp,
    Timestamp
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
const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// ============================================================
// APP STATE
// ============================================================
const state = {
    user: null,
    categories: [],
    notes: [],
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
    timerInterval: null,
    analyserNode: null,
    audioContext: null,
    mediaStream: null,
    // Playback
    currentAudio: null,
    currentPlayingId: null,
    playbackInterval: null,
    // Category editing
    editingCategoryId: null,
    selectedColor: CATEGORY_COLORS[0],
    selectedIcon: CATEGORY_ICONS[0],
    // Save form
    selectedCategoryId: null,
};

// ============================================================
// DOM ELEMENTS
// ============================================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const els = {
    loadingScreen: $('#loading-screen'),
    loginScreen: $('#login-screen'),
    loginBtn: $('#login-btn'),
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
    // Confirm
    confirmDialog: $('#confirm-dialog'),
    confirmIcon: $('#confirm-icon'),
    confirmTitle: $('#confirm-title'),
    confirmMessage: $('#confirm-message'),
    confirmCancel: $('#confirm-cancel'),
    confirmOk: $('#confirm-ok'),
    // Upload
    uploadOverlay: $('#upload-overlay'),
    uploadProgressFill: $('#upload-progress-fill'),
    // Toast
    toastContainer: $('#toast-container'),
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

async function saveNote(title, categoryId, audioBlob, duration) {
    try {
        els.uploadOverlay.classList.remove('hidden');
        els.uploadProgressFill.style.width = '0%';

        // Upload audio to Firebase Storage
        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const ext = audioBlob.type.includes('webm') ? 'webm' : audioBlob.type.includes('mp4') ? 'mp4' : 'ogg';
        const audioPath = `users/${state.user.uid}/notes/${fileName}.${ext}`;
        const storageRef = ref(storage, audioPath);

        const uploadTask = uploadBytesResumable(storageRef, audioBlob, {
            contentType: audioBlob.type
        });

        await new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    els.uploadProgressFill.style.width = `${progress}%`;
                },
                reject,
                resolve
            );
        });

        const audioUrl = await getDownloadURL(storageRef);

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
    if (!note || !note.audioUrl) return;

    state.currentAudio = new Audio(note.audioUrl);
    state.currentPlayingId = noteId;

    state.currentAudio.play().then(() => {
        updatePlayButtonUI(noteId, true);
        startPlaybackProgressUpdate(noteId);
    }).catch(err => {
        console.error('Playback error:', err);
        showToast('Fehler bei der Wiedergabe', 'error');
        stopPlayback();
    });

    state.currentAudio.onended = () => {
        stopPlayback();
        renderNotes();
    };
}

function startPlaybackProgressUpdate(noteId) {
    clearInterval(state.playbackInterval);
    state.playbackInterval = setInterval(() => {
        if (!state.currentAudio) return;
        const progress = (state.currentAudio.currentTime / state.currentAudio.duration) * 100;
        const progressBar = document.querySelector(`[data-note-id="${noteId}"] .audio-progress-fill`);
        const timeDisplay = document.querySelector(`[data-note-id="${noteId}"] .note-duration`);
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (timeDisplay) {
            timeDisplay.textContent = `${formatDuration(state.currentAudio.currentTime)} / ${formatDuration(state.currentAudio.duration)}`;
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
}

function seekAudio(noteId, e) {
    if (state.currentPlayingId !== noteId || !state.currentAudio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || e.touches?.[0]?.clientX;
    const pct = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
    state.currentAudio.currentTime = pct * state.currentAudio.duration;
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

    if (state.filteredNotes.length === 0) {
        els.notesList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🎙️</div>
        <h3>${state.searchQuery ? 'Keine Ergebnisse' : 'Noch keine Notizen'}</h3>
        <p>${state.searchQuery ? 'Versuch es mit einem anderen Suchbegriff.' : 'Tippe auf den Aufnahme-Button, um deine erste Sprachnotiz zu erstellen.'}</p>
      </div>
    `;
        return;
    }

    els.notesList.innerHTML = state.filteredNotes.map(note => {
        const cat = getCategoryById(note.categoryId);
        const isPlaying = state.currentPlayingId === note.id;
        const waveform = note.waveform || generateWaveformData();
        const catColor = cat ? cat.color : '#8b5cf6';

        return `
      <div class="note-card" data-note-id="${note.id}" style="--cat-color: ${catColor}">
        <div style="position:absolute;top:0;left:0;width:4px;height:100%;background:${catColor};border-radius:4px 0 0 4px;"></div>
        <div class="note-card-top">
          <div class="note-card-info">
            <div class="note-card-title">${escapeHtml(note.title || 'Unbenannte Notiz')}</div>
            <div class="note-card-meta">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${formatDate(note.createdAt)}
              </span>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            ${cat ? `<span class="note-card-category" style="background:${catColor}20;color:${catColor}">${cat.icon || ''} ${cat.name}</span>` : ''}
            <div class="note-card-actions">
              <button class="note-action-btn delete" data-delete-id="${note.id}" title="Löschen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="note-card-bottom">
          <button class="note-play-btn ${isPlaying ? 'playing' : ''}" data-play-id="${note.id}">
            ${isPlaying
                ? '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
                : '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>'}
          </button>
          <div class="audio-progress" data-seek-id="${note.id}">
            <div class="audio-progress-fill" style="width:${isPlaying && state.currentAudio ? (state.currentAudio.currentTime / state.currentAudio.duration * 100) : 0}%"></div>
          </div>
          <span class="note-duration">${formatDuration(note.duration || 0)}</span>
        </div>
      </div>
    `;
    }).join('');

    // Bind note events
    els.notesList.querySelectorAll('.note-play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlayback(btn.dataset.playId);
        });
    });

    els.notesList.querySelectorAll('.note-action-btn.delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            showConfirmDialog(
                '🗑️',
                'Notiz löschen?',
                'Die Aufnahme wird unwiderruflich gelöscht.',
                () => deleteNote(btn.dataset.deleteId)
            );
        });
    });

    els.notesList.querySelectorAll('.audio-progress').forEach(prog => {
        const handler = (e) => seekAudio(prog.dataset.seekId, e);
        prog.addEventListener('click', handler);
        prog.addEventListener('touchstart', handler, { passive: true });
    });
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

function openRecordModal() {
    resetRecordingUI();
    state.selectedCategoryId = state.categories.length > 0 ? state.categories[0].id : null;
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
    els.saveForm.classList.remove('hidden');
    renderCategorySelect();
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

function bindEvents() {
    // Login
    els.loginBtn.addEventListener('click', handleLogin);

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
    });

    els.saveBtn.addEventListener('click', async () => {
        if (!state.audioBlob) {
            showToast('Keine Aufnahme vorhanden', 'error');
            return;
        }
        if (!state.selectedCategoryId) {
            showToast('Bitte wähle eine Kategorie', 'error');
            return;
        }

        const title = els.noteTitle.value.trim();
        const duration = state.recordingDuration || 0;

        closeRecordModal();
        await saveNote(title, state.selectedCategoryId, state.audioBlob, duration);
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
            }
        }
    });
}

// ============================================================
// APP INITIALIZATION
// ============================================================

async function initApp(user) {
    state.user = user;

    // Update header
    els.headerAvatar.src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=8b5cf6&color=fff`;
    els.userMenuName.textContent = user.displayName || 'Benutzer';
    els.userMenuEmail.textContent = user.email || '';

    // Load data
    await Promise.all([loadCategories(), loadNotes()]);

    // Render
    renderCategoryFilter();
    renderNotes();

    // Show app
    els.loadingScreen.classList.add('hidden');
    els.loginScreen.classList.add('hidden');
    els.app.classList.remove('hidden');
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
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('/sw.js');
        } catch (e) {
            console.warn('SW registration failed:', e);
        }
    }
}

main();
