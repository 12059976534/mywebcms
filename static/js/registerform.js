let viewpassword = document.getElementById("passwordinput")
let eyebuton = document.getElementById("eyebuton")
let iconeyebuton1 = document.getElementById("iconeyebuton1")

eyebuton.addEventListener('click',()=> {
    console.log("eyebuton")
    if(viewpassword.type == 'password'){
        viewpassword.type = 'text'
        iconeyebuton1.setAttribute('class','fas fa-eye text-warning')
    }else{
        viewpassword.type = 'password'
        iconeyebuton1.setAttribute('class','fas fa-eye-slash text-success')
    }
    
})

let eyebuttonretype = document.getElementById("eyebuttonretype")
let passwordinputretype = document.getElementById("passwordinputretype")
let iconeyebuton2 = document.getElementById("iconeyebuton2")

eyebuttonretype.addEventListener('click',()=>{
     if(passwordinputretype.type == 'password'){
        passwordinputretype.type = 'text'
        iconeyebuton2.setAttribute('class','fas fa-eye text-warning')
     }else{
        passwordinputretype.type = 'password'
        iconeyebuton2.setAttribute('class','fas fa-eye-slash text-success')
     }
})