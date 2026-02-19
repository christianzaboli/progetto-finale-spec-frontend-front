

  <h1>Web Services Comparator</h1>

  <p>
    Single Page Application sviluppata in <strong>React (JavaScript)</strong> che permette di:
  </p>

  <ul>
    <li>Esplorare servizi web</li>
    <li>Cercare e filtrare per categoria</li>
    <li>Salvare nei preferiti</li>
    <li>Confrontare fino a 4 elementi</li>
  </ul>

  <p>
    Il progetto simula l’esperienza di un utente non autenticato che interagisce con un backend REST già fornito.
  </p>

  <h2>Stack</h2>

  <ul>
    <li>React</li>
    <li>React Router DOM</li>
    <li>Context API</li>
    <li>Fetch API</li>
    <li>Vite</li>
  </ul>

  <h2>Features</h2>

  <ul>
    <li>Lista servizi con:
      <ul>
        <li>Ricerca per <code>title</code></li>
        <li>Filtro per <code>category</code></li>
        <li>Ordinamento A-Z / Z-A</li>
      </ul>
    </li>
    <li>Pagina di dettaglio con proprietà estese</li>
    <li>Sistema preferiti globale</li>
    <li>Comparatore rapido (drawer)</li>
    <li>Pagina di confronto dettagliato</li>
  </ul>

  <h2>Architettura</h2>

  <p>
    Gestione stato globale tramite <strong>Context API</strong>:
  </p>

  <ul>
    <li><code>compareIds</code></li>
    <li><code>favoriteIds</code></li>
    <li>Funzioni di aggiunta / rimozione</li>
    <li>Fetch dinamico dei dettagli per il comparatore</li>
  </ul>

  <p>Flusso comparazione:</p>

  <pre>
compareIds → getComparingList() → Promise.all → render
  </pre>

  <h2>Setup</h2>

  <h3>Frontend</h3>

  <pre>
git clone https://github.com/christianzaboli/progetto-finale-spec-frontend-front
cd progetto-finale-spec-frontend-front
npm install
npm run dev
  </pre>

  <h3>Backend</h3>

  <pre>
git clone https://github.com/boolean-it/progetto-finale-spec-frontend-back
cd progetto-finale-spec-frontend-back
npm install
npm run dev
  </pre>

  <p>Backend:</p>

  <pre>
http://localhost:3001
  </pre>

  <h2>Note</h2>

  <p>
    API URL configurabile tramite:
  </p>

  <pre>
VITE_API_URL=http://localhost:3001
  </pre>

  <hr>

  <p>
    Christian Zaboli<br>
    Progetto finale – React Specialization
  </p>

