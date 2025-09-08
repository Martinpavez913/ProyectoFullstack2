// js/detalleProducto.js

// Base de datos de productos
const productos = [
    {
        id: 1,
        nombre: "Camiseta Local 1997",
        descripcion: "Camiseta oficial de local temporada 1997. Edición especial conmemorativa. Fabricada en poliéster de alta calidad, incluye parches oficiales de la liga chilena y el escudo de Colo-Colo bordado.",
        precio: 89990,
        precioAnterior: 109990,
        categoria: "vestuario",
        estado: "Vintage",
        imagenes: ["imagenes/camiseta-1997.jpg"],
        tallas: ["S", "M", "L", "XL"],
        stock: 15
    },
    {
        id: 2,
        nombre: "Camiseta Visita 2006",
        descripcion: "Camiseta de visita temporada 2006. Perfecto estado, tallas disponibles. Esta camiseta conmemora uno de los años más exitosos del club. Incluye detalles especiales en cuello y mangas.",
        precio: 75000,
        precioAnterior: null,
        categoria: "vestuario",
        estado: "Clásica",
        imagenes: ["imagenes/camiseta-2006.jpg"],
        tallas: ["M", "L", "XL"],
        stock: 8
    },
    {
        id: 3,
        nombre: "Foto Autografiada Matías Fernández",
        descripcion: "Fotografía oficial autografiada por Matías Fernández. Certificado de autenticidad incluido. La foto muestra a Matigol en su mejor momento con la camiseta de Colo-Colo, en un partido internacional.",
        precio: 120000,
        precioAnterior: null,
        categoria: "accesorios",
        estado: "Exclusivo",
        imagenes: ["imagenes/foto-matias.jpg"],
        stock: 3
    },
    {
        id: 4,
        nombre: "Camiseta 2024 Firmada por Vidal",
        descripcion: "Camiseta local temporada 2024 firmada por Arturo Vidal. Solo 50 unidades disponibles. Esta edición especial incluye un certificado de autenticidad y viene presentada en una caja especial de colección.",
        precio: 150000,
        precioAnterior: 180000,
        categoria: "vestuario",
        estado: "Edición Limitada",
        imagenes: ["imagenes/camiseta-vidal.jpg"],
        tallas: ["S", "M", "L"],
        stock: 12
    },
    {
        id: 5,
        nombre: "Libro: Historia de Colo-Colo",
        descripcion: "Edición especial con fotos históricas y relatos de los momentos más importantes del club. Más de 300 páginas con entrevistas exclusivas a jugadores legendarios y detalles de todas las campañas internacionales.",
        precio: 45000,
        precioAnterior: null,
        categoria: "libros",
        estado: "Coleccionista",
        imagenes: ["imagenes/libro-historia.jpg"],
        stock: 25
    },
    {
        id: 6,
        nombre: "Figura Iván Zamorano Edición Especial",
        descripcion: "Figura coleccionable de Iván Zamorano con uniforme de Colo-Colo. Altura: 25cm. Fabricada en resina de alta calidad, pintada a mano. Incluye base con placa identificativa y número de edición.",
        precio: 65000,
        precioAnterior: null,
        categoria: "figuras",
        estado: "Nuevo",
        imagenes: ["imagenes/figura-zamorano.jpg"],
        stock: 7
    }
];

// Función para obtener parámetros de la URL
function obtenerParametroURL(nombre) {
    if (window.location.search) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(nombre);
    } else {
        document.getElementById('selector-producto').style.display = 'block';
        if (window.location.hash) {
            return window.location.hash.substring(1);
        }
        return "1";
    }
}

// Función para cargar producto desde el selector
function cargarProductoSeleccionado() {
    const select = document.getElementById('select-producto');
    const productoId = select.value;
    window.location.hash = productoId;
    cargarDetallesProducto();
}

// Función para formatear precios en formato chileno
function formatearPrecio(precio) {
    return '$' + precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Función para cargar los detalles del producto
function cargarDetallesProducto() {
    let productoId = obtenerParametroURL('id');
    
    if (!productoId || productoId === "null") {
        productoId = window.location.hash ? window.location.hash.substring(1) : "1";
    }

    const producto = productos.find(p => p.id === parseInt(productoId));
    if (!producto) {
        document.getElementById('producto-detalle').innerHTML = '<p>Producto no encontrado</p>';
        return;
    }

    // Actualizar breadcrumb
    document.getElementById('breadcrumb-producto').textContent = producto.nombre;

    // Generar HTML para las imágenes
    let imagenesHTML = '';
    producto.imagenes.forEach((img, index) => {
        imagenesHTML += `
            <div class="miniatura ${index === 0 ? 'activa' : ''}" onclick="cambiarImagenPrincipal('${img}', this)">
                <img src="${img}" alt="${producto.nombre}">
            </div>
        `;
    });

    // Generar HTML para las tallas (si aplica)
    let tallasHTML = '';
    if (producto.tallas && producto.tallas.length > 0) {
        tallasHTML = `
            <div class="opcion-grupo">
                <label for="talla">Talla:</label>
                <select id="talla">
                    ${producto.tallas.map(talla => `<option value="${talla}">${talla}</option>`).join('')}
                </select>
            </div>
        `;
    }

    // Generar HTML para el precio
    let precioHTML = `<span class="precio-actual">${formatearPrecio(producto.precio)}</span>`;
    if (producto.precioAnterior) {
        precioHTML += `<span class="precio-anterior">${formatearPrecio(producto.precioAnterior)}</span>`;
    }

    // Construir el HTML completo del producto
    const productoHTML = `
        <div class="producto-galeria">
            <div class="producto-imagen-principal">
                <img src="${producto.imagenes[0]}" alt="${producto.nombre}" id="imagen-principal">
            </div>
            <div class="producto-miniaturas">
                ${imagenesHTML}
            </div>
        </div>
        <div class="producto-info">
            <div class="producto-marca">Colo-Colo Coleccionables</div>
            <h1 class="producto-titulo">${producto.nombre}</h1>
            <div class="producto-precio">
                ${precioHTML}
            </div>
            <div class="producto-descripcion">
                <p>${producto.descripcion}</p>
            </div>
            <div class="producto-opciones">
                ${tallasHTML}
                <div class="cantidad-grupo">
                    <label for="cantidad">Cantidad:</label>
                    <div class="cantidad-controles">
                        <button class="cantidad-btn" onclick="modificarCantidad(-1)">-</button>
                        <input type="number" id="cantidad" class="cantidad-input" value="1" min="1" max="${producto.stock}">
                        <button class="cantidad-btn" onclick="modificarCantidad(1)">+</button>
                    </div>
                </div>
            </div>
            <button class="btn-agregar-carrito" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            <div class="producto-meta">
                <div class="meta-item">
                    <span class="meta-label">Estado:</span>
                    <span>${producto.estado}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Disponibilidad:</span>
                    <span>${producto.stock > 0 ? 'En stock (' + producto.stock + ' unidades)' : 'Agotado'}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Categoría:</span>
                    <span>${producto.categoria}</span>
                </div>
            </div>
        </div>
    `;

    document.getElementById('producto-detalle').innerHTML = productoHTML;
    cargarProductosRelacionados(producto);
}

// Función para cambiar la imagen principal al hacer clic en una miniatura
function cambiarImagenPrincipal(src, elemento) {
    document.getElementById('imagen-principal').src = src;
    document.querySelectorAll('.miniatura').forEach(miniatura => {
        miniatura.classList.remove('activa');
    });
    elemento.classList.add('activa');
}

// Función para modificar la cantidad
function modificarCantidad(cambio) {
    const inputCantidad = document.getElementById('cantidad');
    let nuevaCantidad = parseInt(inputCantidad.value) + cambio;
    
    if (nuevaCantidad < 1) nuevaCantidad = 1;
    
    const productoId = obtenerParametroURL('id') || window.location.hash.substring(1) || "1";
    const producto = productos.find(p => p.id === parseInt(productoId));
    
    if (producto && nuevaCantidad > producto.stock) {
        nuevaCantidad = producto.stock;
    }
    
    inputCantidad.value = nuevaCantidad;
}

// Función para agregar producto al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const talla = document.getElementById('talla') ? document.getElementById('talla').value : null;
    
    // Obtener carrito actual desde localStorage o inicializar si no existe
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    const productoExistenteIndex = carrito.findIndex(item => 
        item.id === productoId && item.talla === talla
    );
    
    if (productoExistenteIndex >= 0) {
        // Actualizar cantidad si el producto ya está en el carrito
        carrito[productoExistenteIndex].cantidad += cantidad;
    } else {
        // Agregar nuevo producto al carrito (con toda la información necesaria)
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagenes[0],
            cantidad: cantidad,
            talla: talla,
            // Información adicional para mostrar en el carrito
            categoria: producto.categoria,
            estado: producto.estado
        });
    }
    
    // Guardar carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar contador del carrito
    actualizarContadorCarrito();
    
    // Mostrar mensaje de confirmación
    alert(`¡${producto.nombre} agregado al carrito!`);
}

// Función para actualizar el contador del carrito (también usada en carrito.js)
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    
    // Actualizar enlace del carrito en todas las páginas
    const carritoLink = document.getElementById('carrito-link');
    if (carritoLink) {
        carritoLink.textContent = `Carrito (${totalItems})`;
    }
}

// Función para cargar productos relacionados
function cargarProductosRelacionados(productoActual) {
    const relacionados = productos
        .filter(p => p.id !== productoActual.id && p.categoria === productoActual.categoria)
        .slice(0, 4);
    
    if (relacionados.length === 0) return;
    
    let relacionadosHTML = '';
    
    relacionados.forEach(producto => {
        relacionadosHTML += `
            <article class="producto">
                <div class="producto-imagen">
                    <img src="${producto.imagenes[0]}" alt="${producto.nombre}">
                    <span class="producto-etiqueta">${producto.estado}</span>
                </div>
                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion.substring(0, 100)}...</p>
                    <div class="producto-precio">
                        <span class="precio-actual">${formatearPrecio(producto.precio)}</span>
                        ${producto.precioAnterior ? `<span class="precio-anterior">${formatearPrecio(producto.precioAnterior)}</span>` : ''}
                    </div>
                    <button class="btn-ver-detalles" onclick="window.location.href='detalleProducto.html#${producto.id}'">Ver Detalles</button>
                </div>
            </article>
        `;
    });
    
    document.getElementById('productos-relacionados').innerHTML = relacionadosHTML;
}

// Cargar detalles del producto cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    cargarDetallesProducto();
    actualizarContadorCarrito(); // Actualizar contador al cargar la página
});