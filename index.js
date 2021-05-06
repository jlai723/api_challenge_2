const baseURL = "https://images-api.nasa.gov";
const apiKey = "Jk71pHlLTLH08Mv2WYfhgWBzPojG0EfjRTlcu6YF";

const searchBtn = document.getElementById('submit');
searchBtn.onclick = retrieveData;

const carousel = document.getElementById('carousel-inner');
const section = document.querySelector('section');

function retrieveData(e) {
    e.preventDefault();
    
    const query = document.getElementById('search').value.toLowerCase();
    const modQuery = query.split(" ").join("");
    
    fetch(`${baseURL}/search?q=${modQuery}`)
        .then(res => res.json())
        .then(json => {
            displayData(json);
        })
        .catch(err => {
            displayErr(err);
            console.log(err);
        })
}

function displayData(json) {
    while (carousel.firstChild) {
        carousel.removeChild(carousel.firstChild);
    }

    let elemData = json.collection.items;
    console.log(elemData);

    if(elemData.length != 0) {
        for(let i = 0; i < elemData.length; i++) {
            let carouselDiv = document.createElement('div');
            let captionDiv = document.createElement('div');
            let photo = document.createElement('img');
            let title = document.createElement('h5');
            let description = document.createElement('p');
            
            carouselDiv.className = "carousel-item";
            photo.className = "d-block vw-auto";
            captionDiv.className = "carousel-caption d-none d-md-block";
            
            let indPhoto = elemData[i];
            
            photo.src = indPhoto.links ? indPhoto.links[0].href : "./assets/404-happiness-not-found.jpg";

            title.innerHTML = indPhoto.data[0].title.substring(0,69);
            description.innerHTML = indPhoto.data[0].description;
            
            captionDiv.appendChild(title);
            captionDiv.appendChild(description);
            carouselDiv.appendChild(photo);
            carouselDiv.appendChild(captionDiv);
            carousel.appendChild(carouselDiv);

            document.querySelector('.carousel-inner :first-child').classList.add('active');
        }
    } else {
        let nothing = document.createElement('h3');
        nothing.innerHTML = "No results found. Try again!"
        carousel.appendChild(nothing);
    }
}

function displayErr() {
    let err = document.createElement('h1');
    err.className = "display-1";
    err.innerHTML = "An error occurred. Please try again."
    section.appendChild(err);
}