import { getCV, setLightMode } from "./custom-comands.js";
import { draggable } from "../draggable.js";

const Terminal = (commands) => {
  const navigateur = document.querySelector('.navigateur');
  const contact = document.querySelector('.contact-wrapper');

  let commandsList = [];
  const customCommands = ["clear", "dark", "light", "cv"];
  const hiddenCommands = [];
  let commandsHistory = [];
  let historyMode = false;
  let historyIndex = -1;
  const terminalBanner = document.querySelector(".terminal-banner");
  const terminalBody = document.querySelector(".terminal-body");
  const terminalIcon = document.querySelector(".li-terminal");
  const terminalEl = document.querySelector(".terminal");
  const terminalCommands = document.querySelector("#terminal");
  const menuTerminal = document.querySelector('.menu-terminal');

  if(terminalEl.classList.contains('open')) {
    terminalIcon.classList.add('li-active');
  }

  // draggable
  if (window.innerWidth > 1024) {
    draggable(terminalEl, ".terminal-header");
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      draggable(terminalEl, ".terminal-header");
    }
  });

  commands.forEach((c) => {
    commandsList.push(c.command);
  });

  commandsList = commandsList.concat(customCommands);

  // default line
  addNewLine();

  // returns the HTML of the response for a given command
  function getDomForCommand(command) {
    const commandObj = commands.find((el) => el.command === command);
    let html = "";
    if (commandObj === undefined) {
      html = `Commande introuvable : '${
        command.split(" ")[0]
      }'. Digite <code>help</code> para exibir a lista de comandos disponíveis.`;
    } else {
      if (commandObj.responseType === "list" && Array.isArray(commandObj.value)) {
        html = "<ul>";
        html += commandObj.value.map((s) => `<li>${s}</li>`).join("");
        html += "</ul>";
      } else if (commandObj.responseType === "text") {
        html = commandObj.value;
      } else if (commandObj.responseType === "table") {
        const headers = commandObj.headers;
        const rows = commandObj.rows;
        const thsHtml = headers.map((h) => `<th>${h}</th>`).join("");
        const tdsHtml = rows
          .map((r) => `<tr>${r.map((rtd) => `<td>${rtd}</td>`).join("")}</tr>`)
          .join("");
        html = `<table><thead><tr>${thsHtml}</tr></thead><tbody>${tdsHtml}</tbody></table>`;
      } else if (commandObj.responseType === "code") {
        html = `<pre>${commandObj.value.join("\n")}</pre>`;
      } else if (commandObj.responseType === "text") {
        html = `<p>${commandObj.value.join("\n")}</p>`;
      } else if (commandObj.responseType === "link") {
        html = `<p>Vous allez être redirigé vers mon ${command.split(" ")[0]}.</p>`;
        const a = document.createElement("a");
        a.href = commandObj.value.join("\n");
        a.setAttribute("target", "blank");
        a.click();
      }
    }
    return html;
  }

  // add a new command input line and disables the previous one
  function addNewLine(previousUid = null) {
    const uid = Math.random().toString(36).replace("0.", "");
    // terminal line
    const terminalLineEl = document.createElement("div");
    terminalLineEl.classList.add("terminal-line");

    // terminal response
    const terminalResponseEl = document.createElement("div");
    terminalResponseEl.classList.add("terminal-response");
    terminalResponseEl.id = `response-${uid}`;

    // input text
    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.id = `input-${uid}`;
    inputEl.autocapitalize = "off";
    inputEl.dataset.uid = uid;
    inputEl.addEventListener("keydown", onCommandInput);

    terminalLineEl.appendChild(inputEl);
    if (previousUid) {
      const previousInputEl = document.getElementById(previousUid);
      if (previousInputEl) {
        previousInputEl.setAttribute("disabled", "true");
        previousInputEl.removeEventListener("keydown", onCommandInput);
      }
    }
    document.getElementById("terminal").appendChild(terminalLineEl);
    document.getElementById("terminal").appendChild(terminalResponseEl);

    inputEl.focus();
  }

  // keydown on command input
  function onCommandInput(e) {
    const commandValue = e.target.value.trim().toLowerCase();
    if (e.keyCode === 13) {
      // ENTER
      if (commandValue !== "") {
        historyMode = false;
        const idResponse = `response-${e.target.dataset.uid}`;
        const responseEl = document.getElementById(idResponse);
        let html;
        if (
          hiddenCommands.includes(commandValue) ||
          customCommands.includes(commandValue)
        ) {
          html = handleCustomCommands(commandValue);
        } else {
          html = getDomForCommand(commandValue);
        }
        if (responseEl) {
          responseEl.innerHTML = html;
          commandsHistory.push(commandValue);
          addNewLine(e.target.id);
        }
      }
    } else if (e.keyCode === 9) {
      // TAB
      e.preventDefault();
      if (commandValue === "") {
        this.value = "help";
      } else {
        const matchingCommand = commandsList.find((c) =>
          c.startsWith(commandValue)
        );
        if (matchingCommand) {
          this.value = matchingCommand;
        }
      }
      historyMode = false;
    } else if (e.keyCode === 38 || e.keyCode === 40) {
      // UP / DOWN
      // Gestion de l'historique
      if (commandsHistory.length > 0) {
        if (historyMode === false) {
          historyIndex = commandsHistory.length - 1;
        } else {
          if (e.keyCode === 38 && historyIndex !== 0) {
            // UP
            historyIndex--;
          } else if (
            e.keyCode === 40 &&
            historyIndex !== commandsHistory.length - 1
          ) {
            historyIndex++;
          }
        }
        this.value = commandsHistory[historyIndex];
      }
      historyMode = true;
    }
  }

  // hidden commands
  function handleCustomCommands(command) {
    switch (command) {
      case "light":
        if (document.body.classList.contains("light-mode"))
          return "Você já está no modo claro.";
        setLightMode(true);
        return "Agora você está no modo claro.";
      case "dark":
        if (!document.body.classList.contains("light-mode"))
          return "Você já está no modo escuro";
        setLightMode(false);
        return "Agora você está no modo escuro.";
      // case "cv":
      //   getCV();
      //   return "O currículo será carregado.";
      case "clear":
        resetTerminal();
        return;
    }
  }

  function toIndexTop() {
    const zIndex = parseInt(window.getComputedStyle(terminalEl)['zIndex']);
    const navZIndex = parseInt(window.getComputedStyle(navigateur)['zIndex']);
    const contactZIndex = parseInt(window.getComputedStyle(contact)['zIndex']);

    const compareZIndex = navZIndex >= contactZIndex ? navZIndex : contactZIndex;

    if(compareZIndex >= zIndex) {
      const newZIndex = compareZIndex + 1;
      terminalEl.style.zIndex = `${newZIndex}`;
    }
  }

  function openTerminal() {
    terminalEl.classList.add('open');
    terminalIcon.classList.add('li-active');
    toIndexTop();
  }

  function resetHistory() {
    commandsHistory = [];
  }

  function resetTerminal() {
    terminalCommands.innerHTML = '';
  }

  terminalEl.addEventListener('click', () => {
    toIndexTop();
  });

  terminalEl.querySelector(".close").addEventListener("click", function (e) {
    terminalEl.classList.remove('open');
    terminalIcon.classList.remove('li-active');
    resetTerminal();
    resetHistory();
    addNewLine();
  });

  terminalEl.querySelector(".minimize").addEventListener("click", function (e) {
    terminalEl.classList.remove('open');
  });

  terminalEl.querySelector(".maximize").addEventListener("click", function (e) {
    if(terminalEl.classList.contains("full-screen")) {
      terminalEl.classList.remove("full-screen");
    } else {
      terminalEl.classList.add("full-screen");
    }
  });

  terminalIcon.addEventListener("click", function (e) {
    openTerminal();
  });

  menuTerminal.addEventListener("click", function (e) {
    openTerminal();
  });
}

export default Terminal;
