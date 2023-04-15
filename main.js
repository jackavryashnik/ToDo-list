window.addEventListener("load", () => {
    const form = document.querySelector(".creating-form");
    const input = document.querySelector(".creating-form__input");
    const description = document.querySelector(".creating-form__description");
    const listEl = document.querySelector(".task-list__tasks");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (isFormValid()) {
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

            taskEditEl.addEventListener("click", () => {
                if (taskEditEl.innerText.toLowerCase() == "edit") {
                    removeAttr(taskInputEl);
                    removeAttr(taskDescriptionEl);
                    setText(taskEditEl, "Save");
                    taskDescriptionEl.focus();
                } else {
                    setAttr(taskInputEl);
                    setAttr(taskDescriptionEl);
                    setText(taskEditEl, "Edit");
                }
            });

            taskDeleteEl.addEventListener("click", () => {
                listEl.removeChild(taskEl);
            });
        }
    });
});

function addClasses(el, arrOfClasses) {
    for (const item of arrOfClasses) {
        el.classList.add(item);
    }
};

function setText(el, text) {
    el.textContent = text;
};

function setAttr(el) {
    el.setAttribute("readonly", "readonly");
};

function removeAttr(el) {
    el.removeAttribute("readonly");
};

function isFormValid() {
    const taskInput = document.querySelector(".creating-form__input");
    const taskDescription = document.querySelector(
        ".creating-form__description"
    );

    return !(!taskInput.value.trim() || !taskDescription.value.trim());
};

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
};

function addChildrenToParent(parent, children) {
    parent.append(...children);
};