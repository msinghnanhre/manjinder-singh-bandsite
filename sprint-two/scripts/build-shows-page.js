//parent container for all the cards
const main = document.querySelector(".shows")


let bookingArray = [
    {
        date: "Mon Sept 06 2021",
        venue: "Ronald Lane",
        location: "San Francisco, CA"
    },
    {
        date: "Tue Sept 21 2021",
        venue: "Pier 3 East",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Oct 15 2021",
        venue: "View Lounge",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Nov 06 2021",
        venue: "Hyatt Agency",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Nov 262021",
        venue: "Moscow Center",
        location: "San Francisco, CA"
    },
    {
        date: "Wed Dec 15 2021",
        venue: "Press Club",
        location: "San Francisco, CA"
    },
]

const createChildWithText = (element, className) => {
    return (content) => {
        let newElement = document.createElement(element);
        newElement.classList.add(className)
        newElement.innerText = content
        return newElement
    }
}


const createParent = (element, className) => {
        let newElement = document.createElement(element);
        newElement.classList.add(className)
        return newElement
}

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


for (let i = 0; i < bookingArray.length; i++) {
    let datetime = bookingArray[i].date
    let venueValue = bookingArray[i].venue
    let locationValue = bookingArray[i].location

    if (i === 0) {
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
    appendToParent(venuePlace(venueValue), venueSection)

    const locationSection = createParent("section", "shows__location")
    appendToParent(locationSection, bookingCard)

    const locationTitle = createChildWithText("h4", "shows__location-title")
    appendToParent(locationTitle("LOCATION"), locationSection)

    const locationCity = createChildWithText("p", "shows__location-city")
    appendToParent(locationCity(locationValue), locationSection)

    const btn = createChildWithText("button", "shows__buy-ticket")
    appendToParent(btn("BUY TICKETS"), bookingCard)

}

const btn = document.querySelectorAll(".shows__buy-ticket").forEach(button => {
    button.addEventListener("click", (e) => {
        console.log(e.path[1].children[1].children[1].innerText)
        //console.log(e)
    })
})






