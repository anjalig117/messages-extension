let category = ["Birthday", "Anniversary", "Compliment", "Diwali"]
const language = [{'lang': 'English', color: 'warning'}, {lang: 'Hindi', color: 'success'}]   // ['English', 'Hindi']
let greetings = JSON.parse(localStorage.getItem("greetings")) ? JSON.parse(localStorage.getItem("greetings")) : []  // structure { category: '', language: '', message: '', source: ''}
// let filteredGreet = greetings
let selCat = ''
let selLang = ''

const catOption = document.getElementById("datalistOptions")
const categoryInp = document.getElementById("category")
const languageSelect = document.getElementById("language-select")
const messageText = document.getElementById("message-textarea")
const saveBtn = document.getElementById("save-btn")
const showGreetingEl = document.getElementById("show-greetings")
const categoryFilterEl = document.getElementById("category-filter")

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
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log("tabs are ", tabs)
        let item = { category: categoryInp.value, language: languageSelect.value, message: messageText.value, source: tabs[0].url}
        greetings.push(item)
        localStorage.setItem("greetings", JSON.stringify(greetings))

        // clear the form
        categoryInp.value = ''
        messageText.value = ''
        languageSelect.value = 'English'
        renderGreetings(greetings)
        if (categoryFilterEl.innerHTML === ''){
                renderCategoryFilter()
        }
    })
    // let item = { category: categoryInp.value, language: languageSelect.value, message: messageText.value, source: window.location.toString()}
    // greetings.push(item)
    // localStorage.setItem("greetings", JSON.stringify(greetings))

    // // // filteredGreet = greetings

    // // clear the form
    // categoryInp.value = ''
    // messageText.value = ''
    // languageSelect.value = 'English'
    // renderGreetings(greetings)
    // if (categoryFilterEl.innerHTML === ''){
    //     renderCategoryFilter()
    // }
})

function renderGreetings(greetArray){
    let greet = ''
    if (greetArray.length == 0){
        greet += `<p class = "text-secondary">No ${selLang} ${selCat} greetings saved yet.</p>`
    }
    for (let i = 0; i < greetArray.length; i++){
        let item = greetArray[i]
        let msg = item.message
        greet += `
            <div class="card mb-3">
                <div class="card-header">
                    <div class = "d-flex justify-content-between">
                        <div class = "col-md-6">
                            <h5 class="card-title badge text-bg-primary">${item.category}</h5>
                            <span class="badge text-bg-warning">${item.language}</span>
                        </div>
                        <div class = "col-md-6 text-align-end">
                
                            <button type="button" class="btn btn-primary btn-sm copy-btn" data-msg = '${msg}'>Copy</button>
                            <button type="button" class="btn btn-danger btn-sm delete-btn" data-id = '${i}'>Delete</button>
                        </div>
                    </div>
                </div>
                <div class="card-body">

                    <a class = "nav-link" href = ${item.source} target = "_blank"><p class="card-text">${item.message}</p></a>
                </div>
            </div>
        `
    }
    showGreetingEl.innerHTML = greet
    // console.log(document.querySelectorAll('.copy-btn'))
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.onclick = () => {
            copyMessage(btn.dataset.msg)
        }
    })

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = () => {
            deleteMessage(btn.dataset.id)
        }
    })
}

function copyMessage(msg){
    navigator.clipboard.writeText(msg);
}

function deleteMessage(indexe){
    if (indexe > -1){
        greetings.splice(indexe, 1)
        localStorage.setItem("greetings", JSON.stringify(greetings))
        // filteredGreet = greetings
        renderGreetings(greetings)
    }
}

function renderCategoryFilter(){
    // console.log('render category filter is called')
    let catEl = ''
    for (let i = 0; i < category.length; i++){
        catEl += `
            <span role = "button" class="badge text-bg-primary cat-filter" data-cat = "${category[i]}">${category[i]}</span>
                
        `
    }
    catEl += '<br>'
    for (let i = 0; i < language.length; i++){
        catEl += `<span role = "button" class = "badge text-bg-${language[i].color} lang-filter" data-lang = "${language[i].lang}">${language[i].lang}</span>`
    }
    categoryFilterEl.innerHTML = catEl

    document.querySelectorAll('.cat-filter').forEach(fil => {
        fil.onclick = () => {
            filterGreetings(fil.dataset.cat)
        }
    })

    document.querySelectorAll('.lang-filter').forEach(fil => {
        fil.onclick = () => {
            filterAccLang(fil.dataset.lang)
        }
    })
}

function filterGreetings(cat){
    const filtered = greetings.filter((greet) => greet.category === cat);
    selCat = cat
    selLang = ''
    renderGreetings(filtered)
}

function filterAccLang(lang){
    selLang = lang
    const filtered = greetings.filter((greet) => (greet.language === lang) || (selCat && greet.category === selCat))
    renderGreetings(filtered)
}

renderCat()

if (greetings.length > 0){
    renderCategoryFilter()
    renderGreetings(greetings)
}