import { isVariantUnavailable } from '../domain/product-availability.js';
import { getProductImages } from '../domain/product-images.js';
import { productService } from '../services/product.service.js';
import { cartService } from '../services/cart.service.js';
import { format } from '../utils/format.js';

class ProductPage {
    constructor() {
        this.container = document.getElementById('product-container');
        this.errorMsg = document.getElementById('product-error');
        this.selectedSize = null;
        this.selectedColor = null;
        this.selectedImageIndex = 0;

        this.init();
    }

    init() {
        if (!this.container) return;

        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        const product = productService.getById(productId);

        if (!product) {
            this.container.style.display = 'none';
            if (this.errorMsg) this.errorMsg.style.display = 'block';
            return;
        }

        this.product = product;
        
        // Seleciona a primeira opção por padrão, preservando as regras do laboratório.
        if (product.sizes?.length) this.selectedSize = product.sizes[0];
        if (product.colors?.length) this.selectedColor = product.colors[0];

        this.render();
        this.bindEvents();
    }

    render() {
        const { product, selectedSize, selectedColor } = this;
        const images = getProductImages(product, selectedColor);

        const sizesHtml = product.sizes.map(size => `
            <button type="button" class="btn ${size === selectedSize ? 'btn--primary' : 'btn--outline'} size-btn ${this.isUnavailable(size, selectedColor) ? 'variant-unavailable' : ''}" title="${this.isUnavailable(size, selectedColor) ? 'Tamanho indisponível nesta cor' : 'Selecionar tamanho'}" aria-pressed="${size === selectedSize}" data-size="${size}" data-testid="size-${size}">
                ${size}
            </button>
        `).join('');

        const colorsHtml = product.colors.map(color => `
            <button type="button" class="btn ${color === selectedColor ? 'btn--primary' : 'btn--outline'} color-btn" aria-pressed="${color === selectedColor}" data-color="${color}" data-testid="color-${color.replace(/\s+/g, '-')}">
                ${color}
            </button>
        `).join('');

        this.container.innerHTML = `
            <div>
                <img src="${images[this.selectedImageIndex]}" alt="${product.title} — ${selectedColor}, vista ${this.selectedImageIndex + 1}" class="product-image" id="main-product-image" data-testid="product-detail-image">
                <div class="product-gallery" role="group" aria-label="Imagens de ${product.title} na cor ${selectedColor}">
                    ${images.map((img, i) => `
                        <button type="button" class="gallery-btn ${i === this.selectedImageIndex ? 'active' : ''}" data-image-index="${i}" aria-label="Ver imagem ${i + 1} de ${product.title}, ${selectedColor}" aria-pressed="${i === this.selectedImageIndex}">
                            <img src="${img}" alt="${product.title} — ${selectedColor}, vista ${i + 1}" data-testid="product-gallery-img-${i}">
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div style="padding: var(--spacing-md) 0;">
                <span class="badge" data-testid="product-detail-category">${product.category}</span>
                <h1 style="margin: var(--spacing-sm) 0; font-size: var(--font-size-xxl);" data-testid="product-detail-title">${product.title}</h1>
                <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);" data-testid="product-detail-desc">${product.description}</p>
                
                <div style="font-size: 2rem; font-weight: bold; color: var(--color-primary); margin-bottom: var(--spacing-lg);" data-testid="product-detail-price">
                    ${format.currency(product.price)}
                </div>

                <div style="margin-bottom: var(--spacing-md);">
                    <h4 style="margin-bottom: var(--spacing-sm);" data-testid="product-sizes-title">Tamanho</h4>
                    <div style="display: flex; gap: var(--spacing-sm); flex-wrap: wrap;">
                        ${sizesHtml}
                    </div>
                </div>

                <div style="margin-bottom: var(--spacing-lg);">
                    <h4 style="margin-bottom: var(--spacing-sm);" data-testid="product-colors-title">Cor</h4>
                    <div style="display: flex; gap: var(--spacing-sm); flex-wrap: wrap;">
                        ${colorsHtml}
                    </div>
                </div>

                <button id="add-to-cart-btn" class="btn btn--primary" style="width: 100%; padding: var(--spacing-md); font-size: var(--font-size-lg);" data-testid="add-to-cart-btn">
                    Adicionar ao Carrinho
                </button>
                <div id="add-to-cart-feedback" data-testid="add-to-cart-feedback" style="display: none; color: var(--color-success); margin-top: var(--spacing-sm); font-weight: bold; text-align: center;">
                    Produto adicionado!
                </div>
                <div id="product-unavailable-warning" data-testid="product-unavailable-warning" role="alert" style="display: none; color: var(--color-error); margin-top: var(--spacing-sm); text-align: center;"></div>
            </div>
        `;
    }

    bindEvents() {
        // Delegacao de eventos para tamanhos e cores
        this.container.addEventListener('click', (e) => {
            const galleryButton = e.target.closest('.gallery-btn');
            if (galleryButton) {
                this.selectedImageIndex = Number(galleryButton.dataset.imageIndex);
                const mainImg = document.getElementById('main-product-image');
                mainImg.src = getProductImages(this.product, this.selectedColor)[this.selectedImageIndex];
                mainImg.alt = `${this.product.title} — ${this.selectedColor}, vista ${this.selectedImageIndex + 1}`;
                
                // Atualiza a classe ativa
                this.container.querySelectorAll('.gallery-btn').forEach(button => {
                    const active = button === galleryButton;
                    button.classList.toggle('active', active);
                    button.setAttribute('aria-pressed', String(active));
                });
            }
            if (e.target.classList.contains('size-btn')) {
                this.selectedSize = e.target.getAttribute('data-size');
                this.render(); // Simple re-render to update classes
                this.container.querySelector(`[data-size="${this.selectedSize}"]`).focus();
            }
            if (e.target.classList.contains('color-btn')) {
                this.selectedColor = e.target.getAttribute('data-color');
                this.selectedImageIndex = 0;
                this.render();
                this.container.querySelector(`[data-color="${this.selectedColor}"]`).focus();
            }
            if (e.target.id === 'add-to-cart-btn') {
                this.addToCart();
            }
        });
    }

    isUnavailable(size, color) {
        return isVariantUnavailable(this.product, size, color);
    }

    addToCart() {
        const result = cartService.addItem(this.product.id, this.selectedSize, this.selectedColor);
        const warning = document.getElementById('product-unavailable-warning');
        if (warning) {
            warning.textContent = result?.message || '';
            warning.style.display = result?.message ? 'block' : 'none';
        }
        
        const feedback = document.getElementById('add-to-cart-feedback');
        if (!result?.success || result.message) {
            if (feedback) feedback.style.display = 'none';
            return;
        }
        if (feedback) {
            feedback.style.display = 'block';
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 3000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProductPage();
});
