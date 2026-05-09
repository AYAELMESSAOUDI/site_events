
const form =document.getElementById('contact-form');
const btn = document.getElementById('btn-envoyer'); // On utilise l'ID ici
const bar = document.getElementById('success-bar');
if(form){ 
form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    console.log("Clic détecté !"); 
    bar.classList.add('show');
    
    setTimeout(() => {
        bar.classList.remove('show');
    }, 4000);
    form.reset();
});
}