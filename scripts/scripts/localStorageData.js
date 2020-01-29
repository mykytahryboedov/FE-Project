window.addEventListener('load', fillLocalStorage);

function fillLocalStorage(){
  const roomsArray = [
    {
      "id":"1",
      "name":"Classic Room",
      "capacity": "1",
      "floor": "1", 
      "price": "100",
      "image": "assets/rooms/card1.jpg",
      "description": "Elit cillum sunt magna adipisicing qui ut incididunt sed cupidatat reprehenderit est minim sint veniam consectetur adipisicing.",
    },
    {
      "id":"2",
      "name":"Budget Room",
      "capacity": "2",
      "floor" : "2", 
      "price": "250",
      "image": "assets/rooms/room1.jpg",
      "description": "Elit cillum sunt magna adipisicing qui ut incididunt sed cupidatat reprehenderit est minim sint veniam consectetur adipisicing.",
    },
    {
      "id":"3",
      "name":"Premium Room",
      "capacity": "2",
      "floor": "2", 
      "price": "500",
      "image": "assets/rooms/room2.jpg",
      "description": "Elit cillum sunt magna adipisicing qui ut incididunt sed cupidatat reprehenderit est minim sint veniam consectetur adipisicing.",
    },
    {
      "id":"4",
      "name":"Flex Room",
      "capacity": "3",
      "floor": "2", 
      "price": "1000",
      "image": "assets/rooms/room3.jpg",
      "description": "Elit cillum sunt magna adipisicing qui ut incididunt sed cupidatat reprehenderit est minim sint veniam consectetur adipisicing.",
    },
    {
      "id":"5",
      "name":"Luxury Room",
      "capacity": "4",
      "floor": "3", 
      "price": "1500",
      "image": "assets/rooms/room3.jpg",
      "description": "Elit cillum sunt magna adipisicing qui ut incididunt sed cupidatat reprehenderit est minim sint veniam consectetur adipisicing.",
    },
  ]
  let bookings = [];
  localStorage.setItem('Bookings', JSON.stringify(bookings));
  localStorage.setItem('Rooms', JSON.stringify(roomsArray));
}
