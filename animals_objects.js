"use strict";

const allAnimals = []; //storage the animals
const initDom = {}; //to be able to use constans before the DOM is totally upload

const Animal = {
    //This is a Prototype = which is a template for the data
    //The prototype name starts with uppercase and is done with curly brakets
    name1: "",
    type: "unknown",
    description: "",
    age: 0,
};

window.addEventListener("DOMContentLoaded", start);


function start() {
    console.log("ready");
    initDom.animals = document.querySelector("#animal");
    loadJSON();
}


function loadJSON() {
    fetch("animals.json")
        .then(response => response.json())
        .then(jsonData => {
            // when json is loaded, prepare objects
            prepareObjects(jsonData);
        });
}

function prepareObjects(jsonData) {
    //console.log("jsonData", jsonData);
    jsonData.forEach(jsonObject => {
        // TODO: Create new object with cleaned data - and store that in the allAnimals array
        const animal = Object.create(Animal); //create a new object 
        //console.log("Animal", Animal);
        animal.name1 = jsonObject.fullname.substring(0, jsonObject.fullname.indexOf(" "));
        animal.desc = jsonObject.fullname.substring(jsonObject.fullname.indexOf(" ") + 1, jsonObject.fullname.lastIndexOf(" "), );
        animal.type = jsonObject.fullname.substring(jsonObject.fullname.lastIndexOf(" ") + 1, ); //the + 1 is to delete the space before the string
        animal.age = jsonObject.age;

        // TODO: MISSING CODE HERE !!!
        allAnimals.push(animal); //adding an animal to the allAnimals array of object
    });

    displayList();
}
console.log("allAnimals", allAnimals);

function displayList() {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    allAnimals.forEach(displayAnimal);
}

function displayAnimal(animal) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name1;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild(clone);
}