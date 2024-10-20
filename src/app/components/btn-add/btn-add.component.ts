import { ChangeDetectionStrategy, Component, EventEmitter, inject, model, Output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { DialogNewTaskComponent } from '../dialog-new-task/dialog-new-task.component';

@Component({
  selector: 'app-btn-add',
  standalone: true,
  imports: [MatButtonModule, DialogNewTaskComponent, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './btn-add.component.html',
  styleUrl: './btn-add.component.css'
})
export class BtnAdd {
  @Output() tasks = new EventEmitter<Tasks>();

  readonly task = signal('');
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNewTaskComponent, {
      data: this.task(),
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== '') {
        this.task.set(result);
        this.addTaskEvent({'name': this.capitalizeFirstLetter(this.task()), 'id': this.makeId(), checked: false});
      }
    });
  }

  private addTaskEvent(task: Tasks): void {
    if (task.name !== "") this.tasks.emit(task);
  }

  private makeId(): string {
    return Math.floor(Date.now() * Math.random()).toString(36);
  }

  private capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

export interface Tasks {
  name: string,
  id: string,
  checked: boolean,
}
