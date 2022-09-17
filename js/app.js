//Objetos Constructores

function Seguro(marca,year,tipo)
{
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI(){}

//Prototypes

Seguro.prototype.cotizarSeguro = function(){
    
    let cantidad;
    //PRECIO BASE 20K EL AUTO 
    const base = 20000;

    switch (this.marca) {
        case '1':
            cantidad = base*1.15;
            break;
        case '2':
            cantidad = base*1.05;
            break;
        case '3':
            cantidad = base*1.35;
            break;
        default:
            break;
    }
    const hoy = new Date().getFullYear();
    const diferencia = hoy - this.year;

    //MIENTRAS MAS ANTIGUO EL AUTO, SE REDUCIRA 3% EL COSTO

    cantidad -= (diferencia*3*cantidad)/100;

    //SI ES DE TIPO BASICO SE INCREMENTA 1.30 SINO, EN 1.50
    if(this.tipo === 'basico')
    {
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
    return cantidad;
};

UI.prototype.llenarOpciones = ()=>{
    const max = new Date().getFullYear();
    const min = max - 20;
    //seleccionamos el campo selec con ID year
    const select = document.querySelector('#year');

    for(let i = max; i>min; i--)
    {
        //creamos un elemento option
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;

        //agregamos como hijo de select
        select.appendChild(option);
    }
};

UI.prototype.mostrarMensaje = (mensaje,tipo)=>{
    const div = document.createElement('div');

    if(tipo === 'error')
    {
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }
    div.classList.add('mensaje','mt-10');
    div.textContent = mensaje;

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div,document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
};

//Instanciar

const ui = new UI();

//Carge la Pagina
document.addEventListener('DOMContentLoaded',()=>{
   ui.llenarOpciones(); //Llenamos los campos de Años
});

eventListener();



function eventListener(){
    const formulario = document.querySelector('#cotizar-seguro');

    formulario.addEventListener('submit',cotizarSeguro);
}
//FUNCION PARA SELECIONAR ELEMENTOS

function cotizarSeguro(e){
    e.preventDefault();
   
    //Leer Marca
    const marca = document.querySelector('#marca').value;

    //Leer Año
    const year = document.querySelector('#year').value;

    //Leer Tipo de Seguro
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca==='' || year==='' || tipo==='')
    {
        ui.mostrarMensaje('Todos los campos son obligatorios','error');
        return;
    }

    ui.mostrarMensaje('Cotizando...','exito');

    //Instanciamos el Objeto Seguro, le pasamos datos de marca,year y tipo
    const seguro = new Seguro(marca,year,tipo);
    console.log(seguro.cotizarSeguro());
}