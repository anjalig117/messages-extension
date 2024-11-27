let category = ["Birthday", "Anniversary", "Compliment", "Diwali"]
const language = ['English', 'Hindi']
let greetings = []  // structure { category: '', language: '', message: '', source: ''}

const catOption = document.getElementById("datalistOptions")
const categoryInp = document.getElementById("category")
const languageSelect = document.getElementById("language-select")
const messageText = document.getElementById("message-textarea")
const saveBtn = document.getElementById("save-btn")
const showGreetingEl = document.getElementById("show-greetings")

function renderCat(){
    let options = ''
    for(let i = 0; i < category.length; i++){
        options += `<option value = ${category[i]}>`
    }

    catOption.innerHTML = options
}

languageSelect.addEventListener("change", function(){
    // console.log(categoryInp.value)
    if (categoryInp.value != '' && (!category.includes(categoryInp.value))){
        category.push(categoryInp.value)
        renderCat()
    }
})

saveBtn.addEventListener("click", function(){
    // pending - check for validations
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    //     let item = { category: categoryInp.value, language: languageSelect.value, message: messageText.value, source: tabs[0].url}
    //     greetings.push(item)

    //     // clear the form
    //     categoryInp.value = ''
    //     messageText.value = ''
    //     languageSelect.value = 'Select language'
    //     renderGreetings()
    // })
    let item = { category: categoryInp.value, language: languageSelect.value, message: messageText.value, source: window.location.toString()}
    greetings.push(item)

    // clear the form
    categoryInp.value = ''
    messageText.value = ''
    languageSelect.value = 'Select language'
    renderGreetings()
})

function renderGreetings(){
    let greeting = ''
    for (let i = 0; i < greetings.length; i++){
        let item = greetings[i]
        let msg = item.message
        greeting += `
            <div class="card mb-3">
                <div class="card-header">
                    <div class = "d-flex justify-content-between">
                        <div class = "col-md-6">
                            <h5 class="card-title badge text-bg-primary">${item.category}</h5>
                            <span class="badge text-bg-warning">${item.language}</span>
                        </div>
                        <div class = "col-md-6 text-align-end">
                            <button type="button" class="btn btn-primary btn-sm" onclick = "copyMessage('${msg}')">Copy</button>
                            <button type="button" class="btn btn-danger btn-sm" onclick = "deleteMessage('${i}')">Delete</button>
                        </div>
                    </div>
                </div>
                <div class="card-body">

                    <a class = "nav-link" href = ${item.source} target = "_blank"><p class="card-text">${item.message}</p></a>
                </div>
            </div>
        `
    }
    showGreetingEl.innerHTML = greeting
}

function copyMessage(msg){
    navigator.clipboard.writeText(msg);
}

function deleteMessage(indexe){
    if (indexe > -1){
        greetings.splice(indexe, 1)
        renderGreetings()
    }
}


renderCat()
renderGreetings()