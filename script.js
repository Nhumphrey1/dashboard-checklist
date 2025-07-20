// Task Management Class
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderTasks();
        this.updateStats();
    }

    bindEvents() {
        // Add task buttons
        document.getElementById('addTaskBtn').addEventListener('click', () => this.showModal());
        document.getElementById('addTaskInputBtn').addEventListener('click', () => this.addQuickTask());
        document.getElementById('saveTask').addEventListener('click', () => this.saveTask());
        
        // Modal events
        document.getElementById('closeModal').addEventListener('click', () => this.hideModal());
        document.getElementById('cancelTask').addEventListener('click', () => this.hideModal());
        
        // Clear completed tasks
        document.getElementById('clearCompletedBtn').addEventListener('click', () => this.clearCompleted());
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Quick task input
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addQuickTask();
            }
        });

        // Modal backdrop click
        document.getElementById('taskModal').addEventListener('click', (e) => {
            if (e.target.id === 'taskModal') {
                this.hideModal();
            }
        });
    }

    addQuickTask() {
        const input = document.getElementById('taskInput');
        const text = input.value.trim();
        
        if (text) {
            const task = {
                id: Date.now(),
                title: text,
                description: '',
                priority: 'medium',
                dueDate: '',
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            this.tasks.push(task);
            this.saveToStorage();
            this.renderTasks();
            this.updateStats();
            input.value = '';
        }
    }

    addTask(taskData) {
        const task = {
            id: Date.now(),
            title: taskData.title,
            description: taskData.description || '',
            priority: taskData.priority || 'medium',
            dueDate: taskData.dueDate || '',
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.push(task);
        this.saveToStorage();
        this.renderTasks();
        this.updateStats();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToStorage();
            this.renderTasks();
            this.updateStats();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveToStorage();
        this.renderTasks();
        this.updateStats();
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            this.showModal(task);
        }
    }

    clearCompleted() {
        this.tasks = this.tasks.filter(t => !t.completed);
        this.saveToStorage();
        this.renderTasks();
        this.updateStats();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.renderTasks();
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'completed':
                return this.tasks.filter(t => t.completed);
            case 'pending':
                return this.tasks.filter(t => !t.completed);
            default:
                return this.tasks;
        }
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <li class="task-item empty-state">
                    <div class="task-content">
                        <p style="text-align: center; color: #6c757d; font-style: italic;">
                            ${this.currentFilter === 'all' ? 'No tasks yet. Add your first task!' : 
                              this.currentFilter === 'completed' ? 'No completed tasks.' : 'No pending tasks.'}
                        </p>
                    </div>
                </li>
            `;
            return;
        }

        taskList.innerHTML = filteredTasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="taskManager.toggleTask(${task.id})">
                    ${task.completed ? '<i class="fas fa-check"></i>' : ''}
                </div>
                <div class="task-content">
                    <div class="task-text">${this.escapeHtml(task.title)}</div>
                    <div class="task-meta">
                        ${task.description ? `<span><i class="fas fa-align-left"></i> ${this.escapeHtml(task.description)}</span>` : ''}
                        ${task.dueDate ? `<span><i class="fas fa-calendar"></i> ${this.formatDate(task.dueDate)}</span>` : ''}
                        <span class="task-priority ${task.priority}">${task.priority.toUpperCase()}</span>
                        <span><i class="fas fa-clock"></i> ${this.formatDate(task.createdAt)}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="edit-btn" onclick="taskManager.editTask(${task.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="taskManager.deleteTask(${task.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `).join('');
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('pendingTasks').textContent = pending;
        document.getElementById('completionRate').textContent = `${completionRate}%`;
    }

    showModal(task = null) {
        const modal = document.getElementById('taskModal');
        const form = document.getElementById('taskForm');
        
        if (task) {
            // Edit mode
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDescription').value = task.description;
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskDueDate').value = task.dueDate;
            document.getElementById('saveTask').textContent = 'Update Task';
            modal.dataset.editId = task.id;
        } else {
            // Add mode
            form.reset();
            document.getElementById('saveTask').textContent = 'Save Task';
            delete modal.dataset.editId;
        }
        
        modal.classList.add('show');
        document.getElementById('taskTitle').focus();
    }

    hideModal() {
        const modal = document.getElementById('taskModal');
        modal.classList.remove('show');
    }

    saveTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const priority = document.getElementById('taskPriority').value;
        const dueDate = document.getElementById('taskDueDate').value;
        
        if (!title) {
            alert('Please enter a task title');
            return;
        }

        const taskData = { title, description, priority, dueDate };
        const editId = document.getElementById('taskModal').dataset.editId;

        if (editId) {
            // Update existing task
            const task = this.tasks.find(t => t.id === parseInt(editId));
            if (task) {
                Object.assign(task, taskData);
                this.saveToStorage();
                this.renderTasks();
                this.updateStats();
            }
        } else {
            // Add new task
            this.addTask(taskData);
        }

        this.hideModal();
    }

    saveToStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Initialize the application
let taskManager;

document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
    
    // Add some sample tasks if no tasks exist
    if (taskManager.tasks.length === 0) {
        const sampleTasks = [
            {
                id: Date.now() - 3,
                title: 'Welcome to your Dashboard!',
                description: 'This is your personal task management dashboard. Start by adding your first task.',
                priority: 'high',
                dueDate: '',
                completed: false,
                createdAt: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: Date.now() - 2,
                title: 'Explore the features',
                description: 'Try adding tasks, marking them complete, and filtering by status.',
                priority: 'medium',
                dueDate: '',
                completed: false,
                createdAt: new Date(Date.now() - 43200000).toISOString()
            },
            {
                id: Date.now() - 1,
                title: 'Customize your workflow',
                description: 'Add due dates, priorities, and descriptions to organize your tasks better.',
                priority: 'low',
                dueDate: '',
                completed: true,
                createdAt: new Date(Date.now() - 21600000).toISOString()
            }
        ];
        
        taskManager.tasks = sampleTasks;
        taskManager.saveToStorage();
        taskManager.renderTasks();
        taskManager.updateStats();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + N to add new task
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        taskManager.showModal();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        taskManager.hideModal();
    }
}); 