<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
@import './assets/external/normalize.css/normalize.css';
@import './assets/external/fontawesome-free/css/all.min.css';
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');

#app {
 font-family: 'Nunito', sans-serif;
}

</style>
