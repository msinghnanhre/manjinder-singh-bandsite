const formUserName = document.querySelector(".username-input")
//console.log(formUserName)

//importing global date variable
let time = new Date();
let comment = document.querySelector(".social-container__comments")

//comment array object
let commentArray = [
    {
        fullName: "Manj",
        timestamp: [time.getMonth(), time.getDate(), time.getFullYear()],
        comment: " This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
        {
        fullName: "Doruk",
        timestamp: [time.getMonth(), time.getDate(), time.getFullYear()],
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },    {
        fullName: "Ed",
        timestamp: [time.getMonth(), time.getDate(), time.getFullYear()],
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    },
]

//default handler function
function defaultHandler() {
        for (let i = 0; i < commentArray.length; i++){
        let defaultComments = createCommentCard(commentArray[i])
        comment.appendChild(defaultComments)
    }
}

//Default comments load up when page first loads
window.addEventListener("load", defaultHandler)

// Create Element with Classname Function
function createComment(element, className) {
    let el = document.createElement(element)
    el.classList.add(className)
    return el
    
}


//create comment section fo reach entry on comment Array
function createCommentCard(commentArray) {
    
    //create comment article
    let commentArticle = createComment("article", "comment")
    // comment.appendChild(commentArticle)

    //create avatar div
    let avatar = createComment("div", "comment__avatar")
    commentArticle.appendChild(avatar)

    //comment section container for name date and comment text
    let commentContainer = createComment("section", "comment__container")
    commentArticle.appendChild(commentContainer)

    let commentNameDate = createComment("section", "comment__name-date")
    commentContainer.appendChild(commentNameDate)

    let commentName = createComment("h4", "comment__name")
    commentName.innerText = commentArray.fullName
    commentNameDate.appendChild(commentName)

    let commentDate = createComment("span", "comment__date")
    let month = time.getMonth()
    let day = time.getDate()
    let year = time.getFullYear()
    commentDate.innerText = (month + "/" + day + "/" + year)
    commentNameDate.appendChild(commentDate)

    let commentText = createComment("p", "comment__text")
    commentText.innerText = commentArray.comment
    commentContainer.appendChild(commentText)

    return commentArticle
}

//function displayComment(item){
//
//}

//loop over
function displayComment(commentObj) {
    comment.innerHTML = ""

    commentObj.forEach((item) => {
    let newComment = createCommentCard(item)
    comment.appendChild(newComment)
    })

}

//push new comment to array object through form entry
let submitForm = document.querySelector(".user")

function handleSubmit(e){

    e.preventDefault()

    if (e.target.username.value === "") {
        const userNameInput = document.querySelector(".username-input")
        userNameInput.classList.add("error-state")
        
    } else if (e.target.usercomment.value === "") {
        const commentInput = document.querySelector(".comment-input")
        commentInput.classList.add("error-state")
    }
     else {
        let newComment = {
            fullName: e.target.username.value,
            comment: e.target.usercomment.value 
        }

        commentArray.unshift(newComment)
        displayComment(commentArray)
    }


    submitForm.reset()  
}

submitForm.addEventListener("submit", handleSubmit)

// const formUserName = document.querySelector("username-input")
// formUserName.addEventListener("click", (e) => {
//     formUserName.styles.border = "1px solid red";
// })


