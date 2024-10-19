import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() searchTerm = new EventEmitter<string>()
  
  @ViewChild('search') searchElement!: ElementRef;
  
  public callSearch() {
    const term: string = this.searchElement.nativeElement.value;
    this.searchTerm.emit(term);
  }
}
