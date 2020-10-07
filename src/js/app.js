import { getList } from './data';

const yearSt = document.getElementById('yearStart');
const yearEn = document.getElementById('yearEnd');
const tempBut = document.getElementById('temp');
const precBut = document.getElementById('prec');

let masVal = [];
let showListTemp = true;
// fills selectors from 1881 to 2006
function yearList() {
    for (let index = 1881; index < 2007; index++) {
        const year = document.createElement('option');
        year.innerText = index;
        yearSt.appendChild(year);
    }
    for (let index = 1881; index < 2007; index++) {
        const year = document.createElement('option');
        year.innerText = index;
        yearEn.appendChild(year);
    }
    yearEn.value = 2006;
}

yearList();
// this function helps checkYear for correctness selectors.value
function correctYear(param) {
    if (masVal.length < 2) {
        masVal.push(param.value);
    } else {
        masVal.push(param.value);
    }
}
// this function check for correctness selectors.value and highlights in red if error, if there is no error sends the request
function checkYear(param) {
    param.classList.remove("redBorderSelect");
    if (yearSt.value > yearEn.value) {
        param.value = masVal[0];
        param.classList.add("redBorderSelect");
    } else if (showListTemp) {
        getList(yearSt.value, yearEn.value, "temperature");
    } else {
        getList(yearSt.value, yearEn.value, "precipitation");
    }
    masVal = [];
}

yearSt.addEventListener('click', () => {
    correctYear(yearSt);
});
yearEn.addEventListener('click', () => {
    correctYear(yearEn);
});
yearSt.addEventListener('change', () => {
    checkYear(yearSt);
});
yearEn.addEventListener('change', () => {
    checkYear(yearEn);
});
tempBut.addEventListener('click', () => {
    showListTemp = true;
    getList(yearSt.value, yearEn.value, "temperature");
});
precBut.addEventListener('click', () => {
    showListTemp = false;
    getList(yearSt.value, yearEn.value, "precipitation");
});