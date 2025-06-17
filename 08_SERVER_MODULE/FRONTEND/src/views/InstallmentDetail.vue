<template>
  <!-- S: Header -->
  <header class="jumbotron">
    <div class="container text-center">
      <div>
        <h1 class="display-4">{{ data?.car }}</h1>
        <span class="text-muted">Brand : {{ data?.brand }}</span>
      </div>
    </div>
  </header>
  <!-- E: Header -->
  <form class="container" @submit.prevent="handleSubmit">
    <div class="row mb-3">
      <div class="col-md-12">
        <div class="form-group">
          <h3>Description</h3>
          {{ data?.description }}
        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <h3>
            Price : <span class="badge badge-primary">Rp. {{ data?.price }}</span>
          </h3>
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-12">
        <div class="form-group">
          <h3>Select Months</h3>
          <select v-model="form.months" class="form-control">
            <option value="12">12 Months</option>
            <option value="24">24 Months</option>
            <option value="48">48 Months</option>
            <option value="50">50 Months</option>
            <option value="55">55 Months</option>
          </select>
        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <h3>
            Nominal/Month :
            <span class="badge badge-primary"
              >Rp. {{ parseInt(data?.price || 0) * parseInt(form.months) }}</span
            >
          </h3>
        </div>
      </div>

      <div class="col-md-12">
        <div class="form-group">
          <div class="d-flex align-items-center mb-3">
            <label class="mr-3 mb-0">Notes</label>
          </div>
          <textarea
            class="form-control"
            cols="30"
            rows="6"
            placeholder="Explain why your installment should be approved"
            v-model="form.notes"
            required
          ></textarea>
        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <div class="d-flex align-items-center mb-3">
            <button class="btn btn-primary btn-lg">Apply</button>
          </div>
          <span class="text-danger">{{ failed }}</span>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api'
const data = ref(null)
const route = useRoute()
const form = reactive({
  instalment_id: route.params.id,
  months: 12
})
async function fetchData() {
  const response = await api.get('/installment_cars/' + route.params.id)
  data.value = response.data?.instalment
}
const failed = ref('')
async function handleSubmit() {
  try {
    const response = await api.post('/applications', form)
    alert(response.data?.message)
    router.push('/dashboard')
  } catch (error) {
    failed.value = error.response.data.message
  }
}
onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped></style>
