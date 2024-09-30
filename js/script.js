let tasks = [];

const form = document.querySelector(".form_task");
const taskInput = document.querySelector("#taskInput");
const dateInput = document.querySelector("#dateInput");
const taskList = document.querySelector("#taskList");

const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const html = `
            <tr data-id="${task.id}" class="tasks__item">
                <td><p class="${task.completa && "done"}">${task.txt_tarea}</p></td>
                <td><p class="${task.completa && "done"}">${task.date_tarea}</p></td>
                <td><i class="bx bx-check"></i><i class="bx bx-trash"></i></td>
            </tr>
        `;
        taskList.innerHTML += html;
    })
}
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const txt_tarea = (taskInput.value.trim());
    const date_tarea = (dateInput.value);
    console.log(taskInput.value.trim());
    console.log(dateInput.value);
    const task = {
        id: Date.now(),
        txt_tarea: txt_tarea,
        date_tarea: date_tarea,
        completa: false
    };
    
    tasks.push(task);
    console.log(tasks);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    form.reset();

    renderTasks();
})

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("bx-check")){
        const id = event.target.closest("tr").dataset.id;
        const task = tasks.find((task) => task.id == id);
        task.completa = !task.completa;
        console.log(task);

        renderTasks();

        event.target.closest("tr").querySelector("p").classList.toggle("done");

        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    if (event.target.classList.contains("bx-trash")){
        const id = event.target.closest("tr").dataset.id;
        const taskIndex = tasks.findIndex((task) => task.id == id);

        tasks.splice(taskIndex, 1);

        localStorage.setItem("tasks", JSON.stringify(tasks));
        event.target.closest("tr").remove();
    }
}) 

document.addEventListener("DOMContentLoaded", () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();
});
