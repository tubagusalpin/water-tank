let level = 50;
let suhu = 28;
let hum = 60;
let pump = 0;

let volume = 0;
let distance = 0;

// GAUGE TEMP
let gaugeTemp = new Chart(document.getElementById("gaugeTemp"), {
  type: "doughnut",
  data: {
    datasets: [{
      data: [0, 50],
      backgroundColor: ["#00c6ff", "#333"],
      borderWidth: 0
    }]
  },
  options: { cutout: "70%" }
});

// GAUGE HUM
let gaugeHum = new Chart(document.getElementById("gaugeHum"), {
  type: "doughnut",
  data: {
    datasets: [{
      data: [0, 100],
      backgroundColor: ["#00ff88", "#333"],
      borderWidth: 0
    }]
  },
  options: { cutout: "70%" }
});

// CHART LEVEL
let chartLevel = new Chart(document.getElementById("chartLevel"), {
  type: "line",
  data: { labels: [], datasets: [{ data: [], borderColor: "cyan" }] },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { min: 0, max: 100 } }
  }
});

// CHART TEMP
let chartTemp = new Chart(document.getElementById("chartTemp"), {
  type: "line",
  data: { labels: [], datasets: [{ data: [], borderColor: "orange" }] },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { min: 0, max: 100 } }
  }
});

// CHART HUM
let chartHum = new Chart(document.getElementById("chartHum"), {
  type: "line",
  data: { labels: [], datasets: [{ data: [], borderColor: "lime" }] },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { min: 0, max: 100 } }
  }
});

// UPDATE UI
function updateUI() {

  document.getElementById("water").style.height = level + "%";
  document.getElementById("levelText").innerText = Math.round(level) + "%";

  // pump
  if (level < 30) pump = 1;
  if (level > 80) pump = 0;

  if (pump) {
    fan.classList.add("spin");
    pumpStatus.innerText = "ON";
  } else {
    fan.classList.remove("spin");
    pumpStatus.innerText = "OFF";
  }

  // alarm
  let alarm = document.getElementById("alarm");
  if (level < 20) {
    alarm.innerText = "AIR HAMPIR HABIS!";
    alarm.classList.add("danger");
  } else {
    alarm.innerText = "NORMAL";
    alarm.classList.remove("danger");
  }

  // parameter tambahan
  volume = Math.round(level * 20);
  distance = Math.round(100 - level);

  document.getElementById("volume").innerText = volume + " L";
  document.getElementById("distance").innerText = distance + " cm";

  // gauge text
  document.getElementById("tempText").innerText = Math.round(suhu) + "°C";
  document.getElementById("humText").innerText = Math.round(hum) + "%";

  // update chart
  chartLevel.data.labels.push("");
  chartTemp.data.labels.push("");
  chartHum.data.labels.push("");

  chartLevel.data.datasets[0].data.push(level);
  chartTemp.data.datasets[0].data.push(suhu);
  chartHum.data.datasets[0].data.push(hum);

  if (chartLevel.data.labels.length > 15) {
    chartLevel.data.labels.shift();
    chartTemp.data.labels.shift();
    chartHum.data.labels.shift();

    chartLevel.data.datasets[0].data.shift();
    chartTemp.data.datasets[0].data.shift();
    chartHum.data.datasets[0].data.shift();
  }

  chartLevel.update();
  chartTemp.update();
  chartHum.update();

  // update gauge
  gaugeTemp.data.datasets[0].data = [suhu, 50 - suhu];
  gaugeHum.data.datasets[0].data = [hum, 100 - hum];

  gaugeTemp.update();
  gaugeHum.update();
}

// SIMULASI
setInterval(() => {
  level += Math.random()*10 - 5;
  suhu += Math.random()*2 - 1;
  hum += Math.random()*4 - 2;

  level = Math.max(0, Math.min(100, level));

  updateUI();
}, 2000);
