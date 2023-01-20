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

// function updatePreDough(){
//    // updateMainDough()
// }

function updateMainDough(singleUpdate=true){



    if(!singleUpdate){
        //updateDoughBalls()
    }
}

// function updateDoughBalls(){
//     // updateMainDough()
// }

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
            maindoughFlour.value = pos(Math.round((parseInt(maindoughWater.value) + parseInt(predoughWater)/(parseFloat(maindoughHydration.value)/100) - predoughFlour)));
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
            console.log( parseInt(totalMass.value) -parseInt(maindoughHydration.value)/100*predoughFlour - predoughFlour*(parseInt(predoughHydration.value)/100 + parseInt(saltPercentage.value)/100) );
            maindoughFlour.value = pos(Math.round(
                (-parseInt(maindoughHydration.value)/100*predoughFlour - predoughFlour*(parseInt(predoughHydration.value)/100 + parseInt(saltPercentage.value)/100) + parseInt(totalMass.value)) / 
                (1 + parseInt(maindoughHydration.value)/100 + parseInt(saltPercentage.value)/100)
            ))
            onChange("maindoughFlour"); 
        }
    }
         
        
        // if(ballNumber.value != "" && changed == "ballNumber"){
        //     ballGramms.value = Math.round(parseInt(totalMass.value) / parseFloat(ballNumber.value));
        // }
        // if(ballGramms.value != "" && changed == "ballGramms"){
        //     ballNumber.value = Math.round(parseInt(totalMass.value) / parseInt(ballGramms.value)*10)/10;
        // }
    

    // if(totalMass.value != ""){
    //     if(ballNumber.value != "" && changed == "ballNumber"){
    //         ballGramms.value = Math.round(parseInt(totalMass.value) / parseFloat(ballNumber.value));
    //     }
    //     if(ballGramms.value != "" && changed == "ballGramms"){
    //         ballNumber.value = Math.round(parseInt(totalMass.value) / parseInt(ballGramms.value)*10)/10;
    //     }
    // }

}


function onChangeOld(changed){

    if (predoughHydration.value != "" && predoughMass.value != "" && maindoughFlour.value != "") {

        // MAIN DOUGH
        let predoughFlour = parseInt(predoughMass.value) / (100+parseInt(predoughHydration.value)) * 100;
        let predoughWater = parseInt(predoughMass.value) / (100+parseInt(predoughHydration.value)) * parseInt(predoughHydration.value);
        let flourTotal = predoughFlour + parseInt(maindoughFlour.value);
        if(changed == "maindoughWater" && maindoughWater.value != "")
        {
            // calc maindoughHydration
            let waterTotal = predoughWater + parseInt(maindoughWater.value);
            maindoughHydration.value = Math.round(waterTotal/flourTotal*100*10)/10;
        }

        if(changed != "maindoughWater" && maindoughHydration.value != "")
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

        if(changed != "saltGramms" && saltPercentage.value != "")
        {
            saltGramms.value = Math.round(flourTotal*parseFloat(saltPercentage.value) / 100);
        }
        if(changed == "saltGramms" && saltGramms.value != "")
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
        if(ballNumber.value != "" && changed == "ballNumber"){
            ballGramms.value = Math.round(parseInt(totalMass.value) / parseFloat(ballNumber.value));
        }
        if(ballGramms.value != "" && changed == "ballGramms"){
            ballNumber.value = Math.round(parseInt(totalMass.value) / parseInt(ballGramms.value)*10)/10;
        }
    }
    
    if (predoughHydration.value != "" && predoughMass.value != "" && maindoughHydration.value != "" && saltPercentage.value != "") {
        let predoughFlour = parseInt(predoughMass.value) / (100+parseInt(predoughHydration.value)) * 100;
        let predoughWater = parseInt(predoughMass.value) / (100+parseInt(predoughHydration.value)) * parseInt(predoughHydration.value);
        if((ballGramms.value != "" && changed == "ballNumber") || (ballNumber.value != "" && changed == "ballGramms")){
            totalMass.value = parseFloat(ballNumber.value) * parseInt(ballGramms.value);
            // Solve[(1 + hydMain) mFlour + mPre + mFlour saltPer == 
            //     totalMass, mFlour]
            // {{mFlour -> (-mPre + totalMass)/(1 + hydMain + saltPer)}}
            let flourTotal = Math.round(parseFloat(totalMass.value - predoughMass.value)/parseFloat(1 + predoughHydration.value/100. + saltPercentage.value/100.));
            maindoughFlour.value =  parseInt(flourTotal - predoughFlour);
            maindoughWater.value = Math.round(flourTotal*parseInt(maindoughHydration.value)/100) - predoughWater;
            saltGramms.value = Math.round(flourTotal*parseFloat(saltPercentage.value) / 100);

            if(maindoughFlour.value < 0){
                maindoughFlour.value = "";
            }
            if(maindoughWater.value < 0){
                maindoughWater.value = "";
            }
            if(saltGramms.value < 0){
                saltGramms.value = "";
            }

            console.log("predough thent otal, then tot flouwr");
            console.log(parseFloat(totalMass.value-predoughMass.value));
            console.log(parseFloat(1 + predoughHydration.value/100. + saltPercentage.value/100.))
            console.log(flourTotal);
        }
    }
}


