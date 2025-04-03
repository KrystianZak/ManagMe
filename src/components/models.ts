export interface User {
  id: number;
  name: string;
  surname: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
}

export interface Story {
  id: number;
  name: string;
  description: string;
  priority: 'niski' | 'średni' | 'wysoki';
  projectId: number;
  createdAt: string;
  status: 'todo' | 'doing' | 'done';
  ownerId: number;
}

// Mockowany użytkownik
export const mockUser: User = {
  id: 1,
  name: "Jan",
  surname: "Kowalski"
};