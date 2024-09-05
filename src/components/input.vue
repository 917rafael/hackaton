<!--inputs da area de contato-->

<script setup>
defineProps({ pergunta: Object })
</script>

<template>
  <div class="form__group">
    <textarea v-if="pergunta.type === 'textarea'" class="form__field" :id="pergunta.id" :placeholder="pergunta.description" :minlength="pergunta.minlength":maxlength="pergunta.maxlength"></textarea>
    <input v-else type="text" class="form__field" :name="pergunta.description" :placeholder="pergunta.description" :id="pergunta.id" required />
    <label :for="pergunta.id" class="form__label">{{ pergunta.description }}</label>
  </div>
</template>

<style scoped>
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 20px;
  width: 100%;
}

.form__field {
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1rem;
  color: #333;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s, border-width 0.2s;
  resize: none; 
}

.form__field::placeholder {
  color: transparent; 
}

.form__field:placeholder-shown ~ .form__label {
  font-size: 1.3rem;
  cursor: text;
  top: 20px; 
}

.form__label {
  position: absolute;
  top: 10px;
  left: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #9b9b9b;
  pointer-events: none;
}

.form__field:focus ~ .form__label,
.form__field:not(:placeholder-shown) ~ .form__label {
  font-size: 0.85rem;
  color: #11998e;
  top: -15px; 
  font-weight: 700;
}

.form__field:focus {
  border-bottom: 2px solid #38ef7d;
}

textarea.form__field {
  min-height: 100px;
}

.form__field:required,
.form__field:invalid {
  box-shadow: none;
}

body {
  font-family: 'Times New Roman', Times, serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
  background-color: #222222;
}
</style>
