$(document).ready(function () {
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idLocacion = urlParams.get('locacion');
    const idRegion = urlParams.get('region');
    let urlLocacion = "https://pokeapi.co/api/v2/region/" + idRegion;

    function llenarLocaciones() {
        $.ajax({
            method: "GET",
            url: urlLocacion,
        }).done(function (data) {
            let listaLocalidades = data.locations;
            let tblDinamic = "";
            for (let i = 0; i < listaLocalidades.length; i++) {
                tblDinamic += "<tr>";
                tblDinamic += "   <td>" + (i + 1) + "</td>";
                tblDinamic += "   <td>" + listaLocalidades[i].name + "</td>";
                tblDinamic += "   <td>" +"<button type=\"button\" class=\"btn btn-primary\" onclick='' href="+listaLocalidades[i].url+" > Detalle </button>"+ "</td>";
                tblDinamic += "</tr>";
            }
            console.log(tblDinamic);
            $("tbody").html(tblDinamic);
        }).fail(function (e) {
            console.log(e);
        });
    }
});