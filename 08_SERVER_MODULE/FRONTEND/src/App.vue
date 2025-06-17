<script setup>
import { provide, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
provide('user', user)
const router = useRouter()
function logout() {
  user.value = null
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  router.push('/')
}
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/dashboard">Installment Cars</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="!user">
            <a class="nav-link" href="#">Login</a>
          </li>
          <li class="nav-item" v-if="user">
            <a class="nav-link" href="#">{{ user.name }}</a>
          </li>
          <li class="nav-item" v-if="user">
            <span class="nav-link" @click="logout">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <main>
    <RouterView />
  </main>

  <!-- S: Footer -->
  <footer>
    <div class="container">
      <div class="text-center py-4 text-muted">Copyright &copy; 2024 - Web Tech ID</div>
    </div>
  </footer>
  <!-- E: Footer -->
</template>
