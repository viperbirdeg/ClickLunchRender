// Función para validar si un valor es un número
export function esNumero(valor) {
  return typeof valor === "number" && !isNaN(valor);
}

// Función para validar si un valor es un correo electrónico
export function esCorreoElectronico(valor) {
  const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expresionRegularCorreo.test(valor);
}

// Función para validar una contraseña con un límite de caracteres especiales
export function esContrasenaValida(contrasena) {
  // Establecer el límite de caracteres especiales
  const limiteCaracteresEspeciales = 2;

  // Contar el número de caracteres especiales en la contraseña
  const caracteresEspeciales = contrasena.replace(/[a-zA-Z0-9]/g, "").length;

  return caracteresEspeciales <= limiteCaracteresEspeciales;
}

// Función para validar si un valor contiene solo letras
export function soloLetras(valor) {
  const expresionRegularLetras = /^[a-zA-Z]+$/;
  return expresionRegularLetras.test(valor);
}

export const soloNumeros = (e) => {
  e.preventDefault();
  let value = e.target.value;
  e.target.value = value.replace(/[^0-9]/g, "");
};

export const soloLetrasNormales = (e) => {
  e.preventDefault();
  let value = e.target.value;
  e.target.value = value.replace(/[^a-zA-Z\s]/g, "");
};

export const desactivar = (e) => {
  e.preventDefault();
  e.disabled = true;
};

export const activar = (e) => {
  e.preventDefault();
  e.disabled = false;
};
