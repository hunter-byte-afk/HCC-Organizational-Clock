// Clock in/out functionality
let clockedInTime = null;
let timeEntries = [];
let timerInterval = null;

// Load data from localStorage on page load
function loadData() {
    const savedEntries = localStorage.getItem('timeEntries');
    const savedClockInTime = localStorage.getItem('clockedInTime');
    
    if (savedEntries) {
        timeEntries = JSON.parse(savedEntries);
    }
    
    if (savedClockInTime) {
        clockedInTime = new Date(savedClockInTime);
        updateUIAfterClockIn();
    }
    
    updateDisplay();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
    if (clockedInTime) {
        localStorage.setItem('clockedInTime', clockedInTime.toISOString());
    } else {
        localStorage.removeItem('clockedInTime');
    }
}

// Clock in function
function clockIn() {
    if (clockedInTime) {
        alert('You are already clocked in!');
        return;
    }
    
    clockedInTime = new Date();
    updateUIAfterClockIn();
    saveData();
}

// Clock out function
function clockOut() {
    if (!clockedInTime) {
        alert('You are not clocked in!');
        return;
    }
    
    const clockOutTime = new Date();
    const duration = calculateDuration(clockedInTime, clockOutTime);
    
    timeEntries.push({
        date: clockedInTime.toLocaleDateString(),
        inTime: clockedInTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        outTime: clockOutTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        duration: duration
    });
    
    clockedInTime = null;
    clearInterval(timerInterval);
    updateUIAfterClockOut();
    saveData();
    updateDisplay();
}

// Update UI after clocking in
function updateUIAfterClockIn() {
    document.getElementById('clockInBtn').disabled = true;
    document.getElementById('clockOutBtn').disabled = false;
    document.getElementById('status').textContent = 'Clocked In';
    document.getElementById('status').classList.add('clocked-in');
    
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateClockedInTime, 1000);
}

// Update UI after clocking out
function updateUIAfterClockOut() {
    document.getElementById('clockInBtn').disabled = false;
    document.getElementById('clockOutBtn').disabled = true;
    document.getElementById('status').textContent = 'Not Clocked In';
    document.getElementById('status').classList.remove('clocked-in');
    document.getElementById('clockedInTime').textContent = '--:-- --';
}

// Update the clocked in time display
function updateClockedInTime() {
    if (clockedInTime) {
        document.getElementById('clockedInTime').textContent = clockedInTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}

// Calculate duration between two times
function calculateDuration(startTime, endTime) {
    const diff = endTime - startTime;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { hours, minutes, seconds };
}

// Format duration for display
function formatDuration(duration) {
    return `${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;
}

// Calculate today's total hours
function calculateTodayHours() {
    const today = new Date().toLocaleDateString();
    let totalSeconds = 0;
    
    timeEntries.forEach(entry => {
        if (entry.date === today) {
            const { hours, minutes, seconds } = entry.duration;
            totalSeconds += (hours * 3600) + (minutes * 60) + seconds;
        }
    });
    
    // Add current clocked in time if applicable
    if (clockedInTime && clockedInTime.toLocaleDateString() === today) {
        const currentDuration = calculateDuration(clockedInTime, new Date());
        totalSeconds += (currentDuration.hours * 3600) + (currentDuration.minutes * 60) + currentDuration.seconds;
    }
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    return `${hours}h ${minutes}m`;
}

// Update the current time display
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('currentTime').textContent = timeString;
}

// Update today's hours display
function updateTodayHours() {
    document.getElementById('todayHours').textContent = calculateTodayHours();
}

// Render time entries list
function renderEntries() {
    const entriesList = document.getElementById('entriesList');
    
    if (timeEntries.length === 0) {
        entriesList.innerHTML = '<p class="empty-message">No entries yet</p>';
        return;
    }
    
    // Sort entries by date (newest first) and then by time
    const sortedEntries = [...timeEntries].reverse();
    
    entriesList.innerHTML = sortedEntries.map((entry, index) => `
        <div class="entry-item">
            <div class="entry-times">
                <span class="entry-date">${entry.date}</span>
                <span class="entry-time">${entry.inTime} - ${entry.outTime}</span>
                <span class="entry-duration">${formatDuration(entry.duration)}</span>
            </div>
        </div>
    `).join('');
}

// Update all displays
function updateDisplay() {
    updateCurrentTime();
    updateTodayHours();
    updateClockedInTime();
    renderEntries();
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    loadData();
    
    // Update current time every second
    setInterval(updateCurrentTime, 1000);
    
    // Update today's hours every minute
    setInterval(updateTodayHours, 60000);
    
    // Update displays initially
    updateDisplay();
});
