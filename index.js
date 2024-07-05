let btn = document.getElementById("main");
let input = document.getElementById("input");
let lessonDiv = document.getElementById("lesson");
let terminal = document.getElementById("terminal");

let currentStep = 0;
let lessons = [
  {
    instruction:
      "Welcome to Git Learn! Let's start with the basics. Type 'git --version' to check your Git version.",
    expectedInput: "git --version",
    response: "git version 2.30.1",
  },
  {
    instruction:
      "Now, let's create a new repository. Type 'git init' to initialize a new Git repository in your current directory.",
    expectedInput: "git init",
    response: "Initialized empty Git repository in /home/user/project/.git/",
  },
  {
    instruction:
      "Let's check the status of our repository. Type 'git status' to see the current state of your working directory and staging area.",
    expectedInput: "git status",
    response: `On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)`,
  },
  {
    instruction:
      "Great! Now let's create a new file. Type 'echo \"Hello, Git!\" > README.md' to create a README file.",
    expectedInput: 'echo "Hello, Git!" > README.md',
    response: "", // Echo doesn't produce output unless there's an error
  },
  {
    instruction:
      "Now that we've created a file, let's check the status again. Type 'git status'.",
    expectedInput: "git status",
    response: `On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md

nothing added to commit but untracked files present (use "git add" to track)`,
  },
  // Add more lessons here
];

function updateLesson() {
  lessonDiv.textContent = lessons[currentStep].instruction;
}

function updateTerminal(input, isCommand = true) {
  if (isCommand) {
    terminal.innerHTML += `$ ${input}<br>`;
  } else {
    terminal.innerHTML += `${input}<br>`;
  }
  terminal.scrollTop = terminal.scrollHeight;
}

btn.addEventListener("click", () => {
  btn.style.display = "none";
  updateLesson();
  input.focus();
});

input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    let userInput = input.value.trim();
    updateTerminal(userInput);

    if (userInput === lessons[currentStep].expectedInput) {
      if (lessons[currentStep].response) {
        updateTerminal(lessons[currentStep].response, false);
      }
      currentStep++;

      if (currentStep < lessons.length) {
        updateTerminal("", false); // Add a blank line for readability
        updateLesson();
      } else {
        updateTerminal("", false);
        updateTerminal(
          "Congratulations! You've completed all the lessons.",
          false
        );
        input.disabled = true;
      }
    } else {
      updateTerminal(
        `git: '${userInput}' is not a git command. See 'git --help'.`,
        false
      );
    }

    input.value = "";
  }
});

// Initialize the app
btn.textContent = "Start Learning Git";
