"use strict";

(function () {
  let game_mode = "normal";
  let human_score = 0;
  let computer_score = 0;
  document
    .querySelector("[data-game-mode]")
    .addEventListener("click", handleSwichGameMode);

  function handleSwichGameMode(e) {
    const action = e.target.closest("[data-mode-button]")?.dataset.modeButton;
    if (!action) return;
    const checked_button = e.target;
    const last_checked_button =
      checked_button.parentNode.querySelector(".checked-button");
    if (checked_button === last_checked_button) return;
    swichGameModeButtonStyle(checked_button, last_checked_button);
    swichGameMode(action);
  }

  function swichGameModeButtonStyle(checked_button, last_checked_button) {
    last_checked_button.className = "";
    checked_button.className = "checked-button";
  }

  function swichGameMode(action) {
    switch (action) {
      case "normal":
        swichToNormalGameMode();
        break;
      case "lizard-spock":
        swichToLizardSpockGameMode();
        break;
      default:
        throw new Error(`The action "${action}" is not implemented.`);
    }
  }

  function swichToNormalGameMode() {
    document.querySelector("[data-chosse-button='lizard']").className =
      "hidden";
    document.querySelector("[data-chosse-button='spock']").className = "hidden";
    game_mode = "normal";
  }

  function swichToLizardSpockGameMode() {
    document.querySelector("[data-chosse-button='lizard']").className = "";
    document.querySelector("[data-chosse-button='spock']").className = "";
    game_mode = "lizard-spock";
  }

  document
    .querySelector("[data-game-buttons]")
    .addEventListener("click", handleChoose);

  function handleChoose(e) {
    const human_choose = e.target.closest("[data-chosse-button]")?.dataset
      .chosseButton;
    if (!human_choose) return;
    const computer_choose = getComputerChoose();
    const result = getResult(human_choose, computer_choose);

    updateScore(result);
    displayScore();
    displayResult(result, human_choose, computer_choose);
  }

  function getComputerChoose() {
    let maxim_number;
    switch (game_mode) {
      case "normal":
        maxim_number = 3;
        break;
      case "lizard-spock":
        maxim_number = 5;
        break;
      default:
        throw new Error(`The game mode "${game_mode}" don't exist.`);
    }
    const computer_choose = Math.floor(Math.random() * maxim_number) + 1;
    switch (computer_choose) {
      case 1:
        return "rock";
      case 2:
        return "scissors";
      case 3:
        return "paper";
      case 4:
        return "lizard";
      case 5:
        return "spock";
      default:
        throw new Error(`Computer Eror!`);
    }
  }

  function getResult(human_choose, computer_choose) {
    if (human_choose === computer_choose) return "draw";
    switch (human_choose) {
      case "rock":
        return computer_choose === "scissors" || computer_choose === "lizard"
          ? "win"
          : "lose";
      case "scissors":
        return computer_choose === "paper" || computer_choose === "lizard"
          ? "win"
          : "lose";
      case "paper":
        return computer_choose === "rock" || computer_choose === "spock"
          ? "win"
          : "lose";
      case "lizard":
        return computer_choose === "spock" || computer_choose === "paper"
          ? "win"
          : "lose";
      case "spock":
        return computer_choose === "rock" || computer_choose === "scissors"
          ? "win"
          : "lose";
      default:
        throw new Error(`Wrong human choose: ${human_choose}!`);
    }
  }

  function updateScore(result) {
    switch (result) {
      case "win":
        human_score++;
        break;
      case "lose":
        computer_score++;
        break;
      case "draw":
        break;
      default:
        throw new Error(`Wrong result: ${result}!`);
    }
  }

  function displayScore() {
    document.querySelector("[data-score-human]").textContent = human_score;
    document.querySelector("[data-score-computer]").textContent =
      computer_score;
  }

  function displayResult(result, human_choose, computer_choose) {
    const output_section = document.querySelector("[data-output-section]");
    const win_output = output_section.querySelector("[data-output-win]");
    const message_output = output_section.querySelector("[data-output-mesage]");
    const your_chose_output = output_section.querySelector(
      "[data-output-your-choose]"
    );
    const computer_choose_output = output_section.querySelector(
      "[data-output-computer-choose]"
    );
    output_section.className = "output-section";
    computer_choose_output.className = `fa-solid fa-hand-${computer_choose} ${computer_choose}-computer`;
    your_chose_output.className = `fa-solid fa-hand-${human_choose} human-choose ${human_choose}-human`;

    win_output.textContent = getWinText(result);
    message_output.textContent = getMessage(human_choose, computer_choose);
  }

  function getMessage(human_choose, computer_choose) {
    const result = human_choose + "-" + computer_choose;
    switch (result) {
      case "rock-scissors":
      case "scissors-rock":
        return "Rock crushes Scissors!";
      case "rock-paper":
      case "paper-rock":
        return "Paper covers Rock!";
      case "scissors-paper":
      case "paper-scissors":
        return "Scissors cuts Paper!";
      case "rock-lizard":
      case "lizard-rock":
        return "Rock crushes Lizard!";
      case "lizard-spock":
      case "spock-lizard":
        return "Lizard poisons Spock!";
      case "scissors-spock":
      case "spock-scissors":
        return "Spock smashes Scissors!";
      case "scissors-lizard":
      case "lizard-scissors":
        return "Scissors decapitates Lizard!";
      case "paper-lizard":
      case "lizard-paper":
        return "Lizard eats Paper!";
      case "paper-spock":
      case "spock-paper":
        return "Paper disproves Spock!";
      case "rock-spock":
      case "spock-rock":
        return "Spock vaporizes Rock!";
      default:
        return "Same chooses nothing special!";
    }
  }
  function getWinText(result) {
    switch (result) {
      case "win":
        return "You Win!";
      case "lose":
        return "You Lose!";
      case "draw":
        return "Is a Draw!";
      default:
        throw new Error(`Wrong result: ${result}!`);
    }
  }
  displayScore();
})();
