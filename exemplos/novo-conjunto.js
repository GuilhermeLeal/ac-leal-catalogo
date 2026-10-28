// MODELO: copie somente o objeto abaixo para o array em catalogo.js.
// Este arquivo não é carregado pela página. Os caminhos são exemplos;
// coloque suas fotos nesses caminhos antes de habilitar o conjunto.
({
  id: 'meu-novo-conjunto', // único no catálogo, sem espaços
  category: 'pet', // pet | cartonagem | rotulos
  label: 'Cosméticos',
  title: 'Nome do conjunto',
  description: 'Descrição curta do conjunto.',
  image: 'assets/conjuntos/meu-novo-conjunto.jpg',
  enabled: false, // altere para true quando terminar o cadastro
  products: [
    {
      image: 'assets/individuais/meu-novo-conjunto/produto-01.jpg',
      name: 'Nome do primeiro produto',
      code: 'REF. 001',
      size: 'Medidas sob consulta' // substitua por medidas reais, incluindo unidade
    },
    {
      image: 'assets/individuais/meu-novo-conjunto/produto-02.jpg',
      name: 'Nome do segundo produto',
      code: 'REF. 002',
      size: 'Medidas sob consulta'
    }
  ]
});
