class ToastNotification {
    constructor() {
        this.container = null;
        this.createContainer();
    }

    createContainer() {
        if (document.getElementById('toast-container')) return;

        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.style.position = 'fixed';
        this.container.style.bottom = '20px';
        this.container.style.right = '20px';
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'column';
        this.container.style.gap = '10px';
        this.container.style.zIndex = '9999';
        
        document.body.appendChild(this.container);
    }

    show({ title, message, type = 'success', duration = 5000 }) {
        if (!this.container) this.createContainer();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        toast.style.minWidth = '250px';
        toast.style.backgroundColor = type === 'success' ? '#4CAF50' : (type === 'error' ? '#f44336' : '#333');
        toast.style.color = '#fff';
        toast.style.padding = '15px 20px';
        toast.style.borderRadius = '4px';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.style.display = 'flex';
        toast.style.flexDirection = 'column';
        toast.style.gap = '5px';
        toast.style.transform = 'translateY(100%)';
        toast.style.opacity = '0';
        toast.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        toast.style.cursor = 'pointer';

        let content = '';
        if (title) {
            content += `<strong style="font-size: 1.1em">${title}</strong>`;
        }
        if (message) {
            content += `<span style="font-size: 0.9em">${message}</span>`;
        }
        
        toast.innerHTML = content;

        toast.addEventListener('click', () => {
            this.dismiss(toast);
        });

        this.container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });

        if (duration > 0) {
            setTimeout(() => {
                this.dismiss(toast);
            }, duration);
        }
    }

    dismiss(toast) {
        toast.style.transform = 'translateY(100%)';
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode === this.container) {
                this.container.removeChild(toast);
            }
        }, 300);
    }
}

export const toastService = new ToastNotification();
