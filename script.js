const fan = document.getElementById("fan");
const pumpStatus = document.getElementById("pumpStatus");

let level = 50;
let suhu = 28;
let hum = 60;
let pump = 0;

/* GAUGE */
let gaugeTemp = new Chart(document.getElementById("gaugeTemp"), {
  type: "doughnut",
  data: {
    datasets: [{
      data: [28, 72],
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

/* CHART */
function makeChart(id, color) {
  return new Chart(document.getElementById(id), {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        data: [],
        borderColor: color,
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
          ticks: {
            stepSize: 10
          }
        }
      }
    }
  });
}

let chartLevel = makeChart("chartLevel", "cyan");
let chartTemp = makeChart("chartTemp", "orange");
let chartHum = makeChart("chartHum", "lime");

/* UPDATE */
function updateUI() {

  document.getElementById("water").style.height = level + "%";
  document.getElementById("levelText").innerText = Math.round(level) + "%";

  // LOGIKA POMPA
  if (level < 30) pump = 1;
  if (level > 80) pump = 0;

  if (pump) {
    fan.classList.add("spin");
    pumpStatus.innerText = "ON";
  } else {
    fan.classList.remove("spin");
    pumpStatus.innerText = "OFF";
  }

  // STATUS
  let alarm = document.getElementById("alarm");
  if (level < 20) {
    alarm.innerText = "BAHAYA";
    alarm.classList.add("danger");
  } else {
    alarm.innerText = "NORMAL";
    alarm.classList.remove("danger");
  }

  document.getElementById("tempText").innerText = Math.round(suhu) + "°C";
  document.getElementById("humText").innerText = Math.round(hum) + "%";

  gaugeTemp.data.datasets[0].data = [suhu, 100 - suhu];
  gaugeHum.data.datasets[0].data = [hum, 100 - hum];
  gaugeTemp.update();
  gaugeHum.update();

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

/* SIMULASI */
setInterval(() => {
  level += Math.random()*10 - 5;
  suhu += Math.random()*2 - 1;
  hum += Math.random()*4 - 2;

  level = Math.max(0, Math.min(100, level));

  updateUI();
}, 2000);

updateUI();
