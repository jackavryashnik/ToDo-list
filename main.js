const form = document.querySelector(".creating-form");
const input = document.querySelector(".creating-form__input");
const description = document.querySelector(".creating-form__description");
const listEl = document.querySelector(".task-list__tasks");
const errorEl = document.querySelector(".error");

window.addEventListener("load", () => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!isFormValid()) {
            showValdationError();
        } else {
            hideValidationError();
            const task = input.value;
            const taskDescription = description.value;

            const taskEl = document.createElement("div");
            addClasses(taskEl, ["task", "task-grid-container"]);

            const taskInputEl = createTaskName(task);
            const taskDescriptionEl = createTaskDescription(taskDescription);

            addChildrenToParent(taskEl, [taskInputEl, taskDescriptionEl]);

            const taskActionsEl = document.createElement("div");
            addClasses(taskActionsEl, ["task__actions-item", "actions"]);

            const taskEditEl = document.createElement("button");
            addClasses(taskEditEl, ["edit"]);
            setText(taskEditEl, "Edit");

            const taskDeleteEl = document.createElement("button");
            addClasses(taskDeleteEl, ["delete"]);
            setText(taskDeleteEl, "Delete");

            taskActionsEl.appendChild(taskEditEl);
            taskActionsEl.appendChild(taskDeleteEl);

            taskEl.appendChild(taskActionsEl);

            const taskDate = document.createElement("p");
            taskDate.innerText = new Date().toLocaleDateString();
            addClasses(taskDate, ["task__date-item"]);
            taskEl.appendChild(taskDate);

            listEl.appendChild(taskEl);

            input.value = "";
            description.value = "";

            addListenersToTaskEl(
                taskEl,
                taskInputEl,
                taskDescriptionEl,
                taskEditEl
            );
        }
    });
});

function addClasses(el, arrOfClasses) {
    for (const item of arrOfClasses) {
        el.classList.add(item);
    }
}

function setText(el, text) {
    el.textContent = text;
}

function setAttr(el) {
    el.setAttribute("readonly", "readonly");
}

function removeAttr(el) {
    el.removeAttribute("readonly");
}

function isFormValid() {
    return !(!input.value.trim() || !description.value.trim());
}

function createTaskName(task) {
    const taskName = document.createElement("input");
    taskName.type = "text";
    taskName.value = task;
    addClasses(taskName, ["text", "task__title-item"]);
    setAttr(taskName);
    return taskName;
}

function createTaskDescription(description) {
    const taskDescription = document.createElement("textarea");
    taskDescription.value = description;
    addClasses(taskDescription, ["task__description-item"]);
    setAttr(taskDescription);
    return taskDescription;
}

function addChildrenToParent(parent, children) {
    parent.append(...children);
}

function showValdationError() {
    const messages = [];
    if (input.value === "" || input.value === null) {
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

function addListenersToTaskEl(
    taskEl,
    taskInputEl,
    taskDescriptionEl,
    taskEditEl
) {
    taskEditEl.addEventListener("click", () => {
        if (taskEditEl.innerText.toLowerCase() == "edit") {
            removeAttr(taskInputEl);
            removeAttr(taskDescriptionEl);
            setText(taskEditEl, "Save");
            taskDescriptionEl.focus();
        } else {
            if (
                !isTaskInputEmpty(taskInputEl) &&
                !isTaskInputEmpty(taskDescriptionEl)
            ) {
                setAttr(taskInputEl);
                setAttr(taskDescriptionEl);
                setText(taskEditEl, "Edit");
                hideEditingError();
            } else {
                showEditingError(taskInputEl, taskDescriptionEl);
            }
        }
    });

    const taskDeleteEl = taskEl.querySelector(".delete");
    taskDeleteEl.addEventListener("click", () => {
        listEl.removeChild(taskEl);
    });
}

function isTaskInputEmpty(el) {
    return el.value.trim() === "";
}

function showEditingError(inputEl, descriptionEl) {
    const taskEl = inputEl.closest(".task-list__tasks");
    console.log(taskEl)

    if (!taskEl.querySelector(".task-list__error")) {
        const errorEl = document.createElement("div");
        addClasses(errorEl, ["task-list__error"]);
        setText(errorEl, "Fields cannot be empty!");
        taskEl.insertBefore(errorEl, taskEl.querySelector(".task-list__tasks"));
    }

    if (!inputEl.value) inputEl.focus();
    if (!descriptionEl.value) descriptionEl.focus();
}

function hideEditingError() {
    const errorEl = listEl.querySelector(".task-list__error");
    if (errorEl) {
        listEl.removeChild(errorEl);
    }
}