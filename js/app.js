//Objetos Constructores

function Seguro(marca,year,tipo)
{
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI(){}

//Prototypes

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
}