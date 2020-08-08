window.addEventListener('load', () => {
    window.sr = ScrollReveal({mobile: true});
    sr.reveal(".headings, .card, .section-one, .about-break-img, .section-two", {
        duration: 1000,
        origin: "bottom",
        distance: "150px"
    })
})


const shortSleeveGallery = document.getElementById('short-sleeve-gallery');
const loading = document.getElementById('loading');
const products = document.getElementById('products');
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
          <div class="card col-lg-3 offset-lg-1 mb-4">
                 <div class=" card-img-top">
                 <img src=${data.image} alt="${data.name}" class="card-img-top">
             </div>
             <div class="card-body">
               <p class="card-title text-center"><b>${data.name}</b></p>
               <p class="card-text">${data.description}.</p>
               <p><b><small>Price </small>$${data.price}</b></p>
             </div>
<!--               <button class="btn btn-outline-primary mb-4 mt-4" data-id='${JSON.stringify(data)}' data-toggle="modal" data-target="#product-modal" onclick="viewMore(event)">View more</button>-->
        </div>
                 `
}

function viewMore(e) {
    let modalDiv = document.querySelector('#product-modal')
    let {name, id, price, description, image} = JSON.parse(e.target.dataset.id);
    let modal = `
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <div class="card mb-4">
                 <div class=" card-img-top">
                 <img src=${image} alt="${name}" class="card-img-top">
             </div>
             <div class="card-body">
               <p class="card-title text-center"><b>${name}</b></p>
               <p class="card-text">${description}.</p>
               <p><b><small>Price </small>$${price}</b></p>
               <label for="size-select">Size: </label>
               <select name="size" id="size-select">
               <option value="s">Small</option>
               <option value="m">Medium</option>
               <option value="l">Large</option>
               <option value="xl">X-Large</option>
               <option value="xxl">XX-Large</option>
</select>
             </div>
        </div>
      </div>
    </div>
  </div>
    `;
    modalDiv.innerHTML = modal
}

getProducts()
