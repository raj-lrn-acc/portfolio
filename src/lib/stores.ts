import { writable, derived } from 'svelte/store';
import { page } from '$app/stores';

export const mouse = writable({ x: 0.5, y: 0.5 });
export const scroll = writable(0);
export const loaderVisible = writable(true);
export const cursorHover = writable(false);
export const detailProject = writable<number | null>(null);

export const viewState = derived(page, ($page) => {
  const path = $page.url.pathname;
  if (path === '/') return 'home';
  if (path.startsWith('/projects')) return 'projects';
  if (path.startsWith('/contact')) return 'contact';
  return 'home';
});
