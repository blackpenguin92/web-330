"use strict";
/*    JavaScript 7th Edition
      Chapter 11
      Project 11-02

      Project to city and state information from a provided postal code
      Author: Cesar Acevedo
      Date:   7/7/25

      Filename: project11-02.js
*/

let postalCode = document.getElementById("postalCode");
let place = document.getElementById("place");
let region = document.getElementById("region");
let country = document.getElementById("country");

postalCode.onblur = function() {
  let codeValue = postalCode.value.trim(); // get clean input from form
  let countryValue = country.value; // get country from selection
  // set values to empty strings, will be set later from API response
  place.value = "";
  region.value = "";

  // request/receive response from URL & replace place & region values
  fetch(`http://api.zippopotam.us/${countryValue}/${codeValue}`)
    .then(response => response.json())
    .then(json => {
      place.value = json.places[0]["place name"];
      region.value = json.places[0]["state abbreviation"];
    })
    .catch(error => console.log(error));
};



