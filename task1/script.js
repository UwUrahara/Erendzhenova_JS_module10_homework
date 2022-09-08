const icon_1 = document.querySelector('.btn_icon-1');
const icon_2 = document.querySelector('.btn_icon-2');
const btn = document.querySelector('.j-btn-test')
let f = 0;

btn.addEventListener('click', () => {
  if (!f) {
    icon_1.classList.add('btn--switch-off');
    icon_2.classList.add('btn--switch-on');
    f = 1;
  } else {
    icon_1.classList.toggle('btn--switch-on');
    icon_1.classList.toggle('btn--switch-off');
    icon_2.classList.toggle('btn--switch-on');
    icon_2.classList.toggle('btn--switch-off');
  }
});