document.addEventListener('DOMContentLoaded', function () {
    // Select elements
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Add Task Event
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission

        // Get the input value
        const task = taskInput.value.trim();

        if (task) {
            // Create a new list item
            const li = document.createElement('li');
            li.innerHTML = `
                ${task}
                <button class="delete-btn">Delete</button>
            `;

            // Append to task list
            taskList.appendChild(li);

            // Clear the input field
            taskInput.value = '';

            // Save tasks to localStorage
            saveTasks();
        }
    });

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = Array.from(document.querySelectorAll('#taskList li')).map(li =>
            li.textContent.replace('Delete', '').trim()
        );
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks on page load
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task}
                <button class="delete-btn">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Delete task event
    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            const li = e.target.parentElement;
            taskList.removeChild(li);

            // Save tasks after deletion
            saveTasks();
        }
    });

    // Load tasks when the document is ready
    loadTasks();
});
