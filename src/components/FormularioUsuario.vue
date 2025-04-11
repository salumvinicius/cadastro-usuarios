<template>
  <div class="container">
  <form class="formulario" @submit.prevent="cadastroUsuario"> <!--Evita o comportamento padrão do formulário, que é recarregar a página ao enviar-->
    <h2>Cadastro de Usuário</h2>
    <!-- Formulário de cadastro de usuário -->
    <label for="nome">Nome:</label>
    <input type="text" id="nome" v-model="usuario.nome" required/>

    <label for="email">Email:</label>
    <input type="email" id="email" v-model="usuario.email" required/>

    <label for="cep">CEP:</label>
    <input type="text" id="cep" v-model="usuario.endereco.cep" @blur="buscarEndereco" maxlength="8" required/>

    <label for="rua">Rua:</label>
    <input type="text" id="rua" v-model="usuario.endereco.rua" required/>

    <label for="bairro">Bairro:</label>
    <input type="text" id="bairro" v-model="usuario.endereco.bairro" required/>

    <label for="cidade">Cidade:</label>
    <input type="text" id="cidade" v-model="usuario.endereco.cidade" required/>

    <label for="estado">Estado:</label>
    <input type="text" id="estado" v-model="usuario.endereco.estado" required/>

    <label for="origem">Origem:</label>
    <select id="origem" v-model="usuario.origem" required>
      <option value="">Selecione a origem</option>
      <option value="Digital">Digital</option>
      <option value="Fisico">Físico</option>
    </select>

    <button type="submit">Cadastrar</button>
  </form>
    <!--Criação da lista de usuarios, contendo nome, email, endereço e origem-->
    <div v-if="usuarios.length" class="lista-usuarios">
      <h2>Usuarios cadastrados</h2>
      <ul>
        <li v-for="(user, index) in usuarios" :key="index">
          <strong>{{ user.nome }}</strong> <br />
          {{ user.email }} <br />
          {{ user.endereco.cidade }} - {{ user.endereco.estado }} <br />
          Origem: {{ user.origem }}

        </li>
      </ul>
    </div>
    <div class="resumos" v-if="usuarios.length">
      <!--Criação do resumo por estado-->
      <h3>Resumo por Estado</h3>
      <ul>
        <li v-for="(quantidade,estado) in resumoEstados" :key="estado">
          {{ estado }}: {{ quantidade }} usuario{{ quantidade > 1 ? 's' : '' }}
        </li>
      </ul>
      <!--Criação do resumo por origem-->
      <h3>Resumo por Origem</h3>
      <ul>
        <li v-for="(quantidade,origem) in resumoOrigem" :key="origem">
          {{ origem }}: {{ quantidade }} usuario{{ quantidade > 1 ? 's' : '' }}
        </li>
      </ul>
    </div>
  </div>
  </template>

<script>
export default{ //Exporta o componente para o Vue usar.
  name: 'FormularioUsuario', //Nome do componente.
  data() { //Função que retorna os dados do componente.
    return { //Dados do componente.
      usuario: { //Objeto que armazena os dados do usuário.
        nome: '', 
        email: '',
        endereco: {
          cep: '',
          rua: '',
          bairro: '',
          cidade: '',
          estado: ''
        },
        origem: ''
      },
      usuarios: [] // Lista de usuarios cadastrados.

    };
  },
  methods: { //Métodos do componente.
    buscarEndereco() { //Método que busca o endereço pelo CEP.
      const cep = this.usuario.endereco.cep.replace(/\D/g, ''); //Remove caracteres não numéricos do CEP.
      if (cep.length !== 8) { //Verifica se o CEP tem 8 dígitos.
        alert('CEP inválido'); //Alerta se o CEP não tiver 8 dígitos.
        return;
      }
      fetch(`https://viacep.com.br/ws/${cep}/json/`) //Faz uma requisição para a API de CEP.
        .then(response => response.json()) //Converte a resposta para JSON.
        .then(data => { //Quando a resposta chegar.
          if (data.erro){
            alert('CEP não encontrado'); //Alerta se o CEP não for encontrado.
          } else{
            this.usuario.endereco.rua = data.logradouro; //Preenche o campo rua com o logradouro retornado.
            this.usuario.endereco.bairro = data.bairro; //Preenche o campo bairro com o bairro retornado.
            this.usuario.endereco.cidade = data.localidade; //Preenche o campo cidade com a localidade retornada.
            this.usuario.endereco.estado = data.uf; //Preenche o campo estado com a UF retornada.
          }
        })

        .catch(() => {
          alert('Erro ao buscar o CEP'); //Alerta se houver erro na requisição.
        });
      },

        cadastroUsuario() {
          if (
            !this.usuario.nome || //Verifica se algum dos campos esta vazio.
            !this.usuario.email ||
            !this.usuario.endereco.cep ||
            !this.usuario.endereco.rua ||
            !this.usuario.endereco.bairro ||
            !this.usuario.endereco.cidade ||
            !this.usuario.endereco.estado ||
            !this.usuario.origem  
          ) {
            alert('Preencha todos os campos!'); //Alerta se algum campo não estiver preenchido.
            return; //Retorna para não cadastrar o usuário.
          }

          const novoUsuario = JSON.parse(JSON.stringify(this.usuario)); //Converte o objeto usuario para JSON.
          this.usuarios.push(novoUsuario); //Adiciona o novo usuário na lista de usuários.
          console.log('Usuário cadastrado:', this.usuario); //Exibe os dados do usuário no console.
          alert('Usuário cadastrado com sucesso!'); //Alerta que o usuário foi cadastrado.
          this.usuario ={ //Limpa os campos do formulário para um novo cadastro.
            nome: '',
            email: '',
            endereco: {
              cep: '',
              rua: '',
              bairro: '',
              cidade: '',
              estado: ''
            },
            origem: ''
          };
        }
    },

    computed: { // Essa função cria um resumo da quantidade de usuários cadastrados por estado.
            resumoEstados() { 
            const resumo = {}; // Objeto que vai armazenar o resumo.
            this.usuarios.forEach(u => { // Para cada usuário na lista de usuários cadastrados.
              const estado = u.endereco.estado || "Sem estado"; // Pega o estado do usuário ou "Sem estado" se não tiver.
              resumo[estado] = (resumo[estado] || 0) + 1; // Adiciona 1 ao contador do estado no resumo.
            });
            return resumo; // Retorna o resumo com a contagem por estado.
          },
          resumoOrigem() { // Essa função cria um resumo da quantidade de usuários cadastrados por origem.
            const resumo = {}; // Objeto que vai armazenar o resumo.
            this.usuarios.forEach(u => { // Para cada usuário na lista de usuários cadastrados.
              const origem = u.origem || "Não informado"; // Pega a origem do usuário ou "Não informado" se não tiver.
              resumo[origem] = (resumo[origem] || 0) + 1; // Adiciona 1 ao contador da origem no resumo.
            })
            return resumo;
          }
        }
  };

</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
}

.formulario {
  flex: 1 1 300px;
  max-width: 500px;
  background: #f8f8f8;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.formulario h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
  font-size: 0.95rem;
}

input,
select {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 0.8rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #388e3c;
}

.lista-usuarios {
  flex: 1 1 300px;
  max-width: 500px;
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  max-height: 80vh;
  overflow-y: auto;
}

.lista-usuarios::-webkit-scrollbar {
  width: 6px;
}

.lista-usuarios::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.lista-usuarios h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
}

.lista-usuarios ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
}

.lista-usuarios li {
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.lista-usuarios li:hover {
  transform: scale(1.02);
}

.resumos {
  margin-left: 20px;
}

.resumo {
  margin-bottom: 20px;
}

.resumo h3 {
  font-weight: bold;
  margin-bottom: 10px;
}

.resumo ul {
  list-style: none;
  padding-left: 0;
}

.resumo li {
  margin-bottom: 5px;
}
</style>

