document.addEventListener('DOMContentLoaded', (e) => {

    //CREATE a new monster
    function createMonsterForm() {
        let createMonster = document.getElementById('create-monster')
        let form = document.createElement('form')
        form.id = 'monster-form'

        let input1 = document.createElement('input')
        input1.id = 'name'
        input1.placeholder = 'name...'
        let input2 = document.createElement('input')
        input2.id = 'age'
        input2.placeholder = 'age...'
        let input3 = document.createElement('input')
        input3.id = 'description'
        input3.placeholder = 'description...'
        let button = document.createElement('button')
        button.textContent = 'Create'

        form.append(input1, input2, input3, button)
        createMonster.appendChild(form)

        form.addEventListener('submit', handleSubmit)

        //HANDLE THE CREATEMONSTER
        function handleSubmit(e){
            e.preventDefault()
            let monsterDetails = {
                name: e.target.name.value,
                age: e.target.age.value,
                description: e.target.description.value,
            }
            form.reset()
            addMonster(monsterDetails)
            // debugger
        }

    }

    //GET monsters list
    let page = 1
    const URL_PREFIX = 'http://localhost:3000/';
    function getMonsters() {
        let monsterContainer = document.querySelector('#monster-container')
        monsterContainer.innerHTML = ''
        fetch(URL_PREFIX + `monsters?_limit=50&_page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(res => res.json())
            .then(monsterDetails => monsterDetails.forEach(e => {
                let div = document.createElement('div')
                let h2 = document.createElement('h2')
                let h4 = document.createElement('h4')
                let p = document.createElement('p')
                h2.textContent = e.name;
                h4.textContent = `Age: ${e.age}`;
                p.textContent = `Bio: ${e.description}`;
                monsterContainer.appendChild(div)
                div.append(h2, h4, p)
            }))

    }

    //POST monster to db
    function addMonster(details){
        fetch(URL_PREFIX + 'monsters',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify(details)
        })
        .then(res => res.json())
        .then(e => console.log(e))
    }

    //NEXT PAGE BUTTONS
    let backButton = document.querySelector('#back')
    backButton.addEventListener('click', () => pageDown())
    let forwardButton = document.querySelector('#forward')
    forwardButton.addEventListener('click', () => pageUp())

    pageUp = () => {page++, getMonsters(page)}
    pageDown = () => {1 < page ? (page--, getMonsters(page)) : alert('Aint no monsters here') }

    createMonsterForm()
    getMonsters()
})
