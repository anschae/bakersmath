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

function pos(x){
    if(x >= 0){
        return x;
    }
    return "";
}

function onChange(changed){
    // PREDOUGH
    let predoughFlour = 0;
    let predoughWater = 0;
    if(predoughMass.value != "" && predoughHydration != ""){
        predoughFlour = parseInt(predoughMass.value) / (100+parseInt(predoughHydration.value)) * 100;
        predoughWater = parseInt(predoughMass.value) / (100+parseInt(predoughHydration.value)) * parseInt(predoughHydration.value);
    }

    // change main dough if predough changes
    if((changed == "predoughMass" && predoughHydration != "") || (changed == "predoughHydration" && predoughMass != "")){
        onChange("maindoughFlour"); // adjusts maindoughWater to predough and maindoughHydration and maindoughFlour
    }

    // MAIN DOUGH
    let flourTotal = predoughFlour;
    if(maindoughFlour.value != ""){
        flourTotal += parseInt(maindoughFlour.value);
    }
    
    if(changed == "maindoughFlour"){
        if(maindoughHydration.value != ""){
            maindoughWater.value = pos(Math.round(flourTotal*parseInt(maindoughHydration.value)/100 - predoughWater));
        }
    }
    if(changed == "maindoughHydration"){
        if(maindoughFlour.value != ""){
            maindoughWater.value = pos(Math.round(flourTotal*parseInt(maindoughHydration.value)/100 - predoughWater));
        }
    }
    if(changed == "maindoughWater"){
        if(maindoughHydration.value != ""){
            maindoughFlour.value = (parseInt(maindoughWater.value) - parseInt(maindoughHydration.value)/100*predoughFlour + predoughWater) / (parseInt((maindoughHydration.value))/100);
        }
    }

    // SALT
    if (saltGramms.value == ""){
        saltGramms.value = 0;
    }

    if(changed != "saltGramms" && saltPercentage.value != "" && flourTotal > 0)
    {
        saltGramms.value = parseInt(Math.round(flourTotal*parseFloat(saltPercentage.value) / 100));
    }
    if(changed == "saltGramms" && saltGramms.value != "")
    {
        saltPercentage.value = Math.round(parseInt(saltGramms.value) / flourTotal * 100 * 10)/10;
    }

    // TOTAL MASS
    if (predoughMass.value != "" && maindoughFlour.value != "" && maindoughWater.value != "") {
        totalMass.value = parseInt(predoughMass.value) + parseInt(maindoughFlour.value) + parseInt(maindoughWater.value) + parseInt(saltGramms.value);
    }
    else{
        totalMass.value = "";
        // ballGramms.value = "";  
    }

    // DOUGH BALLS
    if(totalMass.value != "" && ballNumber.value != "" && changed != "ballGramms"){
        ballGramms.value = Math.round(parseInt(totalMass.value) / parseFloat(ballNumber.value));
    }
    if(changed == "ballGramms"){
        if(ballNumber.value != "" && maindoughHydration.value != "" && saltGramms.value != ""){
            totalMass.value = parseInt(ballNumber.value) * parseInt(ballGramms.value);
            maindoughFlour.value = pos(Math.round(
                (-parseInt(maindoughHydration.value)/100*predoughFlour - predoughFlour*(parseInt(predoughHydration.value)/100 + parseInt(saltPercentage.value)/100) + parseInt(totalMass.value)) / 
                (1 + parseInt(maindoughHydration.value)/100 + parseInt(saltPercentage.value)/100)
            ))
            // Mathematica: Solve[totalMasss == preFlour (1 + preHyd) + mainFlour + hydration (preFlour + mainFlour) - preFlour + (preFlour + mainFlour)*saltPerc, mainFlour]
            onChange("maindoughFlour"); 
        }
    }
}


