// app.js

// Simulated async function (like fetching price from DB or API)
async function calculateTotal(price, quantity) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let total = price * quantity;
            resolve(total);
        }, 1000); // simulate 1-sec async delay
    });
}

async function main() {
    let price = 150;
    let qty = 3;

    let finalAmount = await calculateTotal(price, qty);
    console.log("Final Amount:", finalAmount);
}

main();


//node --inspect-brk app.js
//chrome://inspect