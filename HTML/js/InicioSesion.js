document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir recarga de página
        
        // Obtener valores de los campos
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Valida si hay campos vacíos
        if (!email || !password) {
            mostrarError('Por favor, complete todos los campos.');
            return;
        }
        
        // Validar credenciales
        if (email === 'ejemplo@admin.cl' && password === '1234') {
            // Credenciales correctas - redirigir al panel de administración
            window.location.href = 'Admin.html';
        } else {
            // Credenciales incorrectas - mostrar mensaje de error
            mostrarError('Correo o contraseña incorrectos. Intenta nuevamente.');
            
            // Limpiar campo de contraseña
            document.getElementById('password').value = '';
        }
    });
    
    // Función para mostrar mensajes de error
    function mostrarError(mensaje) {
        // Eliminar mensajes de error anteriores
        const errorAnterior = document.querySelector('.error-mensaje');
        if (errorAnterior) {
            errorAnterior.remove();
        }
        
        // Crear elemento de error
        const errorElemento = document.createElement('p');
        errorElemento.textContent = mensaje;
        errorElemento.classList.add('error-mensaje');
        errorElemento.style.color = 'red';
        errorElemento.style.marginTop = '10px';
        errorElemento.style.textAlign = 'center';
        errorElemento.style.fontWeight = 'bold';
        
        // Insertar después del formulario
        loginForm.appendChild(errorElemento);
        
        // Eliminar mensaje después de 5 segundos
        setTimeout(() => {
            if (errorElemento.parentNode) {
                errorElemento.remove();
            }
        }, 5000);
    }
});