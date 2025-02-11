// Initialize the map
var map = L.map('map').setView([40.4168, -3.7038], 10);

// Add IDEM Madrid WMS Layer
L.tileLayer.wms('https://idem.comunidad.madrid/geoidem/UnidadesAdministrativas/wms?request=GetCapabilities', {
    layers: 'IDEM_CM_UNID_ADMIN', // Adjust this based on available layers
    format: 'image/png',
    transparent: true,
    attribution: '© Comunidad de Madrid - IDEM'
}).addTo(map);

// Load GeoJSON data
fetch('path_to_your_geojson_file.geojson') //ADjust this with the geojson file name
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: '#3388ff',
                weight: 1,
                fillOpacity: 0.2
            },
            onEachFeature: onEachFeature
        }).addTo(map);
    });

// Function to handle each feature
function onEachFeature(feature, layer) {
    layer.on({
        click: function(e) {
            checkAnswer(feature.properties.NAME_2, e.target);
        }
    });
}

// Function to check the answer
function checkAnswer(municipalityName, layer) {
    if (municipalityName === currentPrompt) {
        layer.setStyle({ fillColor: 'red', fillOpacity: 0.7 });
        nextPrompt();
    } else {
        alert('Incorrecto. Intenta de nuevo');
    }
}

// Array of municipality names
var municipalities = []; // Populate this with the names from your GeoJSON

var currentPrompt = '';

// Function to start the quiz
function startQuiz() {
    municipalities = shuffleArray(municipalities);
    nextPrompt();
}

// Function to show the next prompt
function nextPrompt() {
    if (municipalities.length > 0) {
        currentPrompt = municipalities.pop();
        document.getElementById('prompt').innerText = 'Haz clic en: ' + currentPrompt;
    } else {
        document.getElementById('prompt').innerText = '¡Felicidades! Has completado el quiz.';
    }
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start the quiz
startQuiz();
