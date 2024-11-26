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
    if (categoryInp.value != ''){
        category.push(categoryInp.value)
        renderCat()
    }
})

saveBtn.addEventListener("click", function(){
    // pending - check for validations
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    //     // myLeads.push(tabs[0].url)
    //     let item = { category: categoryInp.value, language: languageSelect.value, message: messageText.value, source: window.location.toString()}
    //     greetings.push(item)
    // })
    let item = { category: categoryInp.value, language: languageSelect.value, message: messageText.value, source: window.location.toString()}
    // console.log(item)
    greetings.push(item)
    renderGreetings()
})

function renderGreetings(){
    let greeting = ''
    for (let i = 0; i < greetings.length; i++){
        greeting += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title badge text-bg-primary">${greetings[i].category}</h5>
                    <span class="badge text-bg-warning">${greetings[i].language}</span>
                    <a class = "nav-link" href = ${greetings[i].source} target = "_blank"><p class="card-text">${greetings[i].message}</p></a>
                </div>
            </div>
        `
    }
    showGreetingEl.innerHTML = greeting
}


renderCat()
renderGreetings()