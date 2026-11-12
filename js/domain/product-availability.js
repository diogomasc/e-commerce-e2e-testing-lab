export function isVariantUnavailable(product, size, color) {
    return product.unavailableVariants?.some(variant =>
        variant.size === size && variant.color === color
    ) || false;
}

export function getVariantAvailability(product, size, color) {
    const unavailable = isVariantUnavailable(product, size, color);
    return {
        // A exceção de compra é intencional e faz parte do laboratório.
        canPurchase: !unavailable || !!product.allowUnavailablePurchase,
        message: unavailable ? 'O item, tamanho ou cor desejado encontra-se indisponível.' : null
    };
}
