# Proyecto-Final-JS

AppraisalPro es el comienzo de una app para personas interesadas en compra, alquiler, y venta de su inmueble; 

y para los profesionales, mas adelante, que puedan realizar una tazacion del inmueble con esta app.

La sección de compra de los inmuebles, los datos los obtuve de la API rest de Mercado Libre, haciendo uso de sus filtros:

https://api.mercadolibre.com/sites/MLA/search?category=MLA1459&limit=8&OPERATION=242075&PROPERTY_TYPE=242062,242060&state=TUxBUENBUGw3M2E1

category=MLA1459 (Inmuebles)

limit=8 (Solo ocho inmuebles)

OPERATION=242075 (Venta de inmuebles)

PROPERTY_TYPE=242062,242060 (Departamentos y casas)

state=TUxBUENBUGw3M2E1 (Ubicados Ciudad Autónoma de Buenos Aires)

Utilizando funciones asincrónicas, y fetch. La información la igualé a un array de objetos que tuve que crear, 
para realizar la pegada recorriendo el array y así sea más rápida y efectiva, le agregué un ID a cada uno. 
A cada botón de las cartas para reservar la propiedad les agregué la funcionalidad de un modal de Bootstrap, 
donde se puedan capturar los datos que ingresa el cliente, se guardan en local storage (el ID, dirección, precio, 
nombre y apellido del cliente, número telefónico, y descripción del inmueble), y devuelve un “sweet alert” que confirma el guardado.

Luego en un .json cargué información sobre las oficinas (localización y teléfono de contacto) utilizando funciones asincrónicas, y fetch, 
y el cliente puede acceder con un click en el botón “Ver aquí”, que también es un modal de Bootstrap.

Finalmente en el formulario de contacto, capturo los inputs y los guardo en un array para luego guardar la información 
(nombre y apellido, email, telefono, actividad, texto, y le asigno un ID a cada una de las consultas) en el local storage, y devuelve un sweet alert de confirmación.

