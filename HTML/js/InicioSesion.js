document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores de los campos
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Validar credenciales
        if (email === 'ejemplo@admin.cl' && password === '1234') {
            // Credenciales correctas - redirigir al panel de administración
            window.location.href = 'Admin.html';
        } else {
            // Credenciales incorrectas - mostrar mensaje de error
            alert('Correo o contraseña incorrectos. Intenta nuevamente.');
            
            // Limpiar campos
            document.getElementById('password').value = '';
        }
    });
});