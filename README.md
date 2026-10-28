# AC LEAL — site e catálogo editável

Projeto completo em HTML, CSS e JavaScript, sem framework e sem dependências de instalação. Esta é a cópia para edição local; alterações aqui não atualizam automaticamente o site publicado.

## Abrir no Codex

1. Extraia o ZIP inteiro para uma pasta.
2. Abra a pasta `ac-leal-site` como projeto no Codex.
3. Comece pelo arquivo `catalogo.js` para cadastrar fotos e medidas.
4. Para visualizar, com Node.js 18 ou superior instalado, execute `npm run dev` e abra `http://localhost:3000`.

Não é necessário executar `npm install`. Também é possível abrir `index.html` diretamente no navegador para conferir o catálogo. As fontes usam Google Fonts; sem internet, o site usa as fontes alternativas do sistema.

## Onde editar

| Arquivo ou pasta | Finalidade |
| --- | --- |
| `catalogo.js` | Conjuntos, produtos individuais, ordem, nomes e medidas |
| `assets/conjuntos/` | Fotografias dos produtos juntos, usadas nos cartões |
| `assets/individuais/` | Fotografias individuais dos produtos no carrossel |
| `assets/logo-ac-leal.png` | Símbolo da marca |
| `index.html` | Textos institucionais, contatos, parceiros e imagens do destaque inicial |
| `styles.css` | Layout, tipografia e paleta de cores |
| `app.js` | Comportamento do carrossel, filtros e menu |
| `exemplos/novo-conjunto.js` | Modelo comentado para cadastrar uma coleção |

As 43 imagens individuais que acompanham esta versão são **recortes de demonstração das fotografias de conjunto**. Substitua-as pelas suas fotos individuais originais. As medidas não foram fornecidas e estão como “Medidas sob consulta”; nenhuma dimensão foi estimada.

## Trocar as fotos de um conjunto existente

Você pode substituir os arquivos mantendo o mesmo nome e extensão, sem editar o código. Se usar outros nomes, altere os caminhos em `catalogo.js`.

Exemplo: coloque a foto de todos os potes juntos em `assets/conjuntos/potes-doces.jpg`. Coloque as fotos individuais em `assets/individuais/potes-doces/`. Crie essa subpasta se necessário.

No objeto do conjunto em `catalogo.js`, edite:

```js
{
  id: "potes-doces",              // identificador único, sem espaços
  category: "pet",               // pet, cartonagem ou rotulos
  label: "Doces e alimentos",    // texto de categoria acima do título
  title: "Potes para doces",     // título do cartão e do carrossel
  description: "Descrição do conjunto.",
  image: "assets/conjuntos/potes-doces.jpg", // foto de TODOS juntos
  enabled: true,
  products: [
    {
      image: "assets/individuais/potes-doces/produto-01.jpg", // foto INDIVIDUAL
      name: "Nome do produto",
      code: "REF. 001",
      size: "Medidas sob consulta" // substitua pelas medidas confirmadas
    }
  ]
}
```

O campo `size` aceita texto livre, por exemplo: `Altura: [valor] cm • Diâmetro: [valor] cm • Capacidade: [valor] mL`. Troque os marcadores pelos dados reais. Para caixas, você pode informar `Comprimento × largura × altura`, sempre com a unidade.

Cada objeto em `products` vira um slide. Para mais produtos, copie um objeto e altere foto, nome, referência e medidas. A ordem dos objetos define a ordem do carrossel. A contagem e os pontos de navegação são atualizados automaticamente. Se `size` estiver vazio, aparece “Medidas sob consulta”. Se houver apenas um produto, as setas ficam ocultas.

## Adicionar um novo conjunto

1. Copie o objeto de `exemplos/novo-conjunto.js` para dentro da lista `window.AC_LEAL_CATALOG = [ ... ]` em `catalogo.js`.
2. Separe os objetos da lista com vírgula.
3. Use um `id` exclusivo e uma categoria existente: `pet`, `cartonagem` ou `rotulos`.
4. Coloque a foto de conjunto e as fotos individuais nas pastas correspondentes.
5. Preencha todos os campos e altere `enabled` para `true`.

Use `enabled: false` para ocultar um conjunto enquanto estiver preparando suas imagens. O arquivo de exemplo não é carregado pela página. Novas categorias exigem também um novo botão de filtro em `index.html`.

## Dicas para os arquivos de imagem

- Use JPG, PNG ou WebP. Prefira nomes sem espaços e sem acentos.
- Os caminhos são relativos ao `index.html` e usam `/`, mesmo no Windows.
- A extensão e as letras maiúsculas/minúsculas devem corresponder ao arquivo real.
- Você não precisa recortar as fotos: o carrossel exibe a imagem inteira, mantendo a proporção.
- Uma imagem ausente mostra uma imagem substituta. Execute o validador para encontrar o caminho incorreto.
- As três imagens do destaque inicial são independentes do catálogo: para trocá-las, edite os `src` em `.hero-visual`, no `index.html`.

## Conferir depois de editar

Execute:

```sh
npm run validar
npm run dev
```

O validador confere sintaxe do cadastro, identificadores repetidos, categorias e existência das imagens dos conjuntos ativos. Ele não confere as medidas físicas nem identifica se uma fotografia corresponde ao produto. Depois abra o catálogo, teste os filtros e percorra os produtos de cada conjunto.

## Contatos e identidade

- WhatsApp: procure `5581998595700` e o telefone visível no `index.html`.
- E-mail: procure `aclealrep@gmail.com` no `index.html`.
- Azul e laranja: variáveis CSS no início de `styles.css`.
- O símbolo está em `assets/logo-ac-leal.png`; o nome e “Representação comercial” são texto em `index.html`.

## Hospedagem

O projeto é estático e pode ser publicado em uma hospedagem de arquivos HTML/CSS/JS. Publique o `index.html`, `catalogo.js`, `app.js`, `styles.css` e a pasta `assets` no mesmo diretório público. Não há etapa de build, backend ou banco de dados. O ZIP não contém credenciais nem vínculo automático com a publicação anterior.

## Pedidos úteis para fazer ao Codex

> Adicione estas fotos ao conjunto de condimentos em catalogo.js, mantendo a ordem dos nomes dos arquivos. Use as medidas que vou fornecer e preserve o layout.

> Cadastre uma nova coleção usando exemplos/novo-conjunto.js. Use esta imagem como conjunto e as outras como produtos individuais. Deixe medidas sob consulta onde faltarem dados.
