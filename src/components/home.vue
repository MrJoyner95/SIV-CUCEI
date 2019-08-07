<template>
    <div>
        <h1>Home</h1>
        <h3>{{usuario}}</h3>
    </div>
</template>



<script>




export default {
  name: 'homeRoute',
  // To use props, they must be declared
  props: {
    usuario: String,
    title: String
  }
}
</script>