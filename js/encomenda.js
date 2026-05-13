

function encomendar()
{
    const produtoNome = document.getElementById('produto').value;
    const qtd = document.getElementById('quantidade').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const nomeCliente = document.getElementById('nome').value; // Exemplo
    
    
    fetch('http://localhost:3000/encomenda',{

        method:'POST',
        headers:{'Content-Type':'application/json'},
        
        body:JSON.stringify({
            nome: nomeCliente,
            produto:produtoNome,
            quantidade:qtd,
            data_entrega:data,
            hora_entrega:hora
        })
    })
    .then(()=>{
        carregarEncomendas();
        alert("feito")
    });

        
}

//ver
function carregarEncomendas(){

fetch('http://localhost:3000/encomenda')
.then(res=>res.json())
.then(data=>{

let lista = document.getElementById('lista');
lista.innerHTML = '';

data.forEach(e=>{
lista.innerHTML += `<li>${e.produto} (x${e.quantidade})</li>`;
});

});
}

carregarEncomendas();


function teste()
{
    fetch('http://localhost:3000/encomendas')
.then(res => res.json)
.then(data =>{
    console.log(data)
})

}