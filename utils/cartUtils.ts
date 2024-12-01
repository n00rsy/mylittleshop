

export function addItemToCart(item: any, cartItems: [any], setCartItems: any) {
    const newCart = addItemHelper(item, cartItems)
    setCartItems(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
}

function addItemHelper(item: any, cartItems: any) {
    let foundIdx = cartItems.findIndex((i) => i._id == item._id)
    if (foundIdx >= 0) {
        const newCart = [...cartItems];
        newCart[foundIdx].quantity = newCart[foundIdx].quantity + 1
        return newCart
    }
    else {
        const newCart = [...cartItems, item]
        return newCart
    }
}

export function removeItemFromCart(item: any, cart: any, setCartItems: any) {
    const newCart = cart.filter((i: any) => {
        return i._id !== item._id
    })
    console.log("newcart: ", newCart)
    setCartItems(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
}

export function loadCart(setCartItems: any) {
    const savedCart = JSON.parse(localStorage.getItem("cart") || '[]')
    setCartItems(savedCart)
}

export function emptyCart(setCartItems: any) {
    localStorage.setItem("cart", '[]')
    setCartItems([])
}
