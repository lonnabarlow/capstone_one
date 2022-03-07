


const homeButton = document.querySelector("#home") 

const mainContainer = document.querySelector(".main-container")
const tripMain = document.querySelector(".trip-main")
const tripGallery = document.querySelector("#trip-gallery")


homeButton.addEventListener('click', () => {
    mainContainer.style.display = "block";
    tripMain.style.display = "none";
});

function addEventListeners() {
    const divs = document.querySelectorAll(".img-cont")
    divs.forEach(el => {
        el.addEventListener('click', (e) => {
            console.log(e.target.id)
            tripId = e.target.id
            axios
                .get(`/trip/${tripId}`)
                .then(res => addToTripView(res.data))
                mainContainer.style.display = "none";
                tripMain.style.display = "block";
        })
    })
}


function loadTrips() {
    axios.get("/trips")
    .then(res => {
        tripGallery.innerHTML = null;
        const dataArr = res.data
        console.log(dataArr)
        if (dataArr.length === 0) {
            const p = document.createElement('p');
            const t = document.createTextNode("Response came back with no results!");
            p.appendChild(t);

            tripGallery.appendChild(p)
        } else {
            dataArr.forEach(item => {
                const galDiv = document.createElement('div');
                galDiv.classList.add("gallery");
                const imgDiv = document.createElement('div');
                imgDiv.classList.add("img-cont");
                imgDiv.setAttribute('id', item.id)
                imgDiv.style.backgroundImage = `url('${item.image_url}')`;
                galDiv.appendChild(imgDiv);
                    console.log(item)
                tripGallery.appendChild(galDiv)
            })
            addEventListeners();
        }
    })
}
loadTrips()

function oneTrip() {
    axios.get("/trip/:id")
        .then(res => {
        tripGallery.innerHTML = null;
        const dataArr = res.data
        console.log(dataArr)
        })

}
function getAlert(){
    alert("Under construction come back later")
}
const alertOn = document.querySelector(".alert")
alertOn.addEventListener("click", getAlert)

function newAlert() {
    alert("Sorry, we are working on it")
}
const alertTwo = document.querySelector("#alertbox")
alertTwo.addEventListener("click", newAlert)



// axios.delete('url', { data: payload }).then()


function addToTripView(){
    console.log("Add trip info")
}