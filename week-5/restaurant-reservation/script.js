/*
  Pragmatic JavaScript
  Chapter 2
  Programming Assignment

  Author: Cesar Acevedo
  Date: 06/29/25
  Filename: script.js
*/

// Create an in-memory object array for each table in the restaurant
// each table has a number, seats per table, and reservation flag
let tables = [
  { tableNumber: 1, seats: 2, isReserved: false },
  { tableNumber: 2, seats: 4, isReserved: false },
  { tableNumber: 3, seats: 6, isReserved: false },
  { tableNumber: 4, seats: 8, isReserved: false },
  { tableNumber: 5, seats: 8, isReserved: false },
];

// Create a function reserveTable
function reserveTable(tableNumber, callback, time) {
  const table = tables.find(t => t.tableNumber === tableNumber);

  switch (true) {
    // check if table exists
    case !table:
      callback(`Table ${tableNumber} does not exist.`)
      break;
    // check if table is reserved
    case table.isReserved:
      callback(`Unfortunately, table ${tableNumber} has been reserved. Choose a different table.`);
      break;
    // reserve the table
    default:
      table.isReserved = true;
      setTimeout(() => {
        callback(`Table ${tableNumber} is now reserved.`);
      }, time);
      break;
  }
/* IDEA DIDN'T WORK BECAUSE IN THE END IT WOULD RESERVED THAT TABLE ANYWAYS EVEN IF ALREADY RESERVED.
   INSTEAD CHANGED TO A SWITCH. THIS WAY ONCE A CASE IS PICKED IT WILL STOP THERE INSTEAD OF CONTINUING ON.
  // check if table exists
  if(!table) {
    callback(`Table ${tableNumber} does not exist.`);
    return;
  }
  // check if table already reserved
  if(table.isReserved) {
    callback(`Unfortunately, table ${tableNumber} has been reserved. Choose a different table.`);
  }

  // reserve table
  table.isReserved = true;

  setTimeout(() => {
    callback(`Table ${tableNumber} is now reserved.`);
  }, time);
  */
}

// When the form is submitted, call the reserveTable function
document
  .getElementById("reservationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // get name from form & table to be reserved
    const name = document.getElementById("name").value.trim();
    const tableNumber = parseInt(document.getElementById("tableNumber").value);

    // <p> where message will show status or reservation
    const messageElement = document.getElementById("message");

    // validate input - make sure there's a name and make sure tableNumber is a number
    if(!name || isNaN(tableNumber)) {
      // show error in <p>
      messageElement.textContent = "Enter valid name and table number.";
      return;
    }

    // call function to reserve table w/ table number, callback function and a 5 second delay
    // show result of reservation
    reserveTable(tableNumber, function (message) {
      messageElement.textContent = `${name}, ${message}`;
    }, 2000); // changed to 2 seconds. during testing 5 seconds made it seem like it was not working.

  });
