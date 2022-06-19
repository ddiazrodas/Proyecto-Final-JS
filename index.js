const header = document.querySelector(".header");
const sectionOne = document.querySelector(".tituloMainH1");
let formularioContacto = document.getElementById("formulario");
let emailCliente = document.getElementById("emailCliente");
let btnFormularioContacto = document.getElementById("btnPrincipal");
let oficinas;
let inmuebles;
let propiedadInmueble = document.getElementById("propiedades-inmuebles");
let agregarCarrito = document.getElementById("agregarCarrito");
let addressPropiedad1 = document.getElementById("addressPropiedad1");
let precioPropiedad = document.getElementById("precioPropiedad1")


// navbar
const sectionOneOptions = {
  rootMargin: "-200px 0px 0px 0px",
};

const sectionOneObserver = new IntersectionObserver(function (
  entries,
  sectionOneObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);

//boton oficinas, va a ser un modal

const oficinasJson = async () => {
  let response = await fetch("./oficinas.json");
  let data = await response.json();
  oficinas = data;
};

oficinasJson();

const mostrasOficinas = (arreglo) => {
  listaDeOficinas.innerHTML = ``; //vacia la lista de oficinas para que no se duplique

  for (const off of arreglo) {
    const listaDeOficinas = document.getElementById("listaDeOficinas");
    listaDeOficinas.innerHTML += `<li class="listaOficinas"><p><span class="resaltar">Dirección</span>: ${off.direccion} <span class="resaltar"><br>Teléfono</span>: ${off.telefono}</p></li>
  `;
  }
};

// API DE MELI

const obtenerImg = async (id) => {
  let response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  let data = await response.json();
  const producto = data;

  return producto.pictures[0].url;
};

class constructorInmueble {
  constructor(imagen, titulo, direccion, ciudad, precio, id){

    this.imagen = imagen;
    this.titulo = titulo;
    this.direccion = direccion;
    this.ciudad = ciudad;
    this.precio = precio;
    this.id = id;
  }
}

let arrayInmuebles = [];


const mercadoLibreInmuebles = async () => {
  let respuesta = await fetch(
    "https://api.mercadolibre.com/sites/MLA/search?category=MLA1459&limit=8&OPERATION=242075&PROPERTY_TYPE=242062,242060&state=TUxBUENBUGw3M2E1"
  );
  let data2 = await respuesta.json();
  inmuebles = data2.results;

  let num = 1;

  for (const i of inmuebles) {

    // propiedadInmueble.innerHTML += `
    //   <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-12">
    //     <div class="card my-3" style="width: 18rem;min-height: 500px">
    //       <img src="${await obtenerImg(i.id)}" class="card-img-top" alt="..." style="height: 250px">
    //       <div class="card-body">
    //         <h5 id="descripcionPropiedad${num}" class="card-title">${i.title}</h5>
    //         <p id="addressPropiedad${num}" class="card-text">${i.location.address_line} - ${i.location.city.name}</p>
    //         <p id="precioPropiedad${num}" class="card-text">USD ${i.price}</p>
    //         <a id="agregarCarrito${num}" href="#" class="btn btn-primary">Reservar</a>
    //       </div>
    //    </div>
    //   </div>`;

      let nuevoInmueble = new constructorInmueble(obtenerImg(i.id), i.title, i.location.address_line, i.location.city.name, i.price, num);
    num++;
    arrayInmuebles.push(nuevoInmueble);
  }

  mostrarCartas();
};

mercadoLibreInmuebles().then();

const mostrarCartas = async () => {
  
  arrayInmuebles.forEach((inmueble, index) => {

  })

  for (const [index,inmueble] of arrayInmuebles.entries()) {

    propiedadInmueble.innerHTML += `
    <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
      <div class="card my-3 cartasReservas text-center" style="width: 18rem;min-height: 500px">
        <img src="${await inmueble.imagen}" class="card-img-top" alt="..." style="height: 250px">
        <div class="card-body">
          <h5 id="descripcionPropiedad" class="card-title">${inmueble.titulo}</h5>
          <p id="addressPropiedad" class="card-text">${inmueble.direccion} - ${inmueble.ciudad}</p>
          <p id="precioPropiedad" class="card-text">USD ${inmueble.precio}</p>
          <!-- Button trigger modal -->
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${index}">
                RESERVAR
              </button>

              <!-- Modal -->
              <div class="modal fade" id="exampleModal${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Ingrese sus datos para ser contactado por nuestros profesionales</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form id="formReset${index}">
                        <div class="row mb-3">
                          <div class="col">
                            <input id="nombreReserva${index}" type="text" class="form-control" placeholder="Nombre" aria-label="Nombre" required>
                          </div>
                          <div class="col">
                            <input id="apellidoReserva${index}" type="text" class="form-control" placeholder="Apellido" aria-label="Apellido" required>
                          </div>
                        </div>
                        <div class="mb-3">
                          <input id="mailReserva${index}" type="email" class="form-control" id="exampleFormControlInput1" placeholder="nombre@ejemplo.com" required>
                        </div>
                        <div class="mb-3">
                          <input id="phoneReserva${index}" type="tel" class="form-control" placeholder="Teléfono" required>
                          <small>Ingrese un número completo con código de área. Ej: 112345678 (CABA)</small>
                        </div>
                        <div class="mb-3">
                          <textarea id="textoReserva${index}" class="form-control" rows="3" placeholder="Comentarios"></textarea>
                        </div>
                        
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="reset" class="btn btn-primary" onclick="agregarReserva(${index})">Confirmar</button>
                        </div>
                      </form>
                  </div>
                </div>
              </div>
        </div>
     </div>
    </div>`;
}
}


let reservas = [];
let idReserva = 1;

const obtenerReservaLocalStorage = () => {
  if (localStorage.getItem("reservas")) {
    reservas = JSON.parse(localStorage.getItem("reservas"));

    reservas.forEach(() => idReserva++); //aumenta el contador de let idEmpleado
  }
};

obtenerReservaLocalStorage();


const crearReserva = (inmueble, index) => {

  const { direccion, precio } = inmueble;

  let reserva = {
    id: idReserva,
    direccion: direccion,
    precio: precio,
    nombre: document.getElementById("nombreReserva"+ index).value,
    apellido: document.getElementById("apellidoReserva"+ index).value,
    numero: document.getElementById("phoneReserva"+ index).value,
    comments: document.getElementById("textoReserva"+ index).value
  }
  idReserva++;

  reservas.push(reserva);

  document.getElementById("formReset"+ index).reset()
}


guardarReservaLocalStorage = (clave, valor) => {
  localStorage.setItem(clave, valor);
};


const agregarReserva = async (inmueble) => {
  
  crearReserva(arrayInmuebles[inmueble], inmueble);
  guardarReservaLocalStorage("reservas", JSON.stringify(reservas));

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

Toast.fire({
  icon: 'success',
  title: 'Datos enviados con éxito, estaremos en contacto'
})
}

// Formulario de Contacto

let consultas = [];
let idConsulta = 1;

const traerConsultasDeLS = () => {
  if (localStorage.getItem("consultas")) {
    consultas = JSON.parse(localStorage.getItem("consultas")); /*traigo el json que se cargó, 
    para luego por cada objeto que tengo sume +1 a idConsulta*/

    consultas.forEach(() => idConsulta++); //aumenta el contador de let idConsulta
  }
};

traerConsultasDeLS();

const crearNuevaConsulta = () => {
  consultas = JSON.parse(localStorage.getItem("consultas")) || [];

  let consulta = {
    nombre: document.getElementById("nombreCliente").value,
    apellido: document.getElementById("apellidoCliente").value,
    email: document.getElementById("emailCliente").value,
    phone: document.getElementById("phone").value,
    actividad: document.getElementById("actividad").value,
    texto: document.getElementById("textoConsultas").value,
    id: idConsulta,
  };

  idConsulta++;

  consultas.push(consulta);
};

guardarFormularioLocalStorage = (clave, valor) => {
  localStorage.setItem(clave, valor);
};

formularioContacto.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    crearNuevaConsulta();
    guardarFormularioLocalStorage("consultas", JSON.stringify(consultas));

    let { nombre, apellido } = consultas.find(
      (persona) =>
        persona.nombre === nombreCliente.value &&
        persona.apellido === apellidoCliente.value
    );

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Consulta cargada correctamente",
      text: `Muchas gracias: ${nombre} ${apellido}`,
      showConfirmButton: false,
      timer: 2500,
    });
  } catch (e) {
    console.log(e);
  }

  formularioContacto.reset();
});
