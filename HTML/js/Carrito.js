// js/carrito.js

// Función para cargar los productos del carrito
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedor = document.getElementById('carrito-items-container');
    const vacio = document.getElementById('carrito-vacio');
    
    if (carrito.length === 0) {
        vacio.style.display = 'block';
        contenedor.innerHTML = '';
        actualizarResumen(0);
        return;
    }
    
    vacio.style.display = 'none';
    let html = '';
    let subtotal = 0;
    
    carrito.forEach((item, index) => {
        const totalProducto = item.precio * item.cantidad;
        subtotal += totalProducto;
        
        html += `
            <div class="carrito-item">
                <img src="${item.imagen}" alt="${item.nombre}" class="item-imagen">
                <div class="item-info">
                    <h3>${item.nombre}</h3>
                    ${item.talla ? `<p>Talla: ${item.talla}</p>` : ''}
                    <p>Precio: $${item.precio.toLocaleString('es-CL')}</p>
                </div>
                <div class="item-cantidad">
                    <button onclick="modificarCantidad(${index}, -1)">-</button>
                    <span>${item.cantidad}</span>
                    <button onclick="modificarCantidad(${index}, 1)">+</button>
                </div>
                <div class="item-total">
                    <p>$${totalProducto.toLocaleString('es-CL')}</p>
                </div>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">×</button>
            </div>
        `;
    });
    
    contenedor.innerHTML = html;
    actualizarResumen(subtotal);
}

// Función para modificar cantidad
function modificarCantidad(index, cambio) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito[index].cantidad += cambio;
    
    if (carrito[index].cantidad < 1) {
        carrito[index].cantidad = 1;
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
    actualizarContadorCarrito();
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
    actualizarContadorCarrito();
}

// Función para actualizar el resumen
function actualizarResumen(subtotal) {
    const envio = subtotal > 50000 ? 0 : 5000; // Envío gratis sobre $50.000
    const total = subtotal + envio;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString('es-CL')}`;
    document.getElementById('envio').textContent = envio === 0 ? 'Gratis' : `$${envio.toLocaleString('es-CL')}`;
    document.getElementById('total').textContent = `$${total.toLocaleString('es-CL')}`;
}

// Función para finalizar compra
function finalizarCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Aquí iría la lógica de pago
    alert('¡Compra realizada con éxito!');
    localStorage.removeItem('carrito');
    cargarCarrito();
    actualizarContadorCarrito();
}

// Función para actualizar contador (también usada en otras páginas)
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    
    const carritoLink = document.getElementById('carrito-link');
    if (carritoLink) {
        carritoLink.textContent = `Carrito (${totalItems})`;
    }
}

// Cargar carrito al iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarCarrito();
    actualizarContadorCarrito();
});