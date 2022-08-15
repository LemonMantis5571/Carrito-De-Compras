const carrito = document.querySelector('#carrito');
const contenedor_carrito = document.querySelector('#lista-carrito tbody');
const vaciar_carritoBTN = document.querySelector('#vaciar-carrito');
const lista_cursos = document.querySelector('#lista-cursos');
let ShoppingCart = [];


EventLoad();

function EventLoad() {
    lista_cursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso);

    vaciar_carritoBTN.addEventListener('click', VaciarCarrito);
}


function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        ReadData(cursoSeleccionado);

    }
}

function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoEliminado = e.target.getAttribute('data-id');
        
        ShoppingCart = ShoppingCart.filter( curso => curso.id !== cursoEliminado);
        ShoppingCartHTML();
    }
}

function VaciarCarrito(e){
    e.preventDefault();
    if(e.target.classList.contains('u-full-width')){
        ShoppingCart = [];
        CleanShoppingCart();
    }
}

function ReadData(curso){
    console.log(curso);

    let info = {
        image: curso.querySelector('img').src,
        title: curso.querySelector('h4').textContent,
        discount: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 0,
        sum: function (){
            this.cantidad = this.cantidad +1;
            return this.cantidad;
        }
    }

    info.sum();

    const Exist = ShoppingCart.some(curso => curso.id === info.id);
    if(Exist){
        const cursos = ShoppingCart.map( curso =>{
            if(curso.id === info.id){
                curso.cantidad++;
                return curso;
            }

            else{
                return curso;
            }
        });

        ShoppingCart = [...cursos];

    }
    else{
        ShoppingCart = [...ShoppingCart, info];
        
    }

    ShoppingCartHTML();
    console.log(ShoppingCart);
}

function ShoppingCartHTML(){

    CleanShoppingCart();

    ShoppingCart.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.image}" width="100">
        </td>
        <td>
            ${curso.title}
        </td>
        <td>
            ${curso.discount}
        </td>
        <td>
            ${curso.cantidad}
        </td>
        <td>
            <a href='#' class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>`;
        
        

        contenedor_carrito.appendChild(row);

    });
}


function CleanShoppingCart(){


    while(contenedor_carrito.firstChild){
        contenedor_carrito.removeChild(contenedor_carrito.firstChild);
    }
}


