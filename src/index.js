document.addEventListener('DOMContentLoaded', () => {


    renderDogs()
})


function renderDogs() {
    const tableBody = document.querySelector("#table-body")
    fetch('http://localhost:3000/dogs')
    .then((response) => {
        return response.json();
    })
    .then((dogs) => {
        tableBody.innerText = ''
        dogs.forEach(dog => renderDog(dog))
    });
}


function renderDog(dog) {
    const dogData = dog
    const tableBody = document.querySelector("#table-body")

    const dogRow = document.createElement('tr')

    const dogName = document.createElement('td')
    dogName.innerText = dog.name

    const dogBreed = document.createElement('td')
    dogBreed.innerText = dog.breed

    const dogSex = document.createElement('td')
    dogSex.innerText = dog.sex

    const editButton = document.createElement('td')

    const button = document.createElement('button')
    button.innerText = 'Edit'
    button.dataset.id = dog.id
    button.addEventListener('click', function(e){
        fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`)
        .then((response) => {
        return response.json();
        })
        .then((dog) => {
        populateForm(dog)
    });
    })

    editButton.appendChild(button)

    dogRow.appendChild(dogName)
    dogRow.appendChild(dogBreed)
    dogRow.appendChild(dogSex)
    dogRow.appendChild(editButton)

    tableBody.appendChild(dogRow)
}

function populateForm(dog) {
    const dogForm = document.querySelector('#dog-form')
    dogForm.name.value = dog.name;
    dogForm.breed.value = dog.breed;
    dogForm.sex.value = dog.sex;
    dogForm.dataset.id = dog.id
    dogForm.addEventListener('submit', function(e){
        e.preventDefault
        const data = {
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value
        }

        const dataObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        
        fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`, dataObj)
        .then((response) => {
        return response.json();
        })
        .then((dog) => {
        renderDogs();
    })
    })

}