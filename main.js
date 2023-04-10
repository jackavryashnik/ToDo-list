window.addEventListener("load", () => {
    const form = document.querySelector(".main__creating-form");
    const input = document.querySelector(".main__creating-form__input");
    const description = document.querySelector(
        ".main__creating-form__description"
    );
    const listEl = document.querySelector(".main__task-list__tasks");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (validateForm()) {
            const task = input.value;
            const taskDescription = description.value;

            const taskEl = document.createElement("div");
            addClass(taskEl, ["task", "task-grid-container"]);

            const taskInputEl = document.createElement("input");
            addClass(taskInputEl, ["text", "task-title-item"]);
            taskInputEl.type = "text";
            taskInputEl.value = task;
            setAttr(taskInputEl);

            taskEl.appendChild(taskInputEl);

            const taskDescroptionEl = document.createElement("input");
            addClass(taskDescroptionEl, ["task-description-item"]);
            taskDescroptionEl.value = taskDescription;
            setAttr(taskDescroptionEl);

            taskEl.appendChild(taskDescroptionEl);

            const taskActionsEl = document.createElement("div");
            addClass(taskActionsEl, ["task-actions-item", "actions"]);

            const taskEditEl = document.createElement("button");
            addClass(taskEditEl, ["edit"]);
            setText(taskEditEl, "Edit");

            const taskDeleteEl = document.createElement("button");
            addClass(taskDeleteEl, ["delete"]);
            setText(taskDeleteEl, "Delete");

            taskActionsEl.appendChild(taskEditEl);
            taskActionsEl.appendChild(taskDeleteEl);

            taskEl.appendChild(taskActionsEl);

            const taskDate = document.createElement("p");
            taskDate.innerText = new Date().toLocaleDateString();
            addClass(taskDate, ["task-date-item"]);
            taskEl.appendChild(taskDate);

            listEl.appendChild(taskEl);

            input.value = "";
            description.value = "";

            taskEditEl.addEventListener("click", () => {
                if (taskEditEl.innerText.toLowerCase() == "edit") {
                    removeAttr(taskInputEl);
                    removeAttr(taskDescroptionEl);
                    setText(taskEditEl, "Save");
                    taskDescroptionEl.focus();
                } else {
                    setAttr(taskInputEl);
                    setAttr(taskDescroptionEl);
                    setText(taskEditEl, "Edit");
                }
            });

            taskDeleteEl.addEventListener("click", () => {
                listEl.removeChild(taskEl);
            });
        }
    });
});

function addClass(el, arrOfClasses) {
    for (const item of arrOfClasses) {
        el.classList.add(item);
    }
};

function setText(el, text) {
    el.innerHTML = text;
};

function setAttr(el) {
    el.setAttribute("readonly", "readonly");
};

function removeAttr(el) {
    el.removeAttribute("readonly");
};

function validateForm() {
    const taskInput = document.querySelector(".main__creating-form__input");
    const taskDescription = document.querySelector(
        ".main__creating-form__description"
    );

    return !(!taskInput.value.trim() || !taskDescription.value.trim());
};
