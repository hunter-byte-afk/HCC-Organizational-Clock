const loggedInUserData = localStorage.getItem('loggedInUser');
const loggedInUser = loggedInUserData ? JSON.parse(loggedInUserData) : null;

console.log('Logged in user:', loggedInUser);

// Time entries array
let timeEntries = [];

// Load time entries from localStorage on page load
function loadTimeEntries() {
    const saved = localStorage.getItem('timeEntries');
    if (saved) {
        timeEntries = JSON.parse(saved);
    }
    renderEntries();
}

// Save time entries to localStorage
function saveTimeEntries() {
    localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
}

// Load clocked-in state from localStorage
function loadClockedInState() {
    const saved = localStorage.getItem('clockedInTime');
    if (saved) {
        clockedInTime = new Date(saved);
        updateUIAfterClockIn();
    }
}

// Save clocked-in state to localStorage
function saveClockedInState() {
    if (clockedInTime) {
        localStorage.setItem('clockedInTime', clockedInTime.toISOString());
    } else {
        localStorage.removeItem('clockedInTime');
    }
}

// Render time entries to the DOM
function renderEntries() {
    const entriesList = document.getElementById('entriesList');
    
    if (timeEntries.length === 0) {
        entriesList.innerHTML = '<p class="empty-message">No entries yet</p>';
        return;
    }
    
    entriesList.innerHTML = timeEntries.map((entry, index) => `
        <div class="entry-item">
            <div class="entry-times">
                <span class="entry-date">${entry.date}</span>
                <span class="entry-time">${entry.inTime} - ${entry.outTime}</span>
                <span class="entry-duration">${entry.duration}</span>
            </div>
        </div>
    `).join('');
}

// Update UI after clocking in
function updateUIAfterClockIn() {
    document.getElementById('status').textContent = `Clocked in as ${loggedInUser.name}`;
    document.getElementById('status').classList.add('clocked-in');
    document.getElementById('clockedInTime').textContent = clockedInTime.toLocaleTimeString();
    document.getElementById('clockInBtn').disabled = true;
    document.getElementById('clockOutBtn').disabled = false;
}

// Updates the Clock //
function updateClock(){
    const currentTimeEl = document.getElementById('currentTime');
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    currentTimeEl.textContent = `${hours}:${minutes}:${seconds}`;
}


updateClock();

setInterval(updateClock, 1000);

// Clocking in and Out //

let clockedInTime = null;

function clockIn() {
    console.log('clockIn() called');
    if (!loggedInUser) {
        alert('No user logged in!');
        return;
    }
    if (clockedInTime) {
        alert('You are already clocked in!');
        return;
    }
    clockedInTime = new Date();
    updateUIAfterClockIn();
    saveClockedInState();
    console.log(`Clocked in at ${clockedInTime}`);
}

function clockOut() {
    console.log('clockOut() called');
    if (!clockedInTime) {
        alert('You are not clocked in!');
        return;
    }
    
    const clockOutTime = new Date();
    
    // Calculate duration
    const diffMs = clockOutTime - clockedInTime;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    const duration = `${hours}h ${minutes}m ${seconds}s`;
    
    // Add entry to time entries
    timeEntries.push({
        date: clockedInTime.toLocaleDateString(),
        inTime: clockedInTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        outTime: clockOutTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        duration: duration
    });
    
    // Save and render
    saveTimeEntries();
    renderEntries();
    
    // Reset clocked in state
    clockedInTime = null;
    saveClockedInState();
    
    // Update UI
    document.getElementById('status').textContent = 'Not Clocked In';
    document.getElementById('status').classList.remove('clocked-in');
    document.getElementById('clockedInTime').textContent = '--:-- --';
    document.getElementById('clockInBtn').disabled = false;
    document.getElementById('clockOutBtn').disabled = true;
    
    console.log(`Clocked out at ${clockOutTime}`);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    loadTimeEntries();
    loadClockedInState();
});