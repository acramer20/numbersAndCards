// let url = "http://numbersapi.com"

// axios.get(`${url}/7?`).then(n1 => {
//         console.log(`Your lucky number fact is: ${n1}`);
//     });


// 1. 
let favNumber = 7;
let baseURL = "http://numbersapi.com";
axios
    .get(`${baseURL}/${favNumber}?json`)
    .then(n1 => {
        console.log(n1.data.text)
    })

// 2. 
let favNums = [5, 7, 8]
axios
    .get(`${baseURL}/${favNums}?json`)
    .then(n2 => {
        for (let i = 0; i < favNums.length; i ++){
            console.log(n2.data[favNums[i]])
        }
    })  

// 3. 
let finalArr = []
let newArr = [7, 7, 7, 7]
for (let i = 0; i < newArr.length; i++){
    finalArr.push(axios.get(`${baseURL}/${newArr[i]}?json`))
}
Promise.all(finalArr)
    .then(factsArr => {
        factsArr.forEach(p => $("body").append(`<p>${p.data.text}</p>`))
    })
    .catch(err => console.log("Rejected", err));


// Async and Await Keywords

// 1. 
async function numFact(){
    let res = await axios.get(`${baseURL}/${favNumber}?json`)
    console.log(res.data.text)
}
numFact()

// 2. 
async function favNumbers(){
    let res = await axios.get(`${baseURL}/${favNums}?json`)
    for (let i = 0; i < favNums.length; i++){
        console.log(res.data[favNums[i]])
    }
}
favNumbers()

// 3. 
async function fourFacts(){
    let res = await Promise.all([
        axios.get(`${baseURL}/6?json`),
        axios.get(`${baseURL}/6?json`),
        axios.get(`${baseURL}/6?json`),
        axios.get(`${baseURL}/6?json`)
    ])
    for (let i = 0; i < res.length; i++){
        $("body").append(`<p>${res[i].data.text}</p>`)
    }
}
fourFacts()

