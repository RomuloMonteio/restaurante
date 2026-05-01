document.querySelectorAll('.favorito-btn').forEach(btn=>{

btn.addEventListener('click',()=>{

let id = btn.dataset.id;

fetch('http://localhost:3000/favorito',{

method:'POST',
headers:{
'Content-Type':'application/json'
},

body: JSON.stringify({
produto:id
})

})
.then(r=>r.text())
.then(data=>{
alert("Favoritado!");
});

});

});