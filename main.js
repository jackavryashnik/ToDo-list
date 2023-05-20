const form = document.querySelector(".creating-form");
const title = document.querySelector(".creating-form__input");
const description = document.querySelector(".creating-form__description");
const listEl = document.querySelector(".task-list__tasks");
const errorEl = document.querySelector(".error");

window.addEventListener("load", () => {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach((task) => {
        const taskEl = createTaskElement(task.taskTitle, task.taskDescription);
        listEl.appendChild(taskEl);
        addListenersToTaskEl(taskEl);
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!isFormValid()) {
            showValidationError();
        } else {
            hideValidationError();
            const taskTitle = title.value;
            const taskDescription = description.value;

            const taskEl = createTaskElement(taskTitle, taskDescription);
            listEl.appendChild(taskEl);
            title.value = "";
            description.value = "";

            addListenersToTaskEl(taskEl);

            saveTaskToLocalStorage(taskTitle, taskDescription);
        }
    });
});

function createTaskElement(taskTitle, taskDescription) {
    const taskEl = document.createElement("div");
    taskEl.classList.add("task");

    const taskContent = document.createElement("div");
    taskContent.classList.add("task__task-content");

    const taskTitleEl = createField("input", taskTitle, [
        "text",
        "task-content__title",
    ]);
    setReadonlyAttribute(taskTitleEl);
    taskContent.appendChild(taskTitleEl);

    const taskDescriptionEl = createField("textarea", taskDescription, [
        "task-content__description",
    ]);
    setReadonlyAttribute(taskDescriptionEl);
    taskContent.appendChild(taskDescriptionEl);

    const taskActionsEl = document.createElement("div");
    taskActionsEl.classList.add("task-content__actions", "actions");

    const taskEditEl = createButton("Edit");
    const taskDeleteEl = createButton("Delete");

    taskEditEl.classList.add("edit");
    taskDeleteEl.classList.add("delete");

    taskActionsEl.appendChild(taskEditEl);
    taskActionsEl.appendChild(taskDeleteEl);
    taskContent.appendChild(taskActionsEl);

    const taskDate = document.createElement("p");
    taskDate.innerText = new Date().toLocaleDateString();
    taskDate.classList.add("task-content__date");
    taskContent.appendChild(taskDate);

    const taskErrorEl = document.createElement("div");
    taskErrorEl.classList.add("task__error");

    taskEl.appendChild(taskContent);
    taskEl.appendChild(taskErrorEl);

    return taskEl;
}

function createField(type, value, classes) {
    const element = document.createElement(type);
    element.value = value;
    element.classList.add(...classes);
    return element;
}

function createButton(text) {
    const button = document.createElement("button");
    button.textContent = text;
    return button;
}

function addListenersToTaskEl(taskEl) {
    const taskEditEl = taskEl.querySelector(".edit");
    const taskTitleEl = taskEl.querySelector(".task-content__title");
    const taskDescriptionEl = taskEl.querySelector(
        ".task-content__description"
    );
    const taskErrorEl = taskEl.querySelector(".task__error");

    taskEditEl.addEventListener("click", () => {
        if (taskEditEl.innerText.toLowerCase() === "edit") {
            removeReadonlyAttribute(taskTitleEl);
            removeReadonlyAttribute(taskDescriptionEl);
            taskEditEl.textContent = "Save";
            taskDescriptionEl.focus();
        } else {
            if (
                !isTaskFieldEmpty(taskTitleEl) &&
                !isTaskFieldEmpty(taskDescriptionEl)
            ) {
                setReadonlyAttribute(taskTitleEl);
                setReadonlyAttribute(taskDescriptionEl);
                taskEditEl.textContent = "Edit";
                hideEditingError(taskErrorEl);
            } else {
                showEditingError(taskErrorEl, taskTitleEl, taskDescriptionEl);
            }
            const updatedTask = {
                taskTitle: taskTitleEl.value,
                taskDescription: taskDescriptionEl.value,
            };
            const taskIndex = Array.from(listEl.children).indexOf(taskEl);
            updateTaskInLocalStorage(taskIndex, updatedTask);
        }
    });
    const taskDeleteEl = taskEl.querySelector(".delete");
    taskDeleteEl.addEventListener("click", () => {
        const taskIndex = Array.from(listEl.children).indexOf(taskEl);

        listEl.removeChild(taskEl);
        hideEditingError(taskErrorEl);

        deleteTaskFromLocalStorage(taskIndex);
    });
}

function setReadonlyAttribute(element) {
    element.setAttribute("readonly", "readonly");
}

function removeReadonlyAttribute(element) {
    element.removeAttribute("readonly");
}

function isFormValid() {
    return title.value.trim() !== "" && description.value.trim() !== "";
}

function showValidationError() {
    const messages = [];
    if (title.value === "" || title.value === null) {
        messages.push("Title is required");
    }
    if (description.value === "" || description.value === null) {
        messages.push("Description is required");
    }

    if (messages.length > 0) {
        errorEl.innerText = messages.join(", ");
    }
}

function hideValidationError() {
    errorEl.innerText = "";
}

function isTaskFieldEmpty(element) {
    return element.value.trim() === "";
}

function showEditingError(errorEl, titleEl, descriptionEl) {
    errorEl.innerText = "Fields cannot be empty!";
    if (!titleEl.value) titleEl.focus();
    if (!descriptionEl.value) descriptionEl.focus();
}

function hideEditingError(errorEl) {
    errorEl.innerText = "";
}

function saveTaskToLocalStorage(taskTitle, taskDescription) {
    const tasks = getTasksFromLocalStorage();
    tasks.push({ taskTitle, taskDescription });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    const tasksString = localStorage.getItem("tasks");
    return tasksString ? JSON.parse(tasksString) : [];
}

function updateTaskInLocalStorage(taskIndex, updatedTask) {
    const tasks = getTasksFromLocalStorage();
    tasks[taskIndex] = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTaskFromLocalStorage(taskIndex) {
    const tasks = getTasksFromLocalStorage();
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}