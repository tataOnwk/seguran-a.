const chars = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%&*()_-+=<>?"
};

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const passwordField = document.getElementById("password");
const strengthText = document.getElementById("strength");

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

function secureRandom(max) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

function generatePassword() {

    let charset = "";

    if(document.getElementById("upper").checked)
        charset += chars.upper;

    if(document.getElementById("lower").checked)
        charset += chars.lower;

    if(document.getElementById("numbers").checked)
        charset += chars.numbers;

    if(document.getElementById("symbols").checked)
        charset += chars.symbols;

    if(charset.length === 0){
        alert("Selecione pelo menos uma opção.");
        return;
    }

    const length = Number(lengthSlider.value);

    let password = "";

    for(let i = 0; i < length; i++){
        password += charset[
            secureRandom(charset.length)
        ];
    }

    passwordField.value = password;

    calculateStrength(password);
}

function calculateStrength(password){

    let score = 0;

    if(password.length >= 8) score++;
    if(password.length >= 12) score++;
    if(/[A-Z]/.test(password)) score++;
    if(/[a-z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[^A-Za-z0-9]/.test(password)) score++;

    if(score <= 2){
        strengthText.textContent = "Fraca";
        strengthText.style.color = "#ef4444";
    }
    else if(score <= 4){
        strengthText.textContent = "Média";
        strengthText.style.color = "#f59e0b";
    }
    else if(score <= 5){
        strengthText.textContent = "Forte";
        strengthText.style.color = "#22c55e";
    }
    else{
        strengthText.textContent = "Muito Forte";
        strengthText.style.color = "#38bdf8";
    }
}

document
.getElementById("generateBtn")
.addEventListener("click", generatePassword);

document
.getElementById("copyBtn")
.addEventListener("click", () => {

    navigator.clipboard.writeText(
        passwordField.value
    );

    alert("Senha copiada!");
});

generatePassword();
