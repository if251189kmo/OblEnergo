function fetchUsers () {
	return fetch('/users').then(res => res.json())
};

function saveUsers (users) {
    return fetch('/users', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(users),
    });   
}

function handleEditClick(btn) {    
    btn.parentNode.parentNode.parentNode.classList.toggle("editMode");
}

function getAllUsersData () {
    var allUsersRows = document.querySelectorAll('.informUserContainer');
    var allUsersData = [];
    for (var i = 0; i < allUsersRows.length; i++) {

        var name = allUsersRows[i].querySelector('.name').innerText;
        var age = allUsersRows[i].querySelector('.age').innerText;
        var city = allUsersRows[i].querySelector('.city').innerText;

        var userData = {
            name: name,
            age: age,
            city: city,
        };

        allUsersData.push(userData);
    };
    return allUsersData;  
}

function handleFormSubmit(event) {
    event.preventDefault();
    var currentForm = event.target;
    var currentInformUserContainer = currentForm.parentNode;
    var newName = currentForm.querySelector('.userName').value;
    var newAge = currentForm.querySelector('.userAge').value;
    var newCity = currentForm.querySelector('.userCity').value;
   
    currentInformUserContainer.outerHTML = renderUserRow(newName, newAge, newCity);
    var usersData = getAllUsersData();
    saveUsers(usersData)
    return false;
}

function renderUserRow (name, age ,city) {           
                                    
    var userHtml = 
        `
        <div class="informUserContainer">
            <div class="informUser informUserText">    
                <div>
                    <div class="name"> ${name} </div>
                </div>
                <div>
                    <div class="age"> ${age} </div>
                </div>
                <div>
                    <div class="city"> ${city} </div>
                </div>
                <div class="edAndDel">
                    <button onclick='handleEditClick(this)' class="edit">Edit</button>
                </div> 
            </div>
            
            <form onsubmit="handleFormSubmit(event)" class="informUser informUserInputs">    
                <div>
                    <input class="inp userName" type="text" name="name" value="${name}">
                </div>
                <div>
                    <input class="inp userAge" type="text" name="age" value="${age}">
                </div>
                <div>
                    <input class="inp userCity" type="text" name="city" value="${city}">
                </div>
                <div class="edAndDel">
                    <button class="save">Save</button>
                </div> 
            </form>
        </div>
        `
    return userHtml;    
};

window.onload = function() {

    var informBoxesArea = document.querySelector('#informBoxes');

    document.getElementById('download').onclick = function(e) {      
        informBoxesArea.innerHTML = '';
        fetchUsers()
            .then(function(res){
                for (var index = 0; index < res.length; index++) {
                    informBoxesArea.innerHTML += renderUserRow (res[index].name, res[index].age, res[index].city);     
                }
            });
          
    };        
    
};        




