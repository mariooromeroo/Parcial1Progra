// WEB COMPONENT - Definición de queja-card
class QuejaCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const nombre = this.getAttribute('nombre') || 'Anónimo';
        const tipo = this.getAttribute('tipo') || 'No especificado';
        const ubicacion = this.getAttribute('ubicacion') || 'No especificada';
        const descripcion = this.getAttribute('descripcion') || 'Sin descripción';
        const fecha = this.getAttribute('fecha') || new Date().toLocaleString();

        // Estilos DENTRO del shadowRoot - esto es importante
        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    padding: 20px;
                    border-radius: 15px;
                    margin-bottom: 15px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    animation: slideIn 0.3s ease;
                }
                
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 15px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid rgba(255,255,255,0.3);
                }
                
                .nombre {
                    font-weight: bold;
                    font-size: 1.1em;
                }
                
                .fecha {
                    font-size: 0.85em;
                    opacity: 0.9;
                }
                
                .tipo {
                    background: rgba(255,255,255,0.2);
                    padding: 5px 10px;
                    border-radius: 20px;
                    display: inline-block;
                    margin-bottom: 10px;
                }
                
                .ubicacion {
                    margin: 10px 0;
                    font-style: italic;
                }
                
                .descripcion {
                    background: rgba(255,255,255,0.1);
                    padding: 10px;
                    border-radius: 10px;
                    margin-top: 10px;
                }
                
                .badge {
                    background: #e74c3c;
                    color: white;
                    padding: 3px 10px;
                    border-radius: 15px;
                    font-size: 0.75em;
                    margin-left: 10px;
                }
            </style>
            
            <div class="card">
                <div class="header">
                    <span class="nombre">👤 ${nombre}</span>
                    <span class="fecha">📅 ${fecha}</span>
                </div>
                <div>
                    <span class="tipo">📌 ${tipo}</span>
                    <span class="badge">NUEVA</span>
                </div>
                <div class="ubicacion">📍 ${ubicacion}</div>
                <div class="descripcion">📝 ${descripcion}</div>
            </div>
        `;
    }
}

// Para registrar el web component
customElements.define('queja-card', QuejaCard);

// SISTEMA PRINCIPAL

class SistemaQuejas {
    constructor() {
        this.form = document.getElementById('quejaForm');
        this.quejasContainer = document.getElementById('quejasContainer');
        this.quejas = this.cargarQuejas();
        
        this.inicializarEventos();
        this.mostrarQuejas();
        
        console.log('Sistema iniciado correctamente'); // Para depuración
    }

    inicializarEventos() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.manejarEnvioQueja();
        });

        this.form.addEventListener('reset', () => {
            this.limpiarErrores();
        });

        // Validaciones
        const campos = ['nombre', 'ubicacion', 'descripcion'];
        campos.forEach(id => {
            const input = document.getElementById(id);
            if(input) {
                input.addEventListener('blur', () => this.validarCampo(id));
                input.addEventListener('input', () => this.limpiarErrorCampo(id));
            }
        });

        const select = document.getElementById('tipoQueja');
        if(select) {
            select.addEventListener('change', () => this.validarCampo('tipoQueja'));
        }
    }

    validarCampo(campoId) {
        const campo = document.getElementById(campoId);
        if(!campo) return true;
        
        const valor = campo.value.trim();
        const errorElement = document.getElementById(`error${campoId.charAt(0).toUpperCase() + campoId.slice(1)}`);
        
        if(!errorElement) return true;
        
        let esValido = true;
        let mensajeError = '';

        if (!valor) {
            esValido = false;
            mensajeError = 'Este campo es obligatorio';
        } else if (campoId === 'nombre' && valor.length < 3) {
            esValido = false;
            mensajeError = 'Mínimo 3 caracteres';
        } else if (campoId === 'ubicacion' && valor.length < 5) {
            esValido = false;
            mensajeError = 'Mínimo 5 caracteres';
        } else if (campoId === 'descripcion' && valor.length < 10) {
            esValido = false;
            mensajeError = 'Mínimo 10 caracteres';
        } else if (campoId === 'tipoQueja' && valor === '') {
            esValido = false;
            mensajeError = 'Seleccione una opción';
        }

        if (!esValido) {
            campo.classList.add('error');
            errorElement.textContent = mensajeError;
        } else {
            campo.classList.remove('error');
            errorElement.textContent = '';
        }

        return esValido;
    }

    limpiarErrorCampo(campoId) {
        const campo = document.getElementById(campoId);
        const errorElement = document.getElementById(`error${campoId.charAt(0).toUpperCase() + campoId.slice(1)}`);
        
        if(campo) campo.classList.remove('error');
        if(errorElement) errorElement.textContent = '';
    }

    limpiarErrores() {
        document.querySelectorAll('.error').forEach(error => error.textContent = '');
        document.querySelectorAll('input.error, select.error, textarea.error').forEach(input => input.classList.remove('error'));
    }

    validarFormulario() {
        const campos = ['nombre', 'tipoQueja', 'ubicacion', 'descripcion'];
        let formularioValido = true;

        campos.forEach(campo => {
            if (!this.validarCampo(campo)) {
                formularioValido = false;
            }
        });

        return formularioValido;
    }

    manejarEnvioQueja() {
        if (!this.validarFormulario()) {
            alert('Corrija los errores');
            return;
        }

        const nuevaQueja = {
            id: Date.now(),
            nombre: document.getElementById('nombre').value.trim(),
            tipo: document.getElementById('tipoQueja').value,
            ubicacion: document.getElementById('ubicacion').value.trim(),
            descripcion: document.getElementById('descripcion').value.trim(),
            fecha: new Date().toLocaleString()
        };

        this.quejas.unshift(nuevaQueja);
        this.guardarQuejas();
        this.mostrarQuejas();
        this.form.reset();
        alert('Queja registrada');
    }

    guardarQuejas() {
        localStorage.setItem('quejas', JSON.stringify(this.quejas));
    }

    cargarQuejas() {
        const quejasGuardadas = localStorage.getItem('quejas');
        return quejasGuardadas ? JSON.parse(quejasGuardadas) : [];
    }

    mostrarQuejas() {
        this.quejasContainer.innerHTML = '';

        if (this.quejas.length === 0) {
            this.quejasContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No hay quejas registradas</p>';
            return;
        }

        this.quejas.forEach(queja => {
            const quejaCard = document.createElement('queja-card');
            quejaCard.setAttribute('nombre', queja.nombre);
            quejaCard.setAttribute('tipo', queja.tipo);
            quejaCard.setAttribute('ubicacion', queja.ubicacion);
            quejaCard.setAttribute('descripcion', queja.descripcion);
            quejaCard.setAttribute('fecha', queja.fecha);
            
            this.quejasContainer.appendChild(quejaCard);
        });
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    new SistemaQuejas();
});