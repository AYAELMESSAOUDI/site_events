document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.my-button');
    const currentImg = document.getElementById('current-img');
    const thumbnailsContainer = document.querySelector('.thumbnails');

    // 1. organisation des données
    const albumsData = {
        'mariage': [
            "images/mariage-album/mm.jpg",
            "images/mariage-album/1.jpg",
            "images/mariage-album/2.jpg",
            "images/mariage-album/3.jpg",
            "images/mariage-album/m0.jpg",
            "images/mariage-album/m1.jpg",
            "images/mariage-album/m2.jpg",
            "images/salle-album/S7.jpg",
            "images/salle-album/S6.jpg",
            "images/salle-album/S5.jpg",
            "images/salle-album/S4.jpg",
            "images/bain-album/5.jpg",
            "images/bain-album/7.jpg",
            "images/bain-album/8.jpg",
            "images/bain-album/9.jpg"
        ],
        'fiançailles': [
            "images/Fiançailles/F1.jpg",
            "images/Fiançailles/F2.jpg",
            "images/Fiançailles/F3.jpg",
            "images/Fiançailles/F4.jpg",
            "images/Fiançailles/F5.jpg",
            "images/Fiançailles/F6.jpg",
            "images/Fiançailles/F7.jpg",
            "images/Fiançailles/F8.jpg"
        ],
        'anniversaires': [
            "images/Anniversaires/H0.jpg" ,
            "images/Anniversaires/H1.jpg",
            "images/Anniversaires/H2.jpg",
            "images/Anniversaires/H3.jpg",
            "images/Anniversaires/H4.jpg",
            "images/Anniversaires/H5.jpg",
            "images/Anniversaires/H6.jpg",
            "images/Anniversaires/H7.jpg"
          ]
    };

    let currentImages = albumsData['mariage']; // Album virtual
    let currentIndex = 0;

    // 2. Fonction de mise a jour de l'affichage
    window.updateGallery = function() {
        if (currentImages.length > 0) {
            currentImg.src = currentImages[currentIndex];
        }
        
        // lise a jour de la miniature (Active)
        const thumbs = document.querySelectorAll('.thumb');
        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    };

    // 3. Fonction de changement d'image à l'aide des flèches
    window.changeSlide = function(direction) {
        currentIndex += direction;
        if (currentIndex >= currentImages.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = currentImages.length - 1;
        updateGallery();
    };

    // 4. Fonction permettant de sélectionner des images spécifiques 
    window.setImg = function(index) {
        currentIndex = index;
        updateGallery();
    };

    // 5. منطق الأزرار (الفلترة)Filtration
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter').toLowerCase();

            if (filter === 'all') {
                currentImages = [].concat(...Object.values(albumsData));
            } else if (albumsData[filter]) {
                currentImages = albumsData[filter];
            }

            currentIndex = 0;
            
            // إعادة بناء الصور المصغرة (Thumbnails) لتناسب القسم المختار فقط
            renderThumbnails(); 
            updateGallery();
        });
    });

    // 6. دالة لرسم الصور المصغرة ديناميكياً
    function renderThumbnails() {
        thumbnailsContainer.innerHTML = ''; // Ancian scan
        currentImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'thumb';
            if (index === 0) img.classList.add('active');
            img.onclick = () => setImg(index);
            thumbnailsContainer.appendChild(img);
        });
    }

    // L'affichage pour la premier fois
    renderThumbnails();
});