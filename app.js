console.log("Aplicación iniciada");

/*
Array con información de destinos.

Toda la información se almacena
en JavaScript.
*/

const destinos = [
{
    nombre: "Roma",
    pais: "Italia",
    descripcion: "La ciudad eterna, famosa por el Coliseo, el Foro Romano y el Vaticano.",
    imagen: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    wiki: "https://es.wikipedia.org/wiki/Roma",
    lat: 41.9028,
    lon: 12.4964
},
{
    nombre: "Madrid",
    pais: "España",
    descripcion: "Capital de España, conocida por el Museo del Prado, la Plaza Mayor y el Parque del Retiro.",
    imagen: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4",
    wiki: "https://es.wikipedia.org/wiki/Madrid",
    lat: 40.4168,
    lon: -3.7038
},
{
    nombre: "Barcelona",
    pais: "España",
    descripcion: "Destino famoso por la Sagrada Familia, Las Ramblas y la arquitectura de Gaudí.",
    imagen: "https://images.unsplash.com/photo-1583422409516-2895a77efded",
    wiki: "https://es.wikipedia.org/wiki/Barcelona",
    lat: 41.3874,
    lon: 2.1686
},
{
    nombre: "Londres",
    pais: "Reino Unido",
    descripcion: "Una de las ciudades más visitadas del mundo, hogar del Big Ben y el Palacio de Buckingham.",
    imagen: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
    wiki: "https://es.wikipedia.org/wiki/Londres",
    lat: 51.5072,
    lon: -0.1276
},
{
    nombre: "Lisboa",
    pais: "Portugal",
    descripcion: "Capital portuguesa conocida por sus tranvías históricos, miradores y barrios tradicionales.",
    imagen: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a",
    wiki: "https://es.wikipedia.org/wiki/Lisboa",
    lat: 38.7223,
    lon: -9.1393
}
];


/*
Función para obtener
temperatura desde Open-Meteo
(API gratuita)
*/

async function obtenerTemperatura(lat, lon) {

    const url =
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {

        const respuesta = await fetch(url);

        const datos = await respuesta.json();

        return datos.current_weather.temperature;

    } catch(error){

        console.error(error);

        return "No disponible";
    }
}


/*
Genera una tarjeta HTML
de destino.
*/

async function crearTarjeta(destino){

    const temperatura =
        await obtenerTemperatura(
            destino.lat,
            destino.lon
        );

    return `
        <article class="card">

            <img
                src="${destino.imagen}"
                alt="Imagen de ${destino.nombre}"
            >

            <div class="card-content">

                <h3>${destino.nombre}</h3>

                <p>${destino.descripcion}</p>

                <p><strong>${destino.pais}</strong></p>

                <p class="temperatura">
                    🌡 ${temperatura}°C
                </p>

                <a
                    class="btn"
                    href="${destino.wiki}"
                    target="_blank"
                >
                    Ver más
                </a>

            </div>

        </article>
    `;
}


/*
Pinta todos los destinos
en pantalla.
*/

async function mostrarDestinos(){

    const contenedor =
        document.getElementById("destinos");

    let html = "";

    for(const destino of destinos){

        html += await crearTarjeta(destino);
    }

    contenedor.innerHTML = html;

    console.log("Destinos cargados");
}

mostrarDestinos();


/*
Modo oscuro
*/

const darkBtn =
document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", ()=>{

    document.body.classList.toggle("dark-mode");

    console.log("Modo oscuro activado");
});


/*
Registro del Service Worker
*/

if("serviceWorker" in navigator){

    navigator.serviceWorker
        .register("sw.js")
        .then(()=>{
            console.log(
                "Service Worker registrado"
            );
        })
        .catch(error=>{
            console.error(error);
        });

}