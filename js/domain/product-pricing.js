export function getProductPrice(product, size = product.sizes?.[0]) {
    return product.pricesBySize?.[size] ?? product.price;
}

export function getProductStartingPrice(product) {
    return Math.min(...product.sizes.map(size => getProductPrice(product, size)));
}

export function hasVariableSizePrice(product) {
    return new Set(product.sizes.map(size => getProductPrice(product, size))).size > 1;
}
