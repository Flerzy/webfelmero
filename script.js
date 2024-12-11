getData("https://raw.githubusercontent.com/mkatay/json_ingatlanok/refs/heads/main/ingatlanok", renderFn)

let ingatlanok = []
let types = []

function renderFn(data){
    ingatlanok = data
    console.log(ingatlanok)
    types = getUniqueValues(ingatlanok, "category")
    types.forEach(element =>{
        document.querySelector(".categories").innerHTML += 
        `
        <div class="category" id="${element}">${element}</div>
        `
    })
    let categs = document.querySelectorAll(".category")
    
    //kattintasra figyeles
    categs.forEach(element =>{
        element.addEventListener("click", () =>{
            selectedToggle(element, categs)
            
            renderCards(ingatlanok, element.id)
        })    
    })

}

function selectedToggle(element, arr){
    arr.forEach(n =>{
        if(n.classList.contains("selected")){
            n.classList.toggle("selected")
        }
    })
    element.classList.toggle("selected")
}



function renderCards(data, categ){
    const urlPhoto='https://raw.githubusercontent.com/mkatay/JF_Kando_vizsga_forras/refs/heads/master/public/'
    const arr = data.filter(n => n.category == categ)
    const cardsDiv = document.querySelector(".cards")
    cardsDiv.innerHTML = ""
    arr.forEach(element =>{
        cardsDiv.innerHTML += 
        `
            <div class="card">
                <div class="cardImg">
                <img src="${urlPhoto + element.imageUrl}" alt="">
                </div>
                <div class="cardData">
                <p><strong>Elado: ${element.sellerName}</strong></p>
                <p>Terulete:<strong>${element.area}</strong>  Szobak szama:<strong>${element.rooms}</strong> </p>
                <p>A hirdetes feladasi datuma:<strong>${element.createAt}</strong></p>
                </div>
                <div class="cardCategory">
                <p>${element.category}</p>
                </div>
            </div>

        `
    })
}
