// Formatage automatique du numéro de carte
const cardInput = document.getElementById('card-number');

cardInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) formattedValue += " ";
        formattedValue += value[i];
    }
    e.target.value = formattedValue;
});

// Simulation de validation
document.getElementById('payment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Paiement en cours de traitement... Félicitations, votre événement est réservé !");
    // Ici vous pourriez rediriger vers une page de succès
});