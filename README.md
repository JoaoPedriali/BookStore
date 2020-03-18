# Book Store

O sistema foi construído utilizando três tecnologias: Node + express para a API, MongoDB Atlas como banco de dados, e VueJS + VueX para a construção das telas.

O deploy foi feito no [Heroku](https://book-store-tegra.herokuapp.com/), já que o acesso remoto fica mais fácil.

## O Sistema

Na pasta [src](https://github.com/JoaoPedriali/BookStore/tree/master/src) se encontram os arquivos do backend, que foi constrúido no pattern de MVC (ou neste caso "MC").
Dentro da pasta [client/src/components](https://github.com/JoaoPedriali/BookStore/tree/master/client/src/components) estão os arquivos do Vue. 

O arquivo App.vue é o arquivo principal na parte de renderização, e a partir dele são selecionados quais partes do sistema serão renderizadas.
Os outros componentes .vue são as partes que montam a tela,e dentro destes arquivos encontramos o html, css e javascript para estes componentes e no arquivo main.js a váriavel store do VueX fica responsável por armazenar todos os dados durante o fluxo da navegação

## Fluxo de utilização

Na página inicial vemos todos os livros cadastrados, e na caixa de pesquisa, podemos filtrar por título ou autor.
No canto superior direito, temos um botão para cadastrar novos livros,e um atalho pala a tela do carrinho.

Ao selecionar um livro, temos a opção de adicioná-lo ao carrinho, ou Alterar seus dados (o mesmo botão que era para criar um livro, agora nos leva para a tela de alteração).
Nesta tela de alteração podemos alterar todos os dados do livro ou excluí-lo do banco de dados.

A tela do carrinho permite que alteremos a quantidade, cancelemos ou finalizemos a venda.
Ao finalizar a venda, a quantidade dos livros no estoque é atualizada automaticamente.

## Diferenciais
- [x] Utilizar algum banco de dados (MySQL, banco de dados em memória, etc). Inclua as queries de criação da tabela, sequence, etc para a configuração do mesmo, caso seja necessário.
  ###### O banco utilizado foi o MongoDB Cloud, não precisa ser configurado manualmente
  
- [ ] Implementar a seguinte funcionalidade de aplicação de cupom de desconto: no carrinho de compras, caso o usuário inclua o cupom de desconto TrabalheNaTegra, proporcionar 10% de desconto nos livros do autor “Martin Fowler”, e 20% de desconto nos livros do autor “Robert C. Martin”.
- [x] Implementar a seguinte funcionalidade de filtro na listagem: aplicar filtro por nome do autor
###### A filtragem é feita automaticamente, basta começar a digitar o nome do livro/ autor na caixa de pesquisa

- [ ] Tratamento de erros
- [ ] Implementar testes em código (teste unitário, integração, etc)


## Créditos

Ícone utilizado no logo feito por [Freepik](https://www.flaticon.com/authors/freepik)
