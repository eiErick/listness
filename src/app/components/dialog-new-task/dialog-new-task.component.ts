import { Component, inject, model } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-dialog-new-task',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    NgClass,
  ],
  templateUrl: './dialog-new-task.component.html',
  styleUrl: './dialog-new-task.component.css'
})
export class DialogNewTaskComponent {
  readonly dialogRef = inject(MatDialogRef<DialogNewTaskComponent>);
  readonly task = inject<{name: string}>(MAT_DIALOG_DATA);
  readonly taskName = model(this.task.name);

  constructor(private themeService: ThemeService) {}

  public theme(): 'dark' | 'light' {
    return this.themeService.getTheme();
  }

  public callAddNewTask(): void {
    this.dialogRef.close(this.taskName());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
