/*
const form = document.getElementById('registerForm');

form.addEventListener('submit',evt=>{
    evt.preventDefault();
    let data = new FormData(form);
    let obj = {}
    data.forEach((value,key)=>obj[key]=value)
    fetch('/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>console.log(json));
})
//Del login
const formlogin = document.getElementById('loginForm');

formlogin.addEventListener('submit',evt=>{
    evt.preventDefault();
    let data = new FormData(form);
    let obj = {}
    data.forEach((value,key)=>obj[key]=value)
    fetch('/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>console.log(json));
})

*/