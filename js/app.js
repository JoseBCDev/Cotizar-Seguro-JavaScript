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

    const selecd = document.querySelector('#year');

    for(let i = max; i>min; i--)
    {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;

        selecd.appendChild(option);
    }
};

//Instanciar

const ui = new UI();

//Carge la Pagina
document.addEventListener('DOMContentLoaded',()=>{
   ui.llenarOpciones();
});