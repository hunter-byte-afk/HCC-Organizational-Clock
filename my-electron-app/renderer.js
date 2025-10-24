const dbName = "HelloWorldDB";
let db;

const request = indexedDB.open(dbName, 1);

request.onupgradeneeded = (event) => {
    db = event.target.result;
    db.createObjectStore("messages", {keyPath : "id", autoIncrement: true });
};

request.onsuccess = (event) => {
    db = event.target.result;
    console.log("IndexDB is ready.");
};

request.onerror = (event) => {
    db = event.target.result;
    console.error("IndexDB error: ", event.target.errorCode);
};

document.getElementById("save").onclick = () => {
  const value = document.getElementById("input").value;
  const tx = db.transaction("messages", "readwrite");
  tx.objectStore("messages").add({ text: value });
  tx.oncomplete = () => console.log("Saved:", value);
};

document.getElementById("load").onclick = () => {
  const tx = db.transaction("messages", "readonly");
  const store = tx.objectStore("messages");
  const req = store.getAll();
  req.onsuccess = () => {
    const messages = req.result.map(m => m.text).join(", ");
    document.getElementById("output").textContent = "Stored: " + messages;
  };
};

const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}

func()