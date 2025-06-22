"use strict";
/*  JavaScript 7th Edition
    Chapter 10
    Chapter case

    Oak Top House
      Author: Cesar Acevedo
      Date:   06/21/25

    Filename: js10a.js
*/


window.addEventListener("load", setupRoom);

// perform setup tasks when page first loads
function setupRoom() {
   //Page objects
   let room = document.getElementById("room");                            // banquet hall
   let storage = document.getElementsByTagName("storage");                // storage room
   let roomTables = document.querySelectorAll("#room > div.table");       // Tables in the banquet hall
   let storageTables = document.querySelectorAll("#storage > div.table"); // Tables in the storage room
   let zIndexCounter = 0;                                                 // Count the highest z-Index value
   let startingX, startingY; // initial pointer coordinates
   let tableX, tableY; // initial table coordinates

   // Function to calculate available seats in the room layout
   function countSeats() {
      let guests = 0;
      let seatCount = document.getElementById("seatCount");
      let tablesToCount = document.querySelectorAll("#room > div.table");
      for (let  item of tablesToCount) {
         guests += parseInt(item.textContent);
      }
      seatCount.textContent = guests;
    }

    // Add tables from storage to the banquet hall
    for (let items of storageTables) {
      items.onclick = function() {
        let storageCopy = items.cloneNode(true);
        room.appendChild(storageCopy);

        zIndexCounter++;
        storageCopy.style.zIndex = zIndexCounter;
        countSeats();

        // Grab the table in response to the pointerdown event
        storageCopy.addEventListener("pointerdown", grabTable);
      }
    }

    function grabTable(e) {
      if (e.shiftKey) {
        // remove table from room
        e.target.parentElement.removeChild(e.target);
        countSeats();
      }
      else {
                // initial position
        startingX = e.clientX;
        startingY = e.clientY;
        // disable touch
        e.target.style.touchAction = "none";
        // display table on top of other page object
        zIndexCounter++;
        e.target.style.zIndex = zIndexCounter;
        // store tables initial position
        tableX = e.target.offsetLeft;
        tableY = e.target.offsetTop;
        // add event listeners to the table
        e.target.addEventListener("pointermove", moveTable);
        e.target.addEventListener("pointerup", dropTable);
        }
    }

    // move the table along with the pointer
    function moveTable(e) {
      let currentX = e.clientX;
      let currentY = e.clientY;
      let deltaX = currentX - startingX;
      let deltaY = currentY - startingY;

      // calculate new table position
      e.target.style.left = tableX + deltaX + "px";
      e.target.style.top = tableY + deltaY + "px";
    }

    function dropTable(e) {
      e.target.removeEventListener("pointermove", moveTable);
      e.target.removeEventListener("pointerup", dropTable);
    }
}