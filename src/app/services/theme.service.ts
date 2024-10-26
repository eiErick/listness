import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private theme: 'light' | 'dark' = 'light';

  constructor(private storageService: StorageService) {
    this.loadTheme();
  }

  getTheme() {
    return this.theme;
  }

  setTheme(theme: 'light' | 'dark') {
    this.theme = theme;
    this.storageService.setItem('theme', theme);
  }

  private loadTheme() {
    const storedTheme = this.storageService.getItem('theme');
    if (storedTheme) this.theme = storedTheme as 'light' | 'dark';
    else this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}