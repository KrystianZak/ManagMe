<script setup lang="ts">
import { user, projects, activeProjectId, filteredStories, createProject, deleteProject, setActiveProject, createStory, deleteStory } from '../components/logic.ts';

import { ref } from 'vue';

const newProjectName = ref('');
const newProjectDescription = ref('');
const newStoryName = ref('');
const newStoryDescription = ref('');
const newStoryPriority = ref<'niski' | 'średni' | 'wysoki'>('średni');
const newStoryStatus = ref<'todo' | 'doing' | 'done'>('todo');
</script>

<template>
    <div>
        <h1>Project Management App</h1>
        <h2>Zalogowany użytkownik: {{ user.name }} {{ user.surname }}</h2>

        <div class="form">
            <input v-model="newProjectName" placeholder="Nazwa projektu" />
            <input v-model="newProjectDescription" placeholder="Opis projektu" />
            <button @click="createProject(newProjectName, newProjectDescription)">Dodaj projekt</button>
        </div>

        <h2>Wybierz projekt:</h2>
        <ul>
            <li v-for="project in projects" :key="project.id">
                <span>{{ project.name }}</span>
                <button @click="setActiveProject(project.id)">Wybierz</button>
                <button @click="deleteProject(project.id)">Usuń</button>
            </li>
        </ul>

        <div v-if="activeProjectId">
            <h2>Dodaj historyjkę:</h2>
            <input v-model="newStoryName" placeholder="Nazwa historyjki" />
            <input v-model="newStoryDescription" placeholder="Opis historyjki" />
            <select v-model="newStoryPriority">
                <option value="niski">Niski</option>
                <option value="średni">Średni</option>
                <option value="wysoki">Wysoki</option>
            </select>
            <select v-model="newStoryStatus">
                <option value="todo">TODO</option>
                <option value="doing">DOING</option>
                <option value="done">DONE</option>
            </select>
            <button @click="createStory(newStoryName, newStoryDescription, newStoryPriority, newStoryStatus)">Dodaj
                historyjkę</button>
        </div>

        <h2>Lista historyjek:</h2>
        <ul>
            <li v-for="story in filteredStories" :key="story.id">
                <strong>{{ story.name }}</strong>
                <p>{{ story.description }}</p>
                <p>Priorytet: {{ story.priority }}</p>
                <p>Status: {{ story.status }}</p>
                <button @click="deleteStory(story.id)">Usuń</button>
            </li>
        </ul>
    </div>
</template>