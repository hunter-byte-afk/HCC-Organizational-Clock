// IndexedDB setup
const dbName = "ClockInDB";
let db;

const request = indexedDB.open(dbName, 1);

request.onupgradeneeded = (event) => {
  db = event.target.result;
  if (!db.objectStoreNames.contains("clockins")) {
    db.createObjectStore("clockins", { keyPath: "id", autoIncrement: true });
  }
};

request.onsuccess = (event) => {
  db = event.target.result;
  console.log("IndexedDB ready!");
};

request.onerror = (event) => {
  console.error("IndexedDB error:", event.target.errorCode);
};

const statusText = document.getElementById("status");
const list = document.getElementById("clockin-list");

// Clock In button logic
document.getElementById("clock-in").onclick = () => {
  if (!db) {
    statusText.textContent = "Database not ready yet. Try again.";
    return;
  }

  const now = new Date();
  const record = {
    time: now.toLocaleString(),
    timestamp: now.getTime()
  };

  const tx = db.transaction("clockins", "readwrite");
  const store = tx.objectStore("clockins");
  store.add(record);

  tx.oncomplete = () => {
    console.log("Clock-in recorded:", record);
    statusText.textContent = `✅ Clocked in at ${record.time}`;
    updateClockInList(); // refresh list automatically
  };
};

// View Clock-ins
document.getElementById("view-clockins").onclick = () => {
  updateClockInList();
};

// Helper to refresh the list
function updateClockInList() {
  if (!db) return;

  const tx = db.transaction("clockins", "readonly");
  const store = tx.objectStore("clockins");
  const req = store.getAll();

  req.onsuccess = () => {
    const clockins = req.result;
    list.innerHTML = "";
    if (clockins.length === 0) {
      list.innerHTML = "<li>No clock-ins yet.</li>";
      return;
    }
    clockins.forEach(entry => {
      const li = document.createElement("li");
      li.textContent = entry.time;
      list.appendChild(li);
    });
  };
}
