const API_BASE = "http://localhost:3000/api/v1"

let state = {
    menu: [],
    cart: []
}

async function getMenu() {
    const res = await fetch(`${API_BASE}/menu`)
    const data = await res.json()
    state.menu = data
    renderMenu()
}

function renderMenu() {
    const container = document.getElementById("menu-container")
    container.innerHTML = ""

    state.menu.forEach(item => {
        const el = document.createElement("div")
        el.className = "menu-card"

        el.innerHTML = `
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <h4>${item.price} MWK</h4>
            <button data-id="${item.id}">Add</button>
        `

        container.appendChild(el)
    })

    bindButtons()
}

function bindButtons() {
    document.querySelectorAll(".menu-card button").forEach(btn => {
        btn.addEventListener("click", e => {
            const id = e.target.dataset.id
            addToCart(id)
        })
    })
}

function addToCart(id) {
    const item = state.menu.find(i => i.id == id)
    const existing = state.cart.find(i => i.id == id)

    if (existing) {
        existing.quantity += 1
    } else {
        state.cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        })
    }

    renderCart()
}

function removeFromCart(id) {
    state.cart = state.cart.filter(i => i.id != id)
    renderCart()
}

function renderCart() {
    const container = document.getElementById("cart")
    const totalEl = document.getElementById("total")

    container.innerHTML = ""

    let total = 0

    state.cart.forEach(item => {
        total += item.price * item.quantity

        const el = document.createElement("div")
        el.className = "cart-item"

        el.innerHTML = `
            <span>${item.name}</span>
            <span>${item.quantity}</span>
            <span>${item.price * item.quantity} MWK</span>
            <button data-id="${item.id}">Remove</button>
        `

        container.appendChild(el)
    })

    totalEl.innerText = total + " MWK"

    document.querySelectorAll(".cart-item button").forEach(btn => {
        btn.addEventListener("click", e => {
            removeFromCart(e.target.dataset.id)
        })
    })
}

async function submitOrder() {
    if (state.cart.length === 0) return

    const order = {
        items: state.cart.map(item => ({
            menuItemId: item.id,
            quantity: item.quantity
        }))
    }

    await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })

    state.cart = []
    renderCart()
}

function init() {
    document.getElementById("checkout").addEventListener("click", submitOrder)
    getMenu()
}

init()