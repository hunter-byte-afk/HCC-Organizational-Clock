//Authors: Renae Hunt

document.getElementById('loginBtn').addEventListener('click', () => {
    const name = document.getElementById('username').value.trim();
    const pin = document.getElementById('pin').value.trim(); // just take the input as-is

    loginUser(name, pin);
});

function parseCSV(csvText) {
    const lines = csvText.trim().split(/\r?\n/); // handle \r\n or \n
    const result = [];
    const headers = lines[0].split(',').map(h => h.trim());

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const values = lines[i].split(',').map(v => v.trim());
        const user = {};
        headers.forEach((h, index) => {
            user[h] = values[index]; // keep CSV values as-is
        });
        result.push(user);
    }
    return result;
}

function loginUser(name, pin) {
    fetch('users.csv')
        .then(response => {
            if (!response.ok) throw new Error("CSV not found");
            return response.text();
        })
        .then(csvText => {
            const users = parseCSV(csvText);

            // Exact match as before, case-sensitive
            const match = users.find(u => u.name === name && u.pin === pin);

            if (match) {
                // Save logged-in user
                localStorage.setItem('loggedInUser', JSON.stringify({
                    id: match.user_id,
                    name: match.name
                }));
                window.location.href = 'clock.html';
            } else {
                alert("Incorrect name or PIN.");
            }
        })
        .catch(err => {
            console.error("Error loading CSV:", err);
            alert("Unable to load user database.");
        });
}
