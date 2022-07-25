<template>
  <h1>Hello</h1>
  <el-button type="info" @click="onLogOut">退出</el-button>
</template>

<script setup lang="ts">
import router from '@/router/index'

const onLogOut = () => {
  window.sessionStorage.removeItem('token')
  router.push('/login')
}

</script>

<style>

</style>
