        let carrito = []
        let carritoVisible = false;

        // Muestra u oculta algo del carrito 
        function toggleCarrito() {
            const carritoDiv = document.getElementById('carrito-contenido');
            carritoVisible = !carritoVisible;
            
            if (carritoVisible) {
                carritoDiv.style.display = 'block';
            } else {
                carritoDiv.style.display = 'none';
            }
        }

        // Cierra el carrito
        document.addEventListener('click', function(event) {
            const carrito = document.getElementById('carrito-contenido');
            const boton = document.querySelector('.carrito-icono');
            
            if (!carrito.contains(event.target) && !boton.contains(event.target)) {
                carrito.style.display = 'none';
                carritoVisible = false;
            }
        });

        // agregar productos al carrito
        function agregarAlCarrito(nombre) {
            const productoExistente = carrito.find(item => item.nombre === nombre);
            
            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({
                    nombre: nombre,
                    cantidad: 1
                });
            }
            
            actualizarCarrito();
        }

        // elimina productos del carrito 
        function eliminarDelCarrito(nombre) {
            carrito = carrito.filter(item => item.nombre !== nombre);
            actualizarCarrito();
        }

        function limpiarCarrito() {
            carrito = [];
            actualizarCarrito();
        }

        // actualiza el carrito
        function actualizarCarrito() {
            const itemsCarrito = document.getElementById('items-carrito');
            const contadorDiv = document.getElementById('contador-carrito');
            const accionesDiv = document.getElementById('carrito-acciones');
            
            // actualiza el contador
            let totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
            contadorDiv.textContent = totalItems;
            
            if (carrito.length === 0) {
                itemsCarrito.innerHTML = '<div class="carrito-vacio">Vacío</div>';
                accionesDiv.style.display = 'none';
            } else {
                let html = '';
                
                carrito.forEach(item => {
                    html += `
                        <div class="carrito-item">
                            <span>${item.nombre} (x${item.cantidad})</span>
                            <button class="btn btn-eliminar" onclick="eliminarDelCarrito('${item.nombre}')">
                                X
                            </button>
                        </div>
                    `;
                });
                
                itemsCarrito.innerHTML = html;
                accionesDiv.style.display = 'block';
            }
        }

        // Para mandar al whatsapp el pedido del carrito
        function enviarWhatsApp() {
            if (carrito.length === 0) {
                alert('El carrito está vacío');
                return;
            }

            let mensaje = '¡Hola! Me interesa hacer el siguiente pedido:\n\n';
            
            carrito.forEach(item => {
                mensaje += `• ${item.nombre}`;
                if (item.cantidad > 1) {
                    mensaje += ` (x${item.cantidad})`;
                }
                mensaje += '\n';
            });
            
            mensaje += '\n¿Podrías confirmarme disponibilidad y precio?'; // mensaje predeterminado
        
            const numeroWhatsApp = '595991946222';
            
            const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
            window.open(urlWhatsApp, '_blank');
        }

        // busca los productos del carrito
        function buscarProductos() {
            const busqueda = document.getElementById('buscar').value.toLowerCase();
            const productos = document.querySelectorAll('.producto');
            
            productos.forEach(producto => {
                const titulo = producto.querySelector('h3').textContent.toLowerCase();
                const descripcion = producto.querySelector('h3').textContent.toLowerCase();
                
                if (titulo.includes(busqueda) || descripcion.includes(busqueda)) {
                    producto.style.display = 'block';
                } else {
                    producto.style.display = 'none';
                }
            });
        }

    document.querySelectorAll('.expandable-image').forEach(img => {
        img.addEventListener('click', function() {
            // Crear modal simple para mostrar imagen completa
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:1000;display:flex;align-items:center;justify-content:center;';
        
        const fullImg = document.createElement('img');
        fullImg.src = this.src;
        fullImg.style.cssText = 'max-width:90%;max-height:90%;border-radius:8px;';
        
        modal.appendChild(fullImg);
        document.body.appendChild(modal);
        
        // Cerrar al hacer click
        modal.addEventListener('click', () => modal.remove());
    });
});

