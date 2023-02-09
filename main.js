// Clases

class Vuelo {
  constructor(numeroDeVuelo, destino, precioAsiento) {
    this.numeroDeVuelo = numeroDeVuelo;
    this.destino = destino;
    this.precioAsiento = precioAsiento;

    this.generarAsientos();
  }

  generarAsientos() {
    this.asientos = [];

    for (let i = 0; i < 30; i++) {
      const asiento = new Asiento(i, false);
      this.asientos.push(asiento);
    }
  }
}

class Asiento {
  constructor(id, ocupado) {
    this.id = id;
    this.ocupado = ocupado;
  }
}

// Funciones

function obtenerVuelo(numeroDeVuelo) {
  return listaDeVuelos.find((vuelo) => {
    return vuelo.numeroDeVuelo === numeroDeVuelo;
  });
}

function hayAsientosDisponibles(vuelo, cantidadDeAsientos) {
  const asientosDisponibles = vuelo.asientos.filter((asiento) => {
    return !asiento.ocupado;
  });

  return asientosDisponibles.length >= cantidadDeAsientos;
}

function calcularTotalVuelo(vuelo, cantidadDeAsientos) {
  return cantidadDeAsientos * vuelo.precioAsiento;
}

function ocuparAsientos(vuelo, cantidadDeAsientos) {
  const asientos = vuelo.asientos;

  for (const asiento of asientos) {
    if (!asiento.ocupado) {
      asiento.ocupado = true;
      cantidadDeAsientos--;
    }

    if (cantidadDeAsientos === 0) {
      break;
    }
  }

  vuelo.asientos = asientos;
}

// Inicio el programa

const listaDeVuelos = [
  new Vuelo("AB1234", "Londres", 50),
  new Vuelo("CD5678", "Barcelona", 30),
  new Vuelo("EF9123", "Bogotá", 90),
];

let vueloAComprar = prompt(
  "Ingrese el número de vuelo que quiere comprar. Ingrese SALIR si quiere salir del programa"
);

while (vueloAComprar !== "SALIR") {
  // Validar que el vuelo existe
  const vuelo = obtenerVuelo(vueloAComprar);

  // Si el vuelo existe
  if (vuelo !== undefined) {
    // Le solicito al usuario la cantidad de asientos
    let cantidadDeAsientos = parseInt(
      prompt("Ingrese la cantidad de asientos que quiere comprar")
    );

    // Controlo que el usuario ingrese una cantidad de asientos mayor o igual a 0 y que haya asientos disponibles
    while (
      cantidadDeAsientos <= 0 ||
      !hayAsientosDisponibles(vuelo, cantidadDeAsientos)
    ) {
      cantidadDeAsientos = parseInt(
        prompt("Ingrese la cantidad de asientos que quiere comprar")
      );
    }

    // Calcular total
    const total = calcularTotalVuelo(vuelo, cantidadDeAsientos);

    alert(
      `El total a pagar por el vuelo ${vuelo.numeroDeVuelo} con destino ${vuelo.destino} es de: $${total}`
    );

    ocuparAsientos(vuelo, cantidadDeAsientos);
  } else {
    alert("Número de vuelo inválido");
  }

  // Le volvemos a pedir que ingrese un número de vuelo
  vueloAComprar = prompt(
    "Ingrese el número de vuelo que quiere comprar. Ingrese SALIR si quiere salir del programa"
  );
}
