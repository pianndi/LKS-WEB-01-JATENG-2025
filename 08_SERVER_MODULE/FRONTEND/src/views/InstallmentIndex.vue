<template>
  <!-- S: Header -->
  <header class="jumbotron">
    <div class="container">
      <h1 class="display-4">Cars</h1>
    </div>
  </header>
  <!-- E: Header -->
  <div class="container mb-5">
    <div class="section-header mb-4">
      <h4 class="section-title text-muted font-weight-normal">List of Cars</h4>
    </div>

    <div class="section-body">
      <article class="spot" v-for="item in data" :key="item">
        <div class="row">
          <div class="col-5">
            <h5 class="text-primary">{{ item.car }}</h5>
            <span class="text-muted">{{ item.brand }}</span>
          </div>
          <div class="col-4">
            <h5>Available Month</h5>
            <span class="text-muted">
              <span v-for="month in item.available_month" :key="month">
                {{ month.month }}
              </span>
            </span>
          </div>
          <div class="col-3">
            <router-link
              :to="'/dashboard/installments/' + item.id"
              class="btn btn-danger btn-lg btn-block"
              >Detail</router-link
            >
          </div>
        </div>
      </article>
      <!-- <article class="spot unavailable">
        <div class="row">
          <div class="col-5">
            <h5 class="text-primary">Nissan Livina</h5>
            <span class="text-muted">Family Cars for everyone</span>
          </div>
          <div class="col-4">
            <h5>Available Month</h5>
            <span class="text-muted">12 Months, 24 Months</span>
          </div>
          <div class="col-3">
            <div class="bg-success text-white p-2">Vacancies have been submitted</div>
          </div>
        </div>
      </article>

      <article class="spot unavailable">
        <div class="row">
          <div class="col-5">
            <h5 class="text-primary">Toyota FT 86</h5>
            <span class="text-muted">Toyota FT 86 car is the best</span>
          </div>
          <div class="col-4">
            <h5>Available Month</h5>
            <span class="text-muted">12 Months, 24 Months, 48 Months</span>
          </div>
          <div class="col-3">
            <button class="btn btn-danger btn-lg btn-block">Detail</button>
          </div>
        </div>
      </article> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '../api'
const data = ref(null)

async function fetchData() {
  const response = await api.get('/installment_cars')
  data.value = response.data?.cars
}

onMounted(() => {
  fetchData()
})
</script>

<style lang="scss" scoped></style>
