const formUserName = document.querySelector(".username-input")

let comment = document.querySelector(".social-container__comments")

//get comments from apiKey

let apiKey = "cc10a9fb-eb90 - 4952 - 972c - 7c642bea33d6";

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
        usercomment.classList.remove("error-state")
        e.target.usercomment.preventDefault()
    }

    else {
        axios.post("https://project-1-api.herokuapp.com/comments?api_key=cc10a9fb - eb90 - 4952 - 972c - 7c642bea33d6",
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
                //console.log(result)
        })
    }
    submitForm.reset()  
}

submitForm.addEventListener("submit", handleSubmit)



function getSample() {

    axios.get("https://project-1-api.herokuapp.com/comments?api_key=cc10a9fb - eb90 - 4952 - 972c - 7c642bea33d6")
    .then(function (response) {
        //console.log(response.data)
        response.data.slice().reverse().forEach(comments => {
            
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
                commentName.innerText = comments.name
                commentNameDate.appendChild(commentName)

                let commentDate = createComment("span", "comment__date")
                // // let month = time.getMonth()
                // // let day = time.getDate()
                // // let year = time.getFullYear()
                let datetime = new Date(comments.timestamp).toLocaleDateString("en-us", { day: "2-digit", month: "2-digit", year: "numeric" })
            
                // new Date(comments.timestamp).toLocaleDateString("en-us", { day: "2-digit", month: "2-digit", year: "numeric" })
                //let  myDateString = datetime.getDate() + '/' + (datetime.getMonth()+1) + '/' + datetime.getFullYear();
                //  console.log(myDateString)
                // let dateFormatted = `${datetime.getFullYear()} / ${datetime.getDay()} / ${datetime.getDate()}`
                commentDate.innerText = datetime;
                // commentNameDate.appendChild(commentDate)
                
                commentNameDate.appendChild(commentDate)

                let commentText = createComment("p", "comment__text")
                commentText.innerText = comments.comment
                commentContainer.appendChild(commentText)
            
                // comments action Buttons

                let commentLikes = createComment("button", "comment__likes")
                commentLikes.innerText = comments.likes
                commentLikes.id = comments.id
                commentLikes.classList.add("far")
            commentLikes.classList.add("fa-thumbs-up")
            
            let commentDelete = createComment("button", "comment__delete")
            commentDelete.innerText = "Delete"
            commentDelete.id = comments.id;
            

            let commentBtns = createComment("section", "comment__buttons")
            commentBtns.appendChild(commentLikes)
            commentBtns.appendChild(commentDelete)

            commentContainer.appendChild(commentBtns)
                

            comment.appendChild(commentArticle)
            
         })  
        //update likes
        const likes = document.querySelectorAll(".comment__likes")
        //console.log(likes)
        likes.forEach(button => {
            button.addEventListener("click", (e) => {
                const id = e.target.id
                console.log(e.target.id)
                axios.put(`https://project-1-api.herokuapp.com/comments/${id}/like?api_key=cc10a9fb - eb90 - 4952 - 972c - 7c642bea33d6`)
                    .then(response => {
                        //console.log(response)
                        comment.innerHTML = ""
                        //e.preventDefault()
                        getSample()
                    })
            })
        })
        
        //delete comments
        const deleteComment = document.querySelectorAll(".comment__delete")
        deleteComment.forEach(item => {
            item.addEventListener("click", (e) => {
                const id = e.target.id
                axios.delete(`https://project-1-api.herokuapp.com/comments/${id}?api_key=cc10a9fb - eb90 - 4952 - 972c - 7c642bea33d6`, options)
                    .then(response => {
                        console.log(response)
                        comment.innerHTML = ""
                        //e.preventDefault()
                        getSample()
                        
                })
            })
        })
        
    })
}



// axios.get("https://project-1-api.herokuapp.com/comments?api_key=cc10a9fb - eb90 - 4952 - 972c - 7c642bea33d6")
//     .then(response => {
//         console.log(response)
//         const likes = document.querySelectorAll(".comment__likes")
//         likes.forEach(button => {
//             button.addEventListener("click", (e) => {
//                 const id = e.target.id
//                 console.log(e.target.id)
//                 axios.put(`https://project-1-api.herokuapp.com/comments/${id}/like?api_key=cc10a9fb - eb90 - 4952 - 972c - 7c642bea33d6`)
//                     .then(response => {
//                         console.log(response)
//                         comment.innerHTML = ""
//                         e.preventDefault()
//                         getSample()
//                     })
//             })
//     })        
// })



// getSample();


// axios.get("https://project-1-api.herokuapp.com/register")
//     .then(response => {
//     console.log(response)
// })


// var arr = [1, 2, 3, 4, 5];

// arr.slice().reverse().forEach(function (item) {
//         console.log(item);
//     });


// var dateString = "10/23/2015"; // Oct 23

// var dateObject = new Date(dateString);
// console.log(dateObject.getDay().toString())
