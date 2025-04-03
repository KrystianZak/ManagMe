import { ref, onMounted, computed } from 'vue';
import { projectStorage, storyStorage } from './storage';
import { mockUser, type Project, type Story } from './models';

// podzielic na users / projekty / taski !!!!

// Reaktywne zmienne
const user = ref(mockUser);
const activeProjectId = ref<number | null>(null);
const projects = ref<Project[]>([]);
const stories = ref<Story[]>([]);

// Funkcja ustawiająca aktywny projekt (użytkownik wybiera projekt do edycji)
const setActiveProject = (id: number) => {
  activeProjectId.value = id;
  localStorage.setItem("activeProject", id.toString());
};

// Pobieranie historyjek dla aktywnego projektu
const filteredStories = computed(() => {
  return stories.value.filter(story => story.projectId === activeProjectId.value);
});

// Tworzenie nowego projektu i zapisywanie go do LocalStorage
const createProject = (name: string, description: string) => {
  if (!name.trim() || !description.trim()) return;
  const newProject: Project = {
    id: projects.value.length + 1,
    name,
    description
  };
  projects.value.push(newProject);
  projectStorage.saveItems(projects.value);
};

// Usuwanie projektu
const deleteProject = (id: number) => {
  projects.value = projects.value.filter(project => project.id !== id);
  projectStorage.saveItems(projects.value);
};

// Tworzenie historyjki
const createStory = (name: string, description: string, priority: 'niski' | 'średni' | 'wysoki', status: 'todo' | 'doing' | 'done') => {
  if (!activeProjectId.value || !name.trim() || !description.trim()) return;
  const newStory: Story = {
    id: stories.value.length + 1,
    name,
    description,
    priority,
    projectId: activeProjectId.value,
    createdAt: new Date().toISOString(),
    status,
    ownerId: user.value.id
  };
  stories.value.push(newStory);
  storyStorage.saveItems(stories.value);
};

// Usuwanie historyjki
const deleteStory = (id: number) => {
  stories.value = stories.value.filter(story => story.id !== id);
  storyStorage.saveItems(stories.value);
};

// Pobieranie danych z LocalStorage przy starcie aplikacji
onMounted(() => {
  projects.value = projectStorage.getItems();
  stories.value = storyStorage.getItems();
  activeProjectId.value = parseInt(localStorage.getItem("activeProject") || "0") || null;
});

export { user, projects, activeProjectId, filteredStories, createProject, deleteProject, setActiveProject, createStory, deleteStory };
