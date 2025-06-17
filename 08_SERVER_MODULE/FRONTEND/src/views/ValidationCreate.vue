<template>
  <!-- S: Header -->
  <header class="jumbotron">
    <div class="container">
      <h1 class="display-4">Request Data Validation</h1>
    </div>
  </header>
  <!-- E: Header -->
  <div class="text-center text-success">{{ message }}</div>
  <div class="container">
    <form action="" @submit.prevent="handleSubmit">
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="form-group">
            <div class="d-flex align-items-center mb-3">
              <label class="mr-3 mb-0">Are you working?</label>
              <select class="form-control-sm">
                <option value="yes">Yes, I have</option>
                <option value="no">No</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Your Job"
              class="form-control mt-2 mb-2"
              v-model="form.job"
            />
            <textarea
              class="form-control"
              cols="30"
              rows="5"
              placeholder="describe what you do in your job"
              v-model="form.job_description"
            ></textarea>
            <input
              type="number"
              placeholder="Income (Rp)"
              class="form-control mt-2"
              v-model="form.income"
            />
          </div>
        </div>

        <div class="col-md-12">
          <div class="form-group">
            <div class="d-flex align-items-center mb-3">
              <label class="mr-3 mb-0">Reason Accepted</label>
            </div>
            <textarea
              class="form-control"
              cols="30"
              rows="6"
              placeholder="Explain why you should be accepted"
              v-model="form.reason_accepted"
            ></textarea>
          </div>
        </div>
      </div>

      <button class="btn btn-primary">Send Request</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const form = reactive({})
const router = useRouter()
const message = ref('')
async function handleSubmit() {
  try {
    const response = await api.post('/validations', form)
    message.value = response.data?.message
    alert(message.value)
    router.push('/dashboard')
  } catch (error) {
    console.log(error)
    failed.value = error.response.data.message
  }
}
</script>

<style lang="scss" scoped></style>
