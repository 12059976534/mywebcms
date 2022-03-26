// let link = document.getElementById('link')
// let button = document.getElementById('button-copy')
let button2 = document.querySelectorAll('.buttonclick')
let link2 = document.querySelectorAll('.formlink')

for (let i = 0; i < button2.length; i++) {

 
  button2[i].addEventListener('click',function(){
    navigator.clipboard.writeText(link2[i].value);
    button2[i].innerText="copied successfully"
    button2[i].addEventListener('mouseout',function(){
      button2[i].innerText = "copy-link"
    })
  })

}

// button.onclick = function () {
//   copyclipt()
//   cahrge()
//   console.log(button)
// }

// button.addEventListener("mouseout", back)

// function cahrge() {
//   button.innerText = "berhasil-dicopy"
// }

// function back() {
//   button.innerText = "copy-link"
// }


// function copyclipt() {
//   let link = document.getElementById('link')
//   navigator.clipboard.writeText(link.value);
// }




