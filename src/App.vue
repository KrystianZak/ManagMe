<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Interfejs projektu
interface Project {
  id: number;
  name: string;
  description: string;
}

// Klasa do obsługi localStorage
class ProjectStorage {
  private static key = "projects";

  static getProjects(): Project[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  static saveProjects(projects: Project[]) {
    localStorage.setItem(this.key, JSON.stringify(projects));
  }
}

// Definicja reaktywnej tablicy projektów
const projects = ref<Project[]>(ProjectStorage.getProjects());
const newProjectName = ref('');
const newProjectDescription = ref('');
let projectIdCounter = projects.value.length ? Math.max(...projects.value.map(p => p.id)) + 1 : 1;

// Dodawanie projektu
const createProject = () => {
  if (!newProjectName.value.trim() || !newProjectDescription.value.trim()) {
    console.log("Please type project name and description!");
    return;
  }

  const newProject: Project = {
    id: projectIdCounter++,
    name: newProjectName.value,
    description: newProjectDescription.value,
  };

  projects.value.push(newProject);
  ProjectStorage.saveProjects(projects.value);

  newProjectName.value = '';
  newProjectDescription.value = '';
  console.log("Added new project: ", newProject);
};

// Czytanie projektu (tylko logowanie do konsoli)
const readProject = (id: number) => {
  const project = projects.value.find(p => p.id === id);
  if (project) console.log("Read project: ", project);
};

// Aktualizacja projektu
const updateProject = (id: number) => {
  const project = projects.value.find(p => p.id === id);
  if (project) {
    project.name = newProjectName.value;
    project.description = newProjectDescription.value;
    ProjectStorage.saveProjects(projects.value);
    console.log("Updated project: ", project);
  }
};

// Usuwanie projektu
const deleteProject = (id: number) => {
  projects.value = projects.value.filter(p => p.id !== id);
  ProjectStorage.saveProjects(projects.value);
  console.log("Deleted project with id: ", id);
};

// Pobieranie projektów z localStorage po odświeżeniu strony
onMounted(() => {
  projects.value = ProjectStorage.getProjects();
});
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
          <strong>Name: {{ project.name }}</strong> <br/>
          <p>Description: {{ project.description }}</p> <br/>
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
