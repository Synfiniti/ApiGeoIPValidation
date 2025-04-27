const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,24}$/;
const USERNAME_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,16}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const NUMBER_REGEX = /^[0-9]{6,16}/;

// selectores

const countries = document.querySelector("#countries");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const phoneCode = document.querySelector("#phone-code");
const phoneInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const formBtn = document.querySelector("#form-btn");
const form = document.querySelector("#form");

// validaciones
let usernameValidation = false;
let emailValidation = false;
let phoneValidation = false;
let passwordValidation = false;
let confirmPasswordValidation = false;
let countriesValidacion = false;

[...countries].forEach((option) => {
  option.innerHTML = option.innerHTML.split("(")[0];
});

const validation = (e, validation, element) => {
  const information = e.target.parentElement.children[1];
  formBtn.disabled =
    !usernameValidation ||
    !emailValidation ||
    !phoneValidation ||
    !passwordValidation ||
    !confirmPasswordValidation ||
    !countriesValidacion
      ? true
      : false;
  if (validation) {
    element.classList.add("correct");
    element.classList.remove("incorrect");
    information.classList.remove("show-information");
  } else {
    element.classList.add("incorrect");
    element.classList.remove("correct");
    information.classList.add("show-information");
  }
};

usernameInput.addEventListener("input", (e) => {
  usernameValidation = USERNAME_REGEX.test(e.target.value);
  validation(e, usernameValidation, usernameInput);
});

emailInput.addEventListener("input", (e) => {
  emailValidation = EMAIL_REGEX.test(e.target.value);
  validation(e, emailValidation, emailInput);
});

countries.addEventListener("input", (e) => {
  const optionSelected = [...e.target.children].find(
    (option) => option.selected
  );
  phoneCode.innerHTML = `+${optionSelected.value}`;
  countriesValidacion = optionSelected.value === "" ? "false" : true;
  countries.classList.add("correct");
  phoneCode.classList.add("correct");
  validation(e, null, null);
});

phoneInput.addEventListener("input", (e) => {
  phoneValidation = NUMBER_REGEX.test(e.target.value);
  const information = e.target.parentElement.parentElement.children[1];
  if (phoneValidation) {
    phoneInput.classList.add("correct");
    phoneInput.classList.remove("incorrect");
    information.classList.remove("show-information");
  } else {
    phoneInput.classList.add("incorrect");
    phoneInput.classList.remove("correct");
    information.classList.add("show-information");
  }
});

passwordInput.addEventListener("input", (e) => {
  passwordValidation = PASSWORD_REGEX.test(e.target.value);
  validation(e, passwordValidation, passwordInput);
});

confirmPasswordInput.addEventListener("input", (e) => {
  confirmPasswordValidation = passwordInput.value === e.target.value;
  validation(e, confirmPasswordValidation, confirmPasswordInput);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    username: usernameInput.value,
    email: emailInput.value,
    phone: `${phoneCode.innerHTML} ${phoneInput.value}`,
    password: passwordInput.value,
  };
  console.log(user);
});

const apiKey = "5b077a3425164a819556b56d0e8bdd70";
const apiUrl = "https://api.geoapify.com/v1/ipinfo?&apiKey=";

// Obtener la IP del usuario y su país
const getCountryByIP = async () => {
  try {
    const response = await fetch(`${apiUrl}${apiKey}`);
    const data = await response.json();

    if (data.country) {
      const countryCode = data.country.iso_code; // Código de país (ej: MX, US, etc.)

      // Buscar en el select el país que coincide
      const optionToSelect = [...countries.options].find(
        (option) => option.getAttribute("data-countryCode") === countryCode
      );

      if (optionToSelect) {
        optionToSelect.selected = true;

        // Actualizar el código de país
        phoneCode.innerHTML = `+${optionToSelect.value}`;

        // Marcar como validado
        countriesValidacion = true;
        countries.classList.add("correct");
        phoneCode.classList.add("correct");
      }
    }
  } catch (error) {
    console.error("Error obteniendo país:", error);
  }
};

// Llamar a la función cuando cargue la página
window.addEventListener("DOMContentLoaded", getCountryByIP);
