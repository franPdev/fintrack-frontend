# FinTrack - App de Finanzas (Front-end)

**FinTrack** es una interfaz moderna y responsive para el control de finanzas personales.
Permite visualizar balances, ingresos, egresos y ahorros mediante gráficos interactivos y un diseño oscuro, simple y elegante.

---

## 🧭 Descripción

La aplicación está compuesta por distintas secciones que simulan el flujo de una app de finanzas:

- **Dashboard con gráficos dinámicos** (ApexCharts) que muestran el balance y la distribución de gastos.
- **Formulario de transacciones** para registrar ingresos o egresos y verlos reflejados en la lista de movimientos.
- **Chatbot local** con respuestas predefinidas y búsqueda difusa (Fuse.js).
- **Secciones integradas**: hero, balance, características, planes, chat y footer con enlaces a redes y contacto.

> Actualmente, el proyecto es completamente estático y utiliza librerías cargadas desde CDNs.

---

## 🧩 Tecnologías utilizadas

- **HTML5**
- **CSS3** — estilos personalizados (`css/styles.css`)
- **JavaScript** — lógica funcional y manejo del DOM (`js/script.js`, `js/chatbot.js`)
- **Bootstrap 5** — estructura y componentes
- **ApexCharts** — visualización de datos
- **Fuse.js** — búsqueda difusa en el chatbot

---

## 📁 Estructura del proyecto (`public/`)

public/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── script.js
│   └── chatbot.js
├── images/
│   ├── seguridad.avif
│   ├── estadisticas.jpg
│   └── celular.png
└── README.md

---

## ⚙️ Cómo ejecutarlo localmente

Podés abrir `index.html` directamente en tu navegador o usar un servidor estático local para asegurar que los assets funcionen correctamente.

### Opción 1 — Abrir directamente
- Abrir `public/index.html` en el navegador.
	*(Puede no funcionar correctamente con rutas relativas en algunos navegadores.)*

### Opción 2 — Servidor local con Python
```bash
cd public
python -m http.server 5500
```
Luego abrir http://localhost:5500

### Opción 3 — Servidor local con Node.js
```bash
cd public
npx http-server -p 5500
```
Luego abrir http://127.0.0.1:5500

🌐 CDNs utilizadas

- ApexCharts: https://cdn.jsdelivr.net/npm/apexcharts
- Fuse.js: https://cdn.jsdelivr.net/npm/fuse.js@6.6.2
- Bootstrap CSS: https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css
- Bootstrap JS: https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js

👨‍💻 Desarrollado por

FranPdev
📧 francoarielpaez@gmail.com

🔗 GitHub
https://github.com/franPdev