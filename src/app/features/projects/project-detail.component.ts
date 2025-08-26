import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetails, TaskComment } from '../../shared/components/task-detail-modal/task-detail-modal.component';
import { faChartLine, faColumns, faList, faListUl, faCalendar, faChartBar, faCog, faPlus } from '@fortawesome/free-solid-svg-icons';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in-progress' | 'testing' | 'done';
  storyPoints?: number;
  labels: string[];
  dueDate?: Date;
  type: 'issue' | 'task' | 'bug' | 'story' | 'epic';
}

interface Project {
  id: string;
  name: string;
  description: string;
  key: string;
  owner: string;
  status: 'active' | 'archived' | 'completed';
  startDate: Date;
  endDate?: Date;
  team: string[];
}

@Component({
  standalone: false,
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  activeTab = 'board';
  
  // FontAwesome icons
  faChartLine = faChartLine;
  faColumns = faColumns;
  faList = faList;
  faListUl = faListUl;
  faCalendar = faCalendar;
  faChartBar = faChartBar;
  faCog = faCog;
  faPlus = faPlus;
  
  tabs = [
    { id: 'overview', label: 'Overview', icon: faChartLine },
    { id: 'board', label: 'Board', icon: faColumns },
    { id: 'backlog', label: 'Backlog', icon: faList },
    { id: 'list', label: 'List', icon: faListUl },
    { id: 'timeline', label: 'Timeline', icon: faCalendar },
    { id: 'reports', label: 'Reports', icon: faChartBar },
    { id: 'settings', label: 'Settings', icon: faCog }
  ];

  columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-200', tasks: [] as Task[] },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-200', tasks: [] as Task[] },
    { id: 'testing', title: 'Testing', color: 'bg-yellow-200', tasks: [] as Task[] },
    { id: 'done', title: 'Done', color: 'bg-green-200', tasks: [] as Task[] }
  ];

  // Modal state
  isTaskModalOpen = false;
  selectedTask: (Task & { reporter?: string; comments?: TaskComment[] }) | null = null;

  // Task creation state
  isCreatingTask = false;
  newTaskTitle = '';
  newTaskType: Task['type'] = 'task';
  newTaskDescription = '';

  // Backlog state
  selectedBacklogTasks: Set<string> = new Set();
  selectAllBacklog = false;

  // Computed properties to avoid complex expressions in template
  get completedTasksCount(): number {
    return this.columns[3]?.tasks?.length || 0;
  }

  get totalTasksCount(): number {
    return this.columns.reduce((total, col) => total + (col.tasks?.length || 0), 0);
  }

  get backlogTasks(): Task[] {
    return this.columns[0].tasks; // All tasks in todo column
  }

  get totalBacklogCount(): number {
    return this.backlogTasks.length;
  }

  constructor(private route: ActivatedRoute) {
    // Mock project data
    this.project = {
      id: '1',
      name: 'Project Alpha',
      description: 'A comprehensive project management system for modern teams',
      key: 'ALPHA',
      owner: 'John Doe',
      status: 'active',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      team: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson']
    };

    // Mock tasks data
    this.initializeMockTasks();
  }

  // Modal handlers
  openTaskModal(task: Task): void {
    // Seed basic comments for demo
    const demoComments: TaskComment[] = [
      { id: 'c1', author: 'John Doe', message: 'Initial analysis complete.', createdAt: new Date('2024-02-01T10:00:00') },
      { id: 'c2', author: 'Jane Smith', message: 'Please consider accessibility.', createdAt: new Date('2024-02-02T14:30:00') }
    ];
    this.selectedTask = { ...task, reporter: 'John Doe', comments: demoComments };
    this.isTaskModalOpen = true;
  }

  closeTaskModal(): void {
    this.isTaskModalOpen = false;
    this.selectedTask = null;
  }

  saveTaskDescription(newDescription: string): void {
    if (!this.selectedTask) return;
    this.selectedTask.description = newDescription;
  }

  addTaskComment(message: string): void {
    if (!this.selectedTask) return;
    const newComment: TaskComment = {
      id: Math.random().toString(36).slice(2),
      author: 'You',
      message,
      createdAt: new Date()
    };
    this.selectedTask.comments = [...(this.selectedTask.comments || []), newComment];
  }

  sendQuickReply(message: string): void {
    this.addTaskComment(message);
  }

  updateTaskStatus(newStatus: Task['status']): void {
    if (!this.selectedTask) return;
    const currentColumn = this.columns.find(c => c.tasks.some(t => t.id === this.selectedTask!.id));
    const targetColumn = this.columns.find(c => c.id === newStatus);
    if (!currentColumn || !targetColumn) return;
    const idx = currentColumn.tasks.findIndex(t => t.id === this.selectedTask!.id);
    const [task] = currentColumn.tasks.splice(idx, 1);
    task.status = newStatus;
    targetColumn.tasks.push(task);
  }

  updateTaskPriority(newPriority: Task['priority']): void {
    if (!this.selectedTask) return;
    const column = this.columns.find(c => c.tasks.some(t => t.id === this.selectedTask!.id));
    if (!column) return;
    const idx = column.tasks.findIndex(t => t.id === this.selectedTask!.id);
    column.tasks[idx] = { ...column.tasks[idx], priority: newPriority };
    this.selectedTask.priority = newPriority;
  }

  ngOnInit(): void {
    // In a real app, you'd fetch project data based on route params
    const projectId = this.route.snapshot.paramMap.get('id');
    // this.loadProject(projectId);
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  // Drag and Drop Methods
  onDragStart(event: DragEvent, task: Task): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', task.id);
      event.dataTransfer.effectAllowed = 'move';
      
      // Add visual feedback
      const target = event.target as HTMLElement;
      if (target) {
        target.style.opacity = '0.5';
        target.style.transform = 'rotate(2deg)';
      }
    }
  }

  onDragEnd(event: DragEvent): void {
    // Reset visual feedback
    const target = event.target as HTMLElement;
    if (target) {
      target.style.opacity = '1';
      target.style.transform = 'rotate(0deg)';
    }
  }

  onDragOver(event: DragEvent, columnId: string): void {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
    
    // Add visual feedback to drop zone
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.classList.add('drag-over');
    }
  }

  onDragLeave(event: DragEvent): void {
    // Remove visual feedback from drop zone
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.classList.remove('drag-over');
    }
  }

  onDrop(event: DragEvent, targetColumnId: string): void {
    event.preventDefault();
    
    console.log('Column Drop Event:', { targetColumnId });
    
    // Remove visual feedback
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.classList.remove('drag-over');
    }
    
    const taskId = event.dataTransfer!.getData('text/plain');
    const sourceColumnId = event.dataTransfer!.getData('text/column');
    
    console.log('Column Drop Data:', { taskId, sourceColumnId, targetColumnId });
    
    if (!taskId) return;
    
    // Find the task and move it to the target column
    this.moveTaskToColumn(taskId, sourceColumnId, targetColumnId);
  }

  private moveTaskToColumn(taskId: string, sourceColumnId: string, targetColumnId: string): void {
    // Find source column
    const sourceColumn = this.columns.find(col => col.id === sourceColumnId);
    if (!sourceColumn) return;
    
    // Find the task in source column
    const taskIndex = sourceColumn.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;
    
    const taskToMove = sourceColumn.tasks[taskIndex];
    
    // Remove from source column
    sourceColumn.tasks.splice(taskIndex, 1);
    
    // Find target column
    const targetColumn = this.columns.find(col => col.id === targetColumnId);
    if (!targetColumn) return;
    
    // Update task status
    taskToMove.status = targetColumnId as any;
    
    // Add to target column (at the end for now, but this can be enhanced)
    targetColumn.tasks.push(taskToMove);
    
    console.log(`Moved task "${taskToMove.title}" from ${sourceColumn.title} to ${targetColumn.title}`);
  }

  // Enhanced drag and drop for reordering within columns
  onTaskDragStart(event: DragEvent, task: Task, columnId: string): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', task.id);
      event.dataTransfer.setData('text/column', columnId);
      event.dataTransfer.effectAllowed = 'move';
      
      console.log('Task Drag Start:', {
        taskId: task.id,
        taskTitle: task.title,
        columnId: columnId
      });
      
      // Add visual feedback
      const target = event.target as HTMLElement;
      if (target) {
        target.style.opacity = '0.5';
        target.style.transform = 'rotate(2deg)';
        target.classList.add('dragging');
      }
    }
  }

  onTaskDragEnd(event: DragEvent): void {
    // Reset visual feedback
    const target = event.target as HTMLElement;
    if (target) {
      target.style.opacity = '1';
      target.style.transform = 'rotate(0deg)';
      target.classList.remove('dragging');
    }
  }

  onTaskDragOver(event: DragEvent, task: Task, columnId: string): void {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
    
    // Add visual feedback to show where the task will be dropped
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.classList.add('drop-target');
    }
  }

  onTaskDragLeave(event: DragEvent): void {
    // Remove visual feedback
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.classList.remove('drop-target');
    }
  }

  onTaskDrop(event: DragEvent, targetTask: Task, targetColumnId: string): void {
    event.preventDefault();
    
    // Remove visual feedback
    const target = event.currentTarget as HTMLElement;
    if (target) {
      target.classList.remove('drop-target');
    }
    
    const draggedTaskId = event.dataTransfer!.getData('text/plain');
    const sourceColumnId = event.dataTransfer!.getData('text/column');
    
    console.log('Task Drop Event:', {
      draggedTaskId,
      sourceColumnId,
      targetColumnId,
      targetTaskId: targetTask.id,
      targetTaskTitle: targetTask.title
    });
    
    if (!draggedTaskId) return;
    
    // Handle reordering within the same column or moving between columns
    this.handleTaskDrop(draggedTaskId, sourceColumnId, targetColumnId, targetTask);
  }

  private handleTaskDrop(draggedTaskId: string, sourceColumnId: string, targetColumnId: string, targetTask: Task): void {
    console.log('handleTaskDrop called with:', {
      draggedTaskId,
      sourceColumnId,
      targetColumnId,
      targetTaskId: targetTask.id,
      targetTaskTitle: targetTask.title
    });
    
    // Don't allow dropping on itself
    if (draggedTaskId === targetTask.id) {
      console.log('Preventing drop on same task');
      return;
    }
    
    let draggedTask: Task | null = null;
    let sourceColumnIndex = -1;
    let targetColumnIndex = -1;
    
    // Find source and target columns
    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].id === sourceColumnId) {
        sourceColumnIndex = i;
      }
      if (this.columns[i].id === targetColumnId) {
        targetColumnIndex = i;
      }
    }
    
    console.log('Column indices:', { sourceColumnIndex, targetColumnIndex });
    
    if (sourceColumnIndex === -1 || targetColumnIndex === -1) {
      console.log('Invalid column indices');
      return;
    }
    
    // Find the dragged task
    const sourceColumn = this.columns[sourceColumnIndex];
    const draggedTaskIndex = sourceColumn.tasks.findIndex(t => t.id === draggedTaskId);
    if (draggedTaskIndex === -1) {
      console.log('Dragged task not found in source column');
      return;
    }
    
    draggedTask = sourceColumn.tasks[draggedTaskIndex];
    console.log('Found dragged task:', draggedTask.title, 'at index:', draggedTaskIndex);
    
    // Log the current state of the source column
    console.log('Source column tasks before removal:', sourceColumn.tasks.map(t => ({ id: t.id, title: t.title })));
    
    // Find the target task BEFORE removing the dragged task
    const targetColumn = this.columns[targetColumnIndex];
    const targetTaskIndex = targetColumn.tasks.findIndex(t => t.id === targetTask.id);
    console.log('Target task index before removal:', targetTaskIndex);
    
    // Log the current state of the target column
    console.log('Target column tasks before insertion:', targetColumn.tasks.map(t => ({ id: t.id, title: t.title })));
    
    // Remove from source column
    sourceColumn.tasks.splice(draggedTaskIndex, 1);
    console.log('Removed task from source column');
    
    // Update task status if moving to different column
    if (sourceColumnId !== targetColumnId) {
      draggedTask.status = targetColumnId as any;
      console.log('Updated task status to:', targetColumnId);
    }
    
    // Calculate the correct insertion position
    let insertIndex: number;
    
    if (sourceColumnId === targetColumnId) {
      // Same column reordering
      if (targetTaskIndex !== -1) {
        // If we're moving down in the same column, adjust the index
        if (draggedTaskIndex < targetTaskIndex) {
          insertIndex = targetTaskIndex - 1; // Insert above the target (after removal)
        } else {
          insertIndex = targetTaskIndex; // Insert above the target
        }
      } else {
        insertIndex = targetColumn.tasks.length; // Add to end
      }
    } else {
      // Different column
      if (targetTaskIndex !== -1) {
        insertIndex = targetTaskIndex; // Insert above the target task
      } else {
        insertIndex = targetColumn.tasks.length; // Add to end
      }
    }
    
    console.log('Insert index calculated:', insertIndex);
    
    // Insert the task at the calculated position
    if (insertIndex >= 0 && insertIndex <= targetColumn.tasks.length) {
      targetColumn.tasks.splice(insertIndex, 0, draggedTask);
      console.log('Inserted task at position:', insertIndex);
    } else {
      targetColumn.tasks.push(draggedTask);
      console.log('Added task to end of column');
    }
    
    // Log the final state
    console.log('Target column tasks after insertion:', targetColumn.tasks.map(t => ({ id: t.id, title: t.title })));
    
    // Log the operation
    if (sourceColumnId === targetColumnId) {
      console.log(`Reordered task "${draggedTask.title}" within ${sourceColumn.title}`);
    } else {
      console.log(`Moved task "${draggedTask.title}" from ${sourceColumn.title} to ${targetColumn.title}`);
    }
    
    // Force change detection
    this.columns = [...this.columns];
  }

  // Task creation methods
  startCreatingTask(): void {
    this.isCreatingTask = true;
    this.newTaskTitle = '';
    this.newTaskType = 'task';
    this.newTaskDescription = '';
  }

  cancelCreatingTask(): void {
    this.isCreatingTask = false;
    this.newTaskTitle = '';
    this.newTaskType = 'task';
    this.newTaskDescription = '';
  }

  createTask(): void {
    if (!this.newTaskTitle.trim()) return;

    const newTask: Task = {
      id: this.generateTaskId(),
      title: this.newTaskTitle.trim(),
      description: this.newTaskDescription.trim(),
      assignee: 'Unassigned',
      priority: 'medium',
      status: 'todo',
      type: this.newTaskType,
      labels: [this.newTaskType],
      storyPoints: undefined,
      dueDate: undefined
    };

    // Add to todo column
    this.columns[0].tasks.push(newTask);
    this.cancelCreatingTask();
  }

  private generateTaskId(): string {
    const projectKey = this.project.key;
    const nextNumber = this.totalTasksCount + 1;
    return `${projectKey}-${nextNumber}`;
  }

  // Backlog methods
  toggleSelectAllBacklog(): void {
    if (this.selectAllBacklog) {
      this.selectedBacklogTasks.clear();
      this.selectAllBacklog = false;
    } else {
      this.backlogTasks.forEach(task => this.selectedBacklogTasks.add(task.id));
      this.selectAllBacklog = true;
    }
  }

  toggleBacklogTaskSelection(taskId: string): void {
    if (this.selectedBacklogTasks.has(taskId)) {
      this.selectedBacklogTasks.delete(taskId);
      this.selectAllBacklog = false;
    } else {
      this.selectedBacklogTasks.add(taskId);
      if (this.selectedBacklogTasks.size === this.backlogTasks.length) {
        this.selectAllBacklog = true;
      }
    }
  }

  onBacklogDragStart(event: DragEvent, task: Task): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', task.id);
      event.dataTransfer.setData('text/column', 'todo');
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onBacklogDrop(event: DragEvent): void {
    event.preventDefault();
    const taskId = event.dataTransfer!.getData('text/plain');
    const sourceColumnId = event.dataTransfer!.getData('text/column');
    
    if (!taskId || sourceColumnId !== 'todo') return;
    
    // Reorder within backlog
    const taskIndex = this.backlogTasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;
    
    const task = this.backlogTasks[taskIndex];
    this.backlogTasks.splice(taskIndex, 1);
    this.backlogTasks.push(task);
  }


  getPriorityColor(priority: string): string {
    const colors = {
      'low': 'bg-gray-100 text-gray-800',
      'medium': 'bg-blue-100 text-blue-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  }

  getPriorityLabel(priority: string): string {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  }

  getInitials(name: string): string {
    return name.charAt(0);
  }

  getTaskTypeColor(type: string): string {
    const colors = {
      'issue': 'bg-red-100 text-red-800',
      'task': 'bg-blue-100 text-blue-800',
      'bug': 'bg-red-100 text-red-800',
      'story': 'bg-green-100 text-green-800',
      'epic': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || colors.task;
  }

  private initializeMockTasks(): void {
    const mockTasks: Task[] = [
      {
        id: 'ALPHA-1',
        title: 'Design user interface',
        description: 'Create wireframes and mockups for the main dashboard',
        assignee: 'Jane Smith',
        priority: 'high',
        status: 'todo',
        type: 'task',
        storyPoints: 5,
        labels: ['design', 'ui/ux'],
        dueDate: new Date('2024-02-15')
      },
      {
        id: 'ALPHA-2',
        title: 'Implement authentication system',
        description: 'Set up JWT-based authentication with role management',
        assignee: 'Mike Johnson',
        priority: 'critical',
        status: 'in-progress',
        type: 'task',
        storyPoints: 8,
        labels: ['backend', 'security'],
        dueDate: new Date('2024-02-20')
      },
      {
        id: 'ALPHA-3',
        title: 'Create database schema',
        description: 'Design and implement the database structure',
        assignee: 'Mike Johnson',
        priority: 'high',
        status: 'done',
        type: 'task',
        storyPoints: 6,
        labels: ['backend', 'database'],
        dueDate: new Date('2024-02-10')
      },
      {
        id: 'ALPHA-4',
        title: 'Write unit tests',
        description: 'Implement comprehensive test coverage for core modules',
        assignee: 'Sarah Wilson',
        priority: 'medium',
        status: 'testing',
        type: 'task',
        storyPoints: 4,
        labels: ['testing', 'quality'],
        dueDate: new Date('2024-02-25')
      },
      {
        id: 'ALPHA-5',
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated testing and deployment',
        assignee: 'John Doe',
        priority: 'medium',
        status: 'todo',
        type: 'task',
        storyPoints: 3,
        labels: ['devops', 'automation'],
        dueDate: new Date('2024-03-01')
      },
      {
        id: 'ALPHA-6',
        title: 'Performance optimization',
        description: 'Optimize database queries and frontend performance',
        assignee: 'Jane Smith',
        priority: 'low',
        status: 'todo',
        type: 'task',
        storyPoints: 7,
        labels: ['performance', 'optimization'],
        dueDate: new Date('2024-03-10')
      }
    ];

    // Distribute tasks to columns
    mockTasks.forEach(task => {
      const column = this.columns.find(col => col.id === task.status);
      if (column) {
        column.tasks.push(task);
      }
    });
  }
}
