const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '20268382-3befd380a826d86834f312b0e';

const searchNature = () => {
  const searchText = document.getElementById("search").value;
  const url = `https://pixabay.com/api/?key=${KEY}&q=${searchText}&image_type=photo`;
  toggleSpinner(true);
  fetch(url)
  .then(res => res.json())
  .then(data => showImages(data.hits))
  .catch(error => console.log(error));
}

// Enter Button Click code 
document.getElementById("search").addEventListener("keypress", function(event){
  if(event.key === 'Enter'){
    document.getElementById("search-btn").click();
    toggleSpinner(true);
  }
});


// show images in hand

const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  galleryHeader.style.display = 'flex';
  // console.log(images);
  images.forEach(image => {
    let imageDiv = document.createElement('div');
    imageDiv.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    // console.log(image);
    imageDiv.innerHTML = ` <img id="image-container" class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(imageDiv);
    toggleSpinner(false);
  });
}
// show images 

// const showImages = (images) => {
//   imagesArea.style.display = 'block';
//   gallery.innerHTML = '';
//   // show gallery title
//   galleryHeader.style.display = 'flex';
//   images.forEach(image => {
//     let div = document.createElement('div');
//     div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    
//      div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
//     gallery.appendChild(div)
//   })

// }


// fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)

const getImages = (query) => {
 fetch(`https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&pretty=true`)
    .then(res => res.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
}


// select item function hand in

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  let item = sliders.indexOf(img);
  console.log(item);
  if(item === -1){
    element.classList.add('added');
    sliders.push(img);
  }
  else{
    element.classList.remove('added');
    // const deleteItem = sliders.splice(item,1);
    sliders.splice(item,1);
    item = -1;
    // console.log(deleteItem);
  }  
}



// Select Item Function
// let slideIndex = 0;
// const selectItem = (event, img) => {
//   let element = event.target;
//   // element.classList.add('added');
//   // toggleSpinner();
//   let item = sliders.indexOf(img);
//   console.log(item);
//   if (item === -1) {
//     element.classList.add('added');
//     sliders.push(img);
//     console.log(sliders);
//   } else {
//     // alert('Hey, Already added !')
//     // element = event.target;
//     // console.log(element);
//     // console.log(sliders);
//     element.classList.remove('added');
//     sliders.pop();
//     item = -1;
//   }
// }



var timer;
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.');
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';

  let duration = document.getElementById('duration').value || 1000;
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  changeSlide(0);
  // Minimum Duration 1 Second Use in this code
  if(duration < 1000){
    duration = 1000;
    timerDuration(duration);
  }
  else{
    timerDuration(duration);
  }
}
// timer duration function for Minimum 1 second use in this code
const timerDuration = (duration) => {
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const searchText = document.getElementById('search');
  getImages(searchText.value);
  sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
  createSlider();
})






const toggleSpinner = (show) => {
  // const selectItem = document.getElementById("image-container");
  const spinner = document.getElementById("loading-spinner");
  if(show){
    spinner.classList.remove('d-none')
  }
  else{
    spinner.classList.add('d-none');
  }

  // spinner.classList.toggle('d-none');
  // selectItem.classList.toggle('d-none');
}