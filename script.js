'use strict'

const account1={
    owner:'277pawan',
    movements:[200,500,-100,10000,-500,600,200,-20,-100,1300],
    insterstRate:1.8,
    pin:1111,
};
const account2={
    owner:'Pradeep Script',
    movements:[5000,-2000,100,200,-300,-30,50,100,2000],
    insterstRate:1.5,
    pin:2222,

};
const account3={
    owner:'Pradeepto Pal',
    movements:[200,200,-100,100000,-300,600,200,-20,-100,1300],
    insterstRate:1.8,
    pin:3333,
};
const account4={
    owner:'Sweety Gaur',
    movements:[4000,5000,-2000,100,200,-300,-30,50,100,2000],
    insterstRate:1.5,
    pin:4444,

};
const account5={
    owner:'Shivani Negi',
    movements:[800,700,-100,1000,-500,600,-100,-20,2300,-200,5300],
    insterstRate:1.8,
    pin:6666,
};

const accounts = [account1, account2, account3, account4,account5];

// Elements
const carder=document.querySelector(".loader");
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements=function(movements,sort=false){
    containerMovements.innerHTML=" ";
    
    const mov=sort?movements.slice().sort((a,b)=>a-b):movements;
    mov.forEach(function(mov,i){
        const type=mov>0 ?'deposit':'withdrawal';
        const html=` 
        <div class="movements__row">
        <div class="movements__type
        movements__type--${type}"> ${i+1} ${type}</div>
         
        <div class="movements__value">${mov} Rs</div>
      </div>
      `;
      containerMovements.insertAdjacentHTML("afterbegin",html);
    });
};

// displayMovements(account1.movements);
let getter=new Date();
const year=getter.getFullYear();
const month=getter.getMonth()+1;
const day=getter.getDay();
console.log(year,month,day);
labelDate.innerHTML=day+"/"+month+"/"+year;

const calcprintbalance=function(acc){
    acc.balance=acc.movements.reduce((acc,cur)=>acc+cur,0);
   labelBalance.innerHTML=acc.balance+"Rs.";
};
// calcprintbalance(account1.movements);




const calcprintsummary=function(acc){
    const income=acc.movements.filter(mov=>mov>0)
    .reduce((acc,mov)=>acc+mov,0);
    labelSumIn.innerHTML=income+"Rs.";

    const out=acc.movements.filter(mov=>mov<0)
    .reduce((acc,mov)=>acc+mov,0);
    labelSumOut.innerHTML=out+"Rs.";
    
    const interest=acc.movements.filter(mov=>mov>0)
    .map(deposit=>(deposit*1.2)/100)
    .filter((int,i,arr)=>{
        return int >=1;
    })
    .reduce((acc,int)=>acc+int,0);
    let rounded=interest.toFixed(3);
    labelSumInterest.innerHTML=rounded+"Rs.";
}
// calcprintsummary(account1.movements);

//
const username =function(accs)
{
accs.forEach(accs=> {
accs.name=accs.owner.toUpperCase().
split(' ').map(name=>name[0]).join("");
});
}
username(accounts);
const updateUI=function(accs)
{
    displayMovements(accs.movements);

    calcprintbalance(accs);

    calcprintsummary(accs);
}

let currentaccount;
btnLogin.addEventListener('click',function(e){
    e.preventDefault();

    currentaccount=accounts.find(
        acc=>acc.owner===inputLoginUsername.value);
        console.log(currentaccount);

        if(currentaccount?.pin===Number(inputLoginPin.value))
        {
            carder.classList.add("hidden");    
            labelWelcome.textContent="Welcome Back,"
            +(currentaccount.owner);
        containerApp.style.opacity=1;

        inputLoginUsername.value="";
        inputLoginPin.value="";


     

updateUI(currentaccount);
        }
})

btnTransfer.addEventListener('click',function(e)
{
    e.preventDefault;
})

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
      acc => acc.owner === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = '';
  
    if (amount > 0 &&receiverAcc &&currentaccount.balance >= amount &&
      receiverAcc?.owner !== currentaccount.owner
    ) {
      // Doing the transfer
      currentaccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
  
      // Update UI
      updateUI(currentaccount);
    }
  });


btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
  
    const amount = Number(inputLoanAmount.value);
  
    if (amount > 0 && currentaccount.movements.some(mov => mov >= amount * 0.1)) {
      // Add movement
      currentaccount.movements.push(amount);
  
      // Update UI
      updateUI(currentaccount);
    }
    inputLoanAmount.value = '';
  });


  btnClose.addEventListener('click', function (e) {
    e.preventDefault();
  
    if (
      inputCloseUsername.value === currentaccount.owner &&
      Number(inputClosePin.value) === currentaccount.pin
    ) {
      const index = accounts.findIndex(
        acc => acc.owner === currentaccount.owner
      );
      console.log(index);
      // .indexOf(23)
  
      // Delete account
      accounts.splice(index, 1);
  
      // Hide UI
      containerApp.style.opacity = 0;
carder.classList.remove("hidden");

    }
  
    inputCloseUsername.value = inputClosePin.value = '';


  });
  
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


// console.log(movements);

let sort=false;
btnSort.addEventListener('click',function(e){
    e.preventDefault();
    displayMovements(currentaccount.movements,!sort);
    sort=!sort;
});


labelBalance.addEventListener('click',function()
{
    [...document.querySelectorAll('.movements__row')].
    forEach(function(row,i){
        if(i%2===0)
        {
            row.style.backgroundColor='lightgreen';
        }
        else
        {
            row.style.backgroundColor='blue';
        }

        
    });

    });








// Challenge 1

// const calcAveragehuman=function(ages){
    
//     const humanage=ages.map(age=>age<=2?2*age:16+age*4);
// const adults=humanage.filter(age=>age=18);
// console.log(humanage);

// console.log(adults);

// const averageadult=adults.reduce((acc,i)=>acc+i,0)/adults.length;
// return averageadult;
// }

// const avg1 = calcAveragehuman([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAveragehuman([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1);
// console.log(avg2);

// Challenge 2

// const firstwithdrawl=movements.find(mov=>mov<0);
// console.log(movements);
// console.log(firstwithdrawl);

// console.log(accounts);
// const findaccount=accounts.find(acc=>acc.owner==='277pawan');
// console.log(findaccount);














