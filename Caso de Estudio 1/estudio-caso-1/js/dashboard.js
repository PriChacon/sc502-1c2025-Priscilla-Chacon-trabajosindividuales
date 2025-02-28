document.addEventListener('DOMContentLoaded', function() {
    // Datos ficticios para tareas
    const tasks = [
        {
            id: 1,
            title: "Complete Project Report",
            description: "Prepare and submit the final project report by the end of the week.",
            due_date: "2024-08-25",
            comments: []
        },
        {
            id: 2,
            title: "Team Meeting",
            description: "Schedule a team meeting to discuss the next sprint.",
            due_date: "2024-08-26",
            comments: []
        },
        {
            id: 3,
            title: "Code Review",
            description: "Review the codebase and ensure all pull requests are merged.",
            due_date: "2024-08-27",
            comments: []
        }
    ];

    let editingTaskId = null;
    let taskCounter = tasks.length;

    // Carga las tareas en el DOM
    function loadTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        tasks.forEach(function(task) {
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text text-muted">${task.due_date}</p>
                    <div class="comments-section">
                        <h6>Comments:</h6>
                        <ul id="comments-${task.id}"></ul>
                        <input type="text" id="comment-input-${task.id}" placeholder="Add a comment" class="form-control mb-2">
                        <button class="btn btn-primary btn-sm" onclick="addComment(${task.id})">Add Comment</button>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-secondary btn-sm edit-task" data-id="${task.id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                </div>
            </div>
            `;
            taskList.appendChild(taskCard);
            displayComments(task.id);
        });

        // Selecciona todos los botones que tengan la clase edit-task
        document.querySelectorAll('.edit-task').forEach(function(btnEdit) {
            btnEdit.addEventListener('click', handleEditTask);
        });

        document.querySelectorAll('.delete-task').forEach(function(btnDelete) {
            btnDelete.addEventListener('click', handleDeleteTask);
        });
    }

    function handleEditTask(event) {
        editingTaskId = parseInt(event.target.dataset.id);
        const task = tasks.find(t => t.id === editingTaskId);
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-desc').value = task.description;
        document.getElementById('due-date').value = task.due_date;
        document.getElementById('taskModalLabel').textContent = 'Edit Task';
        const modal = new bootstrap.Modal(document.getElementById('taskModal'));
        modal.show();
    }

    function handleDeleteTask(event) {
        const id = parseInt(event.target.dataset.id);
        const taskIndex = tasks.findIndex(t => t.id === id);
        tasks.splice(taskIndex, 1);
        loadTasks();
    }

    document.getElementById('task-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-desc').value;
        const dueDate = document.getElementById('due-date').value;

        if (!editingTaskId) {
            taskCounter += 1;
            const newTask = {
                id: taskCounter,
                title: title,
                description: description,
                due_date: dueDate,
                comments: []
            };
            tasks.push(newTask);
        } else {
            let task = tasks.find(t => t.id === editingTaskId);
            task.title = title;
            task.description = description;
            task.due_date = dueDate;
        }

        const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
        modal.hide();
        loadTasks();
    });

    document.getElementById('taskModal').addEventListener('show.bs.modal', function() {
        if (!editingTaskId) {
            document.getElementById('task-form').reset();
            document.getElementById('taskModalLabel').textContent = 'Add Task';
        }
    });

    document.getElementById('taskModal').addEventListener('hidden.bs.modal', function() {
        editingTaskId = null;
    });

    // Función para agregar un comentario
    window.addComment = function(taskId) {
        const commentInput = document.getElementById(`comment-input-${taskId}`);
        const commentText = commentInput.value;

        if (commentText) {
            const task = tasks.find(t => t.id === taskId);
            task.comments.push(commentText);
            displayComments(taskId);
            commentInput.value = '';
        }
    };

    // Función para mostrar los comentarios
    function displayComments(taskId) {
        const commentsList = document.getElementById(`comments-${taskId}`);
        commentsList.innerHTML = '';

        const task = tasks.find(t => t.id === taskId);
        task.comments.forEach((comment, index) => {
            const li = document.createElement('li');
            li.className = 'd-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${comment} <button class="btn btn-danger btn-sm" onclick="deleteComment(${taskId}, ${index})">Delete</button>
            `;
            commentsList.appendChild(li);
        });
    }

    // Función para eliminar un comentario
    window.deleteComment = function(taskId, commentIndex) {
        const task = tasks.find(t => t.id === taskId);
        task.comments.splice(commentIndex, 1);
        displayComments(taskId);
    };

    loadTasks();
});