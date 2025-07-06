// Datos de los regalos
const gifts = [
    {
      id: 1,
        title: "Día 1",
        type: "text",
        content: "asd"
    },
    {
        id: 2,
        title: "Día 2",
        type: "image",
        content: "assets/imagenes/Gbvqn7Db0AAKrFf.jpg" // Cambia por tu imagen
    },
    {
        id: 3,
        title: "Día 3",
        type: "audio",
        content: "assets/audio/cancion-especial.mp3" // Cambia por tu audio
    },
    {
        id: 4, // Ejemplo: regalo 4 es un enlace
        title: "Regalo 4: Recuerdo especial",
        type: "link", // Nuevo tipo para enlaces
        content: "https://drive.google.com/file/d/1FaGHFl__U9OHZD1y5Id4lmAgh3vmBlw-/view?usp=drive_link", // URL que quieres compartir
        description: "Haz clic aquí para ver" // Texto opcional
    },
    {
        id: 5,
        title: "Día 5",
        type: "text",
        content: "Texto2"
    },
    {
        id: 6,
        title: "Día 6",
        type: "image",
        content: "assets/images/recuerdo.jpg" // Cambia por tu imagen
    },
    {
        id: 7,
        title: "Día 7",
        type: "text",
        content: "Texto3"
    }
];

// Cargar los regalos en la página
document.addEventListener('DOMContentLoaded', function() {
    const giftsContainer = document.getElementById('gifts');
    
    gifts.forEach(gift => {
        const giftElement = document.createElement('div');
        giftElement.className = 'gift';
        giftElement.innerHTML = `
            <h3>${gift.title}</h3>
            <img src="assets/imagenes/gift-icon.png" alt="Día icon">
        `;
        
        giftElement.addEventListener('click', () => openGift(gift));
        giftsContainer.appendChild(giftElement);
    });
});

// Función para mostrar el regalo en un modal
function openGift(gift) {
    const modal = document.getElementById('giftModal');
    const modalContent = document.getElementById('modalContent');
    
    // Limpiar contenido previo
    modalContent.innerHTML = '';
    
    // Crear contenido según el tipo de regalo
    let contentElement;
    
    switch(gift.type) {
        case 'text':
            contentElement = document.createElement('p');
            contentElement.textContent = gift.content;
            break;
            
        case 'image':
            contentElement = document.createElement('img');
            contentElement.src = gift.content;
            contentElement.alt = gift.title;
            contentElement.style.maxWidth = '100%';
            break;
            
        case 'audio':
            contentElement = document.createElement('audio');
            contentElement.controls = true;
            const sourceElement = document.createElement('source');
            sourceElement.src = gift.content;
            sourceElement.type = 'audio/mpeg';
            contentElement.appendChild(sourceElement);
            break;
            
        case 'video':
            contentElement = document.createElement('video');
            contentElement.controls = true;
            contentElement.style.maxWidth = '100%';
            const videoSource = document.createElement('source');
            videoSource.src = gift.content;
            videoSource.type = 'video/mp4';
            contentElement.appendChild(videoSource);
            break;

       case 'link':
           contentElement = document.createElement('a');
           contentElement.href = gift.content;
           contentElement.target = '_blank'; // Abre en nueva pestaña
           contentElement.textContent = gift.description || '¡Haz clic para ver tu regalo!';
           contentElement.style.color = '#d23669'; // Color que coincida con tu diseño
           contentElement.style.fontWeight = 'bold';
           contentElement.style.marginTop = '20px';
           contentElement.style.display = 'inline-block';
           break;
    }


  modal.style.display = 'block';
}
    // Añadir título y contenido al modal
    const titleElement = document.createElement('h2');
    titleElement.textContent = gift.title;
    modalContent.appendChild(titleElement);
    modalContent.appendChild(contentElement);
    
    // Mostrar modal
    modal.style.display = 'block';
    
    // Cerrar modal al hacer clic en la X
    document.querySelector('.close-btn').onclick = function() {
        modal.style.display = 'none';
        
        // Pausar audio/video al cerrar
        const mediaElements = modalContent.querySelectorAll('audio, video');
        mediaElements.forEach(el => el.pause());
    }
    
    // Cerrar modal al hacer clic fuera
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            
            // Pausar audio/video al cerrar
            const mediaElements = modalContent.querySelectorAll('audio, video');
            mediaElements.forEach(el => el.pause());
        }
    }
}
