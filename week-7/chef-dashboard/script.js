/*
  Pragmatic JavaScript
  Chapter 3
  Programming Assignment

  Author: Cesar Acevedo
  Date: 07.13.25
  Filename: chefs.js
*/

"use strict";

// Array if my family chefs
let chefs = [
  // Each chef object should have a name, specialty, weakness, and restaurantLocation
  {
    name: "Liam Acevedo",
    specialty: "Chicken Nuggets",
    weakness: "Vegetables",
    restaurantLocation: "South Texas"
  },
  {
    name: "Cesar Acevedo",
    specialty: "Italian",
    weakness: "Asian",
    restaurantLocation: "Rio Grande Valley"
  },
  {
    name: "Eva Acevedo",
    specialty: "Asian",
    weakness: "Dairy",
    restaurantLocation: "Brownsville"
  },
];

// retrieve the first chef's information, 2sec starting delay | 30% rejection rate
function retrieveChef1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject(`Failed to load info for ${chefs[0].name}`);
      } else {
        resolve(chefs[0]);
      }
    }, 2000);
  });
}

// retrieve the second chef's information, 4sec delay | 40% rejection rate
function retrieveChef2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.4) {
        reject(`Failed to load info for ${chefs[1].name}`);
      } else {
        resolve(chefs[1]);
      }
    }, 4000);
  });
}

// retrieve the third chef's information, 6sec delay | 50% rejection rate
function retrieveChef3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        reject(`Failed to load info for ${chefs[2].name}`);
      } else {
        resolve(chefs[2]);
      }
    }, 6000);
  });
}

// Promise.allSettled to retrieve all chefs' information and update the webpage accordingly
// wait for all three responses to settle
Promise.allSettled([
  retrieveChef1(),
  retrieveChef2(),
  retrieveChef3()
])
// check if each was fulfilled or rejected & print their info or print error in corresponding section.
.then(results => {
  results.forEach((result, i) => {
    const container = document.getElementById(`chef${i+1}`);

    if (result.status === "fulfilled") {
      const { name, specialty, weakness, restaurantLocation } = result.value;
      container.innerHTML = `
      <h2>${name}</h2>
      <p><strong>Specialty:</strong> ${specialty}</p>
      <p><strong>Weakness:</strong> ${weakness}</p>
      <p><strong>Restaurant Location:</strong> ${restaurantLocation}</p>
      `;
    } else {
      container.innerHTML =  `
        <p class="error">Error: Could not load data for chef ${i + 1}</p>
      `;
    }
  });
})

// if something breaks shoe error
.catch(err => {
  const errDiv = document.getElementById("error");
  errDiv.hidden = false;
  errDiv.textContent = "Unexpected error occurred.";
});