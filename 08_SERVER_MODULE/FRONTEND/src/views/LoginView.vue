<template>
  <!-- S: Header -->
  <header class="jumbotron">
    <div class="container text-center">
      <h1 class="display-4">Installment Cars</h1>
    </div>
  </header>
  <!-- E: Header -->
  <p class="text-center text-danger">
    {{ failed }}
  </p>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form class="card card-default" @submit.prevent="handleSubmit">
          <div class="card-header">
            <h4 class="mb-0">Login</h4>
          </div>
          <div class="card-body">
            <div class="form-group row align-items-center">
              <div class="col-4 text-right">ID Card Number</div>
              <div class="col-8">
                <input type="text" class="form-control" v-model="form.id_card_number" />
              </div>
            </div>
            <div class="form-group row align-items-center">
              <div class="col-4 text-right">Password</div>
              <div class="col-8">
                <input type="password" class="form-control" v-model="form.password" />
              </div>
            </div>
            <div class="form-group row align-items-center mt-4">
              <div class="col-4"></div>
              <div class="col-8"><button class="btn btn-primary">Login</button></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const form = reactive({})
const router = useRouter()
const failed = ref('')
const user = inject('user')
async function handleSubmit() {
  try {
    const response = await api.post('/auth/login', form)
    const token = response.data.token
    const newuser = response.data
    user.value = newuser
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(newuser))
    router.push('/dashboard')
  } catch (error) {
    console.log(error)
    failed.value = error.response.data.message
  }
}
</script>

<style lang="scss" scoped></style>
