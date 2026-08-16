const task = [
  {
    id: 1,
    category: "Test Category 1",
    title: "Task 1",
    description: "Description for Task 1",
    preview : "short descr for  1",
    subtasks: [
      { id: 1.1, title: "Subtask 1.1", completed: false },
      { id: 1.2, title: "Subtask 1.2", completed: true },
    ],
    collaborators: [
      { id: 1, name: "Collaborator 1", email: "collaborator1@example.com", abbr : "C1"}
    ],
    urgency : "Urgent",
  },

  {
    id: 2,
    category: "User Story",
    title: "Task 2",
    description: "Description for Task 2",
    preview : "short descr for 2",
    subtasks: [
      { id: 2.1, title: "Subtask 2.1", completed: false },
      { id: 2.2, title: "Subtask 2.2", completed: true },
    ],
    collaborators: [
      { id: 2, name: "Collaborator 2", email: "collaborator2@example.com", abbr : "C2" }
    ],
    urgency : "Medium",
  },

];


const tasks = {
    to_do: [],
    in_progress: [],
    await_feedback: [],
    done: [],
}

const toDoContainerRef = document.getElementById('to_do');
const inProgressContainerRef = document.getElementById('in_progress');
const awaitFeedbackContainerRef = document.getElementById('await_feedback');
const doneContainerRef = document.getElementById('done');

function displayTasks() {
    html = "";
    task.forEach(task => {
        html += returnTaskHTML(task)
    });
    toDoContainerRef.innerHTML += html;
}

function returnTaskHTML(task) { // takes full object
    return `
        <section>
            <h3>${task.category}</h3>
            <h4>${task.title}</h4>
            <p>${task.preview}</p>
            <div>
                <span>${task.subtasks[0].title}</span>
                <span>${task.subtasks[1].title}</span>
            </div>
            <div>
                <div>
                    <div>${task.collaborators[0].name}</div>
                    <div>MG</div>
                    <div>SO</div>
                </div>
                <div>${task.urgency}</div>
            </div>

        </section>
    `
}