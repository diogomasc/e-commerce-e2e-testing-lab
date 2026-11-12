import { storage, CONSTANTS } from '../utils/storage.js';
import { findCoupon, isCouponEligible, getCouponRequirementMessage, appliesDiscountToTotal } from '../domain/coupon-rules.js';
import { getVariantAvailability } from '../domain/product-availability.js';
import { products } from '../data/products.js';
import { getProductImages } from '../domain/product-images.js';
import { getProductPrice } from '../domain/product-pricing.js';

class CartService {
    getCart() {
        const cart = storage.get(CONSTANTS.CART_KEY) || { items: [], coupon: null };
        // Atualiza também imagens e preços de carrinhos salvos antes das variantes.
        cart.items = cart.items.map(item => {
            const product = products.find(product => product.id === item.productId);
            return product ? {
                ...item,
                image: getProductImages(product, item.color)[0],
                price: getProductPrice(product, item.size)
            } : item;
        });
        return cart;
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

        const availability = getVariantAvailability(product, size, color);
        if (!availability.canPurchase) {
            return { success: false, message: availability.message };
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
                price: getProductPrice(product, size),
                image: getProductImages(product, color)[0],
                size,
                color,
                quantity: 1
            });
        }

        this.validateCoupon(cart);
        this.saveCart(cart);
        return { success: true, message: availability.message };
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
        const coupon = findCoupon(code.toUpperCase());

        if (!coupon) {
            return { success: false, message: "Cupom inválido." };
        }

        if (!this.isCouponEligible(coupon, total)) {
            return { success: false, message: getCouponRequirementMessage(coupon) };
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
            cart.coupon = findCoupon(cart.coupon.code) || null;
            const subtotal = this.getSubtotal(cart);
            if (!cart.coupon || !this.isCouponEligible(cart.coupon, subtotal)) {
                cart.coupon = null; // Automatically remove if below minimum
            }
        }
    }

    isCouponEligible(coupon, subtotal) {
        return isCouponEligible(coupon, subtotal);
    }

    getSubtotal(cart = this.getCart()) {
        return cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getTotal(cart = this.getCart()) {
        const subtotal = this.getSubtotal(cart);
        const appliesDiscount = appliesDiscountToTotal(cart.coupon);
        // BUG INTENCIONAL PARA E2E: os demais cupons exibem desconto, mas nao reduzem o total.
        const discount = appliesDiscount ? this.getDiscount(cart) : 0;
        return Math.max(0, subtotal - discount);
    }

    getDiscount(cart = this.getCart()) {
        const coupon = findCoupon(cart.coupon?.code);
        if (!coupon) return 0;
        const subtotal = this.getSubtotal(cart);
        return this.isCouponEligible(coupon, subtotal) ? coupon.discount : 0;
    }

    clearCart() {
        this.saveCart({ items: [], coupon: null });
    }
}

export const cartService = new CartService();
