var ctx = document.getElementById('meteoChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [
            {
                label: 'Température',
                data: [5, 32, 18, 15, 20, 5],
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 2,
            },
        ],
    },
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    },
});
