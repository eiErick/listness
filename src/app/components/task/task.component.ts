import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Tasks } from '../btn-add/btn-add.component';
import { Data } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent{
  @Input() task!: Tasks;

  @Output() taskCheckedId = new EventEmitter<CheckTask>();
  @Output() taskDeleteId = new EventEmitter<string>();

  @ViewChild('checkboxTask') checkboxTask!: ElementRef;

  public callCheckTask(id: string) {
    const checked = this.checkboxTask.nativeElement.checked;
    this.taskCheckedId.emit({ id: id, checked: checked });
  }

  public deleteTask(id: string) {
    this.taskDeleteId.emit(id);
  }
}

export interface CheckTask {
  id: string,
  checked: boolean,
}