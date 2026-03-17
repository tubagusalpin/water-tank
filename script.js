// ambil element
const fan = document.getElementById("fan");
const pumpStatus = document.getElementById("pumpStatus");

// data awal
let level = 50;
let suhu = 28;
let hum = 60;
let pump = 0;

// ================= GAUGE =================
let gaugeTemp = new Chart(document.getElementById("gaugeTemp"), {
  type: "doughnut",
  data: {
    datasets: [{
      data: [28, 22],
      backgroundColor: ["#00c6ff", "#333"],
      borderWidth: 0
    }]
  },
  options: {
    cutout: "70%",
    plugins: { legend: { display: false } }
  }
});

let gaugeHum = new Chart(document.getElementById("gaugeHum"), {
  type: "doughnut",
  data: {
    datasets: [{
      data: [60, 40],
      backgroundColor: ["#00ff88", "#333"],
      borderWidth: 0
    }]
  },
  options: {
    cutout: "70%",
    plugins: { legend: { display: false } }
  }
});

// ================= CHART =================
function createChart(id, color) {
  return new Chart(document.getElementById(id), {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        data: [],
        borderColor: color,
        fill: false,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: { stepSize: 10 }
        }
      }
    }
  });
}

let chartLevel = createChart("chartLevel", "cyan");
let chartTemp = createChart("chartTemp", "orange");
let chartHum = createChart("chartHum", "lime");

// ================= UPDATE =================
function updateUI() {

  // water
  document.getElementById("water").style.height = level + "%";
  document.getElementById("levelText").innerText = Math.round(level) + "%";

  // pump logic
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
    alarm.innerText = "BAHAYA";
    alarm.classList.add("danger");
  } else {
    alarm.innerText = "NORMAL";
    alarm.classList.remove("danger");
  }

  // volume & distance
  let volume = Math.round(level * 20);
  let distance = Math.round(100 - level);

  document.getElementById("volume").innerText = volume + " L";
  document.getElementById("distance").innerText = distance + " cm";

  // text tengah gauge
  document.getElementById("tempText").innerText = Math.round(suhu) + "°C";
  document.getElementById("humText").innerText = Math.round(hum) + "%";

  // update gauge
  gaugeTemp.data.datasets[0].data = [suhu, 50 - suhu];
  gaugeHum.data.datasets[0].data = [hum, 100 - hum];
  gaugeTemp.update();
  gaugeHum.update();

  // update chart
  [chartLevel, chartTemp, chartHum].forEach(c => {
    c.data.labels.push("");
    if (c.data.labels.length > 15) c.data.labels.shift();
  });

  chartLevel.data.datasets[0].data.push(level);
  chartTemp.data.datasets[0].data.push(suhu);
  chartHum.data.datasets[0].data.push(hum);

  if (chartLevel.data.datasets[0].data.length > 15) {
    chartLevel.data.datasets[0].data.shift();
    chartTemp.data.datasets[0].data.shift();
    chartHum.data.datasets[0].data.shift();
  }

  chartLevel.update();
  chartTemp.update();
  chartHum.update();
}

// ================= SIMULASI =================
setInterval(() => {
  level += Math.random()*10 - 5;
  suhu += Math.random()*2 - 1;
  hum += Math.random()*4 - 2;

  level = Math.max(0, Math.min(100, level));

  updateUI();
}, 2000);

// pertama kali jalan
updateUI();
