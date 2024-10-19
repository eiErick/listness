import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

export interface DialogData {
  animal: string;
  name: string;
}

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
  ],
  templateUrl: './dialog-new-task.component.html',
  styleUrl: './dialog-new-task.component.css'
})
export class DialogNewTaskComponent {
  readonly dialogRef = inject(MatDialogRef<DialogNewTaskComponent>);
  readonly task = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.task.animal);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
