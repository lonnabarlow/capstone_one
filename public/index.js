


const homeButton = document.querySelector("#home") 

const mainContainer = document.querySelector(".main-container")
const tripMain = document.querySelector(".trip-main")
const tripGallery = document.querySelector("#trip-gallery")


homeButton.addEventListener('click', () => {
    mainContainer.style.display = "block";
    tripMain.style.display = "none";
});

function formSubmit() {
    const tripForm = document.querySelector("#trip-form")
    // const formData = new FormData(tripForm)
    const formData = {
        location: document.querySelector('#location').value ,
        dates: document.querySelector('#dates').value,
        name: document.querySelector('#tname').value,
        image_url: document.querySelector('#image1').value
    }
    

    axios
    .post('/trips', formData,{
        headers: {
          'Content-Type': 'Application/json'
        }})
    .then(res => console.log(res.data))
}

function addEventListeners() {
    const divs = document.querySelectorAll(".img-cont")
    divs.forEach(el => {
        el.addEventListener('click', (e) => {
            console.log(e.target.id)
            tripId = e.target.id
            mainContainer.style.display = "none";
            tripMain.style.display = "block";
            axios
                .get(`/trip/${tripId}`)
                .then(res => addToTripView(res.data))
                
        })
    })

    const formListen = document.querySelector(".form-btn")
    formListen.addEventListener("click", formSubmit)

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


function addToTripView(data){

    // ADD DATES
    const date_div = document.getElementById('travel_dates')
    console.log(data)

    date_div.innerHTML = new Date(data.start_date).toLocaleDateString() + ' - ' + new Date(data.end_date).toLocaleDateString();


    // ADD IMG


    // ADD JOURNAL


    // queryselector
    // put data into divs
    console.log("Add trip info")


}

