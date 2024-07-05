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
  {
    instruction:
      "Let's add the README file to the staging area. Type 'git add README.md'.",
    expectedInput: "git add README.md",
    response: "", // git add doesn't produce output unless there's an error
  },
  {
    instruction:
      "Check the status again to see the changes. Type 'git status'.",
    expectedInput: "git status",
    response: `On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md`,
  },
  {
    instruction:
      "Now, let's commit our changes. Type 'git commit -m \"Initial commit\"'.",
    expectedInput: 'git commit -m "Initial commit"',
    response: `[master (root-commit) f7fde4a] Initial commit
 1 file changed, 1 insertion(+)
 create mode 100644 README.md`,
  },
  {
    instruction:
      "Let's modify our README file. Type 'echo \"Git is awesome!\" >> README.md'.",
    expectedInput: 'echo "Git is awesome!" >> README.md',
    response: "", // Echo doesn't produce output unless there's an error
  },
  {
    instruction: "Check the status to see the changes. Type 'git status'.",
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
      "Let's see the differences in our file. Type 'git diff README.md'.",
    expectedInput: "git diff README.md",
    response: `diff --git a/README.md b/README.md
index 670a245..a371801 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,2 @@
 Hello, Git!
+Git is awesome!`,
  },
  {
    instruction:
      "Now, let's stage and commit these changes. First, add the file with 'git add README.md'.",
    expectedInput: "git add README.md",
    response: "", // git add doesn't produce output unless there's an error
  },
  {
    instruction:
      "Commit the changes with a message. Type 'git commit -m \"Update README\"'.",
    expectedInput: 'git commit -m "Update README"',
    response: `[master 5d60f2a] Update README
 1 file changed, 1 insertion(+)`,
  },
  {
    instruction: "Let's view the commit history. Type 'git log'.",
    expectedInput: "git log",
    response: `commit 5d60f2a9a0e96d6f4c2f87df4a1a9e16d1dfcce0 (HEAD -> master)
Author: Your Name <your.email@example.com>
Date:   Fri Jul 5 12:00:00 2024 +0000

    Update README

commit f7fde4a54fd60157bcd369b61d6870972b2f330f
Author: Your Name <your.email@example.com>
Date:   Fri Jul 5 11:30:00 2024 +0000

    Initial commit`,
  },
  {
    instruction: "Let's create a new branch. Type 'git branch feature'.",
    expectedInput: "git branch feature",
    response: "", // git branch doesn't produce output unless there's an error
  },
  {
    instruction:
      "Now, let's switch to the new branch. Type 'git checkout feature'.",
    expectedInput: "git checkout feature",
    response: "Switched to branch 'feature'",
  },
  {
    instruction:
      "Make a change in the feature branch. Type 'echo \"This is a new feature.\" >> README.md'.",
    expectedInput: 'echo "This is a new feature." >> README.md',
    response: "", // Echo doesn't produce output unless there's an error
  },
  {
    instruction:
      "Stage and commit the change. Type 'git add README.md && git commit -m \"Add feature\"'.",
    expectedInput: 'git add README.md && git commit -m "Add feature"',
    response: `[feature 7d8f3b9] Add feature
 1 file changed, 1 insertion(+)`,
  },
  {
    instruction:
      "Switch back to the master branch. Type 'git checkout master'.",
    expectedInput: "git checkout master",
    response: "Switched to branch 'master'",
  },
  {
    instruction:
      "Now, let's merge the feature branch. Type 'git merge feature'.",
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
  lessonDiv.textContent = lessons[currentStep].instruction;
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
