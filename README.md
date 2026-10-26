# Everden — Loja Virtual de Produtos Sustentáveis

Loja virtual (catálogo) de produtos sustentáveis desenvolvida como projeto acadêmico de desenvolvimento web, utilizando **HTML5, CSS3 e JavaScript puro**.

A Everden é uma marca **fictícia**. Ela reúne três modelos — **Tote, Bag e Box** — feitos a partir de matérias-primas de origem renovável, como milho, mandioca e bambu.

O site apresenta a marca, o catálogo com variações, uma seção de materiais, os pilares de sustentabilidade, uma tabela comparativa e uma página de contato com formulário simulado.

> **Slogan:** *Pequenas escolhas, grandes futuros.*

## Estrutura de diretórios

```text
PROJETO - EVERDEN SUSTENTAVEL/
├── index.html
├── contato.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── imagens/
    ├── totebranca.png
    ├── toteverde.png
    ├── totebambu.png
    ├── bagbranca.png
    ├── bagverde.png
    ├── bagbambu.png
    ├── caixabranca.png
    ├── caixaverde.png
    ├── caixabambu.png
    └── todos.png
```

## Páginas do projeto

- **index.html:** página principal e catálogo, com navegação, apresentação da marca, categorias, produtos, materiais, sustentabilidade, tabela comparativa e rodapé.
- **contato.html:** formulário para solicitação de informações, com campos como nome, e-mail, telefone, produto, material e mensagem.

## Tecnologias utilizadas

- **HTML5:** estruturação semântica do conteúdo com elementos como `header`, `nav`, `main`, `section`, `article`, `figure`, `form`, `table` e `footer`.
- **CSS3:** estilos visuais, variáveis, Grid, Flexbox, tipografia fluida com `clamp()` e media queries para responsividade.
- **JavaScript:** troca de imagens conforme as variações selecionadas, menu responsivo, validação e envio simulado do formulário e animações de entrada.
- **Markdown:** documentação e organização das informações do projeto.

As fontes utilizadas são **Lora**, para títulos, e **Montserrat**, para textos. Elas são carregadas pelo Google Fonts, com fontes do sistema como alternativa.

## Caminhos relativos

O projeto utiliza caminhos relativos, sem referências ao caminho local do computador.

Exemplos:

- `href="contato.html"`
- `href="index.html"`
- `href="css/style.css"`
- `src="js/script.js"`
- `src="imagens/toteverde.png"`

Isso facilita abrir o projeto em outros computadores e publicá-lo em serviços de hospedagem estática.

## Como executar

Abra o arquivo **index.html** em um navegador moderno. O projeto utiliza HTML, CSS e JavaScript executados no próprio navegador e não exige instalação de servidor ou backend para visualizar o catálogo.

## Interação com as variações dos produtos

Em cada produto, é possível escolher o material (**Milho + Mandioca** ou **Bambu**) e o acabamento (**Natural** ou **Verde Everden**). A imagem é alterada de acordo com a seleção.

| Material | Acabamento | Imagem exibida |
|---|---|---|
| Milho + Mandioca | Natural | Arquivo terminado em `branca.png` |
| Milho + Mandioca | Verde Everden | Arquivo terminado em `verde.png` |
| Bambu | Bambu natural | Arquivo terminado em `bambu.png` |

A combinação **Bambu + Verde** não está disponível. Ao selecionar Bambu, as opções de acabamento são desativadas para evitar uma combinação sem imagem correspondente.

## Contexto acadêmico

Projeto desenvolvido no contexto da atividade **Atividade 01 – Frontend Web**, ministrada pelo professor **Genivaldo Carlos da Silva**, em 23/09/2026.

A proposta escolhida corresponde ao **Grupo 5 – Loja Virtual de Produtos Sustentáveis**, cujo objetivo é criar um catálogo on-line para uma empresa fictícia.

### Requisitos da proposta

- Criar uma página inicial com navegação e apresentação da empresa.
- Apresentar uma lista de categorias.
- Criar uma tabela comparativa de pelo menos três produtos.
- Incluir imagens, preços e links internos.
- Criar uma página `contato.html` com formulário.
- Utilizar caminhos relativos corretos para páginas e imagens.

## Objetivos acadêmicos

A atividade busca aplicar os conhecimentos de HTML5 e desenvolvimento Frontend Web por meio da criação de páginas e sistemas web.

Entre os objetivos estão:

- Aplicar a estrutura semântica do HTML5.
- Desenvolver páginas web com formulários e elementos de navegação.
- Utilizar corretamente campos, tabelas, imagens e links.
- Compreender conceitos de DNS, HTTPS e requisições HTTP.
- Aplicar boas práticas de acessibilidade e usabilidade.
- Organizar arquivos e pastas de um projeto web.

## Considerações finais

O projeto Everden aplica fundamentos de desenvolvimento Frontend Web, incluindo estruturação semântica, estilização responsiva, interatividade com JavaScript, organização de arquivos e documentação em Markdown.

A proposta apresenta um catálogo virtual de produtos sustentáveis, reunindo recursos de desenvolvimento web em uma experiência de navegação organizada e acessível.