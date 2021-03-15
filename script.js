let taskList = document.querySelector('.task-list')
let form = document.querySelector('.add-form')
let taskDesc = document.querySelector('.task-description')
let taskAssign = document.querySelector('.task-assign')
let taskPriority = document.querySelector('.task-priority')
let taskForm = document.querySelector('.task-form')
form.addEventListener('submit', (e) => saveTasks(e))


function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || []
}

function saveTasks(event) {
    event.preventDefault()
    let tasks = getTasks()
    let newTasks = {
        id: +new Date(),
        description: taskDesc.value,
        isOpen: true,
        assignedPerson: taskAssign.value,
        status: taskPriority.value
    }
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTasks]))
    taskForm.reset()
    view()
}

function view() {
//     let tasks = [{
//         id: 'ytre-43453-ytre-5433-gddsfv',
//         description: 'Закончить верстку проекта',
//         isOpen: true,
//         assignedPerson: 'Медет Артыков',
//         status: 'Срочно'
//     }]
    taskList.innerHTML = ''
    let tasks = getTasks()
    tasks.forEach(task => {
        taskList.innerHTML += `<div class="bg-info p-3 mb-3">
                    <h6>Номер задачи: ${task.id}</h6>
                    <span class="badge">${task.isOpen ? 'Открыто' : 'Закрыто'}</span>
                    <h3 class="my-4">${task.description}</h3>
                    <div class="status">
                    <i class="far fa-clock"></i>
                        <span class="text-danger">${task.status}</span>
                    </div>
                    <div class="assign mb-3"><i class="fas fa-user-circle"></i>
                        <span>${task.assignedPerson}</span>
                    </div>
                    <button type="button" class="btn btn-success">Закрыть</button>
                    <button type="button" class="btn btn-danger deleteBtn">Удалить</button>
                </div>`
    })


    document.querySelectorAll('.btn-success').forEach((btn, btnIdx) => {
        let tasks = getTasks()
        btn.addEventListener('click', () => {
            tasks.map((task, taskIdx) => {
                if (taskIdx === btnIdx) {
                    task.isOpen = !task.isOpen
                    localStorage.setItem('tasks', JSON.stringify(tasks))
                    view()
                }
            })
        })
    })

    document.querySelectorAll('.deleteBtn').forEach((button, idx) => {
        let tasks = getTasks()
        button.addEventListener('click', () => {
            tasks.splice(idx, 1)
            localStorage.setItem('tasks', JSON.stringify(tasks))
            view()
        })
    })
}

view()



