// ================= JS (script.js) =================
let pump = false;

function togglePump() {
    pump = !pump;
    document.getElementById("pumpBtn").innerText = pump ? "ON" : "OFF";
}

setInterval(() => {
    let level = Math.floor(Math.random() * 100);
    let temp = Math.floor(Math.random() * 40);
    let hum = Math.floor(Math.random() * 100);

    document.getElementById("water").style.height = level + "%";
    document.getElementById("levelText").innerText = level + "%";
    document.getElementById("temp").innerText = temp + "°C";
    document.getElementById("hum").innerText = hum + "%";
}, 2000);
