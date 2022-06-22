$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const locacion = urlParams.get('locacion');
    let urlArea = "https://pokeapi.co/api/v2/location/" + locacion;

    $.ajax({
        method: "GET",
        url: urlArea,
    }).done(function (data) {
        let listaAreas = data.areas;
        let nombreLocacion = data.name;
        let nombreRegion = data.region.name;
        var idRegion = data.region.url.split("/").at(-2);

        $("#redirigir").click(function (){
            location.href="../detalleRegion/detalleRegion.html?region=" + idRegion;
        })

        $("#labelLocacion").html("Locación: " + nombreLocacion);
        $("#labelRegion").html("Región: " + nombreRegion);

        let ini = "<tbody>";
        let longitud = listaAreas.length;
        let areasIteracion;
        for (let i = 1; i <= longitud; i++) {
            areasIteracion = listaAreas[i-1];
            let id  = areasIteracion.url.split("/").at(-2);
            ini = ini + "<tr>";
            ini = ini + "<td style=\"width: 1%\">" + i + "</td>";
            ini = ini + "<th></th>";
            ini = ini + "<td style=\"width: 18%\">" + areasIteracion.name + "</td>";
            ini = ini + "<th></th>";
            ini = ini + "<td><a class='btn btn-primary' onclick='MostrarPokemones("+id+")'><span class='bi bi-pencil-square'>Ver Pokemones</span></a></td>";
            ini = ini + "</tr>";
        }
        ini = ini + "</tbody>";
        document.getElementById("tablaAreas").innerHTML = ini;


    }).fail(function (e) {
        console.log(e);
        alert("Ocurrio un  error al cargar la pagina");
    });


});

function MostrarTexto(nombreArea){
    $("#areaSeleccionada").html("Pokemones a encontrarse en el Area: "+nombreArea);
}

function MostrarPokemones(id){
    let urlPokemones = "https://pokeapi.co/api/v2/location-area/" + id;
    $.ajax({
        method: "GET",
        url: urlPokemones,
    }).done(function (pokemon) {
        let listaPokemones = pokemon.pokemon_encounters;
        let nombreArea = pokemon.name;
        MostrarTexto(nombreArea);

        let init = "";
        let longitud = listaPokemones.length;
        for(let i=1;i <= longitud;i++){
            init = init + "<div class='col-sm-6 col-md-3'>";
            init = init + "<a class='lightbox'>";
            let nombrepokemon = listaPokemones[i-1].pokemon.name;
            let idimagenpokemon = listaPokemones[i-1].pokemon.url.split("/").at(-2);
            init = init + "<center><img style='height: 165px;width: 173px' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+idimagenpokemon+".png' alt='Park'></center>";
            init = init + "<center><p>"+nombrepokemon+"</p></center>";
            init = init + "</a>";
            init = init + "</div>";
            init = init + "<br>";
        }

        document.getElementById("pokemons").innerHTML = init;


    }).fail(function (e) {
        console.log(e);
        alert("Ocurrio un  error al cargar la pagina");
    });

}

