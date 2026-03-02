import { productService } from '../services/product.service.js';
import { createProductCard } from '../components/product-card.js';
import { toastService } from '../components/toast.js';

class HomePage {
    constructor() {
        this.grid = document.getElementById('featured-products-grid');
        this.init();
    }

    init() {
        if (!this.grid) return;

        // Pega os 4 primeiros produtos como destaque
        const featuredProducts = productService.getAll().slice(0, 4);
        
        featuredProducts.forEach(product => {
            const card = createProductCard(product);
            this.grid.appendChild(card);
        });

        // Verifica se acabou de se cadastrar
        const registeredUserStr = sessionStorage.getItem('justRegistered');
        if (registeredUserStr) {
            try {
                const user = JSON.parse(registeredUserStr);
                sessionStorage.removeItem('justRegistered');
                
                toastService.show({
                    title: 'Cadastro realizado com sucesso!',
                    message: `Boas-vindas, ${user.firstname} ${user.lastname}! Aproveite nossas ofertas exclusivas.`,
                    type: 'success',
                    duration: 5000
                });
            } catch (e) {
                console.error('Erro ao ler dados de registro da sessão', e);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HomePage();
});
