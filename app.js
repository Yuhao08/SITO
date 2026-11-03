(function () {
  const STORAGE_KEY = 'projects';
  const DEFAULT_PROJECTS = [
    {
      name: 'Esempio progetto',
      url: 'https://github.com',
    },
  ];

  function getProjects() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_PROJECTS.slice();

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return DEFAULT_PROJECTS.slice();

      return parsed.filter(
        (item) =>
          item &&
          typeof item.name === 'string' &&
          item.name.trim() &&
          typeof item.url === 'string' &&
          item.url.trim()
      );
    } catch (_error) {
      return DEFAULT_PROJECTS.slice();
    }
  }

  function saveProjects(projects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }

  function renderProjects() {
    const list = document.getElementById('project-list');
    const emptyState = document.getElementById('empty-state');
    if (!list || !emptyState) return;

    const projects = getProjects();
    list.innerHTML = '';

    if (projects.length === 0) {
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;

    projects.forEach((project) => {
      const item = document.createElement('li');
      const title = document.createElement('span');
      title.textContent = project.name;

      const link = document.createElement('a');
      link.textContent = 'Scarica';
      link.href = project.url;
      link.className = 'button';
      link.target = '_blank';
      link.rel = 'noopener';

      item.appendChild(title);
      item.appendChild(link);
      list.appendChild(item);
    });
  }

  function setupAdmin() {
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const uploadSection = document.getElementById('upload-section');
    const loginError = document.getElementById('login-error');
    const projectForm = document.getElementById('project-form');
    const success = document.getElementById('project-success');

    if (!loginForm || !loginSection || !uploadSection || !projectForm) return;

    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const username = String(loginForm.username.value || '').trim();
      const password = String(loginForm.password.value || '').trim();

      if (username === 'utente' && password === 'password') {
        loginError.textContent = '';
        loginSection.hidden = true;
        uploadSection.hidden = false;
        return;
      }

      loginError.textContent = 'Credenziali non valide.';
    });

    projectForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = String(projectForm.name.value || '').trim();
      const url = String(projectForm.url.value || '').trim();

      if (!name || !url) {
        success.textContent = '';
        return;
      }

      const projects = getProjects();
      projects.push({ name: name, url: url });
      saveProjects(projects);
      projectForm.reset();
      success.textContent = 'Progetto caricato con successo.';
    });
  }

  renderProjects();
  setupAdmin();
})();
