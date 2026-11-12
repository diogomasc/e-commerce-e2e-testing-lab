# E-Commerce E2E Testing Laboratory 🛒

O **E-commerce E2E Test**, é uma aplicação puramente desenvolvida em **Vanilla JavaScript** (ES6+), **HTML5** e **CSS3**, focada em servir como ambiente base, limpo e determinístico para testes End-to-End (E2E) com frameworks como Cypress, Playwright ou Selenium.

O objetivo é praticar **testes de caixa preta** em cenários de uma loja: navegar, preencher formulários, comprar e conferir os resultados apresentados ao usuário. A aplicação inclui bugs intencionais para exercitar a descoberta e o registro de defeitos. Os testes devem interagir com a interface e verificar comportamentos observáveis, sem depender da implementação interna.

---

## 🎯 Escopo e Proposta do Projeto

Apesar de ser um e-commerce aparentemente funcional de ponta a ponta, é crucial entender as limitações intencionais da arquitetura:

- **Não há Backend real:** Não existem APIs para autenticação ou persistência de banco de dados (`fetch` ou `axios` não são utilizados).
- **Dados Mockados (`js/data/`)**: A listagem de produtos, catálogos e usuários padrão vêm de arquivos estáticos no repositório. O "Banco de Dados" vive na memória do seu front-end durante a execução.
- **Persistência de Sessão:** Toda mutação (Adicionar ao carrinho, Criar pedido novo, Mudar perfil) é salva na API de Web Storage do navegador, especificamente o **LocalStorage**.
- **Ideal para UI Automation:** Testadores não precisam mockar respostas HTTP complexas. Toda manipulação se foca estritamente no ecossistema e estado do navegador (UI Testing puro).

---

## 📂 Organização do Projeto e Tecnologias

A arquitetura foi segregada baseada no design modular MVC, onde `js/services` atuam como "backend fake" para cada controle de tela:

```text
/
├── *.html            # Páginas estáticas atuando como View layer (index, cart, checkout...)
├── css/              # Design System em CSS Puro Moderno (Variáveis e Resets)
├── js/               # O Cérebro JS da Aplicação!
│   ├── components/   # Injeções de construtores de DOM, modais e layouts padrão.
│   ├── data/         # Onde seus objetos primários de testes ficam gerados.
│   │   ├── products.js  # JSON dos produtos do sistema.
│   │   ├── users.js     # Massas de dados base para testar logins diretos.
│   │   └── coupons.js   # Regras ativas de cupons na loja.
│   ├── pages/        # Escopo estrito e Listeners HTML-specific (Ex: checkout.js só roda no checkout).
│   ├── services/     # Casos de uso do software (Carrinho, Order, Auth). Manipula os Dados!
│   └── utils/        # Facades de comodidade geral do código (Validadores e Parsing Format).
```

- **Nenhum Framework Frontend:** Ausência completa de bibliotecas como React, Vue, jQuery ou TailwindCSS. Apenas as camadas puras da Web.
- **Testes Mapeados:** A Interface Gráfica é massivamente anotada com atributos `data-testid="X"`, garantindo seletores resilientes e à prova de refatorações de design.

---

## Como Executar Localmente

A loja é uma aplicação estática e não exige build nem instalação de dependências pelo npm. Siga os passos abaixo para abri-la no seu computador.

### 1. Clone o projeto e entre na pasta

Com o **Git instalado**, abra o terminal na pasta em que deseja guardar o projeto e execute:

```bash
git clone https://github.com/diogomasc/E-Commerce-E2E-Testing-Laboratory.git
cd E-Commerce-E2E-Testing-Laboratory
```

O primeiro comando baixa o repositório; o segundo entra na pasta do projeto.

### 2. Abra a pasta no VS Code

No mesmo terminal, execute:

```bash
code .
```

Se o comando `code` não estiver disponível, abra o VS Code e selecione **Arquivo > Abrir Pasta**, escolhendo a pasta `E-Commerce-E2E-Testing-Laboratory`. Confira se o arquivo `index.html` aparece no painel lateral.

### 3. Instale a extensão Live Server

Abra **Extensões** (`Ctrl+Shift+X`), procure **Live Server**, de **Ritwick Dey**, e clique em **Instalar**.

### 4. Inicie o servidor

Clique com o botão direito em `index.html` e selecione **Open with Live Server**. O navegador abrirá a loja em um endereço semelhante a:

```text
http://localhost:5500/index.html
```

A porta pode variar: use o endereço aberto pelo Live Server. Acesse a aplicação pelo servidor HTTP para carregar corretamente os módulos JavaScript (`import/export`).

### 5. Explore a loja

Acesse o catálogo, abra um produto e visite as telas de login e cadastro. Mantenha o Live Server ativo durante a exploração. Para encerrá-lo, clique no indicador da porta na barra inferior do VS Code.

### 6. Configure o endereço nos testes

Quando preparar seu projeto de automação, use o endereço local como `baseUrl`, sem `/index.html`:

```javascript
baseUrl: "http://localhost:5500";
```

Os passos para instalar e configurar o Cypress estão na seção **Primeiros passos com Cypress**, a seguir. Mantenha o servidor ativo enquanto executa os testes contra a loja local.

Também é possível explorar a [loja publicada no GitHub Pages](https://diogomasc.github.io/E-Commerce-E2E-Testing-Laboratory/) sem iniciar um servidor no computador.

### Rotinas e Pistas para o QA

Comece por uma compra completa: escolha um produto, selecione tamanho e cor, adicione ao carrinho e avance até a confirmação. Depois, repita o caminho variando os dados e as escolhas. Compare mensagens, valores e navegação com o resultado esperado em cada etapa.

Use as regras dos cupons e as pistas abaixo para criar seus cenários e investigar possíveis inconsistências pela interface.

#### Cupons disponíveis

Abra cada bloco para consultar o desconto e a condição de aplicação. Os descontos são **valores fixos em reais**, calculados sobre o subtotal dos produtos antes do desconto.

<details>
<summary>DESCONTO10 — desconto e valor mínimo</summary>

- **Desconto esperado:** R$ 10,00.
- **Subtotal mínimo:** R$ 70,00. Esse valor já atende à condição de uso.

</details>

<details>
<summary>DESCONTO20 — desconto e valor mínimo</summary>

- **Desconto esperado:** R$ 20,00.
- **Subtotal mínimo:** R$ 100,00. Esse valor já atende à condição de uso.

</details>

<details>
<summary>DESCONTO30 — desconto e valor mínimo</summary>

- **Desconto esperado:** R$ 30,00.
- **Condição:** subtotal acima de R$ 150,00, ou seja, a partir de R$ 150,01. Exatamente R$ 150,00 não atende à regra.

</details>

<details>
<summary>DESCONTO40 — desconto e valor mínimo</summary>

- **Desconto esperado:** R$ 40,00.
- **Condição:** subtotal acima de R$ 200,00, ou seja, a partir de R$ 200,01. Exatamente R$ 200,00 não atende à regra.

</details>

<details>
<summary>DESCONTO50 — desconto e valor mínimo</summary>

- **Desconto esperado:** R$ 50,00.
- **Condição:** subtotal acima de R$ 250,00, ou seja, a partir de R$ 250,01. Exatamente R$ 250,00 não atende à regra.

</details>

#### Pistas para explorar a loja

- **Carrinho → cupom → checkout → confirmação:** experimente cada cupom e acompanhe subtotal, desconto e total. Os valores continuam coerentes até o final da compra?
- **Limites dos cupons:** teste subtotais abaixo, exatamente no limite e acima da condição de uso. Após aplicar um cupom, altere quantidades ou remova produtos. Como a loja reage quando o carrinho deixa de atender à regra?
- **Checkout → CPF:** explore formatos, quantidade de dígitos e sequências repetidas. Preencher a máscara é suficiente para representar um documento válido?
- **Checkout → CEP:** experimente letras, pontuação e valores curtos ou longos. Mantenha os demais campos válidos e observe as mensagens ao tentar avançar.
- **Produto → tamanho e cor → carrinho:** explore as opções riscadas da **Bermuda Cargo** e da **Calça Jeans Skinny**. Compare os avisos com o resultado de adicionar o item e acompanhe o fluxo até o checkout.
- **Cadastro e login:** envie campos vazios, explore limites de caracteres, use senhas diferentes na confirmação e tente cadastrar um e-mail já utilizado. As mensagens orientam a correção? A navegação corresponde ao resultado esperado?

Nos testes automatizados, use os atributos `data-testid` para localizar elementos e confira os resultados visíveis ao usuário. Ao encontrar uma divergência, registre os passos, os dados utilizados, o resultado esperado e o resultado obtido para permitir a reprodução.

---

## 🧪 Primeiros passos com Cypress

O roteiro abaixo prepara um **projeto separado de automação** para testar a loja publicada no GitHub Pages. Não é necessário clonar ou alterar o código da aplicação para começar.

### 1. Configurando o Ambiente

Tenha instalado:

- **Node.js 22 ou supeior**, com npm. Confira os [requisitos oficiais do Cypress](https://docs.cypress.io/app/get-started/install-cypress#System-requirements) para a versão utilizada e as dependências do seu sistema operacional.
- **Visual Studio Code**, para editar os testes.
- Acesso à internet para instalar o Cypress e acessar a loja publicada.

No terminal, confira as instalações:

```bash
node --version
npm --version
```

Crie a pasta dos testes e inicialize o projeto JavaScript:

```bash
mkdir e-commerce-cypress
cd e-commerce-cypress
npm init -y
```

Abra essa pasta no VS Code pelo menu **Arquivo > Abrir Pasta** ou execute `code .`, caso o comando esteja disponível no seu terminal.

### 2. Instalando o Cypress

Na raiz do projeto de automação, execute:

```bash
npm install cypress --save-dev
```

O Cypress será registrado em `devDependencies` no `package.json`. Mantenha também o `package-lock.json` no repositório para reproduzir a instalação das dependências.

Se a instalação informar que o script de download do binário foi bloqueado pelo npm, siga as [instruções oficiais para npm](https://docs.cypress.io/app/get-started/install-cypress#npm-configuration).

### 3. Configurando Scripts Personalizados no `package.json`

No `package.json`, ajuste a propriedade `scripts`, preservando as demais propriedades do arquivo:

```json
{
  "scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run"
  }
}
```

Use `npm run cy:open` para abrir a interface do Cypress e `npm run cy:run` para executar os testes em modo headless, sem abrir a interface interativa.

### 4. Primeira Inicialização e Criação dos Arquivos Padrão

Execute:

```bash
npm run cy:open
```

1. Na tela inicial, selecione **E2E Testing**.
2. Confira os arquivos de configuração propostos e clique em **Continue**.
3. Escolha um navegador disponível e clique em **Start E2E Testing**.
4. Selecione **Create new spec** para criar seu primeiro arquivo em `cypress/e2e/`.

Para este roteiro, crie `login.cy.js` e `cadastro.cy.js` e substitua o conteúdo inicial pelos exemplos abaixo. A estrutura ficará assim:

```text
e-commerce-cypress/
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js
│   │   └── cadastro.cy.js
│   ├── fixtures/          # Dados auxiliares, quando necessários
│   └── support/
│       ├── commands.js   # Comandos personalizados
│       └── e2e.js        # Configuração de suporte dos testes E2E
├── cypress.config.js
├── package.json
└── package-lock.json
```

### 5. Reconhecimento do JavaScript no VS Code (opcional)

Se o VS Code não reconhecer o projeto JavaScript ou não sugerir os comandos do Cypress, crie o arquivo **`jsconfig.json` na raiz do projeto de automação**, com o conteúdo:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["es2022", "dom"],
    "types": ["cypress"]
  },
  "include": ["**/*.*"]
}
```

### 6. Configurando nossa `baseUrl`

Você pode passar a URL completa para comandos de navegação, como:

```javascript
cy.visit(
  "https://diogomasc.github.io/E-Commerce-E2E-Testing-Laboratory/register.html",
);
```

Configurar a **`baseUrl`** no arquivo `cypress.config.js` facilita:

1. **Flexibilidade:** trocar entre ambientes local, homologação e produção alterando a URL em um único ponto.
2. **Código limpo:** usar caminhos relativos, como `cy.visit('/register.html')`.
3. **Inicialização:** permitir que o Cypress conheça o domínio da aplicação antes da primeira navegação e verifique sua disponibilidade.

Abra o arquivo `cypress.config.js` na raiz do projeto de automação e ajuste para:

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://diogomasc.github.io/E-Commerce-E2E-Testing-Laboratory",
    setupNodeEvents(on, config) {
      // Listeners de eventos do Node, quando necessários.
    },
  },
});
```

Esse exemplo usa CommonJS, compatível com o projeto criado por `npm init -y`. Se seu `package.json` já tiver `"type": "module"`, use o nome `cypress.config.cjs` para manter essa sintaxe.

Para testar a aplicação localmente, inicie o servidor HTTP da loja e substitua a `baseUrl` pelo endereço fornecido por ele, por exemplo, `http://localhost:5500`.

### 7. Acessando uma URL

Para navegar até uma página web, usamos o comando **`cy.visit()`**. No arquivo `cypress/e2e/cadastro.cy.js`, comece com:

```javascript
describe("Feature: Registro de Usuário", () => {
  it("Acessa a página de registro", () => {
    // Como a baseUrl foi definida, basta passar o caminho relativo.
    cy.visit("/register.html");
    cy.get('[data-testid="register-title"]')
      .should("be.visible")
      .and("contain.text", "Criar Conta");
  });
});
```

### 8. Primeiro arquivo de teste: login

No arquivo `cypress/e2e/login.cy.js`, adicione os cenários de login válido e envio com campos vazios. O primeiro usa a conta de demonstração da loja e mostra como encadear comandos: `cy.get()` localiza o campo, `.type()` preenche e `.should()` verifica o valor.

```javascript
describe("Feature: Login", () => {
  beforeEach(() => {
    // 1. cy.visit() navega até a página antes de cada teste.
    cy.visit("/login.html");
  });

  it("Exibe os campos obrigatórios ao enviar o formulário vazio", () => {
    cy.get('[data-testid="login-submit"]').click();

    cy.get('[data-testid="login-email-error"]')
      .should("be.visible")
      .and("contain.text", "Campo obrigatório");
    cy.get('[data-testid="login-password-error"]')
      .should("be.visible")
      .and("contain.text", "Campo obrigatório");
    cy.location("pathname").should("include", "/login.html");
  });

  it("Permite entrar com um usuário válido", () => {
    // 2. cy.get() busca o input.
    // 3. .type() digita o valor nele.
    // 4. .should() valida seu valor final.
    cy.get('[data-testid="login-email"]')
      .type("test@example.com")
      .should("have.value", "test@example.com");

    cy.get('[data-testid="login-password"]')
      .type("password123")
      .should("have.value", "password123");

    // .click() clica no botão para submeter o login.
    cy.get('[data-testid="login-submit"]').click();

    // A aplicação autentica o usuário e redireciona para a página inicial.
    cy.url().should("include", "/index.html");

    // Valida o cabeçalho e a saudação com o nome do usuário autenticado.
    cy.get('[data-testid="main-header"]')
      .should("be.visible")
      .find('[data-testid="user-greeting"]')
      .should("be.visible")
      .and("have.text", "Olá, Test");
  });
});
```

Os exemplos usam `data-testid` para localizar elementos e conferem resultados visíveis ao usuário. Cada teste prepara seu próprio cenário; mantenha o isolamento padrão do Cypress e evite depender de outro `it` para fazer login ou cadastrar uma conta.

### 10. Executando os primeiros testes

Abra a interface e selecione `login.cy.js` ou `cadastro.cy.js` na lista de specs:

```bash
npm run cy:open
```

Para executar todos os testes pelo terminal:

```bash
npm run cy:run
```

Para executar somente o arquivo de login:

```bash
npm run cy:run -- --spec "cypress/e2e/login.cy.js"
```

Continue praticando com cenários de credenciais inválidas, confirmação de senha diferente, e-mail já cadastrado e regras do carrinho. Defina o resultado esperado a partir das regras do produto: os bugs intencionais são oportunidades para encontrar falhas, não comportamentos que os testes devem aceitar como corretos.

Material complementar:

- [Documentação oficial do Cypress](https://docs.cypress.io/).
- [Material de Estudo: Introdução à Qualidade de Software e Testes Automatizados de Caixa-Preta em Interfaces com Cypress](https://app.notion.com/p/Introdu-o-Qualidade-de-Software-e-Testes-Automatizados-de-Caixa-Preta-em-Interfaces-com-Cypress-3dd7f810616e801c923dd96c3873722c#3de7f810616e80239152d952370df843)

---

### Prints (Pode estar levemente desatualizado)

<img width="1920" height="1410" alt="image" src="https://github.com/user-attachments/assets/3ad299e5-c0e7-42bb-8120-5743472a0729" />
<img width="1920" height="1396" alt="image" src="https://github.com/user-attachments/assets/b672d0b8-ccd5-4e8a-91d1-941b0724362e" />
<img width="1920" height="932" alt="image" src="https://github.com/user-attachments/assets/120bb974-0fc8-4509-94cc-cf2af7a89a26" />
<img width="1920" height="932" alt="image" src="https://github.com/user-attachments/assets/51510c92-0de2-4def-b35f-f569fd4562e4" />
<img width="1920" height="1021" alt="image" src="https://github.com/user-attachments/assets/af89e5f1-c27d-4628-89a4-711bb526d16f" />
<img width="1920" height="1481" alt="image" src="https://github.com/user-attachments/assets/4972912e-98fa-47c6-b629-79951793e2e4" />
<img width="1920" height="1026" alt="image" src="https://github.com/user-attachments/assets/9656aa25-3c95-450a-9242-c4f284dda086" />
<img width="1920" height="1856" alt="image" src="https://github.com/user-attachments/assets/afcba488-bd36-4b45-af1e-8b27ce019586" />
<img width="971" height="487" alt="image" src="https://github.com/user-attachments/assets/d01a36b6-0022-4dc1-8e0b-a5b82053ac8a" />
<img width="1920" height="1340" alt="image" src="https://github.com/user-attachments/assets/4b5a0b59-158f-4c59-8b8e-65d0827348f9" />
<img width="1920" height="1087" alt="image" src="https://github.com/user-attachments/assets/39a5ddff-51a0-46c2-9d37-d9dd79182743" />
<img width="1920" height="932" alt="image" src="https://github.com/user-attachments/assets/2a1cafa8-236e-4d7e-b0f4-3ffa3c0495e6" />
