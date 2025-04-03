import type { Project, Story } from './models';

class StorageHelper<T> {
  constructor(private key: string) {}

  getItems(): T[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  saveItems(items: T[]): void {
    localStorage.setItem(this.key, JSON.stringify(items));
  }
}

export const projectStorage = new StorageHelper<Project>("projects");
export const storyStorage = new StorageHelper<Story>("stories");
