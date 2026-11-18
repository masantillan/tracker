// app.js — lo que pasa en la pantalla. Nunca toca IndexedDB directamente:
// para eso usa las funciones de db.js.

const form = document.getElementById("expense-form");
const amountInput = document.getElementById("amount");
const listEl = document.getElementById("expense-list");
const totalEl = document.getElementById("total");

const CATEGORY_LABELS = {
  comida: "Comida",
  transporte: "Transporte",
  super: "Súper",
  servicios: "Servicios",
  salidas: "Salidas",
  delivery: "Delivery",
  salud: "Salud",
  otros: "Otros",
};

// ---------- Utilidades ----------

// "3.500" o "3500,50" -> centavos (350000 o 350050). Devuelve null si no es válido.
function parseAmountToCents(text) {
  const clean = text
    .replace(/[$\s]/g, "")   // saca el $ y los espacios
    .replace(/\./g, "")      // saca los puntos de miles
    .replace(",", ".");      // la coma decimal pasa a punto
  const number = parseFloat(clean);
  if (!Number.isFinite(number) || number <= 0) return null;
  return Math.round(number * 100);
}

// centavos -> "$ 3.500"
function formatMoney(cents) {
  return "$ " + (cents / 100).toLocaleString("es-AR", { maximumFractionDigits: 2 });
}

// Fecha y hora actuales en formato ISO con la zona horaria local.
function localISOString(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const abs = Math.abs(offset);
  return (
    date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) +
    "T" + pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds()) +
    sign + pad(Math.floor(abs / 60)) + ":" + pad(abs % 60)
  );
}

// ID único. En algunos contextos (por ejemplo http en el celular) randomUUID no existe.
function newId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

// ---------- Pantalla ----------

// Dibuja la lista de hoy y el total del día.
async function render() {
  const expenses = await getExpensesByDay(new Date());

  listEl.textContent = ""; // vacía la lista
  let total = 0;

  for (const expense of expenses) {
    total += expense.amount;

    const item = document.createElement("li");

    const time = new Date(expense.createdAt).toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const label = CATEGORY_LABELS[expense.category] || expense.category;
    item.textContent = time + " · " + label + " · " + formatMoney(expense.amount) + " ";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Borrar";
    deleteButton.addEventListener("click", async () => {
      if (!confirm("¿Borrar este gasto?")) return;
      try {
        await deleteExpense(expense.id);
        await render();
      } catch (error) {
        console.error(error);
        alert("No se pudo borrar el gasto.");
      }
    });

    item.appendChild(deleteButton);
    listEl.appendChild(item);
  }

  totalEl.textContent = formatMoney(total);
}

// Al guardar el formulario.
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // evita que la página se recargue

  const amount = parseAmountToCents(amountInput.value);
  if (amount === null) {
    alert("Ingresá un monto válido. Para decimales usá coma (por ejemplo 1250,50).");
    return;
  }

  const expense = {
    id: newId(),
    amount: amount,
    currency: "ARS",
    category: form.elements["category"].value,
    payment: null,        // todavía no hay selector de medio de pago en esta fase
    recurring: false,
    installments: 1,
    late: false,
    note: "",
    createdAt: localISOString(),
  };

  try {
    await addExpense(expense);
  } catch (error) {
    console.error(error);
    alert("No se pudo guardar el gasto. Probá de nuevo.");
    return; // si falló, no limpiamos el formulario
  }

  form.reset();
  amountInput.focus();
  await render();
});

// Al abrir la página.
render().catch((error) => {
  console.error(error);
  alert("No se pudo abrir la base de datos.");
});
