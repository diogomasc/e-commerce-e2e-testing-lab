# Manutenção da aplicação

A loja continua usando módulos ES nativos, sem build ou dependências de execução.

## Onde fazer alterações

- `js/pages/`: eventos, navegação e apresentação de cada tela.
- `js/components/`: elementos de interface compartilhados.
- `js/domain/`: decisões de negócio sem acesso ao DOM ou armazenamento. As regras de cupons e disponibilidade são compartilhadas pelos serviços e pelas páginas.
- `js/services/`: casos de uso, persistência e notificações de mudanças. As APIs existentes dos serviços foram mantidas.
- `js/data/`: catálogo, cupons e contas de demonstração.
- `js/utils/form-validation.js`: restrições nativas dos campos HTML. Recebe um callback para apresentar o erro; cada página conserva suas mensagens e regras adicionais.

Para adicionar um cupom, configure seus dados em `js/data/coupons.js` e confira sua política em `js/domain/coupon-rules.js`. Para alterar disponibilidade, configure as variantes do produto em `js/data/products.js`; a decisão compartilhada fica em `js/domain/product-availability.js`.

## Tamanhos e preços

Em `js/data/products.js`, `sizes` define as opções exibidas e `pricesBySize` define o preço unitário de cada tamanho. Camisas e camisetas vão de P a GG; o jeans mantém 38 a 44 e inclui 46, 48 e G1 a G4. Os tamanhos G1 a G4 são opções próprias do laboratório, sem equivalência numérica declarada. Bermudas e tênis também têm preços distintos por tamanho; o cinto tem tamanho e preço únicos.

`js/domain/product-pricing.js` centraliza a resolução do preço, com fallback para `price` nos produtos sem tabela. O catálogo exibe o menor preço com “A partir de” quando os valores variam, e ordena por esse mesmo valor. O detalhe atualiza o preço ao selecionar um tamanho. Carrinho e checkout usam o preço da variante; carrinhos antigos são atualizados ao carregar. Pedidos já concluídos mantêm os valores registrados na compra.

## Contratos do laboratório

Os bugs intencionais fazem parte dos exercícios. A política de desconto, a exceção de estoque e as validações atuais de CPF e CEP devem permanecer até uma decisão explícita de alterar o exercício. Textos, rotas, `data-testid`, chaves de armazenamento e eventos também são contratos usados pelos testes E2E.

Evite mover regras de negócio para os templates ou corrigir falhas intencionais durante uma refatoração. Preserve também a ordem das validações: ela determina qual mensagem é apresentada.

## Verificação

Após alterar regras ou formulários, confira os fluxos de login, cadastro, carrinho e checkout no navegador. Verifique mensagens, máscaras, navegação e valores exibidos, incluindo os limites dos cupons e as variantes indisponíveis.

Preserve os comportamentos intencionais do laboratório ao comparar os resultados antes e depois da alteração.
