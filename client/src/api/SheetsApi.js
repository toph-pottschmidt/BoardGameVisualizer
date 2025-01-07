// const URL = 'https://boardgamevisualizer-backend-t7fq24rbdq-ue.a.run.app'
import Papa from "papaparse"
import data from "../data"

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

// NOTE: disabling old API for hard-coded post-event data
// export default {
//     rowcount,
//     row,
//     rows
// }

// callback-based systems require Promise api unfortunately...
const getData = () => new Promise((res, rej) => {
        Papa.parse(data, {
            complete: res,
            error: rej,
        })
    })

// emulating the really sad backend-API I made two years ago for post-event displaying/running...
// hurts to write this in the year 2025
export default {
    rowcount: async () => {
        const data = await getData()
        const [headers, ...values] = data.data
        console.log("hey", values.length)
        return { count: values.length }
    },
    row: async (index) => {
        const data = await getData()
        const [headers, ...values] = data.data
        console.log(values[index])
        return values[index]
    },
    rows: async () => {
        const data = await getData()
        const [headers, ...values] = data.data
        console.log({ headers, values })
        return { headers, values }
    }
}