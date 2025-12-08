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
            return {user_id, name, pin};
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

    const user = users.find(u => u.pin === pinInput);

    if (!user) {
        alert("Invalid PIN");
        return;
    }
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    window.location.href = "clock.html";
    });
