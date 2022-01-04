//Array carrito
let carrito=[];

let butBuscar=$("#buscarPro");
butBuscar.on("click",buscarProducto);

const urlGet ="productos.json";

cargarPrincipal();

function cargarPrincipal(){

    $.getJSON(urlGet, function (respuesta, estado) {
        if(estado=="success"){
            let misDatos= respuesta;
            for(const dato of misDatos){

                $('#grilla1').append(`<div class="prod-card">
                <img src="${dato.imagen}">
                <h4> Código: ${dato.codigo}</h4>
                <p> Producto: ${dato.nombre}</p>
                <p> s/ ${dato.pLista}</p>
                <button  id="btn${dato.codigo}">Agregar</button>
                </div>`);

                let butagre=$(`#btn${dato.codigo}`);
                     
                butagre.on('click',function(){
                    alert(`Compraste ${dato.nombre}`);
                    let d= dato.codigo;
                    agregarCarrito(d);
                      
                }
                ); 
            }
        }
    })
}

//Agrega productos al Carrito de compras
function agregarCarrito(d) {

    $.getJSON(urlGet, function (respuesta, estado) {
        if(estado=="success"){

            const encontrado= respuesta.find(producto => producto.codigo===d);
            carrito.push(encontrado);
            
            //${encontrado.codigo}
            $('body').append(`<div id="div1${encontrado.codigo}" class="todo-wrapper">
            <img src="${encontrado.imagen}">
            <h4> Código: ${encontrado.codigo}</h4>
            <p> Producto: ${encontrado.nombre}</p>
            <p id="paf1${encontrado.codigo}"> s/ ${encontrado.pLista}</p>
            <label for="cantidadPro">Cant</label>
            <input type="number" id="cantidadPro${encontrado.codigo}" min="1" value="1" >
            <p id="paf2${encontrado.codigo}"> Total: ${encontrado.pLista}</p>
            <button  id="btnE${encontrado.codigo}">Eliminar</button>
            <button  id="btnA${encontrado.codigo}">Actualizar</button>
            </div>`);

            let butelim=$(`#btnE${encontrado.codigo}`);
            let butAct=$(`#btnA${encontrado.codigo}`);

            butAct.on('click',function(){
                alert(`Se actualizó ${encontrado.nombre}`);
                let cantPro = $(`#cantidadPro${encontrado.codigo}`).val();
                let jPrePro= encontrado.pLista;

                const preXcant=calcularTotalxProducto(cantPro,jPrePro);
                $('.todo-wrapper').append(`
                <p id="paf3"> Total: ${preXcant.toFixed(2)}</p> 
                `);  
                const totSigv=TotalsinIGV(preXcant);
                $('.todo-wrapper').append(`
                <p id="paf3"> Total sin IGV: ${totSigv.toFixed(2)}</p> 
                `); 
                
            }
            ); 
                     
            butelim.on('click',function(){
                alert(`Se eliminó ${encontrado.nombre}`);
                let f= encontrado;
                eleminarProducto(f);
                let divelim=$(`#div1${encontrado.codigo}`);
                divelim.remove();
                     
            }
            ); 

        }
        
    })    
}

function calcularTotalxProducto(a,b) {
    return a*b;
      
}

//IGV(Impuesto General a las Ventas) es el impuesto que cobra el Estado peruano por ventas realizadas
const igv=0.18;

function TotalsinIGV(c) {

    return c/1.18;    
}

function calcularTotalPedido(preSinIGV,igvPedido) {
    let totPedido=0.00;
    totPedido=preSinIGV+igvPedido;
    return totPedido;
    
}

function calcularIGVPedido(preSinIGV,preXcant) {
    
    let igvPedido=0.00;
    igvPedido=preXcant-preSinIGV;

    return igvPedido;
    
}



//Elimina un producto del Carrito de compras
function eleminarProducto(f) {

    console.log(f);
    const encXelim= f;

    const indice= carrito.indexOf(encXelim);
    console.log(indice);
    carrito.splice(indice,1);

}

//Busca producto según el códio ingresado
function buscarProducto() {

    $.getJSON(urlGet, function (respuesta, estado) {
        if(estado=="success"){
            let misDatos= respuesta;

            for(const dato of misDatos){

                let entrada = $("#textbox1").val();

                if(entrada==dato.codigo){

                    $('body').append(`<div class="todo-wrapper">
                    <h4> Código: ${dato.codigo}</h4>
                    <p> Producto: ${dato.nombre}</p>
                    <p> s/ ${dato.pLista}</p>
                    <img src="${dato.imagen}">
                    </div>`);
                }
            }
    
        }
        
    })   
}

/*
function verTazas() {

    $.getJSON(urlGet, function (respuesta, estado) {
        if(estado=="success"){
            let misDatos= respuesta;
            for(const dato of misDatos){

                if(dato.categoria=="Tazas"){

                $('#grilla1').append(`<div class="prod-card">
                <img src="${dato.imagen}">
                <h4> Código: ${dato.codigo}</h4>
                <p> Producto: ${dato.nombre}</p>
                <p> s/ ${dato.pLista}</p>
                <button  id="btn${dato.codigo}">Agregar</button>
                </div>`);

                let butagre=$(`#btn${dato.codigo}`);
                     
                butagre.on('click',function(){
                    alert(`Compraste ${dato.nombre}`);
                    let d= dato.codigo;
                    agregarCarrito(d);
                      
                }
                ); 
                
                }
            }
        }
    })
    
}
*/

//EFECTOS
const noGrid = () => {
    const grilla = document.querySelector('#grilla1');
    const menu2 = document.querySelector('.menu2');
    //alert("click1");

    menu2.addEventListener('click', () => {
        
        grilla.classList.toggle('no-grilla');
        //verTazas();
    });
    
}

const sidebarColor = () => {
    const sidebar = document.querySelector('.sidebar');
    const menu3 = document.querySelector('.menu3');

    menu3.addEventListener('mouseover', () => {
        sidebar.classList.toggle('sidebar-color')
    });
}

const sidebarText = () => {
    const text = document.querySelector('.no-texto');
    const menu4 = document.querySelector('.menu4');

    menu4.addEventListener('click', () => {
        text.classList.toggle('texto');
    });
}


const menuBurger = () => {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');

    burger.addEventListener('click', () => {
        menu.classList.toggle('menu-active')
    });
}
const app = () => {
    menuBurger();
    noGrid();
    sidebarColor();
    sidebarText();
}

app();

