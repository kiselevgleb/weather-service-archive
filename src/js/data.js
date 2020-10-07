import { openDB } from 'idb';
import WorkerTemp from './temp.worker';
import WorkerPre from './precipitation.worker';
import WorkerCanvas from './canvas.worker';

let db;
const canvas = document.getElementById('canvas');
// init DB with two table 'temperature' and 'precipitation' and init start data
async function init() {
  db = await openDB('weatherDb', 1, {
    upgrade(db) {
      db.createObjectStore('temperature');
      db.createObjectStore('precipitation');
    },
  });
  await getList([`1881-01-01`], [`2006-12-31`], "temperature");
}

init();
// get list from DB for canvas or get get data form server
export async function getList(start, end, type) {
  const store = db.transaction(type).objectStore(type);
  let allRecords = await store.getAll(IDBKeyRange.bound([`${start}-01-01`], [`${end}-12-31`]));
  if (!allRecords.length > 0) {
    if (type === "temperature") {
      addData(start, end, type, new WorkerTemp());
    }
    else if (type === "precipitation") {
      addData(start, end, type, new WorkerPre());
    }
  }
  allRecords.pop();
  let coefficient = Math.round(allRecords.length / 365);
  let masAverageValues = await getCanvasMas(coefficient, allRecords);
  return masAverageValues;
}
// send data to worker for conversion and draws canvas
async function getCanvasMas(coefficient, allRecords) {
  let data = [];
  let c = canvas.getContext('2d');
  c.fillStyle = "white";
  c.fillRect(0, 0, 393, 393);
  c.fillStyle = "blue";
  let workerCanvas = new WorkerCanvas();
  workerCanvas.addEventListener('message', async (e) => {
    data = await e.data;
    const fasterLength = await data.length;
    for (let i = 0; i < fasterLength; i++) {
      const e = data[i];
      c.fillRect(i * 1.075, 200 - e * 5, 1.075, e * 5);
    }
    workerCanvas.terminate();
  });
  workerCanvas.postMessage({ 'coefficient': coefficient, 'allRecords': allRecords });
  return data;
}
// start worker to write data to DB
async function addData(start, end, type, worker) {
  worker.addEventListener('message', async (e) => {
    if (start != undefined && e.data.length > 0) {
      getList(start, end, type);
    }
    worker.terminate();
  });
  worker.postMessage({});
}