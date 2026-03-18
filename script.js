let level = 50;
let suhu = 28;
let hum = 60;
let pump = 0;

let volume = 0;
let distance = 0;

// GAUGE
let gaugeTemp = new Chart(document.getElementById("gaugeTemp"), {
  type: "doughnut",
  data: {
    datasets: [{
      data: [0, 50],
      backgroundColor: ["#3aa0d8", "#2a2f38"] // biru + background
    }]
  },
  options: { cutout: "70%" }
});

let gaugeHum = new Chart(document.getElementById("gaugeHum"), {
  type: "doughnut",
  data: {
    datasets: [{
      data: [0, 100],
      backgroundColor: ["#00ff88", "#2a2f38"] // hijau + background
    }]
  },
  options: { cutout: "70%" }
});

// CHART LEVEL
let chartLevel = new Chart(document.getElementById("chartLevel"), {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Level",
      data: [],
      borderColor: "cyan",
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "rgba(255,255,255,0.1)" }
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
          color: "white"
        },
        grid: {
          color: "rgba(255,255,255,0.1)"
        }
      }
    },
    plugins: {
      legend: {
        labels: { color: "white" }
      }
    }
  }
});

// CHART TEMP
let chartTemp = new Chart(document.getElementById("chartTemp"), {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Temp",
      data: [],
      borderColor: "orange",
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "rgba(255,255,255,0.1)" }
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
          color: "white"
        },
        grid: {
          color: "rgba(255,255,255,0.1)"
        }
      }
    },
    plugins: {
      legend: {
        labels: { color: "white" }
      }
    }
  }
});

// CHART HUM
let chartHum = new Chart(document.getElementById("chartHum"), {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Hum",
      data: [],
      borderColor: "lime",
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "rgba(255,255,255,0.1)" }
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
          color: "white"
        },
        grid: {
          color: "rgba(255,255,255,0.1)"
        }
      }
    },
    plugins: {
      legend: {
        labels: { color: "white" }
      }
    }
  }
});

// UPDATE UI
function updateUI() {

  document.getElementById("water").style.height = level + "%";
  document.getElementById("levelText").innerText = Math.round(level) + "%";

  if (level < 30) pump = 1;
  if (level > 80) pump = 0;

  let fan = document.getElementById("fan");
  let pumpStatus = document.getElementById("pumpStatus");

  if (pump) {
  fan.classList.remove("off");
  fan.classList.add("on");

  pumpStatus.innerText = "ON";
  pumpStatus.classList.remove("pump-off");
} else {
  fan.classList.remove("on");
  fan.classList.add("off");

  pumpStatus.innerText = "OFF";
  pumpStatus.classList.add("pump-off");
}

  let alarm = document.getElementById("alarm");
  if (level < 20) {
    alarm.innerText = "AIR HAMPIR HABIS!";
    alarm.classList.add("danger");
  } else {
    alarm.innerText = "NORMAL";
    alarm.classList.remove("danger");
  }

  volume = Math.round(level * 20);
  distance = Math.round(100 - level);

  document.getElementById("volume").innerText = volume + " L";
  document.getElementById("distance").innerText = distance + " cm";

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

  // UPDATE GAUGE (warna tetap 1 tone)
  gaugeTemp.data.datasets[0].data = [suhu, 50 - suhu];
  gaugeTemp.data.datasets[0].backgroundColor = ["#3aa0d8", "#2a2f38"];

  gaugeHum.data.datasets[0].data = [hum, 100 - hum];
  gaugeHum.data.datasets[0].backgroundColor = ["#00ff88", "#2a2f38"];

  gaugeTemp.update();
  gaugeHum.update();

  document.getElementById("tempText").innerText = Math.round(suhu) + "°C";
  document.getElementById("humText").innerText = Math.round(hum) + "%";
}

// SIMULASI DATA
setInterval(() => {
  level += Math.random() * 10 - 5;
  suhu += Math.random() * 2 - 1;
  hum += Math.random() * 4 - 2;

  level = Math.max(0, Math.min(100, level));
  suhu = Math.max(0, Math.min(50, suhu));
  hum = Math.max(0, Math.min(100, hum));

  updateUI();
}, 2000);
