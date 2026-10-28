// Comportamento da página. Para cadastrar produtos, edite catalogo.js.
const collections = (window.AC_LEAL_CATALOG || []).filter(c => c.enabled !== false);
const $ = selector => document.querySelector(selector);
const grid = $('#catalog-grid');
const modal = $('#catalog-modal');
let active = null;
let index = 0;

// Dados do catálogo são tratados como texto, sem permitir HTML nos campos.
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);

// Uma imagem ausente não quebra o layout. Confira os caminhos com npm run validar.
document.addEventListener('error', event => {
  const image = event.target;
  if (image instanceof HTMLImageElement && !image.dataset.fallback) {
    image.dataset.fallback = 'true';
    image.src = 'assets/imagem-indisponivel.svg';
  }
}, true);

grid.innerHTML = collections.map(collection => {
  const count = collection.products.length;
  return `<button class="catalog-card reveal" type="button"
    data-category="${escapeHTML(collection.category)}" data-id="${escapeHTML(collection.id)}"
    aria-label="Abrir coleção ${escapeHTML(collection.title)}" ${count ? '' : 'disabled'}>
    <span class="catalog-image"><img src="${escapeHTML(collection.image)}"
      alt="${escapeHTML(collection.title)}" loading="lazy"></span>
    <span class="catalog-meta"><span class="catalog-category">${escapeHTML(collection.label)}</span>
      <h3>${escapeHTML(collection.title)}</h3>
      <p>${count ? `${count} produto${count === 1 ? '' : 's'} no carrossel` : 'Produtos em breve'}</p>
    </span></button>`;
}).join('');

function renderSlide() {
  const product = active.products[index];
  $('#carousel-image').removeAttribute('data-fallback');
  $('#carousel-image').src = product.image;
  $('#carousel-image').alt = product.name;
  $('#product-code').textContent = product.code || `MODELO ${String(index + 1).padStart(2, '0')}`;
  $('#product-name').textContent = product.name;
  $('#product-size').textContent = product.size || 'Medidas sob consulta';
  $('#current-slide').textContent = String(index + 1).padStart(2, '0');
  $('#total-slides').textContent = String(active.products.length).padStart(2, '0');
  $('.prev').hidden = $('.next').hidden = active.products.length < 2;
  [...$('#carousel-dots').children].forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
    dot.setAttribute('aria-selected', String(i === index));
  });
}

function openCollection(id) {
  active = collections.find(collection => collection.id === id);
  if (!active?.products.length) return;
  index = 0;
  $('#modal-category').textContent = active.label;
  $('#modal-title').textContent = active.title;
  $('#modal-description').textContent = active.description || '';
  $('#carousel-dots').innerHTML = active.products.map((_, i) =>
    `<button type="button" role="tab" aria-label="Ver produto ${i + 1}" data-slide="${i}"></button>`
  ).join('');
  renderSlide();
  modal.showModal();
  document.body.classList.add('modal-open');
}

function move(step) {
  if (!active?.products.length) return;
  index = (index + step + active.products.length) % active.products.length;
  renderSlide();
}

grid.addEventListener('click', event => {
  const card = event.target.closest('.catalog-card');
  if (card) openCollection(card.dataset.id);
});
$('.modal-close').addEventListener('click', () => modal.close());
$('.prev').addEventListener('click', () => move(-1));
$('.next').addEventListener('click', () => move(1));
$('#carousel-dots').addEventListener('click', event => {
  if (event.target.dataset.slide !== undefined) {
    index = Number(event.target.dataset.slide);
    renderSlide();
  }
});
modal.addEventListener('close', () => document.body.classList.remove('modal-open'));
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
document.addEventListener('keydown', event => {
  if (!modal.open) return;
  if (event.key === 'ArrowRight') move(1);
  if (event.key === 'ArrowLeft') move(-1);
});

$('.filters').addEventListener('click', event => {
  if (!event.target.matches('.filter')) return;
  document.querySelectorAll('.filter').forEach(button => button.classList.remove('active'));
  event.target.classList.add('active');
  const filter = event.target.dataset.filter;
  document.querySelectorAll('.catalog-card').forEach(card => {
    card.hidden = filter !== 'todos' && card.dataset.category !== filter;
  });
});
const menu = $('.menu-button');
const nav = $('#main-nav');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}
