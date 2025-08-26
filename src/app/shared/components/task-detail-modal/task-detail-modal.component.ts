import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TaskComment {
  id: string;
  author: string;
  message: string;
  createdAt: Date;
}

export interface TaskDetails {
  id: string;
  title: string;
  description: string;
  assignee: string;
  reporter?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in-progress' | 'testing' | 'done';
  labels: string[];
  dueDate?: Date;
  storyPoints?: number;
  comments?: TaskComment[];
  type: 'issue' | 'task' | 'bug' | 'story' | 'epic';
}

@Component({
  standalone: false,
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss']
})
export class TaskDetailModalComponent {
  @Input() open = false;
  @Input() task: TaskDetails | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saveDescription = new EventEmitter<string>();
  @Output() addComment = new EventEmitter<string>();
  @Output() quickReply = new EventEmitter<string>();
  @Output() changeStatus = new EventEmitter<TaskDetails['status']>();
  @Output() changePriority = new EventEmitter<TaskDetails['priority']>();

  isEditingDescription = false;
  editedDescription = '';
  newComment = '';

  presetReplies = ['Looks good', 'Need help', 'Blocked', 'On it', 'Please review'];

  onOpenChanged(): void {
    if (this.task) {
      this.editedDescription = this.task.description || '';
    }
  }

  onClose(): void {
    this.close.emit();
  }

  startEditDescription(): void {
    this.isEditingDescription = true;
    this.editedDescription = this.task?.description || '';
  }

  cancelEditDescription(): void {
    this.isEditingDescription = false;
    this.editedDescription = this.task?.description || '';
  }

  saveEditedDescription(): void {
    this.isEditingDescription = false;
    this.saveDescription.emit(this.editedDescription.trim());
  }

  submitComment(): void {
    const message = this.newComment.trim();
    if (!message) return;
    this.addComment.emit(message);
    this.newComment = '';
  }

  sendQuickReply(msg: string): void {
    this.quickReply.emit(msg);
  }
}


