const header = document.querySelector(".header");
const sectionOne = document.querySelector(".tituloMainH1");
let formularioContacto = document.getElementById("formulario");
let emailCliente = document.getElementById("emailCliente");
let btnFormularioContacto = document.getElementById("btnPrincipal");
let oficinas;
let inmuebles;

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

  console.log(producto.pictures[0].url)

  // return producto.pictures[0].url;
}

const mercadoLibreInmuebles = async () => {
  let respuesta = await fetch(
    "https://api.mercadolibre.com/sites/MLA/search?category=MLA1459&limit=12&OPERATION=242075"
  );
  let data2 = await respuesta.json();
  inmuebles = data2.results;

  console.log(inmuebles);

  inmuebles.forEach((i) => {
    let cartas = document.createElement("div");
    cartas.innerHTML = `
    <div class="row">
      <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6">
        <div class="card" style="width: 18rem">
        <img src="${obtenerImg(i.id)}" decoding="async" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${i.title}</h5>
            <p class="card-text">${i.location.addres_line} - ${i.location.city.name}</p>
            <p class="card-text">USD ${i.price}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
       </div>
    </div>
  </div>`;

    document.getElementById("propiedades-inmuebles").append(cartas);
  });
};



// Formulario de Contacto

let consultas = [];
let idConsulta = 1;

const traerConsultasDeLS = () => {
  if (localStorage.getItem("consultas")) {
    consultas = JSON.parse(
      localStorage.getItem("consultas")
    ); /*traigo el json que se cargó, 
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
