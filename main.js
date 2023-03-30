window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const description = document.querySelector("#new-task-description");
    const list_el = document.querySelector("#tasks");

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const task = input.value;
        const taskDescription = description.value;

        if (!task) {
            alert("Please fill out the task");
            return;
        }

        const task_el = document.createElement("div");
        task_el.classList.add("task");
        task_el.classList.add("task-grid-container");

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.classList.add("task-title-item");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_el.appendChild(task_input_el);

        const task_descroption_el = document.createElement("input");
        task_descroption_el.classList.add("task-description-item");
        task_descroption_el.value = taskDescription;
        task_descroption_el.setAttribute("readonly", "readonly");

        task_el.appendChild(task_descroption_el);

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("task-actions-item");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        const taskDate = document.createElement("p");
        taskDate.innerText = new Date().toLocaleDateString();
        taskDate.classList.add("task-date-item");
        task_el.appendChild(taskDate);

        list_el.appendChild(task_el);

        input.value = "";
        description.value = "";

        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_input_el.removeAttribute("readonly")
                task_descroption_el.removeAttribute("readonly")
                task_descroption_el.focus();
                task_edit_el.innerText = "Save";
            } else {
                task_input_el.setAttribute("readonly", "readonly");
                task_descroption_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
        });
    });
});