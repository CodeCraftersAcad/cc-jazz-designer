window.addEventListener('load', () => {
    window.sr = ScrollReveal({mobile: true});
    sr.reveal(".headings, .card, .section-one, .about-break-img, .section-two", {
        duration: 1000,
        origin: "bottom",
        distance: "150px"
    })
})


const shortSleeveGallery = document.getElementById('short-sleeve-gallery');
const longSleeveGallery = document.getElementById('long-sleeve-gallery');
const blazerGallery = document.getElementById('blazer-gallery');


function getProducts() {
    fetch('./db/products.json')
        .then(res => res.json())
        .then(responseData => {
            responseData.shirts.map((shirt, index) => {
                if (shirt.sleeveLength === 'short') {
                    shortSleeveGallery.innerHTML += generateCard(shirt)
                }
                if (shirt.sleeveLength === 'long') {
                    longSleeveGallery.innerHTML += generateCard(shirt)
                }
            })

            if (responseData.blazers) {
                let {blazers} = responseData;
                blazers.map((data, index) => {
                    let productCard = generateCard(data)
                    blazerGallery.innerHTML += productCard
                })
            }
        })
}

function generateCard(data) {
   return `
          <div class="card col-lg-2 m-3">
                 <div class=" card-img-top">
                 <img src=${data.image} alt="${data.name}" class="card-img-top">
             </div>
             <div class="card-body">
               <p class="card-title text-center"><b>${data.name}</b></p>
               <p class="card-text">${data.description}.</p>
               <p><b><small>Price </small>$${data.price}</b></p>
             </div>
        </div>
                 `
}

getProducts()
