"use strict"

const apiKey = "dAB6IZ7RwT4_o1ykw6DUfS3b1vCmaIH4ilpdBjcUQQA";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

console.log(apiKey);
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.log(`Error: ${err}`);
    }
}
getPhotos();