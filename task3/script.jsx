const wsUri = "wss://echo-ws-service.herokuapp.com";

const btnSend = document.querySelector('.j-btn-send');
const btnGeo = document.querySelector('.j-btn-geo');

const messages = document.querySelector('.messages');
const input = document.querySelector('.inp');

// Создание объекта и открытие соединения с эхо-сервером для ЧАТА
let websocket = new WebSocket(wsUri);
websocket.onopen = function(evt) {
  console.log("CONNECTED");
};
websocket.onclose = function(evt) {
  console.log("DISCONNECTED");
};
websocket.onmessage = function(evt) {
  writeIncomingMess(evt.data);
  messages.scrollTop = messages.scrollHeight;
};
websocket.onerror = function(evt) {
  console.log('ERROR: ' + evt.data);
};

// Вывод ИСХОДЯЩЕГО сообщения на экран
function writeOutcomingMess(message) {
  let pre = document.createElement("div");
  pre.classList.add("outcoming_message");
  pre.innerHTML = `<div class="outcoming_phrase">${message}</div>`;
  messages.appendChild(pre);
}

// Вывод ВХОДЯЩЕГО сообщения на экран
// Скрытие ответа, если была отправлена гео-позиция
function writeIncomingMess(message) {
  if (message.indexOf('openstreetmap') === -1) {
    let pre = document.createElement("div");
    pre.classList.add("incoming_message");
    pre.innerHTML = `<div class="incoming_phrase">${message}</div>`;
    messages.appendChild(pre);
  }
}

//Обработчик события при нажатии кнопки отправки сообщени
btnSend.addEventListener('click', () => {
  const message = input.value;
  if (message !== ""){
    writeOutcomingMess(message);
    websocket.send(message);
    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  }
});

//-------------------------------------------------------------------------------------------------------------

// Вывод сообщения об ОШИБКЕ гео-позиции
function writeErrorGeo(message) {
  let pre = document.createElement("div");
  pre.classList.add("outcoming_message");
  pre.innerHTML = `<div class="outcoming_phrase error_geo">${message}</div>`;
  messages.appendChild(pre);
  messages.scrollTop = messages.scrollHeight;
}

// Вывод ГЕО-ПОЗИЦИИ
function writeLinkGeo(link) {
  let pre = document.createElement("div");
  pre.classList.add("outcoming_message");
  pre.innerHTML = `<div class="outcoming_phrase link_geo"><a  href='${link}' target='_blank'>Гео-позиция</a></div>`;
  messages.appendChild(pre);
  websocket.send(link);
  messages.scrollTop = messages.scrollHeight;
}

//Поведение при определении гео-позиции
const error = () => {
    let error = "Позиция не может быть определена" 
    writeErrorGeo(error);
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    writeLinkGeo(link)
}

//Обработчик события при нажатии кнопки гео-позиции
btnGeo.addEventListener('click', () => {
  if (!navigator.geolocation) {
    console.log("You can't use geolocation");
    error;
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  };
});