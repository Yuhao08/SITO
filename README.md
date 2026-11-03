# SITO

Sito statico con:

- pagina pubblica (`/index.html`) per visualizzare e scaricare i progetti;
- pagina amministratore (`/admin.html`) con login:
  - nome utente: `utente`
  - password: `password`
- caricamento dei progetti tramite URL oppure file `.zip` dal computer;
- due pulsanti in fondo pagina verso Altervista e GitHub.

I progetti caricati vengono salvati nel `localStorage` del browser. I file ZIP
devono rientrare nello spazio disponibile del browser e saranno scaricabili
dalla pagina pubblica nello stesso browser.
