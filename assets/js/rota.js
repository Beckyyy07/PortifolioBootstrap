let map, directionsService, directionsRenderer;
var marker;

function initMap() {
    // Inicialize o mapa
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -8.051970169330605, lng: -34.88530675670732},
        zoom: 18 // Nível de zoom inicial
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Obtendo a localização do usuário
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            // Definindo ponto fixo
            const destination =  {lat: -8.051970169330605, lng: -34.88530675670732};

            // Calculando a rota se a permissão for concedida
            calculateAndDisplayRoute(userLocation, destination);
        }, function() {
            alert('Não foi possível obter a sua localização.');
        });
    } else {
        alert('Seu navegador não suporta geolocalização.');
    }
}

function calculateAndDisplayRoute(userLocation, destination) {
    directionsService.route({
        origin: userLocation,
        destination: destination,
        travelMode: 'DRIVING' // Modo de transporte (DRIVING para carro)
    }, function(response, status) {
        if (status === 'OK') {
            // Mostrar a rota no mapa se a rota for encontrada
            directionsRenderer.setDirections(response);
        } else {
            // Se não for possível calcular a rota, mostrar apenas o ponto fixo
            marker = new google.maps.Marker({
                position: destination,
                map: map,
                title: 'Onde me encontrar'
            });
        }
    });
}
initMap()
