let btn = document.getElementById("main");
let input = document.getElementById("input");
let lessonDiv = document.getElementById("lesson");
let terminal = document.getElementById("terminal");

let currentStep = 0;
let userCommitMessages = [];
let userFileContents = {};

let lessons = [
  {
    instruction:
      "Welcome to Git Learn! Let's start with the basics. Type <code>git --version</code> to check your Git version.",
    expectedInput: "git --version",
    response: "git version 2.30.1",
  },
  {
    instruction:
      "Now, let's create a new repository. A repository is like a project folder that Git tracks. Type <code>git init</code> to initialize a new Git repository in your current directory.",
    expectedInput: "git init",
    response: "Initialized empty Git repository in /home/user/project/.git/",
  },
  {
    instruction:
      "Let's check the status of our repository. The status shows which files have changed. Type <code>git status</code> to see the current state of your working directory and staging area.",
    expectedInput: "git status",
    response: `On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)`,
  },
  {
    instruction:
      'Great! Now let\'s create a new file. Type <code>echo "Hello, World!" > README.md</code>.',
    expectedInput: /^echo ".*" > README\.md$/,
    response: (input) => {
      const content = input.match(/"(.*)"/)[1];
      userFileContents["README.md"] = content + "\n";
      return "";
    },
  },
  {
    instruction:
      "Now that we've created a file, let's check the status again. Type <code>git status</code>.",
    expectedInput: "git status",
    response: `On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md

nothing added to commit but untracked files present (use "git add" to track)`,
  },
  {
    instruction:
      "Let's add the README file to the staging area. The staging area is where we put files we want to commit. Type <code>git add README.md</code>.",
    expectedInput: "git add README.md",
    response: "",
  },
  {
    instruction:
      "Check the status again to see the changes. Type <code>git status</code>.",
    expectedInput: "git status",
    response: `On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md`,
  },
  {
    instruction:
      'Now, let\'s commit our changes. A commit is like saving a snapshot of your project. Type <code>git commit -m "added README" </code>.',
    expectedInput: /^git commit -m ".*"$/,
    response: (input) => {
      const message = input.match(/"(.*)"/)[1];
      userCommitMessages.push(message);
      return `[master (root-commit) f7fde4a] ${message}
 1 file changed, 1 insertion(+)
 create mode 100644 README.md`;
    },
  },
  {
    instruction:
      'Let\'s modify our README file. Type <code>echo "Hello, World (again)" >> README.md</code>.',
    expectedInput: /^echo ".*" >> README\.md$/,
    response: (input) => {
      const content = input.match(/"(.*)"/)[1];
      userFileContents["README.md"] += content + "\n";
      return "";
    },
  },
  {
    instruction:
      "Check the status to see the changes. Type <code>git status</code>.",
    expectedInput: "git status",
    response: `On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")`,
  },
  {
    instruction:
      "Let's see the differences in our file. Git diff shows the changes you've made. Type <code>git diff README.md</code>.",
    expectedInput: "git diff README.md",
    response: () => {
      const lines = userFileContents["README.md"].split("\n");
      return `diff --git a/README.md b/README.md
index 670a245..a371801 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,${lines.length} @@
-${lines[0]}
+${lines.join("\n+")}`;
    },
  },
  {
    instruction:
      "Now, let's stage and commit these changes. First, add the file with <code>git add README.md</code>.",
    expectedInput: "git add README.md",
    response: "",
  },
  {
    instruction:
      'Commit the changes with a message. Type <code>git commit -m "changed README" </code>.',
    expectedInput: /^git commit -m ".*"$/,
    response: (input) => {
      const message = input.match(/"(.*)"/)[1];
      userCommitMessages.push(message);
      return `[master 5d60f2a] ${message}
1 file changed, 1 insertion(+)`;
    },
  },
  {
    instruction: "Let's view the commit history. Type <code>git log</code>.",
    expectedInput: "git log",
    response: () => {
      let log = "";
      for (let i = userCommitMessages.length - 1; i >= 0; i--) {
        log += `commit ${Math.random()
          .toString(16)
          .substr(2, 40)} (HEAD -> master)
Author: Your Name <your.email@example.com>
Date:   ${new Date().toUTCString()}

    ${userCommitMessages[i]}

`;
      }
      return log.trim();
    },
  },
  {
    instruction:
      "Let's create a new branch. A branch is like a separate line of development. It allows you to work on different features without affecting the main codebase. Type <code>git branch feature</code>.",
    expectedInput: "git branch feature",
    response: "",
  },
  {
    instruction:
      "Now, let's switch to the new branch. This means we'll be working in the 'feature' branch now. Type <code>git checkout feature</code>.",
    expectedInput: "git checkout feature",
    response: "Switched to branch 'feature'",
  },
  {
    instruction:
      'Make a change in the feature branch. This change won\'t affect our main (master) branch. Type <code>echo "Hello, World!" >> README.md</code>.',
    expectedInput: /^echo ".*" >> README\.md$/,
    response: (input) => {
      const content = input.match(/"(.*)"/)[1];
      userFileContents["README.md"] += content + "\n";
      return "";
    },
  },
  {
    instruction:
      'Stage and commit the change in the feature branch. Type <code>git add README.md && git commit -m "Added to README in feature branch" </code>',
    expectedInput: /^git add README\.md && git commit -m ".*"$/,
    response: (input) => {
      const message = input.match(/"(.*)"/)[1];
      userCommitMessages.push(message);
      return `[feature 7d8f3b9] ${message}
 1 file changed, 1 insertion(+)`;
    },
  },
  {
    instruction:
      "Switch back to the master branch. This will take us back to our main line of development. Type <code>git checkout master</code>.",
    expectedInput: "git checkout master",
    response: "Switched to branch 'master'",
  },
  {
    instruction:
      "Now, let's merge the feature branch. Merging combines the changes from one branch into another. Type <code>git merge feature</code>.",
    expectedInput: "git merge feature",
    response: `Updating 5d60f2a..7d8f3b9
Fast-forward
 README.md | 1 +
 1 file changed, 1 insertion(+)`,
  },
];
function formatForHtml(text) {
  return text
    .replace(/\n/g, "<br>")
    .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
    .replace(/ {2}/g, "&nbsp;&nbsp;");
}

function updateLesson() {
  lessonDiv.innerHTML = lessons[currentStep].instruction;
}

function updateTerminal(input, isCommand = true) {
  if (isCommand) {
    terminal.innerHTML += `$ ${input}<br>`;
  } else {
    terminal.innerHTML += formatForHtml(input) + "<br>";
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

    let currentLesson = lessons[currentStep];
    let isInputValid =
      typeof currentLesson.expectedInput === "string"
        ? userInput === currentLesson.expectedInput
        : currentLesson.expectedInput.test(userInput);

    if (isInputValid) {
      let response =
        typeof currentLesson.response === "function"
          ? currentLesson.response(userInput)
          : currentLesson.response;

      if (response) {
        updateTerminal(response, false);
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
        `git: '${userInput}' is not a git command. See <code>git --help'.`,
        false
      );
    }

    input.value = "";
  }
});

// Initialize the app
btn.textContent = "Start Learning Git";
document.addEventListener("click", (event) => {
  input.focus();
});
