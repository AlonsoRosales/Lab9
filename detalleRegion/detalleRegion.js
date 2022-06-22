$(document).ready(function () {
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idRegion = urlParams.get('id');
    const nombrePais = urlParams.get('nombre');
    var urlLocacion = "https://pokeapi.co/api/v2/region/" + idRegion;
    var listaLocalidades;
    var numpage;
    var numPerpage = 10;
    var numberId;
    $.ajax({
        method: "GET",
        url: urlLocacion,
    }).done(function (data) {
        var listaLocalidades = data.locations;
        let tblDinamic = "";
        //para el calculo del numero de páginas
        var numPerPage = 10;
        $("#labelRegion").text("Resumen de la region " + nombrePais);
        if (listaLocalidades.length % numPerPage == 0) {
            //quiere decir que no hay residuo
            numpage = listaLocalidades.length / numPerPage;
        } else {
            numpage = ~~(listaLocalidades.length / numPerPage) + 1;
        }
        for (let i = 0; i < numPerPage; i++) {
            tblDinamic += "<tr>";
            tblDinamic += "   <td>" + (i + 1) + "</td>";
            tblDinamic += "   <td>" + listaLocalidades[i].name + "</td>";
            let id = listaLocalidades[i].url.split("/").at(-2);
            let redireccionLink = "../detalleLocacion/detalleLocacion.html?locacion=" + id;
            tblDinamic += "   <td>" + "<a type=\"button\" class=\"btn btn-primary\" href=" + redireccionLink + " > Detalle </a>" + "</td>";
            tblDinamic += "</tr>";
        }
        //console.log(tblDinamic);
        $("#tablaLocaciones").html(tblDinamic);
        let paginator = "";
        paginator = "<li class=\"page-item\"><span class=\"page-link\" value=\"1\">Previous</span></li>";
        //paginator += "<li class=\"page-item\" aria-current=\"page\"><a value=\"1\" class=\"page-link\">1</a></li>";
        for (let j = 0; j < numpage; j++) {
            if((j+1) == 1){
                paginator += "<li class='page-item' aria-current='page'><span value=" + (j + 1) + " class='page-link' style='background-color: #0d6efd; color:#fff'>" + (j + 1) + "</span></li>";
            }else{
                paginator += "<li class='page-item' aria-current='page'><span value=" + (j + 1) + " class='page-link'>" + (j + 1) + "</span></li>";
            }
            //paginator += "<li class='page-item' aria-current='page'><span value=" + (j + 1) + " class='page-link'>" + (j + 1) + "</span></li>";
        }
        paginator += "<li class=\"page-item\"><span class=\"page-link\" value=" + numpage + " >Next</span></li>";
        $("#paginador").html(paginator);


        //$('.page-link').click(function () {
          $("nav").on("click",".page-link",function(){
                var id = $(this).html();//obtengo el id
                // actualizo los nuevos limites
                try {
                    console.log("El valor numerico es" + id);

                    ////////////////////////////////////////////////--
                    let paginator = "";
                    paginator = "<li class=\"page-item\"><span class=\"page-link\" value=\"1\">Previous</span></li>";
                    for (let j = 0; j < numpage; j++) {
                        if((j+1) == id){
                            paginator += "<li class='page-item' aria-current='page'><span ' value=" + (j + 1) + " class='page-link' style='background-color: #0d6efd;color:#fff'>" + (j + 1) + "</span></li>";
                        }
                        else{
                            paginator += "<li class='page-item' aria-current='page'><span value=" + (j + 1) + " class='page-link'>" + (j + 1) + "</span></li>";
                        }
                    }
                    paginator += "<li class=\"page-item\"><span class=\"page-link\" value=" + numpage + " >Next</span></li>";
                    $("#paginador").html(paginator);

                    ////////////////////////////////////////---
                    if (!isNaN(id)) {
                        numberId = id;
                        let min = (numberId - 1) * numPerpage;
                        let max = min + numPerpage - 1;
                        let tblAct = "";
                        if (numberId != numpage) {
                            numberId = parseInt(id);
                            for (let i = min; i <= max; i++) {
                                tblAct += "<tr>";
                                tblAct += "   <td>" + (i + 1) + "</td>";
                                tblAct += "   <td>" + listaLocalidades[i].name + "</td>";
                                let id = listaLocalidades[i].url.split("/").at(-2);
                                let redireccionLink = "../detalleLocacion/detalleLocacion.html?locacion=" + id;
                                tblAct += "   <td>" + "<a type=\"button\" class=\"btn btn-primary\" href=" + redireccionLink + " > Detalle </a>" + "</td>";
                                tblAct += "</tr>";
                            }
                        } else {
                            for (let i = min; i < listaLocalidades.length; i++) {
                                tblAct += "<tr>";
                                tblAct += "   <td>" + (i + 1) + "</td>";
                                tblAct += "   <td>" + listaLocalidades[i].name + "</td>";
                                let id = listaLocalidades[i].url.split("/").at(-2);
                                let redireccionLink = "../detalleLocacion/detalleLocacion.html?locacion=" + id;
                                tblAct += "   <td>" + "<a type=\"button\" class=\"btn btn-primary\" href=" + redireccionLink + " > Detalle </a>" + "</td>";
                                tblAct += "</tr>";
                            }
                        }
                        $("#tablaLocaciones").html(tblAct);
                    } else {
                        if (numberId==undefined||numberId==0||numberId>numpage){
                            //No hagas nada no debe mostrar nada me encuentro en los extremos y no he pasado antes por algun enlace de
                            //dependiendo sea el caso
                            if(numberId>numpage){
                                //me quedo en el maximo
                                numberId=numpage;
                            }
                            if(numberId==0){
                                //me quedo en el minimo
                                numberId=1;
                            }
                        } else{
                            if (id.localeCompare("Previous")) {
                                //debo setear el valor anterior
                                numberId = numberId+1;
                            } else if (id.localeCompare("Next")) {
                                //debo aumentar el valor anterior
                                numberId = numberId-1;
                            }
                            //repito el mismo proceso que arriba
                            let min = (numberId - 1) * numPerpage;
                            let max = min + numPerpage - 1;
                            let tblAct = ""
                            if (numberId != numpage) {
                                for (let i = min; i <= max; i++) {
                                    tblAct += "<tr>";
                                    tblAct += "   <td>" + (i + 1) + "</td>";
                                    tblAct += "   <td>" + listaLocalidades[i].name + "</td>";
                                    let id = listaLocalidades[i].url.split("/").at(-2);
                                    let redireccionLink = "../detalleLocacion/detalleLocacion.html?locacion=" + id;
                                    tblAct += "   <td>" + "<a type=\"button\" class=\"btn btn-primary\" href=" + redireccionLink + " > Detalle </a>" + "</td>";
                                    tblAct += "</tr>";
                                }
                            } else {
                                for (let i = min; i < listaLocalidades.length; i++) {
                                    tblAct += "<tr>";
                                    tblAct += "   <td>" + (i + 1) + "</td>";
                                    tblAct += "   <td>" + listaLocalidades[i].name + "</td>";
                                    let id = listaLocalidades[i].url.split("/").at(-2);
                                    let redireccionLink = "../detalleLocacion/detalleLocacion.html?locacion=" + id;
                                    tblAct += "   <td>" + "<a type=\"button\" class=\"btn btn-primary\" href=" + redireccionLink + " > Detalle </a>" + "</td>";
                                    tblAct += "</tr>";
                                }
                            }
                            $("#tablaLocaciones").html(tblAct);
                        }
                    }
                } catch (error) {
                    console.log("Alguien esta haciendo bromas");
                }
            }
        )

    }).fail(function (e) {
        console.log(e);
    });
});
