const CSV_PATH = "users.csv"; 
let users = [];

const loginBtn = document.getElementById("loginBtn");
loginBtn.disabled = true;

fetch(CSV_PATH)
    .then(response => response.text())
    .then(data => {
        const lines = data.trim().split("\n");
        lines.shift(); 
        users = lines.map(line => {
            const [user_id, name, pin] = line.split(",").map(field => field.trim());
            return pin;
        });
        loginBtn.disabled = false;
    })
    .catch(err => console.error("Error loading CSV:", err));

loginBtn.addEventListener("click", () => {
    const pinInput = document.getElementById("pin").value.trim();

    if (pinInput.length !== 4) {
        alert("Please enter a 4-digit PIN");
        return;
    }

    if (users.includes(pinInput)) {
        window.location.href = "clock.html";
    } else {
        alert("PIN not found");
    }
});
