var path = document.querySelector('.path');
var foto = document.querySelector('#foto');

foto.addEventListener('change', () => {
    let value = foto.value;

    path.textContent = value;
});