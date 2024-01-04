function getAllUsers(){
    const url="http://localhost:3000/fetch-all-users";
    const table = document.getElementById("users");

    fetch(url)
    .then((response) =>{
        return response.json();
    })
    .then((users)=>{
        users.map((user)=>{
            let newRow = table.insertRow();
            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);
            cell1.innerHTML = user.name;
            cell2.innerHTML = user.emali;
            cell3.innerHTML = "<span class='edit' onclick='fetchUser("+ user.id +")'>Edit</span><span class='delete' onclick='deleteUser("+ user.id +")'>Delete</span>"
            cell3.dataset.userid = user.id;
        })
    }).catch((err)=>{
        console.log(err);
    })
}
getAllUsers();
createUser();




function createUser(){
    let userForm = document.getElementById("user-form");
    userForm.onsubmit =(event)=>{
        event.preventDefault();
        let formData = new FormData(userForm);
        let data = {};
        formData.forEach((value, key)=>{
            data[key] = value;
        })
        console.log(data);
        const url = "http://localhost:3000/create";
        fetch(url, {
            method:"POST",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)     
        }).then((response)=>{
            console.log(response.status)
            if(response.status ===200){
                alert("Done");
                location.reload();
            }
            else{
                alert("Error");
            }
        })
    }
}

function deleteUser(userId){
    const url = "http://localhost:3000/delete";
    fetch(url, {
        method:"DELETE",
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: userId})     
    }).then((response)=>{
        console.log(response.status)
        if(response.status ===200){
            alert("Done");
            location.reload();
        }
        else{
            alert("Error");
        }
    })
}

function fetchUser(userId){
    const url = "http://localhost:3000/users/" + userId;
    fetch(url).then((response)=>{
        return response.json()
    }).then((user)=>{
        let nameInput = document.getElementById("name");
        let emailInput = document.getElementById("email");
        let button = document.getElementById("submit");

        nameInput.value = user[0].name;
        emailInput.value = user[0].emali;
        button.textContent = "Update";
        updateUser(userId);
    })
}

function updateUser(userId){
    let userForm = document.getElementById("user-form");
    userForm.onsubmit =(event)=>{
        event.preventDefault();
        let formData = new FormData(userForm);
        let data = {};
        data.id = userId
        formData.forEach((value, key)=>{
            data[key] = value;
        })
        console.log(data);
        const url = "http://localhost:3000/update/";
        fetch(url, {
            method:"POST",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)     
        }).then((response)=>{
            console.log(response.status)
            if(response.status ===200){
                alert("Done");
                location.reload();
            }
            else{
                alert("Error");
            }
        })
    }
}