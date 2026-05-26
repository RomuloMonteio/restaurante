fetch('data/cardapio.json')
  .then(function (r) { return r.json(); })
  .then(function (data) {
    renderTabs(data.categorias);
    renderCards(data.categorias);
    initModal();
    initFavoritar();
    initTabStagger();
    animateActiveTab(data.categorias);
  })
  .catch(function (err) {
    console.error('Erro ao carregar cardapio.json:', err);
  });

/* ---- Render tabs (nav pills) ---- */
function renderTabs(categorias) {
  var tabsEl = document.getElementById('menu-tabs');
  if (!tabsEl) return;

  categorias.forEach(function (cat) {
    var li = document.createElement('li');
    li.className = 'nav-item';

    var btn = document.createElement('button');
    btn.className = 'nav-link' + (cat.ativo ? ' active' : '');
    btn.setAttribute('data-bs-toggle', 'pill');
    btn.setAttribute('data-bs-target', '#' + cat.id);
    btn.textContent = cat.label;

    li.appendChild(btn);
    tabsEl.appendChild(li);
  });
}

/* ---- Render cards por categoria ---- */
function renderCards(categorias) {
  var contentEl = document.getElementById('menu-content');
  if (!contentEl) return;

  categorias.forEach(function (cat) {
    var pane = document.createElement('div');
    pane.className = 'tab-pane fade' + (cat.ativo ? ' show active' : '');
    pane.id = cat.id;

    var row = document.createElement('div');
    row.className = 'row g-4';

    cat.produtos.forEach(function (produto, index) {
      var col = document.createElement('div');
      col.className = 'col-md-3 col-sm-6';

      col.innerHTML =
        '<div class="card menu-card"' +
          ' data-nome="' + escHtml(produto.nome) + '"' +
          ' data-preco="' + escHtml(produto.preco) + '"' +
          ' data-img="' + escHtml(produto.img) + '"' +
          ' data-desc="' + escHtml(produto.desc) + '"' +
          ' data-bs-toggle="modal" data-bs-target="#modalProduto">' +
          '<img src="' + escHtml(produto.img) + '" loading="lazy" alt="' + escHtml(produto.nome) + '">' +
          '<div class="card-body text-center">' +
            '<h5>' + escHtml(produto.nome) + '</h5>' +
            '<p class="text-danger fw-bold">' + escHtml(produto.preco) + '</p>' +
          '</div>' +
        '</div>';

      row.appendChild(col);
    });

    pane.appendChild(row);
    contentEl.appendChild(pane);
  });

}

/* ---- Modal ---- */
function initModal() {
  document.getElementById('menu-content').addEventListener('click', function (e) {
    var card = e.target.closest('.menu-card');
    if (!card) return;

    document.getElementById('modalNome').innerText  = card.dataset.nome  || '';
    document.getElementById('modalPreco').innerText = card.dataset.preco || '';
    document.getElementById('modalImg').src         = card.dataset.img   || '';
    document.getElementById('modalDesc').innerText  = card.dataset.desc  || '';
  });
}

/* ---- Favoritar ---- */
function initFavoritar() {
  document.getElementById('menu-content').addEventListener('click', function (e) {
    var btn = e.target.closest('.favorito-btn');
    if (!btn) return;

    e.stopPropagation();
    btn.style.animation = 'heartBeat .6s ease';
    btn.style.color = '#ff4d6d';
    setTimeout(function () { btn.style.animation = ''; }, 700);

    if (typeof showToast === 'function') {
      showToast('Adicionado aos favoritos! ❤️', 'success');
    }
  });
}

/* ---- Stagger ao mudar de tab ---- */
function initTabStagger() {
  document.querySelectorAll('[data-bs-toggle="pill"]').forEach(function (btn) {
    btn.addEventListener('shown.bs.tab', function (e) {
      var target = document.querySelector(e.target.getAttribute('data-bs-target'));
      if (!target) return;

      target.querySelectorAll('.menu-card').forEach(function (card, i) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(function () {
          card.style.transition = 'opacity .4s ease, transform .4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 70);
      });
    });
  });
}

/* ---- Stagger inicial para o tab activo ---- */
function animateActiveTab(categorias) {
  var activecat = categorias.find(function (c) { return c.ativo; });
  if (!activecat) return;

  var pane = document.getElementById(activecat.id);
  if (!pane) return;

  pane.querySelectorAll('.menu-card').forEach(function (card, i) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(function () {
      card.style.transition = 'opacity .45s ease, transform .45s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 200 + i * 70);
  });
}

/* ---- Escapar HTML ---- */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
