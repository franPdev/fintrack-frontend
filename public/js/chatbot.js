// Mostrar/ocultar el chat
const chatToggle = document.getElementById("chat-toggle");
const chatWidget = document.getElementById("chat-widget");
const closeChat = document.getElementById("close-chat");

chatToggle.addEventListener("click", () => {
  chatWidget.classList.toggle("chat-closed");
});

closeChat.addEventListener("click", () => {
  chatWidget.classList.add("chat-closed");
});


const intents = [
  {
    tag: "ahorro",
    patterns: ["¿cómo puedo ahorrar más?", "quiero ahorrar dinero", "consejos para ahorrar", "cómo gastar menos"],
    response: (data) => `Este mes ahorraste $${data.ahorro}. Podés reducir gastos en ${data.categoriaMayorGasto}.`
  },
  {
    tag: "gastos_comida",
    patterns: ["ver mis gastos de comida", "cuánto gasté en comida", "gastos en alimentos", "comida este mes"],
    response: (data) => `Gastaste $${data.comida} en comida. Eso representa el ${data.porcentajeComida}% de tu presupuesto.`
  },
  {
    tag: "estado_general",
    patterns: ["cómo voy este mes", "estado de mis finanzas", "resumen mensual", "cómo estoy gastando"],
    response: (data) => `Llevás gastado el ${data.porcentajeGasto}% de tu presupuesto. Te quedan $${data.restante}.`
  }
];

const userData = {
  ahorro: 15000,
  comida: 12000,
  porcentajeComida: 25,
  porcentajeGasto: 72,
  restante: 18000,
  categoriaMayorGasto: "entretenimiento"
};

const fuse = new Fuse(intents, { keys: ['patterns'], threshold: 0.4 });

function handleInput() {
  const input = document.getElementById("user-input").value;
  const chatBox = document.getElementById("chat-box");

  const result = fuse.search(input);
  let response = "";

  if (result.length > 0) {
    const intent = result[0].item;
    response = intent.response(userData);
  } else {
    response = "No entendí tu consulta. Probá preguntarme sobre tus gastos o ahorro.";
  }

  chatBox.innerHTML += `<div class="user-message">${input}</div>`;
chatBox.innerHTML += `<div class="bot-message">${response}</div>`;
  document.getElementById("user-input").value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Enviar mensaje con Enter
document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); // evita salto de línea
    handleInput();
  }
});

