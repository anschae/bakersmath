let predoughHydration = document.getElementById("predoughHydration");
let predoughMass = document.getElementById("predoughMass");
let maindoughFlour = document.getElementById("maindoughFlour");
let maindoughWater = document.getElementById("maindoughWater");
let maindoughHydration = document.getElementById("maindoughHydration");

// console.log(predoughHydration.value);
// console.log(predoughMass.value);
// console.log(maindoughFlour.value);
// console.log(maindoughWater.value);
// console.log(maindoughHydration.value);

function onChange(name){
    if (predoughHydration.value != "" && predoughMass.value != "" && maindoughFlour.value != "") {
        let predoughFlour = parseInt(predoughMass.value) / (100+parseInt(predoughHydration.value)) * 100;
        let predoughWater = parseInt(predoughMass.value) / (100+parseInt(predoughHydration.value)) * parseInt(predoughHydration.value);
        let flourTotal = predoughFlour + parseInt(maindoughFlour.value);
        if(name != "maindoughHydration" && maindoughWater.value != "")
        {
            
            // calc maindoughHydration
            let waterTotal = predoughWater + parseInt(maindoughWater.value);
            maindoughHydration.value = Math.round(waterTotal/flourTotal*100);
        }

        if(name != "maindoughWater" && maindoughHydration.value != "")
        {
            // calc maindoughWater
            maindoughWater.value = Math.round(flourTotal*parseInt(maindoughHydration.value)/100) - predoughWater;
        }

        if(parseInt(maindoughWater.value) < 0){
            maindoughWater.value = "";
        }
        if(parseInt(maindoughHydration.value) < 0){
            maindoughHydration.value = "";
        }
    }
}


