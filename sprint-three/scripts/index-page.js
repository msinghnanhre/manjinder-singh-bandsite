const formUserName = document.querySelector(".username-input")
let comment = document.querySelector(".social-container__comments")

//get comments from apiKey
let apiKey = "?api_key=cc10a9fb-eb90 - 4952 - 972c - 7c642bea33d6";
//api URL
let url = "https://project-1-api.herokuapp.com";
//header for post request
const options = {
    headers: { 'Content-Type': 'application/json' }
};

// //Default comments load up when page first loads
window.addEventListener("load", getSample())

// // Create Element with Classname Function
function createComment(element, className) {
    let el = document.createElement(element)
    el.classList.add(className)
    return el
}

//create comment section function name
function commentSection(comments) {
    let commentArticle = createComment("article", "comment")

    //create avatar div
    let avatar = createComment("div", "comment__avatar")
    commentArticle.appendChild(avatar)

    //comment section container for name date and comment text
    let commentContainer = createComment("section", "comment__container")
    commentArticle.appendChild(commentContainer)

    let commentNameDate = createComment("section", "comment__name-date")
    commentContainer.appendChild(commentNameDate)

    let commentName = createComment("h4", "comment__name")
    commentName.innerText = comments.name
    commentNameDate.appendChild(commentName)

    let commentDate = createComment("span", "comment__date")
    let datetime = new Date(comments.timestamp).toLocaleDateString("en-us", { day: "2-digit", month: "2-digit", year: "numeric" })

    commentDate.innerText = datetime;
    commentNameDate.appendChild(commentDate)

    let commentText = createComment("p", "comment__text")
    commentText.innerText = comments.comment
    commentContainer.appendChild(commentText)

    // comments action Buttons
    let commentLikeSection = createComment("section", "comment__like-section")

    let commentLikeIcon = createComment("img", "comment__like-icon")
    commentLikeIcon.setAttribute("src", "../assets/icons/SVG/icon-like.svg")


    let commentLikes = createComment("button", "comment__likes")
    commentLikes.innerText = comments.likes
    commentLikes.id = comments.id
    commentLikeSection.appendChild(commentLikeIcon)
    commentLikeSection.appendChild(commentLikes)

    //delete button elements 
    const deleteSection = createComment("section", "comment__delete-section")

    let commentDelete = createComment("button", "comment__delete")
    commentDelete.innerText = "Delete"
    commentDelete.id = comments.id;

    let commentDeleteIcon = createComment("img", "comment__delete-icon")
    commentDeleteIcon.setAttribute("src", "../assets/icons/SVG/icon-delete.svg")

    deleteSection.appendChild(commentDelete)
    deleteSection.appendChild(commentDeleteIcon)

    let commentBtns = createComment("section", "comment__buttons")
    commentBtns.appendChild(commentLikeSection)
    commentBtns.appendChild(deleteSection)

    commentContainer.appendChild(commentBtns)
    comment.appendChild(commentArticle)
}

//push new comment to array object through form entry
let submitForm = document.querySelector(".user")

//import individual username and comment input section to deal with error state
const userNameInput = document.querySelector(".username-input")
const commentInput = document.querySelector(".comment-input")

function handleSubmit(e){
    e.preventDefault()

    if (e.target.usercomment.value === "" && e.target.username.value === "") {
        userNameInput.classList.add("error-state")
        commentInput.classList.add("error-state")
    }

    else if (e.target.username.value && e.target.usercomment.value === "") {
        commentInput.classList.add("error-state")
        e.target.username.preventDefault()
 
    } else if (e.target.usercomment.value && e.target.username.value === "") {
        userNameInput.classList.add("error-state")
        e.target.usercomment.preventDefault()
    }

    else {
        axios.post(`${url}/comments${apiKey}`,
            {
            "name": e.target.username.value,
            "comment": e.target.usercomment.value,
            },
            options)
            .then(response => {
                comment.innerHTML = " "
                e.preventDefault()
                getSample()
            })
            .catch(result => {
                console.log(result)
        })
    }
    submitForm.reset()  
}

submitForm.addEventListener("submit", handleSubmit)

//load all the comments from api

function getSample() {
    axios.get(`${url}/comments${apiKey}`)
    .then(function (response) {
        response.data.reverse().forEach(comments => {
            commentSection(comments)
        })
        
        //update likes
        const likes = document.querySelectorAll(".comment__likes")
        likes.forEach(button => {
            button.addEventListener("click", (e) => {
                const id = e.target.id
                axios.put(`${url}/comments/${id}/like${apiKey}`)
                    .then(response => {
                        e.preventDefault()
                        comment.innerHTML = ""
                        getSample()                     
                    })
                })
            })
        
        //delete comments
        const deleteComment = document.querySelectorAll(".comment__delete")
        deleteComment.forEach(item => {
            item.addEventListener("click", (e) => {
                const id = e.target.id
                axios.delete(`${url}/comments/${id}${apiKey}`, options)
                    .then(response => {
                        comment.innerHTML = ""
                        getSample()                       
                })
            })
            })       
    })
    
}




