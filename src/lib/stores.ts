import { writable } from 'svelte/store';

export const mouse = writable({ x: 0, y: 0, dx: 0, dy: 0 });
export const scroll = writable({ progress: 0, velocity: 0 });
export const loaderVisible = writable(true);
export const cursorHover = writable(false);
