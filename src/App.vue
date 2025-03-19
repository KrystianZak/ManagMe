<script setup lang="ts">
import { ref } from 'vue';

// definicja interfejsu projektu
interface Project {
  id: number,
  name: string,
  description: string
}

// definicja reaktywnej tablicy projektów
const projects = ref<Project[]>([]);

// definicja zmiennych do dodawania projektu
const newProjectName = ref<string>('');
const newProjectDescription = ref<string>('');
let projectIdCounter = 1

// definicja funkcji dodawnia projektu
const createProject = () => {
  // zabezpieczenie formularzu
  if (!newProjectName.value.trim() || !newProjectName.value.trim()){
    console.log("Please type project name and description!")
  }

  const newProject: Project = {
    id: projectIdCounter++,
    name: newProjectName.value,
    description: newProjectDescription.value
  }

  projects.value.push(newProject);
  console.log("Added new project: ", newProject);

  // reset pol formularza
  newProjectName.value = '';
  newProjectDescription.value = '';
}

// definicja odczytywania projektu
const readProject = (id: number) => {
  const projectToRead = projects.value.find(project => project.id === id);
  if (projectToRead) {
    console.log("Read project: ", projectToRead);
  }
}

// definicja funkcji aktualizacji projetku
const updateProject = (id: number) => {
  const projectToUpdate = projects.value.find(project => project.id === id);
  if (projectToUpdate) {
    projectToUpdate.name = newProjectName.value;
    projectToUpdate.description = newProjectDescription.value;
    console.log("Updated project: ", projectToUpdate);
  }
}

// definicja funkcji usuwania projektu
const deleteProject = (id: number) => {
  const project = 
  project.value = projects.value.filter(p => p.id !== id)
  console.log("Deleted project with id: ", id);
}

//
</script>

<template>
  <div>
    <h1>App for projects managing</h1>

    <!-- Formularz do dodawania projektu -->
    <div class="form">
      <input v-model="newProjectName" placeholder="Nazwa projektu" />
      <input v-model="newProjectDescription" placeholder="Opis projektu" />
      <button @click="createProject">CREATE PROJECT</button>
    </div>

    <!-- Lista projektów -->
    <div v-if="projects.length > 0">
      <h2>Lista projektów:</h2>
      <ul>
        <li v-for="project in projects" :key="project.id">
          <strong>ID: {{ project.id }}</strong> <br/>
          <strong>Name: {{ project.name }} </strong> <br/>
          <p>description: {{ project.description }}</p> <br/>
          <button @click="updateProject(project.id)">UPDATE</button>
          <button @click="deleteProject(project.id)">DELETE</button>
        </li>
      </ul>
    </div>
    <p v-else>Brak projektów.</p>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

p {
  color: black;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

input {
  padding: 10px;
  width: 300px;
  font-size: 16px;
}

button {
  padding: 10px;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #42b883;
  color: white;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #f4f4f4;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
}

strong {
  color: #2c3e50;
}
</style>
