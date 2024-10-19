import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { BtnAdd, Tasks } from "./components/btn-add/btn-add.component"
import { DialogNewTaskComponent } from "./components/dialog-new-task/dialog-new-task.component";
import { CheckTask, TaskComponent } from "./components/task/task.component";
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DialogNewTaskComponent, BtnAdd, TaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  tasks: Array<Tasks> = [];
  filteredTasks: Array<Tasks> = [];
  title = 'listness';

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.getData();
    this.filteredTasks = this.tasks;
  }

  public addTask(task: Tasks): void {
    this.tasks.push(task);
    this.filteredTasks = this.tasks;
    this.saveData();
  }

  public checkTask(task: CheckTask): void {
    this.tasks.forEach((item) => {
      if (item.id === task.id) item.checked = task.checked;
    });

    this.saveData();
  }

  public deleteTask(id: string): void {
    this.tasks.forEach((item, index) => {
      if (item.id === id) this.tasks.splice(index, 1);
    });

    this.filteredTasks = this.tasks;
    this.saveData();
  }

  public search(term: string): void {
    if (term)    
      this.filteredTasks = this.tasks.filter((task) => task.name.toLowerCase().includes(term.toLowerCase()));
    else this.filteredTasks = this.tasks;
  }

  private saveData(): void {
    this.storageService.setItem('tasks', this.tasks);
  }

  private getData(): void {
    const tasksSaved: Array<Tasks> | null = this.storageService.getItem('tasks');
    if (tasksSaved) this.tasks = tasksSaved;
    this.filteredTasks = this.tasks;
  }
}