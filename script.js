const submitBtn = document.getElementById("submitBtn")
const listBox = document.getElementById("list_box")

const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []

console.log(itemsArray)

submitBtn.addEventListener("click" , () => {
    var client = {
        name:"",
        document:"",
        clientType:"",
        postalCode:"",
        adress:"",
        houseNumber:"",
        complement:"",
        city:"",
        tel:"",
        email:"",
        lastPrice:""
    }

    client.name = document.getElementById("name").value
    client.document = document.getElementById("document").value
    client.clientType = document.getElementById("clientType").value
    client.postalCode = document.getElementById("postalCode").value
    client.adress = document.getElementById("adress").value
    client.houseNumber = document.getElementById("houseNumber").value
    client.complement = document.getElementById("complement").value
    client.city = document.getElementById("city").value
    client.tel = document.getElementById("tel").value
    client.email = document.getElementById("email").value
    client.lastPrice = document.getElementById("lastPrice").value

    const item = client
    createItem(item)
})

function displayItems() {
    let items = ""
    for (let i = 0 ; i < itemsArray.length; i++){
        items += `<div class="item_box">
        <div class="item_left">
            <p class="clientType">${itemsArray[i].clientType}</p>
            <div class="item_title">
                <span>${itemsArray[i].name}</span>
                <span>${itemsArray[i].document}</span>
            </div>
            <div class="item_details">
                <span>${itemsArray[i].adress}, <span>${itemsArray[i].houseNumber}</span> <span>|</span> <span>${itemsArray[i].city}</span> <span> - </span></span><strong><span> ${itemsArray[i].postalCode}</span></strong><br>
                <span>${itemsArray[i].tel}</span> <span> | </span>  
                <span>${itemsArray[i].email}</span><br>
                <span>Último Valor </span><strong><span>R$</span><span class="lastPrice">${itemsArray[i].lastPrice}</span></strong>
            </div>
        </div>
        <div class="item_right">
            <div class="item_remove_btn">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </div>
            <div class="item_print_btn" id="item_print_btn">
            <span class="material-symbols-outlined">
                print
            </span>
        </div>
        </div>
    </div>`
    }
    listBox.innerHTML = items
    activateDeleteListeners()
    activatePrintListners()
}

function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".item_remove_btn")
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () => { deleteItem(i) })
    })
}

function activatePrintListners(){
    let printBtn = document.querySelectorAll(".item_print_btn")
    printBtn.forEach((db, i) => {
        db.addEventListener("click", () => { printItem(i) })
    })
}

function deleteItem(i) {
    itemsArray.splice(i, 1)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
}

function printItem(i) {

    const printLabel = document.getElementById("printLabel")
    printLabel.style.display = "block"

    let printName = document.getElementById("printName")
    let printDocument = document.getElementById("printDocument")
    let printClientType = document.getElementById("printClientType")
    let printPostalCode = document.getElementById("printPostalCode")
    let printAdress = document.getElementById("printAdress")
    let printHouseNumber = document.getElementById("printHouseNumber")
    let printComplement = document.getElementById("printComplement")
    let printCity = document.getElementById("printCity")
    let printTel = document.getElementById("printTel")
    let printEmail = document.getElementById("printEmail")
    let printLastPrice = document.getElementById("printLastPrice")

    printName.innerText = itemsArray[i].name
    printDocument.innerText = itemsArray[i].document
    printClientType.innerText = itemsArray[i].clientType
    printPostalCode.innerText = itemsArray[i].postalCode    
    printAdress.innerText = itemsArray[i].adress
    printHouseNumber.innerText = itemsArray[i].houseNumber
    printComplement.innerText = itemsArray[i].complement
    printCity.innerText = itemsArray[i].city
    printTel.innerText = itemsArray[i].tel
    printEmail.innerText = itemsArray[i].email
    printLastPrice.innerText = "R$ " + itemsArray[i].lastPrice
}

document.onkeydown = function(evt) {

    const printLabel = document.getElementById("printLabel")

    evt = evt || window.event;
    if (evt.keyCode == 27) {
        printLabel.style.display = "none"
    }
};

function createItem(item){
    itemsArray.push(item)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
}

window.onload = function() {
    displayItems()
}