// this worker get data form server about precipitation 1881 - 2006 and write data to DB table 'precipitation'
import { openDB } from 'idb';

let data = [];
let db;

async function init() {
  db = await openDB('weatherDb', 1);
}

init();

self.addEventListener('message', async function (e) {
  let response = await fetch('https://back-weather-service.herokuapp.com/precipitation');
  if (response.ok) {
    data = await response.json();
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
  const tx = db.transaction('precipitation', 'readwrite');
  await Promise.all([
    data.forEach(async element => {
      tx.store.add(element.v, [element.t])
    }),
    tx.done,
  ]);
  if (data.length > 0) {
    self.postMessage(data);
  }
});