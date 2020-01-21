
document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('scroll', myFunctionForSticky);

  var header = document.getElementById("sticky-header");
  var sticky = header.offsetTop;

  function myFunctionForSticky() {
    if (window.pageYOffset > sticky) {
      console.log("window.pageYOffset >= sticky");
    } else {
      console.log("Not window.pageYOffset >= sticky");
    }
    if (window.pageYOffset > sticky) {
      header.classList.add("header-sticky");
    } else {
      header.classList.remove("header-sticky");
    }
  }

  function myFunctionForResponsive() {
    header.classList.toggle('responsive');
  }
})

/*BOOKING*/

window.addEventListener('load', fillLocalStorage);

function fillLocalStorage(){
  const roomsArray = [
    {
      "id":"1",
      "name":"Classic Room",
      "capacity": "1", 
      "price": "100",
      "image": "assets/rooms/card1.jpg",
      "description": "Elit cillum sunt magna adipisicing qui ut incididunt sed cupidatat reprehenderit est minim sint veniam consectetur adipisicing.",
    },
    {
      "id":"2",
      "name":"Budget Room",
      "capacity": "1", 
      "price": "250",
      "image": "assets/rooms/room1.jpg",
      "description": "Elit cillum sunt magna adipisicing qui ut incididunt sed cupidatat reprehenderit est minim sint veniam consectetur adipisicing.",
    },
    {
      "id":"1",
      "name":"Premium Room",
      "capacity": "1", 
      "price": "500",
      "image": "assets/rooms/room2.jpg",
      "description": "Elit cillum sunt magna adipisicing qui ut incididunt sed cupidatat reprehenderit est minim sint veniam consectetur adipisicing.",
    },
    {
      "id":"1",
      "name":"Flex Room",
      "capacity": "1", 
      "price": "1000",
      "image": "assets/rooms/room3.jpg",
      "description": "Elit cillum sunt magna adipisicing qui ut incididunt sed cupidatat reprehenderit est minim sint veniam consectetur adipisicing.",
    },
    {
      "id":"1",
      "name":"Luxury Room",
      "capacity": "1", 
      "price": "1500",
      "image": "assets/rooms/room3.jpg",
      "description": "Elit cillum sunt magna adipisicing qui ut incididunt sed cupidatat reprehenderit est minim sint veniam consectetur adipisicing.",
    },
  ]
  let bookings = [];
  localStorage.setItem('Bookings', JSON.stringify(bookings));
  localStorage.setItem('Rooms', JSON.stringify(roomsArray));
}



const bookingButton = document.getElementById('booking-button');
const closeModalButton = document.getElementById('closeModalWindow');

bookingButton.onclick = function(){
  const roomsArray = JSON.parse(localStorage. getItem('Rooms'))
  const ModalWindow = document.querySelector('.modal-booking-window');
  ModalWindow.style.display = "block";
  displayCards(roomsArray);

}

closeModalButton.onclick = function(){

  const ModalWindow = document.querySelector('.modal-booking-window');
  ModalWindow.style.display = "none";

}

window.onclick = function(){
  const ModalWindow = document.querySelector('.modal-booking-window');
  if (event.target == ModalWindow) {
    ModalWindow.style.display = "none";
  }

}

function displayCards(roomsArray){
  const cardContainer = document.querySelector(".card-container")
  cardContainer.innerHTML = '';
  let cardsArray = [];
  let card;
  
    for (let i = 0; i < roomsArray.length; i++) {
      card = createRoomCard(roomsArray[i]);
      cardsArray.push(card);
    }
  
    pageCards(cardsArray);
}

function pageCards(cards){
  const cardContainer = document.querySelector('.card-container');
  const cardPagination = document.querySelector('.card-pagination');
  const cardsOnPage = 4;

  let button;
  let cardsDisplay = cards.slice(0, cardsOnPage);
    for (let card of cardsDisplay) { 
      cardContainer.appendChild(card);
    }
    
}

function createRoomCard(room) {
  let cardItem , cardItemMedia , cardItemSummary, cardItemSummaryPrice, cardItemSummaryDescription, cardItemSummaryBooking;
  cardItem = document.createElement('div');
  cardItem.classList = "card__item";

  cardItemMedia = document.createElement('div');
  cardItemMedia.classList = "card__item-media";
  let cardItemMediaImage = document.createElement('img');
  cardItemMediaImage.setAttribute('src', room['image']);
  cardItemMediaImage.setAttribute('alt', room['image']);
  cardItemMedia.appendChild(cardItemMediaImage);


  cardItemSummary = document.createElement('div');
  cardItemSummary.classList = "card__item-summary";
  cardItemSummary.textContent = room['name'];

  cardItemSummaryPrice = document.createElement('div');
   cardItemSummaryPrice.classList = "card__item-summary-price";
  let cardItemSummaryPriceSpan = document.createElement('span');
  cardItemSummaryPriceSpan.classList = "price";
  cardItemSummaryPriceSpan.textContent = room['price'] + "$";
  cardItemSummaryPrice.textContent = "FROM: ";
  cardItemSummaryPrice.appendChild(cardItemSummaryPriceSpan);

  cardItemSummaryDescription = document.createElement('div');
  cardItemSummaryDescription.classList = "card__item-summary-description";
  cardItemSummaryDescription.textContent = room['description'];

  cardItemSummaryBooking = document.createElement('div');
  cardItemSummaryBooking.classList = 'card__item-summary-booking';
  let cardItemSummaryBookingButton = document.createElement('button')
  cardItemSummaryBookingButton.classList = 'card__item-summary-booking-button';
  cardItemSummaryBookingButton.textContent = "Book Now";
  cardItemSummaryBooking.appendChild(cardItemSummaryBookingButton);

  cardItem.appendChild(cardItemMedia);
  cardItem.appendChild(cardItemSummary);
  cardItemSummary.appendChild(cardItemSummaryPrice);  
  cardItemSummary.appendChild(cardItemSummaryDescription);
  cardItemSummary.appendChild(cardItemSummaryBooking);

  return cardItem;

}