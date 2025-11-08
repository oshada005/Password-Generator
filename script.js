const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const passwordDisplay = document.getElementById("password");
const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");

lengthSlider.addEventListener("input", (e) => {
  lengthValue.textContent = e.target.value;
});

function generatePassword() {
  const length = parseInt(lengthSlider.value);
  const uppercase = document.getElementById("uppercase").checked;
  const lowercase = document.getElementById("lowercase").checked;
  const numbers = document.getElementById("numbers").checked;
  const symbols = document.getElementById("symbols").checked;

  let charset = "";
  if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (numbers) charset += "0123456789";
  if (symbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

  if (charset === "") {
    alert("Please select at least one character type!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  passwordDisplay.textContent = password;
  calculateStrength(password, uppercase, lowercase, numbers, symbols);
}

function calculateStrength(
  password,
  hasUpper,
  hasLower,
  hasNumbers,
  hasSymbols
) {
  let strength = 0;
  const length = password.length;

  if (length >= 8) strength += 25;
  if (length >= 12) strength += 25;
  if (hasUpper && hasLower) strength += 15;
  if (hasNumbers) strength += 15;
  if (hasSymbols) strength += 20;

  let label = "";
  let className = "";

  if (strength <= 40) {
    label = "Weak";
    className = "weak";
  } else if (strength <= 70) {
    label = "Medium";
    className = "medium";
  } else {
    label = "Strong";
    className = "strong";
  }

  strengthText.textContent = label;
  strengthBar.className = "strength-bar-fill " + className;
  strengthBar.style.width = strength + "%";
}

function copyPassword() {
  const password = passwordDisplay.textContent;
  if (password === "Click generate to create password") {
    alert("Please generate a password first!");
    return;
  }

  navigator.clipboard.writeText(password).then(() => {
    const copyBtn = document.querySelector(".copy-btn");
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 2000);
  });
}

// Generate a password on load
generatePassword();
