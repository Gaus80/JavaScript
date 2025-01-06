let price = 20;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];
const arreglo = [
    ['PENNY', 0.01],
    ['NICKEL', 0.05],
    ['DIME', 0.1],
    ['QUARTER', 0.25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100]
];

const cash = document.getElementById("cash");
const btnPurchase = document.getElementById("purchase-btn");
const textoParrafo = document.querySelector(".change-due-class")
const changing = document.getElementById("change-due");

//VALIDAR SI EL DINERO ES SUFICIENTE; NO LO ES; O EXCEDE
function cashEnough(money) {
    let suma = 0;
    cid.forEach((num) => {
        suma += num[1];
    })
    if (money < price) {
        alert("Customer does not have enough money to purchase the item");
    }
    else if (money === price) {
        textoParrafo.style.display = "block";
        changing.textContent = "No change due - customer paid with exact cash";
    }
    else if(suma < money){
        textoParrafo.style.display = "block";
        changing.textContent = "Status: INSUFFICIENT_FUNDS";
    }
}
//FUNCION PRINCIPAL
function calculate (cash){
    const changeDue = cash-price;
 
}


btnPurchase.addEventListener("click", () => {
    const cashValue = parseFloat(cash.value);
    cashEnough(cashValue);
    calculate(cashValue);
})







