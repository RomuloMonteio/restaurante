
document.querySelectorAll('.favorito-btn').forEach(btn=> {

    btn.addEventListener('click' , async function(){
        let id = this.dataset.id;

        this.classList.toggle('ativo');

        await fetch('/favorito',{
            method:'POST',
            headers:{'Content.Type' : 'application/json'},
            body: JSON.stringify({produto:id})
        });
    })
})