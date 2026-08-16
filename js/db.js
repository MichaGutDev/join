const users = [
  {
    id: 1,
    name: "User 1",
    surname: "Surname 1",
    email: "user1@example.com"
  },
  {
    id: 2,
    name: "User 2",
    surname: "Surname 1",
    email: "user2@example.com"
  },
  {
    id: 3,
    name: "User 3",
    surname: "Surname 1",
    email: "user3@example.com"
  }
];

const tasks = [
  {
    id: 1,
    category: "Category 1",
    title: "Task 1",
    description: "Description for Task 1",
    preview : "short Description for Task 1",
    subtasks: [
      { id: 1.1, title: "Subtask 1.1", completed: false },
      { id: 1.2, title: "Subtask 1.2", completed: true },
    ],
    collaborators: [
      { id: 1, name: "Collaborator 1", email: "collaborator1@example.com" }
    ],
  }
];