window.addEventListener('load', () => {
    window.sr = ScrollReveal({mobile: true});
    sr.reveal(".headings, .card, .section-one, .about-break-img, .section-two", {
        duration: 1000,
        origin: "bottom",
        distance: "150px"
    })
})


const shirtGallery = document.getElementById('shirt-gallery');
const blazertGallery = document.getElementById('blazer-gallery');


function getProducts() {
    fetch('./db/products.json')
        .then(res => res.json())
        .then(responseData => {

            if (responseData.shirts) {
                let {shirts} = responseData;
                shirts.map((data, index) => {
                    let productCard = generateCard(data)
                    shirtGallery.innerHTML += productCard
                })
            }
            if (responseData.blazers) {
                let {blazers} = responseData;
                blazers.map((data, index) => {
                    let productCard = generateCard(data)
                    blazertGallery.innerHTML += productCard
                })
            }
        })
}

function generateCard(data) {
    console.log(data)
    return `     
          <div class="card col-lg-2 m-3">
                 <div class=" card-img-top">
                 <img src=${data.image} alt="${data.name}" class="card-img-top">
             </div>
             <div class="card-body">
               <h5 class="card-title"><b>{data.name}</b></h5>
               <h5><b>$${data.price}</b></h5>
               <p class="card-text">${data.description}.</p>
             </div>
        </div>
                 `
}

getProducts()
