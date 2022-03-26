let buttonupdate = document.querySelectorAll('.btnupdate')
let idvalue = document.querySelectorAll('.idvalue')
let modal =  document.getElementById("exampleModalLabel")
let inputAddress =  document.getElementById("inputAddress")
let idvaluepost =  document.getElementById("idvalue")

for(let i= 0; i<buttonupdate.length; i++){
    buttonupdate[i].addEventListener('click',()=>{
        modal.innerText="update kategori "+buttonupdate[i].value
        inputAddress.value=buttonupdate[i].value
        idvaluepost.value=idvalue[i].value
    })
    
}

let buttondelete = document.querySelectorAll('.btndelete')
let modaltitle = document.getElementById("deletemdaltitle")
let deletetelink = document.getElementById("deletetelink")
for(let i=0; i<buttondelete.length; i++){
    buttondelete[i].addEventListener('click',()=>{
       modaltitle.innerText=`${buttondelete[i].value}`  
       deletetelink.setAttribute('href',`/contentcreatekategoridelete/${idvalue[i].value}`)
    })
}

