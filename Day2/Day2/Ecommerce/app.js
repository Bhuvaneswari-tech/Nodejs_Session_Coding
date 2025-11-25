/*
/Ecommerce
 ├── auth/
 │     └── auth.js
 ├── cart/
 │     └── cart.js
 ├── services/
 │     └── api.js
 ├── utils/
 │     └── logger.js
 ├── offers/
 │     └── offerEngine.js   (loaded dynamically)
 └── app.js

*/

//auth
import isAuthenticated, {login,logout} from "./auth/auth.js";

//utils
import { logInfo, logError } from "./utils/logger.js";

//Services
import { fetchProducts } from "./services/api.js";

//Cart module
import { addToCart, calculateTotal } from "./cart/cart.js";

async function init(){
    logInfo("App starting..")

    //1.Authenticate user
    if(!login("admin","admin123")){
        logError("Invalid credentials!")
        return
    }

    logInfo("User authenticated!")

    //2. Fetch Products
    const products = fetchProducts()
    logInfo("Products loaded: "+JSON.stringify(products))

    //3. Add to cart
    let cart = []
    addToCart(cart,products[0])
    addToCart(cart,products[1])
    addToCart(cart,products[2])

    //console.log(cart)

    //4. Calculate total
    logInfo("Cart Total: "+calculateTotal(cart)) //logInfo(msg)
    //console.log(calculateTotal(cart))

    //Lazy loading
    if(calculateTotal(cart) > 50000){
        logInfo("Loading offer engine dynamically...")

        const offerModule = await import("./offers/offerEngine.js")

        const newTotal = offerModule.applyOffer(calculateTotal(cart))
        logInfo("New Total After Offer: " + newTotal)

        logInfo(offerModule.getOfferMessage(newTotal))
    }
}

init()
