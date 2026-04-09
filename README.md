# FinTrack AI - Gestor de Finanzas Inteligente 🤖💰

**FinTrack AI** es una solución avanzada de gestión financiera personal que combina un diseño de vanguardia con el poder de la **Inteligencia Artificial**. No solo registra tus gastos, sino que los entiende.

> **Update 2026:** El proyecto ha sido evolucionado de una interfaz estática a una aplicación funcional integrada con **Google Gemini AI**.

---

## 🧭 ¿Qué hace a FinTrack diferente?

A diferencia de los gestores tradicionales, FinTrack utiliza modelos de lenguaje de última generación para actuar como un mentor financiero:

- **🤖 Consultor Financiero IA:** Integración directa con la API de **Google Gemini (1.5 Flash)**. El sistema analiza tus movimientos reales y genera consejos personalizados y motivadores.
- **🛡️ Resiliencia (Modo Offline):** Implementación de una lógica de respaldo que garantiza el funcionamiento del consultor mediante un motor de análisis local si la conexión a la API no está disponible.
- **📊 Visualización Dinámica:** Dashboards interactivos construidos con **ApexCharts** que se actualizan en tiempo real al ingresar nuevos datos.
- **🎙️ Accesibilidad Avanzada:** Los consejos de la IA no solo se leen, ¡se escuchan! Integración con la Web Speech API para síntesis de voz.
- **📱 Interfaz Minimalista:** Diseño "Ultra-Clean" enfocado en la usabilidad y la estética moderna.

---

## 🧩 Tech Stack

- **Lógica & Core:** JavaScript ES6+ (Manejo de estados y persistencia en LocalStorage).
- **IA & Procesamiento:** Google Gemini API (Model: 1.5 Flash).
- **UI/UX:** HTML5, CSS3 Moderno, Bootstrap 5.
- **Gráficos:** ApexCharts.
- **Búsqueda:** Fuse.js para filtrado inteligente de movimientos.

---

## 📁 Estructura del Proyecto

```text
├── index.html          # Estructura principal y componentes UI
├── css/
│   └── styles.css      # Diseño minimalista y animaciones
├── js/
│   └── script.js       # Lógica de finanzas e integración de IA
└── README.md
```

---

## ⚙️ Configuración y Uso Local

Para experimentar el poder total de la IA en este proyecto:

1. **Clonar el repositorio**

2. **Obtener una API Key:** Consigue tu llave gratuita en [Google AI Studio](https://aistudio.google.com).

3. **Configurar la Key:** En `js/script.js`, asigna tu llave a la variable `API_KEY`:
   ```javascript
   const API_KEY = 'tu_clave_aqui';
   ```

4. **Ejecutar:** Abre `index.html` (se recomienda usar la extensión **Live Server** en VS Code para una mejor experiencia con las APIs).

### Opción: Servidor local con Python
```bash
cd public
python -m http.server 5500
```
Luego abrir http://localhost:5500

### Opción: Servidor local con Node.js
```bash
cd public
npx http-server -p 5500
```
Luego abrir http://127.0.0.1:5500

---

## 🌐 CDNs utilizadas

- **ApexCharts:** https://cdn.jsdelivr.net/npm/apexcharts
- **Google Fonts (Inter):** https://fonts.googleapis.com
- **ApexCharts Styles:** Incluido en el CDN

---

## 👨‍💻 Sobre el Desarrollador

**Franco Páez (FranPdev)** — Apasionado por crear herramientas que simplifiquen la vida de las personas a través de la tecnología y la IA.

📧 **francoarielpaez@gmail.com**

🔗 **[GitHub](https://github.com/franPdev) | [LinkedIn](https://www.linkedin.com/in/franco-paez-6159b0214/)**