import { storage, CONSTANTS } from '../utils/storage.js';
import { coupons } from '../data/coupons.js';
import { products } from '../data/products.js';

class CartService {
    getCart() {
        return storage.get(CONSTANTS.CART_KEY) || { items: [], coupon: null };
    }

    saveCart(cart) {
        storage.set(CONSTANTS.CART_KEY, cart);
        // Dispara evento customizado para notificar outros componentes (ex: Header)
        window.dispatchEvent(new Event('cartUpdated'));
    }

    addItem(productId, size, color) {
        const cart = this.getCart();
        const product = products.find(p => p.id === productId);
        
        if (!product) return;

        const unavailable = product.unavailableVariants?.some(variant => variant.size === size && variant.color === color);
        const warning = unavailable ? 'O item, tamanho ou cor desejado encontra-se indisponível.' : null;
        if (unavailable && !product.allowUnavailablePurchase) {
            return { success: false, message: warning };
        }

        const existingItemIndex = cart.items.findIndex(
            item => item.productId === productId && item.size === size && item.color === color
        );

        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += 1;
        } else {
            cart.items.push({
                productId,
                title: product.title,
                price: product.price,
                image: product.images[0],
                size,
                color,
                quantity: 1
            });
        }

        this.validateCoupon(cart);
        this.saveCart(cart);
        return { success: true, message: warning };
    }

    updateQuantity(productId, size, color, quantity) {
        const cart = this.getCart();
        const itemIndex = cart.items.findIndex(
            item => item.productId === productId && item.size === size && item.color === color
        );

        if (itemIndex >= 0) {
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = quantity;
            }
            this.validateCoupon(cart);
            this.saveCart(cart);
        }
    }

    removeItem(productId, size, color) {
        this.updateQuantity(productId, size, color, 0);
    }

    applyCoupon(code) {
        const cart = this.getCart();
        const total = this.getSubtotal(cart);
        const coupon = coupons.find(c => c.code === code.toUpperCase());

        if (!coupon) {
            return { success: false, message: "Cupom inválido." };
        }

        if (!this.isCouponEligible(coupon, total)) {
            const message = coupon.exclusiveMinimum
                ? `Compra acima de R$ ${coupon.minPurchase} para este cupom.`
                : `Compra mínima de R$ ${coupon.minPurchase} para este cupom.`;
            return { success: false, message };
        }

        cart.coupon = coupon;
        this.saveCart(cart);
        return { success: true };
    }

    removeCoupon() {
        const cart = this.getCart();
        cart.coupon = null;
        this.saveCart(cart);
    }

    validateCoupon(cart) {
        if (cart.coupon) {
            cart.coupon = coupons.find(c => c.code === cart.coupon.code) || null;
            const subtotal = this.getSubtotal(cart);
            if (!cart.coupon || !this.isCouponEligible(cart.coupon, subtotal)) {
                cart.coupon = null; // Automatically remove if below minimum
            }
        }
    }

    isCouponEligible(coupon, subtotal) {
        return coupon.exclusiveMinimum
            ? subtotal > coupon.minPurchase
            : subtotal >= coupon.minPurchase;
    }

    getSubtotal(cart = this.getCart()) {
        return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getTotal(cart = this.getCart()) {
        const subtotal = this.getSubtotal(cart);
        const appliesDiscount = ['DESCONTO20', 'DESCONTO50'].includes(cart.coupon?.code);
        // BUG INTENCIONAL PARA E2E: os demais cupons exibem desconto, mas nao reduzem o total.
        const discount = appliesDiscount ? this.getDiscount(cart) : 0;
        return Math.max(0, subtotal - discount);
    }

    getDiscount(cart = this.getCart()) {
        const coupon = coupons.find(c => c.code === cart.coupon?.code);
        if (!coupon) return 0;
        const subtotal = this.getSubtotal(cart);
        return this.isCouponEligible(coupon, subtotal) ? coupon.discount : 0;
    }

    clearCart() {
        this.saveCart({ items: [], coupon: null });
    }
}

export const cartService = new CartService();
