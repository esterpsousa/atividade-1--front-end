# Everden

Loja virtual (catálogo) de produtos sustentáveis desenvolvida como projeto acadêmico
de desenvolvimento web, utilizando apenas **HTML5, CSS3 e JavaScript puro**.

A Everden é uma marca **fictícia**. Ela reúne três modelos — **Tote**, **Bag** e **Box** —
feitos a partir de matérias-primas de origem renovável (milho, mandioca e bambu).
O site apresenta a marca, o catálogo com variações, uma seção de materiais,
os pilares de sustentabilidade, uma tabela comparativa e uma página de contato
com formulário simulado.

> Slogan: *Pequenas escolhas, grandes futuros.*

## Estrutura de diretórios

```
everden/
├── index.html          → Página principal e catálogo
├── contato.html        → Formulário para solicitação de informações
├── README.md           → Este arquivo (mapa da estrutura)
│
├── css/
│   └── style.css       → Estilos, paleta e responsividade
│
├── js/
│   └── script.js       → Interações (variações, menu, formulário)
│
└── imagens/
    ├── totebranca.png  → Tote · Milho + Mandioca · Natural
    ├── toteverde.png   → Tote · Milho + Mandioca · Verde Everden
    ├── totebambu.png   → Tote · Bambu
    ├── bagbranca.png   → Bag · Milho + Mandioca · Natural
    ├── bagverde.png    → Bag · Milho + Mandioca · Verde Everden
    ├── bagbambu.png    → Bag · Bambu
    ├── caixabranca.png → Box · Natural
    ├── caixaverde.png  → Box · Verde Everden
    ├── caixabambu.png  → Box · Bambu
    └── todos.png       → Painel da marca com os três modelos
```

Cada imagem de produto é uma composição com **seis fotografias** do mesmo item
(vistas, detalhes de textura e uso). Elas são aproveitadas como galeria do produto
e, quando útil, uma única foto é destacada via CSS (`background-position`),
**sem editar ou recortar o arquivo original**.

## Páginas

- **index.html** — página principal e catálogo: navegação, hero, apresentação da
  empresa, categorias, catálogo dos três produtos com seleção de variações,
  materiais, sustentabilidade, tabela comparativa, chamada final e rodapé.
- **contato.html** — formulário para solicitação de informações (nome, e-mail,
  telefone, produto, material e mensagem), com link claro de retorno à página inicial.

## Tecnologias

- **HTML5** — marcação semântica (`header`, `nav`, `main`, `section`, `article`,
  `figure`, `form`, `table`, `footer`).
- **CSS3** — variáveis (design tokens), Grid, Flexbox, `clamp()` para tipografia
  fluida e *media queries* para responsividade.
- **JavaScript** — troca da imagem conforme a variação escolhida, menu responsivo,
  validação e envio simulado do formulário, animações discretas de entrada.

Fontes: **Lora** (títulos) e **Montserrat** (textos), carregadas via Google Fonts,
com fontes do sistema como alternativa caso não haja conexão.

## Caminhos (relativos)

Todo o projeto usa **caminhos relativos**, sem nenhuma referência absoluta ao
computador — ou seja, sem unidades de disco locais, sem o protocolo de arquivo
local e sem pastas de usuário do sistema. Exemplos usados no projeto:

- `href="contato.html"` e `href="index.html"`
- `href="css/style.css"` e `src="js/script.js"`
- `src="imagens/toteverde.png"`

Isso permite que o projeto funcione ao extrair a pasta e abrir o `index.html`
em qualquer computador, independentemente de onde a pasta esteja salva.

## Como abrir

Extraia a pasta `everden/` e abra o arquivo **`index.html`** em qualquer navegador
moderno. Nenhuma instalação, servidor ou backend é necessário.

## Interação das variações

Em cada produto é possível escolher o **material** (Milho + Mandioca ou Bambu) e o
**acabamento** (Natural ou Verde Everden). A imagem muda conforme a seleção:

| Material          | Acabamento     | Imagem exibida       |
|-------------------|----------------|----------------------|
| Milho + Mandioca  | Natural        | `*branca.png`        |
| Milho + Mandioca  | Verde Everden  | `*verde.png`         |
| Bambu             | — (Bambu Natural) | `*bambu.png`      |

A combinação *Bambu + Verde* não existe: ao selecionar **Bambu**, as opções de
acabamento são desativadas, evitando combinações sem imagem correspondente.
