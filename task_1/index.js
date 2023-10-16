import { encoded, translations } from './data.js'

let unic = new Map()
let unicArr = []

function decoder(encoded, translations) {
    let exception = new Set(['groupId', 'service', 'formatSize', 'ca'])

    return encoded.map(el => {

        for (let i in el) {
            if ((i.includes("Id") || i.includes("Id")) && !exception.has(i)) {

                if (unic.has(el[i])) {
                    unic.set(el[i], unic.get(el[i]) + 1)
                }
                else {
                    unic.set(el[i], 0)
                }
                el[i] = translations[el[i]]
            }
        }
        return el
    })

}
function getUnic(unic, unicArr) {
    
    for (let entry of unic) {
        if (entry[1] === 1) {
            unicArr.push(entry[0])
        }
    }
    return unicArr
}

console.log(decoder(encoded, translations))

console.log(getUnic(unic, unicArr))
