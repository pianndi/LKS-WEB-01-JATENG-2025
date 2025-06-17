<script setup>
import { onMounted, ref } from 'vue'
import api from '../api'
const validations = ref(null)

async function fetchValidation() {
  const response = await api.get('/validations')
  validations.value = response.data?.validation
}
const installments = ref(null)
async function fetchInstallment() {
  const response = await api.get('/applications')
  installments.value = response.data?.installments
}

onMounted(() => {
  fetchValidation()
  fetchInstallment()
})
</script>

<template>
  <!-- S: Header -->
  <header class="jumbotron">
    <div class="container">
      <h1 class="display-4">Dashboard</h1>
    </div>
  </header>
  <!-- E: Header -->

  <div class="container">
    <!-- S: Data Validation Section -->
    <section class="validation-section mb-5">
      <div class="section-header mb-3">
        <h4 class="section-title text-muted">My Data Validation</h4>
      </div>
      <div class="row">
        <!-- S: Link to Request Data Validation -->
        <div class="col-md-4" v-if="!validations">
          <div class="card card-default">
            <div class="card-header">
              <h5 class="mb-0">Data Validation</h5>
            </div>
            <div class="card-body">
              <router-link to="/dashboard/request-validation" class="btn btn-primary btn-block"
                >+ Request validation</router-link
              >
            </div>
          </div>
        </div>
        <!-- E: Link to Request Data Validation -->

        <!-- S: Society Data Validation Box (Pending) -->
        <div class="col-md-4" v-if="validations">
          <div class="card card-default">
            <div class="card-header border-0">
              <h5 class="mb-0">Data Validation</h5>
            </div>
            <div class="card-body p-0">
              <table class="table table-striped mb-0">
                <tr>
                  <th>Status</th>
                  <td>
                    <span
                      class="badge"
                      :class="{
                        'badge-success': validations.status == 'accepted',
                        'badge-info': validations.status != 'accepted'
                      }"
                      >{{ validations.status }}</span
                    >
                  </td>
                </tr>
                <tr>
                  <th>Job</th>
                  <td class="text-muted">{{ validations.job || '-' }}</td>
                </tr>
                <tr>
                  <th>Income/Month</th>
                  <td class="text-muted">Rp. {{ validations.income }}</td>
                </tr>
                <tr>
                  <th>Validator</th>
                  <td class="text-muted">{{ validations.validator?.name || '-' }}</td>
                </tr>
                <tr>
                  <th>Validator Notes</th>
                  <td class="text-muted">{{ validations.validator_notes || '-' }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!-- E: Society Data Validation Box (Pending) -->

        <!-- S: Society Data Validation Box (Accepted) -->
        <!-- <div class="col-md-4">
          <div class="card card-default">
            <div class="card-header border-0">
              <h5 class="mb-0">Data Validation</h5>
            </div>
            <div class="card-body p-0">
              <table class="table table-striped mb-0">
                <tr>
                  <th>Status</th>
                  <td><span class="badge badge-success">Accepted</span></td>
                </tr>
                <tr>
                  <th>Job</th>
                  <td class="text-muted">Programmer</td>
                </tr>
                <tr>
                  <th>Income/Month</th>
                  <td class="text-muted">Rp. 3.000.000</td>
                </tr>
                <tr>
                  <th>Validator</th>
                  <td class="text-muted">Usman M.Ti</td>
                </tr>
                <tr>
                  <th>Validator Notes</th>
                  <td class="text-muted">siap kerja</td>
                </tr>
              </table>
            </div>
          </div>
        </div> -->
        <!-- E: Society Data Validation Box (Accepted) -->
      </div>
    </section>
    <!-- E: Data Validation Section -->
    <!-- S: Installment Cars info -->
    <div class="col-md-12">
      <div class="alert alert-warning" v-if="!validations || validations?.status != 'accepted'">
        Your validation must be approved by validator to Installment Cars.
      </div>
    </div>
    <!-- E: Installment Cars info -->
    <!-- S: List Job Seekers Section -->
    <section class="validation-section mb-5" v-if="validations?.status == 'accepted'">
      <div class="section-header mb-3">
        <div class="row">
          <div class="col-md-8">
            <h4 class="section-title text-muted">My Installment Cars</h4>
          </div>
          <div class="col-md-4">
            <router-link to="/dashboard/installments" class="btn btn-primary btn-lg btn-block"
              >+ Add Installment Cars</router-link
            >
          </div>
        </div>
      </div>
      <div class="section-body">
        <div class="row mb-4">
          <!-- S: Installment Cars Box (Registered) -->
          <div class="col-md-6" v-if="validations?.status == 'accepted'">
            <div class="card card-default">
              <div class="card-header border-0">
                <h5 class="mb-0">Toyota FT 86</h5>
              </div>
              <div class="card-body p-0">
                <table class="table table-striped mb-0">
                  <tr>
                    <th>Description</th>
                    <td class="text-muted">Toyota FT 86 car is the best</td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td class="text-muted">Rp. 900.000.000</td>
                  </tr>
                  <tr>
                    <th>Installment</th>
                    <td class="text-muted">
                      12 Months <span class="badge badge-info">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Apply Date</th>
                    <td class="text-muted">Desember 12, 2024</td>
                  </tr>
                  <tr>
                    <th>Notes</th>
                    <td class="text-muted">I want this one, because i am rich.</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <!-- S: Installment Cars Box (Registered) -->
          <!-- S: Installment Cars Box (Registered) -->
          <div class="col-md-6">
            <div class="card card-default" v-for="item in installments" :key="item">
              <div class="card-header border-0">
                <h5 class="mb-0">{{ item.car }}</h5>
              </div>
              <div class="card-body p-0">
                <table class="table table-striped mb-0">
                  <tr>
                    <th>Description</th>
                    <td class="text-muted">{{ item.car }}</td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td class="text-muted">Rp. 275.000.000</td>
                  </tr>
                  <tr>
                    <th>Installment</th>
                    <td class="text-muted">
                      24 Months <span class="badge badge-success">Accepted</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Apply Date</th>
                    <td class="text-muted">Desember 12, 2024</td>
                  </tr>
                  <tr>
                    <th>Notes</th>
                    <td class="text-muted">I want this one too.</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <!-- S: Installment Cars Box (Registered) -->
        </div>
      </div>
    </section>
    <!-- E: List Job Seekers Section -->
  </div>
</template>
