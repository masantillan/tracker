// db.js — es el ÚNICO archivo que habla con IndexedDB.
// Si algún día cambiás cómo se guardan los datos, solo tocás este archivo.

const DB_NAME = "tracker";
const DB_VERSION = 1;
const STORE = "expenses";

// Abre la base (y la crea la primera vez).
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    // Se ejecuta solo cuando la base se crea o cambia de versión.
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Guarda un gasto.
async function addExpense(expense) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).add(expense);
    // Solo damos el gasto por guardado cuando la transacción terminó.
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
    tx.onabort = () => { db.close(); reject(tx.error); };
  });
}

// Devuelve todos los gastos guardados.
async function getAllExpenses() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const request = tx.objectStore(STORE).getAll();
    request.onsuccess = () => { db.close(); resolve(request.result); };
    request.onerror = () => { db.close(); reject(request.error); };
  });
}

// Devuelve los gastos de un día (según la hora local), del más nuevo al más viejo.
async function getExpensesByDay(day) {
  const all = await getAllExpenses();
  const start = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return all
    .filter((e) => {
      const d = new Date(e.createdAt);
      return d >= start && d < end;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Borra un gasto por su id.
async function deleteExpense(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
    tx.onabort = () => { db.close(); reject(tx.error); };
  });
}
