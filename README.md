# College Hoops 2K8 DRAM System Assistant

An advanced tool for editing player tendencies in College Hoops 2K8, based on the Dynamic Role & Attribute Modeling (DRAM) system. This application helps you create more realistic player behavior by calculating key offensive tendencies based on a player's attributes, their role in the offense, and the team's overall tempo.

## ✨ Features

-   📊 **Dynamic Tendency Calculation:** Automatically calculates four key offensive tendencies: Close Shot, Mid-Range Shot, Three-Point Shot, and Drive the Lane.
-   📝 **Full Roster Management:** Create, edit, and manage a full team roster. Player data is stored in your browser session.
-   🧠 **Smart Role Suggestions:** The app calculates an "Offensive Talent Score" (OTS) for each player to suggest optimal offensive roles (1st Option, 2nd Option, etc.), helping you create a balanced and effective team.
-   💾 **Import/Export Functionality:** Save your entire roster to a JSON file to back it up or share it with others. You can easily import a saved roster to continue your work.
-   🚀 **Team Tempo Modifier:** Adjust the team's playstyle from "Very Slow (Grind it out)" to "Very Fast (Run and Gun)," which globally modifies the calculated tendencies.
-   🔍 **Transparent Formulas:** Hover over any calculated tendency in the roster table or the result card to see a detailed breakdown of the formula and the modifiers that produced the final value.

## ⚙️ Setup and Running Locally

This project is a static web application and does not require a complex build process.

**Option 1: Simple (Open the file)**

1.  Clone or download this repository to your local machine.
2.  Navigate to the project folder.
3.  Simply open the `index.html` file in your preferred web browser (like Chrome, Firefox, or Edge).

**Option 2: Recommended (Using a local server)**

For the best experience and to avoid potential browser security issues with local files (`file:///` protocol), it's recommended to serve the files using a simple local web server.

1.  **If you have Python installed:**
    -   Open a terminal or command prompt in the project's root directory.
    -   Run the command: `python -m http.server` (for Python 3) or `python -m SimpleHTTPServer` (for Python 2).
    -   Open your browser and go to `http://localhost:8000`.

2.  **If you use Visual Studio Code:**
    -   Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
    -   Open the project folder in VS Code.
    -   Right-click on `index.html` in the file explorer and select "Open with Live Server".

## 🚀 How to Use

1.  **Set Your Team Tempo:** Use the "Team Tempo" dropdown to select your team's primary playstyle. This will influence all tendency calculations.
2.  **Add Players:** Use the "Add New Player" form on the left. Fill in the player's name and all of their in-game attributes.
3.  **Set Offensive Role:** Manually assign an "Offensive Role" for the player. This is a crucial part of the formula.
4.  **Save to Roster:** Click "Add Player to Roster". The player will appear in the "Team Roster" table on the right.
5.  **View Tendencies:** The roster table displays the calculated tendencies for each player. These are the values you should input into the game.
6.  **Balance Your Roster:** The "Sug. Role" column provides a recommendation based on the player's calculated Offensive Talent Score (OTS) relative to the rest of the team. You can use this suggestion to adjust the "Set Role" for more realistic team chemistry.
7.  **Save Your Work:** When you're done, click "Export Roster" to save a `.json` file of your team. Use "Import Roster" to load it back in later.

## ❓ Frequently Asked Questions (FAQ)

**What is the DRAM System?**

The "Dynamic Role & Attribute Modeling" (DRAM) system is a formulaic approach to tendency-editing inspired by efforts of the College Hoops 2K8 community, such as Ole Man Games and iMaynor. It aims to create more realistic CPU gameplay by aligning a player's tendencies with their given attributes and their defined role on the team.

**How are "Suggested Roles" calculated?**

The application calculates a proprietary "Offensive Talent Score" (OTS) for each player based on a weighted average of their most critical offensive attributes (Overall, Shooting, Shot Creation, Consistency). Players are then ranked by their OTS, and the top-ranked players are suggested as the 1st, 2nd, and 3rd offensive options.

**What do the abbreviations in the calculation breakdown mean?**

When you hover over a tendency value, you'll see a breakdown of the calculation. Here's what the modifiers mean:
-   **Base:** The initial value, derived from one or more player attributes.
-   **ASM (Attribute-Specific Modifier):** A bonus or penalty based on how high the primary attribute for that tendency is (e.g., Close Shot rating for Close Shot Tendency).
-   **FM (Finishing Modifier):** A modifier based on the "Shoot in Traffic" attribute. Affects close-range tendencies.
-   **SM (Shooting Modifier):** A modifier based on the "Shoot Off Dribble" attribute. Affects mid-range and three-point tendencies.
-   **OHM (Offensive Hierarchy Modifier):** A multiplier based on the player's assigned "Offensive Role". The 1st Option gets a large boost, while a Role Player gets a reduction.
-   **CWF (Consistency Weighting Factor):** A multiplier based on the player's "Consistency" attribute.
-   **STM (System Tempo Modifier):** A multiplier based on the selected "Team Tempo".

**Why isn't "Commit Foul Tendency" calculated?**

The original DRAM system does not provide a formula for the Commit Foul Tendency. The recommendation is to adjust this value manually based on your in-game observation of a player's performance and how often they get into foul trouble.

**How do I save my roster?**

Use the **"Export Roster"** button. This will download a `ch2k8-dram-roster.json` file to your computer. To load it back into the app, use the **"Import Roster"** button and select that file.

## Credits

This tool and its formulas are inspired by the incredible work of "Ole Man Games" and iMaynor and the dedicated College Hoops 2K8 community. This app is a tribute to their effort to keep the game alive and thriving.

This tool is for educational and entertainment purposes and is not affiliated with 2K Sports.
