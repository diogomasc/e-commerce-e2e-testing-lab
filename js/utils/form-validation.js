// Verifica apenas as restrições HTML. Regras de negócio continuam em cada página.
// O callback mantém a apresentação dos erros sob responsabilidade da interface.
export function validateNativeFields(form, showError, {
    emailMessage = 'E-mail inválido. Formato esperado: email@dominio.com',
    reportTooShort = false
} = {}) {
    let isValid = true;

    Array.from(form.elements).forEach(field => {
        if (!['INPUT', 'SELECT', 'TEXTAREA'].includes(field.tagName)) return;
        if (!field.checkValidity || field.checkValidity()) return;

        isValid = false;
        let message = 'Campo inválido';
        if (field.validity.valueMissing) {
            message = 'Campo obrigatório';
        } else if (field.validity.typeMismatch && field.type === 'email') {
            message = emailMessage;
        } else if (reportTooShort && field.validity.tooShort) {
            message = `Mínimo de ${field.minLength} caracteres`;
        }
        showError(field, message);
    });

    return isValid;
}
