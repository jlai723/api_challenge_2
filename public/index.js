const baseURL = "https://api.nasa.gov/mars-photos/api/v1/rovers";
const apiKey = "Jk71pHlLTLH08Mv2WYfhgWBzPojG0EfjRTlcu6YF";

const searchBtn = document.getElementById('submit');
searchBtn.onclick = retrieveData;

const carousel = document.getElementById('carousel-inner');
const section = document.querySelector('section');

function retrieveData(e) {
    e.preventDefault();
    
    const dateQuery = document.getElementById('date').value;

    const roverQuery = document.getElementById('rover').value;
    console.log(roverQuery);
    
    fetch(`${baseURL}/${roverQuery}/photos?earth_date=${dateQuery}&api_key=${apiKey}`)
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

    let elemData = json.photos;
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
            let launchDate = indPhoto.rover.launch_date;
            let landingDate = indPhoto.rover.landing_date;
            let earthDate = indPhoto.earth_date;

            function formatDate(date) {
                const date2 = date.split('-');
                const dateObj = {
                    month: date2[1],
                    day: date2[2],
                    year: date2[0]
                }
                return `${dateObj.month}/${dateObj.day}/${dateObj.year}`;
            }

            let formattedLaunchDate = formatDate(launchDate);
            let formattedLandingDate = formatDate(landingDate);
            let formattedEarthDate = formatDate (earthDate);
            
            photo.src = indPhoto.img_src;

            title.innerHTML = indPhoto.rover.name;
            description.innerHTML = `${indPhoto.rover.name} was launched on ${formattedLaunchDate}, landed on Mars on ${formattedLandingDate}, and is ${indPhoto.rover.status}. This photo was taken by the ${indPhoto.camera.full_name} (${indPhoto.camera.name}) on ${formattedEarthDate}.`;
            
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