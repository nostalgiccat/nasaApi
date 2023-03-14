const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// Nasa API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function updateDOM() {
    resultsArray.forEach((result) => {
        // Card Container 
        const card = document.createElement('div');
        card.classList.add('card'); 
        // Link
        const link = document.createElement('a');
        link.href = result.hdurl; 
        link.title = 'View Full Image'; 
        link.target = '_blank'; 

        //Image
        const image = document.createElement('img');
        image.src = result.url; 
        image.alt = 'NASA Picture of the Day';
        image.loading = 'lazy'; 
        image.classList.add('card-img-top');

        //Card Title 
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title'); 
        cardTitle.textContent = result.title; 

        //Card Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        //Save textContent
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        saveText.textContent = 'Add to Favorites'; 
        saveText.setAttribute('onclick', `saveFavorite('${result.url})`);

        // Card Text
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation; 

        // Footer container
        const footer = document.createElement('small');
        footer.classList.add('text-muted');

        //Date
        const date = document.createElement('strong');
        date.textContent = result.date;

        //Copyright
        const copyrightResult = result.copyright === undefined ? '' : result.copyright; 
        const copyright = document.createElement('span');
        copyright.textContent = `${copyrightResult}`;


        //Append 
        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card); 
    });
}

//Get 10 Images from Nasa API
async function getNasaPictures() {
    try {
        const response = await fetch(apiUrl); 
        resultsArray = await response.json(); 
        console.log(resultsArray);
        updateDOM();
    } catch (error) {
        // Catch Error
    }
}

// Add result to Favorites
function saveFavorite(itemUrl) {
    // Loop through Results Array to select Favorites
    resultsArray.forEach((item) => {
        if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
            favorites[itemUrl] = item; 
            console.log(favorites);
            // Show Save Confirmation for 2 seconds
            saveConfirmed.hidden = false; 
            setTimeout(() => {
                saveConfirmed.hidden = true; 
            }, 2000);
        }
    });
}

// On Load
getNasaPictures(); 