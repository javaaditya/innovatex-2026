const form = document.getElementById("registration-form");

function showError(inputEl, message) {
  const formGroup = inputEl.closest(".form-group");
  let errorEl = formGroup.querySelector(".error-message");
  if (!errorEl) {
    errorEl = document.createElement("span");
    errorEl.className = "error-message";
    formGroup.appendChild(errorEl);
  }
  errorEl.textContent = message;
  inputEl.classList.add("input-error");
}

function clearError(inputEl) {
  const formGroup = inputEl.closest(".form-group");
  const errorEl = formGroup.querySelector(".error-message");
  if (errorEl) {
    errorEl.textContent = "";
  }
  inputEl.classList.remove("input-error");
}

function validateForm() {
  let isValid = true;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const collegeInput = document.getElementById("college");
  const phoneInput = document.getElementById("phone");
  const eventCheckboxes = document.querySelectorAll('input[name="events"]:checked');

  // Name check
  if (nameInput.value.trim() === "") {
    showError(nameInput, "Name is required.");
    isValid = false;
  } else {
    clearError(nameInput);
  }

  // Email check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === "") {
    showError(emailInput, "Email is required.");
    isValid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    showError(emailInput, "Enter a valid email address.");
    isValid = false;
  } else {
    clearError(emailInput);
  }

  // College check
  if (collegeInput.value.trim() === "") {
    showError(collegeInput, "College/Organization is required.");
    isValid = false;
  } else {
    clearError(collegeInput);
  }

  // Phone check
  const phonePattern = /^[0-9]{10}$/;
  if (phoneInput.value.trim() === "") {
    showError(phoneInput, "Mobile number is required.");
    isValid = false;
  } else if (!phonePattern.test(phoneInput.value.trim())) {
    showError(phoneInput, "Enter a valid 10-digit mobile number.");
    isValid = false;
  } else {
    clearError(phoneInput);
  }

  // At least one event selected
  const eventsGroup = document.querySelector('input[name="events"]').closest(".form-group");
  let eventsError = eventsGroup.querySelector(".error-message");
  if (eventCheckboxes.length === 0) {
    if (!eventsError) {
      eventsError = document.createElement("span");
      eventsError.className = "error-message";
      eventsGroup.appendChild(eventsError);
    }
    eventsError.textContent = "Select at least one event.";
    isValid = false;
  } else if (eventsError) {
    eventsError.textContent = "";
  }

  return isValid;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isValid = validateForm();

  if (isValid) {
    form.innerHTML = '<p class="success-message">Registration successful! We\'ll see you at InnovateX 2026.</p>';
  }
});