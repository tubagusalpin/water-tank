let level = 50;
let suhu = 28;
let hum = 60;
let pump = 0;

// CHART
let ctx = document.getElementById("chart").getContext("2d");
let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      { label: "Level", data: [] },
      { label: "Suhu", data: [] },
      { label: "Hum", data: [] }
    ]
  }
});

// GAUGE
function drawGauge(id, value, max) {
  let ctx = document.getElementById(id).getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [{
        data: [value, max - value]
      }]
    }
  });
}

// UPDATE UI
function updateUI() {
  document.getElementById("water").style.height = level + "%";

  // Pompa
  if (level < 30) pump = 1;
  if (level > 80) pump = 0;

  if (pump) {
    document.getElementById("fan").classList.add("spin");
    document.getElementById("pumpStatus").innerText = "ON";
  } else {
    document.getElementById("fan").classList.remove("spin");
    document.getElementById("pumpStatus").innerText = "OFF";
  }

  // Alarm
  let alarm = document.getElementById("alarm");
  if (level < 20) {
    alarm.innerText = "AIR HAMPIR HABIS!";
    alarm.classList.add("danger");
  } else {
    alarm.innerText = "NORMAL";
    alarm.classList.remove("danger");
  }

  // Update chart
  chart.data.labels.push("");
  chart.data.datasets[0].data.push(level);
  chart.data.datasets[1].data.push(suhu);
  chart.data.datasets[2].data.push(hum);
  chart.update();

  drawGauge("gaugeTemp", suhu, 50);
  drawGauge("gaugeHum", hum, 100);
}

// SIMULASI
setInterval(() => {
  level += Math.random()*10 - 5;
  suhu += Math.random()*2 - 1;
  hum += Math.random()*4 - 2;

  if (level < 0) level = 0;
  if (level > 100) level = 100;

  updateUI();
}, 2000);
