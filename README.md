# Tracker de gastos
## Mi registro de gastos, sin cuentas ni servidores
Esta es una app web personal para llevar el control de mis gastos desde el celular, hecha con HTML, CSS y JavaScript sin frameworks.

Funciona sin conexión y se puede instalar como app (PWA). Los datos se guardan solo en mi dispositivo, no hay servidor.

### Aviso
Es un proyecto personal y está en construcción. Se puede abrir desde [masantillan.github.io/tracker](https://masantillan.github.io/tracker/).

## Futuras features
Lo que planeo agregarle. Cuando algo sale, lo tacho y anoto la fecha.

<!-- Formato al lanzar una feature: - [x] ~~Nombre de la feature~~ (lanzado el AAAA-MM-DD) -->

- [ ] Exportar e importar los datos (JSON y CSV) para tener respaldo
- [ ] Cargar un gasto después de que ocurrió, marcado como "cargado tarde"
- [ ] Marcar un gasto como recurrente o en cuotas desde el formulario
- [ ] Resumen por categoría y por mes, comparado con el mes anterior
- [ ] Detección de gastos recurrentes, picos y gasto hormiga
- [ ] Gastos frecuentes en un toque
- [ ] Presupuestos por categoría
- [ ] Recordatorio diario para cargar los gastos
- [ ] Análisis de los gastos con ayuda de un agente

## Cómo lo pruebo
Descargo el repo, entro a su carpeta y levanto un servidor local con `python3 -m http.server`. Después abro `http://localhost:8000` en el navegador.

## Cómo lo actualizo
Modifico los archivos y, antes de subirlos, subo el número de versión de `CACHE` en `sw.js` (por ejemplo, de `tracker-v3` a `tracker-v4`). Si no lo hago, el teléfono sigue mostrando la versión vieja que tiene guardada. Si agrego o muevo un archivo, también lo actualizo en la lista `FILES` de ese mismo archivo.

Después subo todo a GitHub y espero uno o dos minutos a que GitHub Pages publique. En el teléfono abro la app dos veces: la primera descarga lo nuevo y la segunda ya lo muestra.

### Carpetas
- `css/`: estilos
- `js/`: lógica de la pantalla y acceso a los datos
- `data/`: manifest de la PWA
- `icons/`: íconos de la app
- `sw.js`: service worker, tiene que estar en la raíz

---

# Expense Tracker
## My expense log, with no accounts or servers
This is a personal web app for keeping track of my expenses from my phone, built with plain HTML, CSS and JavaScript, no frameworks.

It works offline and can be installed as an app (PWA). Data is stored only on my device, there is no server.

### Notice
This is a personal project and a work in progress. It can be opened at [masantillan.github.io/tracker](https://masantillan.github.io/tracker/).

## Future features
What I plan to add. When something ships, I cross it out and note the date.

<!-- Format when a feature ships: - [x] ~~Feature name~~ (released on YYYY-MM-DD) -->

- [ ] Export and import data (JSON and CSV) for backups
- [ ] Log an expense after it happened, flagged as "entered late"
- [ ] Mark an expense as recurring or in installments from the form
- [ ] Summary by category and month, compared with the previous month
- [ ] Detection of recurring expenses, spikes and small daily spending
- [ ] One-tap frequent expenses
- [ ] Budgets by category
- [ ] Daily reminder to log expenses
- [ ] Expense analysis with the help of an agent

## How I test it
I download the repo, go into its folder and start a local server with `python3 -m http.server`. Then I open `http://localhost:8000` in the browser.

## How I update it
I edit the files and, before uploading them, bump the `CACHE` version number in `sw.js` (for example, from `tracker-v3` to `tracker-v4`). If I don't, the phone keeps showing the old version it has stored. If I add or move a file, I also update the `FILES` list in that same file.

Then I upload everything to GitHub and wait a minute or two for GitHub Pages to publish. On the phone I open the app twice: the first time it downloads the new files and the second time it shows them.

### Folders
- `css/`: styles
- `js/`: screen logic and data access
- `data/`: PWA manifest
- `icons/`: app icons
- `sw.js`: service worker, it has to stay in the root
