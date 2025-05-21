<template>
   <div>
   <AppNavbar />
    <div v-if="alertMessage" :class="`alert alert-${alertType}`" role="alert">
      {{ alertMessage }}
    </div>

  <div class="container">
    <h1 class="title">Afghan Proverbs</h1>

    <div v-if="isLoading" class="text-center my-3">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <ul class="proverb-list">
      <li v-for="proverb in proverbs" :key="proverb.id" class="proverb-item">
        <div class="proverb-info">
          <div>
            <p class="proverb-title">{{ proverb.translationEn }} 
            <span class="category">({{ proverb.category }})</span></p>
            <p class="proverb-text"><strong>{{ proverb.textDari }}</strong> | 
            <strong>{{ proverb.textPashto }}</strong></p>
            <p class="proverb-meaning">{{ proverb.meaning }}</p>
          </div>
          <div class="actions">
            <button @click="editProverb(proverb)" class="btn edit-btn">Edit</button>
            <button @click="deleteProverb(proverb.id)" class="btn delete-btn">Delete</button>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <div class="container">
    <h2 class="edit-title">Add New Proverb</h2>
    <form @submit.prevent="addProverb" id="add-proverb-form" class="proverb-form">
      <input v-model="newProverb.textDari" placeholder="Dari Proverb" class="input" />
      <input v-model="newProverb.textPashto" placeholder="Pashto Proverb" class="input" />
      <input v-model="newProverb.translationEn" placeholder="English Translation" class="input" />
      <input v-model="newProverb.meaning" placeholder="Meaning" class="input" />
      <input v-model="newProverb.category" placeholder="Category" class="input" />
      <button type="submit" class="btn add-btn">Add</button>
    </form>
  </div>
  <div v-if="editingProverb" class="edit-section">
      <h2 class="edit-title">Edit Proverb</h2>
    <div class="edit-form">
      <input v-model="editingProverb.textDari" class="input" />
      <input v-model="editingProverb.textPashto" class="input" />
      <input v-model="editingProverb.translationEn" class="input" />
      <input v-model="editingProverb.meaning" class="input" />
      <input v-model="editingProverb.category" class="input" />
      <button @click="updateProverb" class="btn update-btn ">Update</button>
    </div>
  </div>
 </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AppNavbar from './components/AppNavbar.vue'


const isLoading = ref(false)
const alertMessage = ref('')
const alertType = ref('success') // or 'danger'

const showAlert = (message, type = 'success') => {
  alertMessage.value = message
  alertType.value = type
  setTimeout(() => alertMessage.value = '', 3000)
}

const proverbs = ref([])
const newProverb = ref({ 
  textDari: '',
  textPashto: '',
  translationEn: '',
  meaning: '',
  category: '',
 })
const editingProverb = ref(null)

const fetchProverbs = async () => {
  isLoading.value = true
  try {
    const response = await axios.get('http://localhost:3000/api/proverbs')
    proverbs.value = response.data
  } catch (error) {
    showAlert('Failed to load proverbs. ', 'danger')
  } finally {
    isLoading.value = false
  }
}

const addProverb = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/proverbs', newProverb.value)
    proverbs.value.push(response.data)
    showAlert('Proverb added successfully!')
    newProverb.value = { textDari: '', textPashto: '', translationEn: '', meaning: '', category: '' }
  } catch (error) {
    showAlert('Failed to add proverb.', 'danger')
  }
}

const deleteProverb = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/proverbs/${id}`)
    proverbs.value = proverbs.value.filter(p => p.id !== id)
    showAlert('Proverb delete.', 'warning')
  } catch (error) {
    showAlert('Failed to delete proverb.', 'danger')
  }
}

const editProverb = (proverb) => {
  editingProverb.value = { ...proverb }
}

const updateProverb = async () => {
  try {
    await axios.put(`http://localhost:3000/api/proverbs/${editingProverb.value.id}`, editingProverb.value)
    const index = proverbs.value.findIndex(p => p.id === editingProverb.value.id)
    proverbs.value[index] = editingProverb.value
    editingProverb.value = null
    showAlert('Proverb updated successfully!')
  } catch (error) {
    showAlert('Failed to update proverb.', 'danger')
  }
}

onMounted(fetchProverbs)
</script>

<style>
body {
  font-family: 'Noto Naskh Arabic', 'Inter', sans-serif;
  background-color: #f9fafb;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 960px;
  margin: 40px auto;
  padding: 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 28px;
  font-weight: 800;
  color: #3c366b;
  margin-bottom: 24px;
}

.proverb-form {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.edit-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  background-color: #f3f4f6;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

@media (min-width: 600px) {
  .edit-form {
    grid-template-columns: 1fr 1fr;
  }

  .edit-form button {
    grid-column: span 2; /* Button spans across both columns */
    justify-self: start;
  }
}


.input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.btn {
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
}

.add-btn {
  background-color: #3b82f6 !important;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-btn:hover {
  background-color: #2563eb !important;
}

.update-btn {
  background-color: #16a34a !important;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.update-btn:hover {
  background-color: #15803d !important;
}

.edit-btn {
  background-color: #4f46e5 !important;
  color: white !important;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor:pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px
}

.edit-btn:hover {
  background-color: #3730a3 !important;
}

.delete-btn {
  background-color: #dc2626 !important;
  color:white !important;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.delete-btn:hover {
  background-color: #b91c1c !important;
}

.proverb-list {
  list-style: none;
  padding: 0;
}

.proverb-item {
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.proverb-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.proverb-title {
  font-size: 18px;
  font-weight: 600;
  color: #3730a3;
  margin-bottom: 4px;
}

.category {
  font-size: 14px;
  color: #6b7280;
}

.proverb-text {
  font-size: 16px;
  margin: 4px 0;
  font-family: 'Noto Naskh Arabic', serif;
  text-align: right;
}

.proverb-meaning {
  font-size: 13px;
  font-style: italic;
  color: #6b7280;
  text-align: right
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.edit-section {
  border-top: 1px solid #e5e7eb;
  padding-top: 20px;
  margin-top: 40px;
}

.edit-title {
  font-size: 28px;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 24px;
  text-align: center
}
</style>