"use strict"

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Check if images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

//Helper Function to Set Attribute on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to Link to UnSplash
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });

        //Create <img> for Photo
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        //Event Listner,Check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //Put <img> inside <a>then put both inside imageConatiner Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

//Configure Unsplash API
const count = 30;
const apiKey = "xyXSKLlUzaSZbcQ_HuXTFQKml1MY4WEF1FJfbo398AM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get Photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (err) {
        console.log(`Error: ${err}`);
    }
}
window.addEventListener("scroll", () => {
    if ((window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) && ready) {
        ready = false;
        getPhotos();

    }
})

getPhotos();