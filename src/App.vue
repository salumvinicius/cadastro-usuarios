<template>
  <div id="app">
    <FormularioUsuario />
  </div>
</template>

<script>
import FormularioUsuario from './components/FormularioUsuario.vue'

export default {
  components: {
    FormularioUsuario
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>