import getData from "./users.js";
const tbody = document.querySelector("tbody");

getData()
.then((response) => response.json())
.then((data) => {
    // Hiển thị 
    showUser(data)
    const btnRemoves = document.querySelectorAll(".btn-remove");
for(let btn of btnRemoves){
    const id = btn.dataset.id;
    btn.addEventListener("click", function(){
        return removeUser(id);
    })
}
// update
const btnUpdates = document.querySelectorAll(".btn-update");
for(let btn of btnUpdates){
    const id = btn.dataset.id;
    btn.addEventListener("click", function(){
        return updateUser(id);
    })
}
} )
//show user
const showUser = (data) =>{
tbody.innerHTML = data.map((user,index) =>{
return `

       <tr>
        <td>${index +1}</td>
        <td>${user.productName}</td>
        <td><img src="${user.image}"></td>
        <td>
        <button data-id = "${user.id}" class = "btn-remove">Xóa</button>
        <button data-id = "${user.id}" class = "btn-update">Cập nhật</button>
        </td>
       </tr>
`
}).join(""); 
}
const removeUser = (id) => {
    fetch(`http://localhost:3000/users/${id}`,{
        method:"DELETE"

    }) 
}
const addUser = () =>{
    document.querySelector("body").innerHTML = /*html*/`
    <form action ="">
    <input type = "text" id= "username" />
    <input type = "file" id= "userimage" />
    <button type="button" id="btn-submit">Add</button>
    
    </form>
    `
    document.querySelector("#btn-submit").addEventListener("click",function(){
        console.log(123)
        const newUser = {
            "productName": document.querySelector("#username").value,
            "image": document.querySelector("#userimage")
          
        }
        console.log(newUser)
        fetch(`http://localhost:3000/users`,{
            method:"POST",
            headers:{
                "Content-type": "application/json"
            },
            body:JSON.stringify(newUser)
        })
    })
}
document.querySelector("#btn-add").addEventListener("click",addUser)
 
const updateUser = (id) =>{
    fetch(`http://localhost:3000/users/${id}`)
    .then((response) => response.json())
    .then((data) => {

        document.querySelector("body").innerHTML = /*html*/`
        <form action ="">
        <input type = "text" id= "username" value = "${data.productName}" />
        <input type = "file" id= "userimage" />
        <button type="button" id="btn-update">Sửa</button>
        </form>
        `
        document.querySelector("#btn-update").addEventListener("click",function(){
            console.log(123)
            const newUser = {
                "productName": document.querySelector("#username").value,
                "image": document.querySelector("#userimage")
              
            }
         
            fetch(`http://localhost:3000/users/${id}`,{
                method:"PUT",
                headers:{
                    "Content-type": "application/json"
                },
                body:JSON.stringify(newUser)
            })
        })
    })

}