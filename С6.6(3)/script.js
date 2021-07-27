const wsUri = "wss://echo.websocket.org/";

const output = document.getElementById("output");
const input = document.querySelector('.input');
const btnGeoloc = document.querySelector('.j-btn-geoloc');
const btnSend = document.querySelector('.j-btn-send');

let websocket = new WebSocket(wsUri);

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue; padding: 5px 10px; border-width: 3px; border-color: blue; ' +
        'border-radius: 5px; background-color: white;">'+evt.data + '</span>'
    );
};

websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red; padding: 5px 10px; border-width: 3px; border-color: red; ' +
        'border-radius: 5px; background-color: white;">ERROR:</span> ' + evt.data
    );
};

btnSend.addEventListener('click', () => {
  const message = input.value;
  writeToScreen(`<p style="text-align: right; padding: 5px 10px; margin:0px; border-width: 3px; border-color: #315efb; 
    border-radius: 5px; background-color: white;">${message}</p>`);
  websocket.send(message);
  input.value = '';
});

// Функция, выводящая текст об ошибке
const error = () => {
  writeToScreen('Невозможно получить ваше местоположение');
};

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  writeToScreen(`
    <a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank" style="padding: 5px 10px; border-width: 3px; border-color: #315efb; 
       border-radius: 5px; background-color: white;">
        Open your geolocation
    </a>`);
  // writeLinkToScreen(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
};

btnGeoloc.addEventListener('click', () => {
  if (!navigator.geolocation) {
    writeToScreen('Geolocation не поддерживается вашим браузером');
  } else {
    writeToScreen('<p style="text-align: right; padding: 5px 10px; border-width: 3px; border-color: #315efb; ' +
        'border-radius: 5px; background-color: white;">Geolocation</p>');
    navigator.geolocation.getCurrentPosition(success, error);
  }
});