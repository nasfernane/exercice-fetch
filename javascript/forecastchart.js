// récupération du canvas, attribution d'un contexte 2D
var ctx = document.getElementById('meteoChart').getContext('2d');

// création du graphique avec modèle de base
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [
            {
                label: 'Température',
                data: [32.15, 18, 15, 20, 5, 12, 40, 28],
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 2,
            },
            {
                label: 'Température ressentie',
                data: [],
                backgroundColor: ['rgba(104, 109, 224, 0.2)'],
                borderColor: ['rgba(104, 109, 224, 1)'],
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
                        callback: function (value, index, values) {
                            return value + '°C';
                        },
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return 'Jour ' + value;
                        },
                    },
                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    },
});

// fonction pour mettre à jour graphique du forecast
updateChart = function (newTemps, feelTemps) {
    myChart.data = {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [
            {
                label: 'Température',
                data: newTemps,
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 2,
            },
            {
                label: 'Température ressentie',
                data: feelTemps,
                backgroundColor: ['rgba(104, 109, 224, 0.2)'],
                borderColor: ['rgba(104, 109, 224, 1)'],
                borderWidth: 2,
            },
        ],
    };
};
