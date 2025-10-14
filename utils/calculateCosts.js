const costs = (distance, time, deliveryDetails) => {

    const distanceNum = +distance;
    const timeNum = +time * 1.30; // Adds 30% time for truck

    const timeFee = timeCost(timeNum);
    const fuelFee = fuelCost(distanceNum);
    const massFee = massCost(deliveryDetails.items).weightCost;
    const itemFee = itemCost(deliveryDetails.items);
    const stairFee = stairCost(deliveryDetails)
    
    const subTotal = timeFee +fuelFee + massFee + itemFee + stairFee;
    const callOutFee = subTotal <= 400 ? 200 : subTotal * 0.5;

    const total = callOutFee + timeFee +fuelFee + massFee + itemFee + stairFee;

    return {
        callOutFee, timeFee,fuelFee,massFee,itemFee, stairFee, total, timeNum
    }
}


// CALCULATES TIME COST
function timeCost(time){
    return time * 1.6783 // Time in minutes x R0,83 rate per minute
}

// CALCULATES DISTANCE COST
function fuelCost(distance){
    return (distance * 9.1 / 100) * 32.42
}

// CALCULATES MASS COST
function massCost(deliveryDetails){
    let weights = deliveryDetails.map(item => {
        let itemNum= item.weight * item.quantity;
        return itemNum
    })

    let totalWeight = weights.reduce((acc, curr)=> acc + curr,0);

    let weightCost = totalWeight * 1;
    return {weightCost, totalWeight}
    
}

// CALCULATES ITEM COST
const itemCost = (deliveryDetails) => deliveryDetails.length 

// CALCULATES STAIR COST
const stairCost = (deliveryDetails) =>{
 const stairFee=  +deliveryDetails.stairs * 50
 return stairFee;
}

module.exports = costs