//parent container for all the cards
const main = document.querySelector(".shows")

//create child elements with classnames and text inside
const createChildWithText = (element, className) => {
    return (content) => {
        let newElement = document.createElement(element);
        newElement.classList.add(className)
        newElement.innerText = content
        return newElement
    }
}
//create parent element with classnames 
const createParent = (element, className) => {
        let newElement = document.createElement(element);
        newElement.classList.add(className)
        return newElement
}

//append child function code block

function appendToParent(element, parent) {
    parent.appendChild(element)
    return parent
}

//shows section Title element 
const title = createChildWithText("h2", "shows__title")
main.prepend(title("Shows"))

//bookings container 
const bookings = createParent("section", "shows__bookings")
appendToParent(bookings, main)
 

//create shows function 
function createShowsSection(shows) {
    let datetime = new Date(Number(shows.date)).toDateString();

    const bookingCard = createParent("section", "shows__bookings-card")
    appendToParent(bookingCard, bookings)

    const dateSection = createParent("section", "shows__dates")
    appendToParent(dateSection, bookingCard)

    const dateTitle = createChildWithText("h4", "shows__dates-title")
    appendToParent(dateTitle("DATE"), dateSection)

    const dateTime = createChildWithText("p", "shows__dates-time")
    appendToParent(dateTime(datetime), dateSection)

    const venueSection = createParent("section", "shows__venue")
    appendToParent(venueSection, bookingCard)

    const venueTitle = createChildWithText("h4", "shows__venue-title")
    appendToParent(venueTitle("VENUE"), venueSection)

    const venuePlace = createChildWithText("p", "shows__venue-place")
    appendToParent(venuePlace(shows.place), venueSection)

    const locationSection = createParent("section", "shows__location")
    appendToParent(locationSection, bookingCard)

    const locationTitle = createChildWithText("h4", "shows__location-title")
    appendToParent(locationTitle("LOCATION"), locationSection)

    const locationCity = createChildWithText("p", "shows__location-city")
    appendToParent(locationCity(shows.location), locationSection)

    const btn = createChildWithText("button", "shows__buy-ticket")
    btn.id = shows.id;
    appendToParent(btn("BUY TICKETS"), bookingCard)
}


//create Banner Only Runs for first iteration and Hidden For mobile.
function createBanner() {
        const bookingCardBanner = createParent("section", "shows__bookings-card--banner")
        appendToParent(bookingCardBanner, bookings)

        const dateBanner = createChildWithText("h4", "shows__dates--banner")
        appendToParent(dateBanner("DATE"), bookingCardBanner)

        const venueBanner = createChildWithText("h4", "shows__venue--banner")
        appendToParent(venueBanner("VENUE"), bookingCardBanner)

        const locationBanner = createChildWithText("h4", "shows__location--banner")
        appendToParent(locationBanner("LOCATION"), bookingCardBanner)

        const btnHidden = createChildWithText("button", "shows__buy-ticket--hidden")
        appendToParent(btnHidden("BUY TICKETS"), bookingCardBanner)   
}


const url = "https://project-1-api.herokuapp.com"

const apiKey = "?api_key=71c14d6b-28b0-47ff-a180-81d9a00d3c21";

function getShows() {
    axios.get(`${url}/showdates${apiKey}`)
        .then(response => {
            response.data.forEach((item, index) => {
                if (index === 0) {
                    createBanner();
                } else {
                    createShowsSection(item);
                }
            })
            //event listener for Buy Ticket button which console log the venue name

                const buyButton = document.querySelectorAll(".shows__buy-ticket").forEach(button => {
                button.addEventListener("click", (e) => {
                    let current = e.target;
                    console.log(current.parentNode.childNodes[1].innerText)
                })
            })
      })
}

//loads the shows data from API when page is loaded.
getShows()
