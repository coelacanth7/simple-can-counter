// start
if (document.readyState != 'loading'){
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
}

const GENERIC_ERR = 'oops something is wrong, call ur ex bf to fix it lol '

function init() {
    // call to get data
    getcounters();
}

function write(id, text) {
    var el = document.querySelector('#' + id);
    if (el) {
        el.innerHTML = text;
    } else {
        handleError(GENERIC_ERR);
    }
}

function handleError(type) {
    var errEl = document.querySelector('#err');
    errEl.innerHTML += type;
}

function getcounters() {
    axios.get('https://api.npoint.io/eb5945af43ae76c1cef3')
        .then(response => {
            const counters = response.data.counters;
            console.log(`GET list counters`, counters);
            writeCounters(counters);
        })
        .catch(error => {
            console.error(error);
            handleError(GENERIC_ERR);
            handleError(error);
        });
}

// takes an obj and writes html
function writeCounters(counters) {
    if (!counters) return;
    var keys = Object.keys(counters);
    keys.forEach(el => {
        write(el, counters[el]);
    });
    deleteSpinners();
}

function deleteSpinners(params) {
    var spinnerNodeList = document.querySelectorAll('.spinner');
    spinnerNodeList.forEach(el => el.remove());
}