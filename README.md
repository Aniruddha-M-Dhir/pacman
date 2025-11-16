# 🕹️ Pacman Game Clone

This project is a functional recreation of the classic arcade game, Pacman, built using vanilla **JavaScript** and rendered on an **HTML5 Canvas**.

---

## 🎮 How to Play

The goal is to clear the board by eating all the food pellets while avoiding the four enemy ghosts. Losing all 3 lives results in a Game Over.

* **Controls:** Use the **Arrow Keys** or **WASD** to control Pacman's movement.
* **Scoring:** Eating a food pellet increases your score by 10 points.

---

## 💻 How to Run the Game Locally (Node.js Server)

This project must be run using a local server because it loads assets from the file system.

1.  **Prerequisites:** Ensure you have **Node.js** and **npm** installed.
2.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/Aniruddha-M-Dhir/pacman.git](https://github.com/Aniruddha-M-Dhir/pacman.git)
    cd pacman
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
    *(This installs the required `express` package)*.
4.  **Start the Server:**
    ```bash
    node server.js
    ```
5.  **Access the Game:** Open your web browser and navigate to the local address shown in the terminal. The default is:
    **`http://127.0.0.1:3001/`**.

---
