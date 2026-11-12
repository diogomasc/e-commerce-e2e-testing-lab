// Mantém a mesma seleção de imagens no produto, catálogo e carrinho.
export function getProductImages(product, color = product.colors?.[0]) {
    return product.imagesByColor?.[color] || product.images || [];
}
