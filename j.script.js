// FAVORITOS
function toggleFavorito(elemento, nombre, imagen, precio) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const index = favoritos.findIndex(prod => prod.nombre === nombre);

    if(index === -1) {
        favoritos.push({ nombre, imagen, precio });
        elemento.classList.add('fav-active');
    } else {
        favoritos.splice(index, 1);
        elemento.classList.remove('fav-active');
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

window.onload = () => {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    document.querySelectorAll('.favorito').forEach(fav => {
        const nombre = fav.getAttribute('data-nombre');
        if(favoritos.some(p => p.nombre === nombre)) {
            fav.classList.add('fav-active');
        }
    });
};

// CARRITO
function agregarCarrito(nombre, imagen, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(p => p.nombre === nombre);
    if(index === -1) {
        carrito.push({ nombre, imagen, precio, cantidad: 1 });
    } else {
        carrito[index].cantidad += 1;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(nombre + " se agregó al carrito");
}

// BUSCADOR CON SUGERENCIAS
function buscarProducto(input) {
    const term = input.value.toLowerCase();
    const lista = document.getElementById('sugerencias');
    lista.innerHTML = '';
    if(term === '') {
        lista.style.display = 'none';
        return;
    }

    // Lista de productos ejemplo (puedes actualizar con todos)
    const productos = [
        "Set de pulseras de oro","Pulsera de plata con corazón","Pulsera de hilo con dijes",
        "Pulsera de perla","Pulsera fina elegante","Collar dorado con plata","Collar de perlas",
        "Collar con dijes","Collar de hilo con piedras","Set de 2 collares",
        "Aretes de hilo","Aretes de perla","Aretes de oro","Aretes elegantes","Aretes de plata",
        "Anillo corazón plata","Set de 2 anillos oro","Anillo de hilo","Anillo oro diamante","Anillo de plata"
    ];

    const filtrados = productos.filter(p => p.toLowerCase().includes(term));
    filtrados.forEach(p => {
        const li = document.createElement('li');
        li.textContent = p;
        li.onclick = () => { input.value = p; lista.style.display='none'; };
        lista.appendChild(li);
    });

    lista.style.display = filtrados.length ? 'block':'none';
}
