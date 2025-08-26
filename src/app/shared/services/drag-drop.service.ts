import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface DragDropEvent {
  item: any;
  previousContainer: string;
  currentContainer: string;
  previousIndex: number;
  currentIndex: number;
}

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  private dragStartSubject = new BehaviorSubject<any>(null);
  private dragEndSubject = new BehaviorSubject<DragDropEvent | null>(null);

  dragStart$ = this.dragStartSubject.asObservable();
  dragEnd$ = this.dragEndSubject.asObservable();

  onDragStart(item: any): void {
    this.dragStartSubject.next(item);
  }

  onDragEnd(event: DragDropEvent): void {
    this.dragEndSubject.next(event);
  }

  clearDragState(): void {
    this.dragStartSubject.next(null);
    this.dragEndSubject.next(null);
  }
}
