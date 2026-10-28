import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const errors = [];
const ids = new Set();
const context = { window: {} };
try { vm.runInNewContext(fs.readFileSync(path.join(root, 'catalogo.js'), 'utf8'), context, { timeout: 1000 }); }
catch (error) { console.error(`Erro no catalogo.js: ${error.message}`); process.exit(1); }
const data = context.window.AC_LEAL_CATALOG;
if (!Array.isArray(data)) { console.error('AC_LEAL_CATALOG deve ser uma lista.'); process.exit(1); }
function imageExists(image, label) {
  if (typeof image !== 'string' || !image.startsWith('assets/') || image.includes('..')) {
    errors.push(`${label}: use um caminho local começando por assets/.`); return;
  }
  if (!fs.existsSync(path.join(root, image))) errors.push(`${label}: imagem não encontrada: ${image}`);
}
let products = 0;
for (const [i, c] of data.entries()) {
  const label = c.title || `Conjunto ${i + 1}`;
  if (!c.id || ids.has(c.id)) errors.push(`${label}: id ausente ou repetido.`);
  ids.add(c.id);
  if (!['pet', 'cartonagem', 'rotulos'].includes(c.category)) errors.push(`${label}: categoria inválida.`);
  for (const field of ['title', 'label']) if (!c[field]) errors.push(`${label}: campo ${field} obrigatório.`);
  if (!Array.isArray(c.products)) { errors.push(`${label}: products deve ser uma lista.`); continue; }
  if (c.enabled === false) continue; // rascunhos podem ter caminhos ainda não cadastrados
  imageExists(c.image, label);
  c.products.forEach((p, n) => {
    products++;
    if (!p.name) errors.push(`${label}, produto ${n + 1}: nome ausente.`);
    imageExists(p.image, `${label}, produto ${n + 1}`);
  });
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Catálogo válido: ${data.filter(c => c.enabled !== false).length} conjuntos e ${products} produtos ativos. Medidas não verificadas; confirme-as no cadastro.`);
