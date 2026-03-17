// ================= JS (script.js) =================
let levelData = [];
let tempData = [];
let humData = [];

const chartLevel = new Chart(document.getElementById("chartLevel"), {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Level', data: [] }] }
});

const chartTemp = new Chart(document.getElementById("chartTemp"), {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Temp', data: [] }] }
});

const chartHum = new Chart(document.getElementById("chartHum"), {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Hum', data: [] }] }
});

setInterval(() => {
    let level = Math.floor(Math.random() * 100);
    let temp = Math.floor(Math.random() * 40);
    let hum = Math.floor(Math.random() * 100);

    document.getElementById("water").style.height = level + "%";
    document.getElementById("levelText").innerText = level + "%";
    document.getElementById("volume").innerText = level * 10 + " L";
    document.getElementById("distance").innerText = (100 - level) + " cm";

    // Pump logic
    let pumpOn = level < 30;
    document.getElementById("pumpText").innerText = pumpOn ? "ON" : "OFF";
    document.getElementById("pumpIndicator").className = pumpOn ? "indicator on" : "indicator off";

    // update chart
    let time = new Date().toLocaleTimeString();

    chartLevel.data.labels.push(time);
    chartLevel.data.datasets[0].data.push(level);

    chartTemp.data.labels.push(time);
    chartTemp.data.datasets[0].data.push(temp);

    chartHum.data.labels.push(time);
    chartHum.data.datasets[0].data.push(hum);

    chartLevel.update();
    chartTemp.update();
    chartHum.update();

}, 2000);
