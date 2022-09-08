const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
  window.alert(`Размер экрана данного устройства равен ${window.screen.width} на ${window.screen.height} пикселей, что без учета полосы прокрутки составляет ${document.documentElement.clientWidth} на ${document.documentElement.clientHeight} пикселей, а с учётом - это ${window.innerWidth} на ${window.innerHeight}.`);
});