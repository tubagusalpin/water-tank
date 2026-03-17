/* ================= script.js ================= */
function createChart(id) {
    return new Chart(document.getElementById(id), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{ data: [], fill: true }]
        },
        options: { responsive: true }
    });
}

const c1 = createChart('chart1');
const c2 = createChart('chart2');
const c3 = createChart('chart3');
const c4 = createChart('chart4');

setInterval(() => {
    let t = new Date().toLocaleTimeString();
    let val = Math.random()*100;

    [c1,c2,c3,c4].forEach(c=>{
        c.data.labels.push(t);
        c.data.datasets[0].data.push(val);
        if(c.data.labels.length>10){
            c.data.labels.shift();
            c.data.datasets[0].data.shift();
        }
        c.update();
    });
},2000);
