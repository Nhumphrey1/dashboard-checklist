# Dashboard with Checklist

A modern, responsive web application featuring a beautiful dashboard with an interactive checklist system. Built with vanilla HTML, CSS, and JavaScript.

## Features

### 📊 Dashboard Statistics
- **Total Tasks**: Shows the total number of tasks
- **Completed Tasks**: Displays completed task count
- **Pending Tasks**: Shows tasks that are still pending
- **Completion Rate**: Percentage of completed tasks

### ✅ Checklist Features
- **Add Tasks**: Quick add via input field or detailed modal
- **Mark Complete**: Click checkbox to toggle task completion
- **Edit Tasks**: Modify task details including title, description, priority, and due date
- **Delete Tasks**: Remove individual tasks
- **Filter Tasks**: View all, pending, or completed tasks
- **Clear Completed**: Bulk remove all completed tasks

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Beautiful Animations**: Smooth transitions and hover effects
- **Glass Morphism**: Modern glass-like design with backdrop blur
- **Color-coded Priorities**: Visual priority indicators (High, Medium, Low)
- **Interactive Elements**: Hover effects and visual feedback

### 💾 Data Persistence
- **Local Storage**: Tasks are saved locally in your browser
- **Auto-save**: Changes are automatically saved
- **Sample Data**: Comes with sample tasks to get you started

## Getting Started

1. **Open the Application**: Simply open `index.html` in your web browser
2. **Add Your First Task**: Use the quick input field or click "Add Task" for detailed options
3. **Organize Tasks**: Set priorities, due dates, and descriptions
4. **Track Progress**: Monitor your completion rate and statistics

## How to Use

### Adding Tasks
- **Quick Add**: Type in the input field and press Enter or click the + button
- **Detailed Add**: Click "Add Task" button to open a modal with more options

### Managing Tasks
- **Complete**: Click the checkbox next to any task
- **Edit**: Click the edit icon to modify task details
- **Delete**: Click the trash icon to remove a task
- **Filter**: Use the filter buttons to view different task categories

### Keyboard Shortcuts
- `Ctrl/Cmd + N`: Open add task modal
- `Escape`: Close modal
- `Enter`: Add quick task (when input field is focused)

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Features in Detail

### Task Properties
- **Title**: Required task name
- **Description**: Optional detailed description
- **Priority**: Low, Medium, or High (color-coded)
- **Due Date**: Optional deadline
- **Created Date**: Automatically tracked
- **Completion Status**: Toggle between pending and completed

### Statistics Dashboard
The dashboard provides real-time statistics:
- **Total Tasks**: All tasks in the system
- **Completed**: Tasks marked as done
- **Pending**: Tasks not yet completed
- **Completion Rate**: Percentage of completed tasks

### Filtering System
- **All**: Shows all tasks regardless of status
- **Pending**: Shows only incomplete tasks
- **Completed**: Shows only completed tasks

## Customization

The application is built with vanilla web technologies, making it easy to customize:

- **Colors**: Modify CSS variables in `styles.css`
- **Layout**: Adjust grid and flexbox properties
- **Functionality**: Extend the `TaskManager` class in `script.js`

## Local Storage

All tasks are stored in your browser's local storage, meaning:
- Data persists between browser sessions
- No internet connection required
- Data is private to your device

## Future Enhancements

Potential features that could be added:
- Task categories/tags
- Due date reminders
- Export/import functionality
- Dark mode toggle
- Task search functionality
- Drag and drop reordering
- Task sharing capabilities

## License

This project is open source and available under the MIT License. 