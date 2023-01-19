let predoughHydration = document.getElementById("predoughHydration");
let predoughMass = document.getElementById("predoughMass");
let maindoughFlour = document.getElementById("maindoughFlour");
let maindoughWater = document.getElementById("maindoughWater");
let maindoughHydration = document.getElementById("maindoughHydration");
let saltPercentage = document.getElementById("saltPercentage");
let saltGramms = document.getElementById("saltGramms");

let totalMass = document.getElementById("totalMass");
let ballNumber = document.getElementById("ballNumber");
let ballGramms = document.getElementById("ballGramms");

// console.log(predoughHydration.value);
// console.log(predoughMass.value);
// console.log(maindoughFlour.value);
// console.log(maindoughWater.value);
// console.log(maindoughHydration.value);

function onChange(name){
    if (predoughHydration.value != "" && predoughMass.value != "" && maindoughFlour.value != "") {

        // MAIN DOUGH
        let predoughFlour = parseInt(predoughMass.value) / (100+parseInt(predoughHydration.value)) * 100;
        let predoughWater = parseInt(predoughMass.value) / (100+parseInt(predoughHydration.value)) * parseInt(predoughHydration.value);
        let flourTotal = predoughFlour + parseInt(maindoughFlour.value);
        if(name == "maindoughWater" && maindoughWater.value != "")
        {
            // calc maindoughHydration
            let waterTotal = predoughWater + parseInt(maindoughWater.value);
            maindoughHydration.value = Math.round(waterTotal/flourTotal*100*10)/10;
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

        // SALT
        // if(saltPercentage.value == "") {
        //     saltGramms.value = "";
        // }
        if(name != "saltGramms" && saltPercentage.value != "")
        {
            saltGramms.value = Math.round(flourTotal*parseFloat(saltPercentage.value) / 100);
        }
        if(name == "saltGramms" && saltGramms.value != "")
        {
            saltPercentage.value = Math.round(parseInt(saltGramms.value) / flourTotal * 100 * 10)/10;
        }
    }

    if (predoughMass.value != "" && maindoughFlour.value != "" && maindoughWater.value != "") {
        totalMass.value = parseInt(predoughMass.value) + parseInt(maindoughFlour.value) + parseInt(maindoughWater.value) + parseInt(saltGramms.value);
    }
    else{
        totalMass.value = "";        
    }

    if(totalMass.value != ""){
        if(ballNumber.value != "" && name == "ballNumber"){
            ballGramms.value = Math.round(parseInt(totalMass.value) / parseFloat(ballNumber.value));
        }
        if(ballGramms.value != "" && name == "ballGramms"){
            ballNumber.value = Math.round(parseInt(totalMass.value) / parseInt(ballGramms.value)*10)/10;
        }
    }
    
    if (predoughHydration.value != "" && predoughMass.value != "" && maindoughHydration.value != "" && saltPercentage.value != "") {
        if((ballGramms.value != "" && name == "ballNumber") || (ballNumber.value != "" && name == "ballGramms")){
            totalMass.value = parseFloat(ballNumber.value) * parseInt(ballGramms.value);
            // Solve[(1 + hydMain) mFlour + mPre + mFlour saltPer == 
            //     totalMass, mFlour]
            // {{mFlour -> (-mPre + totalMass)/(1 + hydMain + saltPer)}}
        }
    }
}


