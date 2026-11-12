import { coupons } from '../data/coupons.js';

export function findCoupon(code) {
    return coupons.find(coupon => coupon.code === code);
}

export function isCouponEligible(coupon, subtotal) {
    return coupon.exclusiveMinimum
        ? subtotal > coupon.minPurchase
        : subtotal >= coupon.minPurchase;
}

export function getCouponRequirementMessage(coupon) {
    return coupon.exclusiveMinimum
        ? `Compra acima de R$ ${coupon.minPurchase} para este cupom.`
        : `Compra mínima de R$ ${coupon.minPurchase} para este cupom.`;
}

// Contrato do laboratório: alguns cupons exibem desconto sem reduzir o total.
// Mantenha essa decisão explícita para não corrigir o exercício por acidente.
export function appliesDiscountToTotal(coupon) {
    return ['DESCONTO20', 'DESCONTO50'].includes(coupon?.code);
}
