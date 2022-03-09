


const homeButton = document.querySelector("#home") 

const mainContainer = document.querySelector(".main-container")
const tripMain = document.querySelector(".trip-main")
const tripGallery = document.querySelector("#trip-gallery")


homeButton.addEventListener('click', () => {
    loadHomePage();
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
    .then(res => loadHomePage())
}

function loadTrip(tripId){
    mainContainer.style.display = "none";
    tripMain.style.display = "block";
    axios
        .get(`/trip/${tripId}`)
        .then(res => addToTripView(res.data))
}

function addEventListeners() {
    const divs = document.querySelectorAll(".img-cont")
    divs.forEach(el => {
        el.addEventListener('click', (e) => {
            loadTrip(e.target.id)
        })
    })

    const formListen = document.querySelector(".form-btn")
    formListen.addEventListener("click", formSubmit)

}

function loadHomePage() {
    mainContainer.style.display = "flex";
    tripMain.style.display = "none";
    loadTrips() 
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
                tripGallery.appendChild(galDiv)
            })
            addEventListeners();
        }
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






function addToTripView(data){

    // ADD DATES
    const date_div = document.getElementById('travel_dates')
    // console.log(data)
    
    date_div.innerHTML = new Date(data.start_date).toLocaleDateString() + ' - ' + new Date(data.end_date).toLocaleDateString();
    
    
    document.getElementById("deleteBtn").addEventListener("click", function(){
        axios.delete('/trip', {data:{id: data.id}}).then(loadHomePage()).catch(err => console.log(err))
    } )
    
    const title_div = document.getElementById('review')
    tname = document.createElement('h2')
    tname.innerHTML = data.name
    title_div.replaceChildren(tname)// .append(data.name)

    // ADD IMG
    const img_div = document.getElementById('second')
    img_div.style.backgroundImage = `url('${data.image_url}')`;

    // ADD JOURNAL
    // Loop through data.journals
    const journal_div = document.getElementById('journal');
    data.journals.forEach(journal => {

        const title = document.createElement('h3')
        title.innerHTML = journal.title
        const jdate = document.createElement('span')

        jdate.innerHTML = new Date(journal.created_at).toLocaleDateString()
        const desc = document.createElement('p')
        desc.innerHTML = journal.description
        journal_div.appendChild(title)
        journal_div.appendChild(jdate)
        journal_div.appendChild(desc)
    })
    // console.log(data)

    

    
    // console.log("Add trip info")


}



loadHomePage();