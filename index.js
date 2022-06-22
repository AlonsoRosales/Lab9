
$(document).ready(function () {
    $.ajax({
        method:"GET",
        url:"https://pokeapi.co/api/v2/region",
    }).done(function (data){
        var listaPaises = data.results;
        var contentHTML = "";
        $.each(listaPaises, function (i,pais){
            let id = pais.url;
            let array = id.split("/").at(-2);
            contentHTML += "<tr>";
            contentHTML += "<td>" + (i+1) + "</td>";
            contentHTML += "<td>" + pais.name + "</td>";
            contentHTML += `<td><a class=\"botonDetalle\" href=\"./detalleRegion/detalleRegion.html?id=${array}\">Detalle</a></td>`;
            contentHTML += "</tr>";
        })
        $("#body-paises").html(contentHTML);
    }).fail(function (err){
        console.log(err);
        alert("Ocurrio un error al cargar la pagina");
    })
});