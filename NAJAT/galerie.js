document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.my-button');
    const items = document.querySelectorAll('.pic');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // جلب النص من الزر وتحويله لحروف صغيرة (mariages, bain marocain...)
            const filterValue = button.textContent.trim().toLowerCase();

            items.forEach(item => {
                // إذا ضغطنا على All نظهر كل شيء
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } 
                // إذا ضغطنا على Mariages والـ div الخاص بالصورة يحتوي على كلاس item-mariage
                else if (filterValue === 'mariages' && item.classList.contains('item-mariage')) {
                    item.style.display = 'block';
                }
                // إذا ضغطنا على Bain Marocain والـ div الخاص بالصورة يحتوي على كلاس item-bain
                else if (filterValue === 'bain marocain' && item.classList.contains('item-bain')) {
                    item.style.display = 'block';
                }
                 else if (filterValue === 'salle de mariage' && item.classList.contains('item-salle')) {
                    item.style.display = 'block';
                }
                // إخفاء أي شيء آخر لا يطابق
                else {
                    item.style.display = 'none';
                }
            });
        });
    });
});