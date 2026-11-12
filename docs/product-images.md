# Imagens do catálogo

As imagens em `assets/images/products/` são geradas por IA para os produtos fictícios deste laboratório. As roupas aparecem em manequins artificiais; os jeans têm modelagem e manequins masculinos. Calçados e cintos aparecem isolados. Não foram usadas fotografias dos fornecedores como referência. Os prompts pedem desenhos genéricos, sem pessoas, marcas, etiquetas ou logotipos.

O arquivo `image-prompts.json` nessa pasta registra o prompt de cada imagem e o uso da ferramenta integrada de geração.

## Cores e galeria

Em `js/data/products.js`, cada produto declara `imagesByColor`, cujas chaves correspondem exatamente a `colors`. Cada cor tem uma imagem frontal e outra vista. `images` continua sendo a galeria da primeira cor, preservando o contrato do catálogo.

`getProductImages` em `js/domain/product-images.js` resolve a galeria de uma cor. Ao selecionar outra cor, a página mostra a primeira imagem da nova galeria. Ao mudar somente o tamanho, mantém a vista selecionada. As miniaturas são botões utilizáveis por teclado, com descrição da cor e estado selecionado.

O carrinho usa a primeira foto da cor comprada e atualiza em memória as referências de imagens de carrinhos antigos ao carregá-los. As regras de estoque e os bugs intencionais do laboratório são preservados.

## Conferência manual

1. Abra cada produto e selecione todas as cores, conferindo a foto principal e as miniaturas.
2. Abra a segunda miniatura, mude o tamanho e confira que a vista foi mantida.
3. Troque a cor e confira que a galeria voltou à primeira imagem da nova cor.
4. Adicione uma variante disponível ao carrinho e confira sua cor e foto.
5. Use Tab e Enter para selecionar cores e miniaturas em telas largas e no celular.

## Verificação desta alteração

A verificação automatizada da lógica cobriu os 6 produtos e as 12 combinações de produto e cor: seleção de miniatura, troca de cor, preservação da vista ao trocar tamanho, imagem do carrinho e atualização das referências em carrinhos antigos. Ela usa um DOM simulado, sem substituir um teste no navegador.

`GATE: ERROR`: a verificação visual de layout não rodou, pois este ambiente não possui Chrome, Edge ou Chromium. Responsividade, aparência final e navegação real por teclado ainda precisam de conferência no navegador.
