{/*TODO Для кеширования*/}
let filterArr = new Array(0)

import uniqArray from "@/utils/uniqArray";

{/*TODO Разобраться почему Это работает*/}
export function setCache (name, data) {

    const arrLocalStore = JSON.parse(localStorage.getItem(name)) || []

    if(!arrLocalStore.length) {
        console.log('setCache', 1);
        localStorage.setItem(name, JSON.stringify(data))
    } else {
        console.log('setCache', 2);

        let newArr = arrLocalStore.concat(data)
        localStorage.setItem(name, JSON.stringify(newArr))
    }
}

export function getCache ({ name, id }) {
    let arrLocalStore = JSON.parse(localStorage.getItem(name))
    filterArr.push(arrLocalStore.find(el => el.id === id))

    return filterArr
}

export function hasCache (name, payload) {
    const arrLS = JSON.parse(localStorage.getItem(name))

    return arrLS && arrLS.find(el => {
        return el.id === payload.id
    })
}



