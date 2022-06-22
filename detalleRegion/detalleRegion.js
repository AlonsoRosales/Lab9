
$(document).ready(function () {
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idRegion = urlParams.get('region');
    let urlLocacion = "https://pokeapi.co/api/v2/region/" + idRegion;
    var listaLocalidades;
    var numpage;
    function llenarLocaciones() {
        $.ajax({
            method: "GET",
            url: urlLocacion,
        }).done(function (data) {
            listaLocalidades = data.locations;
            let tblDinamic = "";
            //para el calculo del numero de páginas
            let numPerPage = 10;
            if(listaLocalidades.length%numPerPage==0){
                //quiere decir que no hay residuo
                numpage=listaLocalidades.length/numPerPage;
            }else{
                numpage=~~(listaLocalidades.length/numPerPage)+1;
            }
            for (let i = 0; i < numPerPage; i++) {
                tblDinamic += "<tr>";
                tblDinamic += "   <td>" + (i + 1) + "</td>";
                tblDinamic += "   <td>" + listaLocalidades[i].name + "</td>";
                let id  = listaLocalidades[i].url.split("/").at(-2);
                let redireccionLink = "./detalleLocacion/detalleLocacion?id="+id;
                tblDinamic += "   <td>" +"<a type=\"button\" class=\"btn btn-primary\" href="+redireccionLink+" > Detalle </a>"+ "</td>";
                tblDinamic += "</tr>";
            }
            //console.log(tblDinamic);
            $("tbody").html(tblDinamic);
            let paginator = "";
            paginator = "<li class=\"page-item active\"><a value=\"1\" class=\"page-link\">1</a></li>"
            for(let j=1; j < numpage;j++){
                paginator += "<li class=\"page-item\" aria-current=\"page\"><span value="+j+1+" class=\"page-link\">+"+j+1+"+</span></li>";
            }
            $("li").html(paginator);
        }).fail(function (e) {
            console.log(e);
        });
    }

});
