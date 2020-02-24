document.addEventListener('DOMContentLoaded', () => {
    renderDogs();
    submitListener();
})


{/* <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr> */}




function renderDogs(){
    fetch(`http://localhost:3000/dogs`)
    .then(resp => resp.json())
    .then(function(dogs){
        const dogTable = document.querySelectorAll(`.blue`)[0]
        while (dogTable.firstChild){
            dogTable.firstChild.remove();
        }
        // render each dog 
        dogs.forEach(function(dog){
            renderDog(dog); 
        })
    })
}

// render dog 
function renderDog(dog){
    // create table data 
    const dogName = document.createElement('td'); 
        dogName.dataset.id = `dogName${dog.id}`
        dogName.innerText=dog.name; 
    const dogBreed = document.createElement('td'); 
        dogBreed.innerText = dog.breed; 
    const dogSex = document.createElement('td'); 
        dogSex.innerText = dog.sex; 
    const dogEditCell = document.createElement('td'); 
    const dogEditBtn = document.createElement('button'); 
        dogEditBtn.innerText = "Edit Dog"; 
        dogEditCell.appendChild(dogEditBtn); 
        addEditFunctionality(dogEditBtn); 

    // create row for data to be appended to 
    const dogRow = document.createElement('tr'); 
    // give the row the dog's id for use later 
    dogRow.dataset.id = dog.id; 
    dogRow.appendChild(dogName); 
    dogRow.appendChild(dogBreed); 
    dogRow.appendChild(dogSex); 
    dogRow.appendChild(dogEditCell); 

    const dogTable = document.querySelectorAll(`.blue`)[0]
    dogTable.appendChild(dogRow); 
}

// add event listener to edit button 
function addEditFunctionality(dog){
    dog.addEventListener('click', function(e){
        // refactor this later to be a loop 
        document.querySelector("#dog-form")[0].value = this.parentElement.parentElement.getElementsByTagName('td')[0].innerText;    
        document.querySelector("#dog-form")[1].value = this.parentElement.parentElement.getElementsByTagName('td')[1].innerText;    
        document.querySelector("#dog-form")[2].value = this.parentElement.parentElement.getElementsByTagName('td')[2].innerText;    
        document.querySelector("#dog-form")[3].dataset.id = this.parentElement.parentElement.dataset.id;
    })
    
}

// add update event listener to submit button 
function submitListener(){
    submitButton = document.querySelectorAll("#dog-form input")[3]
    submitButton.addEventListener('click',function(e){
        e.preventDefault(); 
        if (this.dataset.id){
            const dogId = this.dataset.id; 
            const name = this.parentElement.getElementsByTagName('input')[0].value 
            const breed = this.parentElement.getElementsByTagName('input')[1].value 
            const sex = this.parentElement.getElementsByTagName('input')[2].value 
            // create a patch request 
            let objectData = {
                "name":name, 
                "breed":breed, 
                "sex":sex
            }
            fetch(`http://localhost:3000/dogs/${dogId}`, {
            method: 'PATCH', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectData),
            })
            .then((response) => response.json())
            .then((data) => {
            console.log('Success:', data);
            })
            .then(renderDogs())
            .catch((error) => {
            console.error('Error:', error);
            });
        }
    })
}