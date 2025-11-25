/*
The offers engine (discount rules) should load only when needed
Improve performance - SPA(Single Page Application), apps, dashboard, admin)
*/

export function applyOffer(total){
    return total>50000 ?total *0.9 : total //taking 90% value of total
}

export function getOfferMessage(total){
    return total > 50000
    ?"Congrats! 10% offer applied."
    :"No offers available."
}