import { mount } from '@vue/test-utils'
import FormularioUsuario from '../src/components/FormularioUsuario.vue'

describe('FormularioUsuario.vue', () => {
  beforeEach(() => {
    global.alert = vi.fn(); // simula o alert e evita erros de jsdom
  });

  it('deve adicionar um usuário na lista ao cadastrar', async () => {
    const wrapper = mount(FormularioUsuario)

    await wrapper.setData({
      usuario: {
        nome: 'João Silva',
        email: 'joao@email.com',
        endereco: {
          cep: '01001000',
          rua: 'Rua Fictícia',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP'
        },
        origem: 'Digital'
      }
    })

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.usuarios.length).toBe(1)
    expect(wrapper.vm.usuarios[0].nome).toBe('João Silva')
  })

  it('deve gerar o resumo por estado corretamente', async () => {
    const wrapper = mount(FormularioUsuario)

    const usuarios = [
      { nome: 'Maria', email: 'a@a.com', endereco: { cep: '1', rua: 'A', bairro: 'A', cidade: 'A', estado: 'SP' }, origem: 'Digital' },
      { nome: 'João', email: 'b@b.com', endereco: { cep: '2', rua: 'B', bairro: 'B', cidade: 'B', estado: 'RJ' }, origem: 'Fisico' },
      { nome: 'Ana', email: 'c@c.com', endereco: { cep: '3', rua: 'C', bairro: 'C', cidade: 'C', estado: 'SP' }, origem: 'Digital' }
    ]

    for (const u of usuarios) {
      await wrapper.setData({ usuario: u })
      await wrapper.find('form').trigger('submit.prevent')
    }

    const resumo = wrapper.vm.resumoEstados
    expect(resumo['SP']).toBe(2)
    expect(resumo['RJ']).toBe(1)
  })

  it('deve gerar o resumo por origem corretamente', async () => {
    const wrapper = mount(FormularioUsuario)

    const usuarios = [
      { nome: 'Maria', email: 'a@a.com', endereco: { cep: '1', rua: 'A', bairro: 'A', cidade: 'A', estado: 'SP' }, origem: 'Digital' },
      { nome: 'João', email: 'b@b.com', endereco: { cep: '2', rua: 'B', bairro: 'B', cidade: 'B', estado: 'RJ' }, origem: 'Fisico' },
      { nome: 'Ana', email: 'c@c.com', endereco: { cep: '3', rua: 'C', bairro: 'C', cidade: 'C', estado: 'SP' }, origem: 'Digital' }
    ]

    for (const u of usuarios) {
      await wrapper.setData({ usuario: u })
      await wrapper.find('form').trigger('submit.prevent')
    }

    const resumo = wrapper.vm.resumoOrigem
    expect(resumo['Digital']).toBe(2)
    expect(resumo['Fisico']).toBe(1)
  })

  it('deve limpar o formulário após o cadastro', async () => {
    const wrapper = mount(FormularioUsuario)

    await wrapper.setData({
      usuario: {
        nome: 'Léo',
        email: 'leo@email.com',
        endereco: {
          cep: '12345678',
          rua: 'Rua X',
          bairro: 'Bairro Y',
          cidade: 'Cidade Z',
          estado: 'BA'
        },
        origem: 'Fisico'
      }
    })

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.usuario.nome).toBe('')
    expect(wrapper.vm.usuario.email).toBe('')
    expect(wrapper.vm.usuario.endereco.cep).toBe('')
    expect(wrapper.vm.usuario.origem).toBe('')
  })

  it('não deve cadastrar usuário se campos obrigatórios estiverem vazios', async () => {
    const wrapper = mount(FormularioUsuario)

    await wrapper.setData({
      usuario: {
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
      }
    })

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.usuarios.length).toBe(0)
  })
})
