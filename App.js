const buttons = document.querySelectorAll(".filterBtns>button");
const input = document.querySelector(".searchBox>input");
const searchBtn = document.querySelector(".searchBtn");
const result = document.querySelector(".result");

buttons.forEach((button) => {
  button.addEventListener("click", (el) => {
    activateBtn(el);
  });
});

let active = "";
function activateBtn(el) {
  if (el.target && !el.target.classList.contains("activate")) {
    if (document.querySelector(".activate")) {
      document.querySelector(".activate").classList.remove("activate");
    }
    el.target.classList.add("activate");
    active = el.target.classList[0];
  } else {
    el.target.classList.remove("activate");
    active = "";
    input.value="";
    result.innerHTML="";
    result.innerHTML=defaultElement();
  }
}
searchBtn.addEventListener("click", () => {
  if (active === "") {
    alert("Please select place or city or name.");
    return;
  }
  if (input.value === "") {
    alert("Please enter something.");
    return;
  }
    fetch("https://isro.vercel.app/api/centres")
    .then((response) => {
        if(response.ok){
            return response.json();
        }
        throw new Error(`${response.status}`);
      })
      .then((response) => {
        let IsMatching = false;
        result.innerHTML = "";
        response.centres.forEach((el) => {
          //.toLowerCase() == `${input.value}`.toLowerCase()
          if (el[`${active}`].toLowerCase().includes(input.value.toLowerCase())){
            // console.log(el);
            result.innerHTML += createEl(el);
            IsMatching = true;
          }
        });
        if (!IsMatching) {
          input.value = "";
          result.innerHTML = "<div style='color:red'>Match not found!</div>";
        }
    })
    .catch((err)=>{
        result.innerHTML = `<div style='color:red'>${err}</div>`
    });
});

function createEl(el) {
  let ele = `<div class="searchItems"><div class="center"><h4>CENTER</h4><p>${el.name}</p></div><div class="city"><h4>CITY</h4><p>${el.Place}</p>
    </div>
    <div class="state">
        <h4>STATE</h4>
        <p>${el.State}</p>
    </div>
</div>`;
  return ele;
}
const defaultItems=[
    {
        name:"Western RRSC",
        Place:"Jodhpur",
        State:"Rajasthan"
    },
    {
        name:"Space Applications Centre",
        Place:"Ahmedabad",
        State:"Gujrat"
    },
    {
        name:"Vikram Sarabhai Space centre",
        Place:"Tiruvananthapuram",
        State:"Kerala"
    }
];
window.onload=()=>{
    result.innerHTML=defaultElement();
}
function defaultElement(){
    let el="";
    for(let i=0;i<defaultItems.length;i++){
        el+=createEl(defaultItems[i]);
    }
    return el;
}
