const form = document.getElementById("form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const age = document.getElementById("age");
const adress = document.getElementById("adress");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}
// Show success outline
function showSuccess(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkAge(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be atleast ${min} numbers`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} numbers`);
  } else {
    showSuccess(input);
  }
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check password match
function checkPassordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listiners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([fname, lname, age, adress, email, password, password2]);
  checkLength(fname, 2, 15);
  checkLength(lname, 2, 15);
  checkAge(age, 2, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPassordsMatch(password, password2);

  // Register to API
  fetch("http://localhost:5000/api/register", {
    method: "post",
    body: JSON.stringify({
      name: fname.value,
      lastname: lname.value,
      age: age.value,
      email: email.value,
      password: password.value,
      adress: adress.value,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.message.msgError === false) {
        alert("Succesfully Registered, Check your Email");
      } else {
        alert("Something went wrong, Try again...");
      }
    });
});
