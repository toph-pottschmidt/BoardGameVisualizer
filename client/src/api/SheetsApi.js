const URL = 'https://boardgamevisualizer-backend-t7fq24rbdq-ue.a.run.app'
const rowcount = () => new Promise((resolve, reject) => {
    fetch(`${URL}/rowcount`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET'
    })
    .then(result => result.json())
    .then(resolve)
    .catch(reject);
});

const row = (row) => new Promise((resolve, reject) => {
    fetch(`${URL}/row/${row + 1}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    })
    .then(result => result.json())
    .then(resolve)
    .catch(reject);
});

const rows = () => new Promise((resolve, reject) => {
    fetch(`${URL}/rows`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    })
    .then(result => result.json())
    .then(resolve)
    .catch(reject);
});

export default {
    rowcount,
    row,
    rows
}