# 📋 Cadastro de Usuários com Vue 3

Aplicação front-end construída com **Vue 3** para cadastro de usuários com busca automática de endereço via **CEP**, listagem dinâmica, resumos por estado e origem, e testes automatizados com **Vitest**.

![Vue.js + CSS + Testes](https://img.shields.io/badge/vue-3.x-brightgreen?logo=vue.js) ![Vitest](https://img.shields.io/badge/testado%20com-vitest-yellowgreen?logo=vitest) ![Status](https://img.shields.io/badge/status-finalizado-blue)

---

## ✅ Funcionalidades

- Formulário com validações e campos obrigatórios  
- Busca automática de endereço via **API do ViaCEP**  
- Listagem de usuários com scroll interno  
- Resumo por estado (UF) e por origem (Digital/Físico)  
- Estilo limpo, responsivo e com destaque visual  
- **Testes unitários automatizados** com cobertura total das funções principais  

---

## 🧪 Testes Automatizados

O projeto inclui testes usando o framework **Vitest** com `@vue/test-utils`.

### Para rodar os testes:

```bash
npm run test
```
Cobertura de testes:

Cadastro de novo usuário

Validação de campos obrigatórios

Geração de resumos

Reset do formulário

🚀 Instalação e execução local
```bash
git clone https://github.com/salumvinicius/cadastro-usuarios.git
cd cadastro-usuarios

npm install
npm run serve
```
🌐 API utilizada
ViaCEP

🛠 Tecnologias utilizadas
Vue 3 (Options API)

CSS3 puro

Fetch API

Vitest + Vue Test Utils

(opcional) Pinia

📸 Layout (print do sistema)
![Layout](./src/assets/print.png)

✨ Melhorias Futuras
Edição e exclusão de usuários

Integração com backend ou Firebase

Página de login/admin

Animações com Vue transitions
