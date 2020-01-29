const bookingButton = document.getElementById('booking-button');
const closeModalButton = document.getElementById('closeModalWindow');

bookingButton.onclick = function(){
  const roomsArray = JSON.parse(localStorage. getItem('Rooms'));
  const ModalWindow = document.querySelector('.modal-booking-window');
  ModalWindow.style.display = "block";
  displayCards(roomsArray);

}

closeModalButton.onclick = function(){

  const ModalWindow = document.querySelector('.modal-booking-window');
  ModalWindow.style.display = "none";
  clearFilterMenu();

}

window.onclick = function(){
  const ModalWindow = document.querySelector('.modal-booking-window');
  if (event.target == ModalWindow) {
    ModalWindow.style.display = "none";
  }

}

const filterButton = document.getElementById('filter-button');
filterButton.addEventListener('click', filterRooms);

function filterRooms(){
  let roomsArray = JSON.parse(localStorage.getItem('Rooms'));
  let filteredRoomsArray = [];
  filteredRoomsArray = filterAdult(roomsArray);
  filteredRoomsArray = filterFloor(filteredRoomsArray);
  filteredRoomsArray = sortByPrice(filteredRoomsArray);
  displayCards(filteredRoomsArray);
}



function sortByPrice(roomsArray) {
    const sortMenu = document.getElementById('sortMenu');
    const sortOption = sortMenu.value;
    switch (sortOption) {
        case 'priceNormal':
            roomsArray.sort((a, b) => (Number(a['price']) > Number(b['price'])) ? 1 : -1)
            break;
        case 'priceReverse':
            roomsArray.sort((a, b) => (Number(a['price']) > Number(b['price'])) ? -1 : 1)
            break;
        default:
            break;
    }
    return roomsArray;
}

function filterAdult(roomsArray){
  const sortAdult = document.getElementById('sortAdults');
  const sortAdultOption = sortAdult.value;
  let filteredArray = [];
  switch(sortAdultOption) {
    case 'oneAdult' :
        filteredArray = roomsArray.filter(d => d.capacity.match('1'))
        return filteredArray
    break;
    case 'twoAdult' :
        filteredArray = roomsArray.filter(d => d.capacity.match('2'))
        return filteredArray
    break;

    case 'threeAdult':
        filteredArray = roomsArray.filter(d => d.capacity >= 3)
        return filteredArray
    break;

    default:
    break;
  }
  return roomsArray;
}

function filterFloor(roomsArray){
  const sortFloor = document.getElementById('sortFloor');
  const sortFloorOption = sortFloor.value;
  let filteredArray = [];
  switch(sortFloorOption){
    case 'firstFloor' :
      filteredArray = roomsArray.filter(d => d.floor.match('1'))
      return filteredArray
      break;
    case 'secondFloor' :
      filteredArray = roomsArray.filter(d => d.floor.match('2'))
      return filteredArray
      break;
    case 'thirdFloor' :
      filteredArray = roomsArray.filter(d => d.floor.match('3'))
      return filteredArray
      break;
    default:
    break;
  }
  return roomsArray;
}

window.onload = fillDates();

function fillDates() {
    const dateFrom = document.getElementById('dateFromField');
    const dateTo = document.getElementById('dateToField');
    const today = new Date().toISOString().substr(0, 10);
    dateFrom.value = today;
    dateFrom.setAttribute('min',today);
    dateTo.value = today;
    dateTo.setAttribute('min',today);
    dateFrom.addEventListener('change', dateValidator);
    dateTo.addEventListener('change', dateValidator);
}

function dateValidator() {
    const dateFrom = document.getElementById('dateFromField');
    const dateTo = document.getElementById('dateToField');
    const today = new Date().toISOString().substr(0, 10);
    dateTo.setAttribute('min',dateFrom.value);
    if (Date.parse(dateTo.value) < Date.parse(dateFrom.value)) {
        dateTo.value = dateFrom.value;
    }
    if (Date.parse(dateFrom.value) < Date.parse(today)) {
        dateFrom.value = today;
    }
}


function displayCards(roomsArray){
  const cardContainer = document.querySelector(".card-container")
  cardContainer.innerHTML = '';
  let cardsArray = [];
  let card;
  if (roomsArray.length === 0) {
    cardContainer.textContent = "Sorry, we have no rooms ;(";
  } else
  {
    for (let i = 0; i < roomsArray.length; i++) {
      card = createRoomCard(roomsArray[i]);
      cardsArray.push(card);
    }
    
  }  
    pageCards(cardsArray);
}

function pageCards(cards) {
    clearPagination();
    const cardContainer = document.querySelector('.card-container');
    const cardPagination = document.querySelector('.card-pagination');
    const cardsOnPage = 3;
    let button;
    let cardsDisplay = cards.slice(0,cardsOnPage);
        for (let card of cardsDisplay) {
            cardContainer.appendChild(card);
        }
    for (let i = 1; i <= Math.ceil(cards.length/cardsOnPage); i++) {
        button = document.createElement('button');
        button.textContent = i;
        let start = (Number(button.textContent) - 1) * cardsOnPage;
        let end = start + cardsOnPage;
        button.addEventListener('click', ()=>{
            cardContainer.innerHTML = '';
            cardsDisplay = cards.slice(start,end);
            for (let card of cardsDisplay) {
                cardContainer.appendChild(card);
            }
        })
        cardPagination.appendChild(button);
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
  cardItemSummaryTitle = document.createElement('h3');
  cardItemSummaryTitle.classList = "card__item-summary-title"
  cardItemSummaryTitle.textContent = room['name'];

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
  cardItemSummary.appendChild(cardItemSummaryTitle);
  cardItemSummary.appendChild(cardItemSummaryPrice);  
  cardItemSummary.appendChild(cardItemSummaryDescription);
  cardItemSummary.appendChild(cardItemSummaryBooking);

  cardItemSummaryBookingButton.addEventListener('click', ()=> {
        const dateFrom = document.getElementById('dateFromField');
        const dateTo = document.getElementById('dateToField');
        if  (!localStorage.getItem('Bookings')) {
            let bookings = [];
            localStorage.setItem('Bookings', JSON.stringify(bookings));
        }
        let bookingsArray = JSON.parse(localStorage.getItem('Bookings'));
        let booking = {
            id: room['id'],
            dateFrom: dateFrom.value,
            dateTo: dateTo.value
        }
        bookingsArray.push(booking);
        localStorage.setItem('Bookings', JSON.stringify(bookingsArray));
        closeModalBooked();
    });

  if (isBooked(room)) {
        cardItem.className+=" booked";
        cardItemSummaryPriceSpan.textContent = "No rooms available";
        cardItemSummaryBookingButton.style.display ="none";
        cardItemSummaryBooking.style.display = "none";
    }

  return cardItem;


}

function isBooked(room) {
    let bookingsArray = JSON.parse(localStorage.getItem('Bookings'));
    if (bookingsArray.length > 0) {
        const dateFromField = document.getElementById('dateFromField');
        const dateToField = document.getElementById('dateToField');
        let dateFrom = Date.parse(dateFromField.value);
        let dateTo = Date.parse(dateToField.value);
        let dateFromBooked;
        let dateToBooked;
        for (let booking of bookingsArray) {
            dateFromBooked = Date.parse(booking['dateFrom']);
            dateToBooked = Date.parse(booking['dateTo']);
            if (booking['id'] === room['id'] && ((dateFrom <= dateToBooked) && (dateTo >= dateFromBooked)))
            {
                return true;
            } 
        } 
        return false;
    }
}

function closeModalBooked() {
    const bookedMessage = document.querySelector('.booked-message');
    bookedMessage.style.opacity = 1;
    bookedMessage.style.display = "block";
    setTimeout(() => {
        bookedMessage.style.opacity = 0;
    }, 1500);
    
    closeModalWindow();
}

function closeModalWindow() {
    const modalWindow = document.querySelector('.modal-booking-window');
    modalWindow.style.display = "none";
    clearFilterMenu();
}

function clearFilterMenu() {
    clearCheckBox('capacity');
    clearCheckBox('floor');
    fillDates();
}

function clearPagination() {
    const cardPagination = document.querySelector('.card-pagination');
    cardPagination.innerHTML='';
}

