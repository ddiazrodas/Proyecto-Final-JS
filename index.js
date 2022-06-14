const header = document.querySelector(".header");
const sectionOne = document.querySelector(".tituloMainH1");
let formularioContacto = document.getElementById("formulario");
let nombreCliente = document.getElementById("nombreCliente");
let apellidoCliente = document.getElementById("apellidoCliente");
let emailCliente = document.getElementById("emailCliente");
let phone = document.getElementById("phone");
let actividad = document.getElementById("actividad");
let btnFormularioContacto = document.getElementById("btnPrincipal");
let oficinas;

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

  listaDeOficinas.innerHTML=`` //vacia la lista de oficinas para que no se duplique 

  for (const off of arreglo) {
    const listaDeOficinas = document.getElementById("listaDeOficinas");
    listaDeOficinas.innerHTML += `<li class="listaOficinas" >Dirección: ${off.direccion} Telefono: ${off.telefono}</li>
  `;
  }
};

// for (let off = 0; off < oficinas.length; off++) {
//   const listaDeOficinas = document.getElementById("listaDeOficinas");
//   listaDeOficinas.innerHTML = `<li>Dirección: ${oficinas.direccion} Telefono: ${oficinas.telefono}</li>

// `;
// }

// Formulario de Contacto
//quisiera que el cliente cargue su consulta, que seria la ultima ingresada, a traves de un boton

let consultas = [];
let idConsulta = 1;

const crearNuevaConsulta = () => {
  consultas = JSON.parse(localStorage.getItem("lista de consultas")) || [];

  let consulta = {
    nombre: nombreCliente.value,
    apellido: apellidoCliente.value,
    email: emailCliente.value,
    phone: phone.value,
    actividad: actividad.value,
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
    guardarFormularioLocalStorage(
      "lista de consultas",
      JSON.stringify(consultas)
    );

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
      timer: 2000,
    });
  } catch (e) {
    console.log(e);
  }

  formularioContacto.reset();
});
