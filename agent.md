# Agent Handoff: Free Finance Camp

## Project Overview
Free Finance Camp is a gamified financial literacy web application built with React and Vite. It aims to teach personal finance concepts (budgeting, investing, debt, simple/compound interest) through interactive lessons, simulations, and a progression system (XP/Levels).

## Tech Stack
-   **Framework**: React (Vite)
-   **Styling**: Pure CSS with CSS Variables (located in `index.css`). Utility classes (e.g., `.btn`, `.card`) are defined there.
-   **Routing**: `react-router-dom`
-   **State Management**: React Context (`AuthContext` for user session, `ProgressContext` for XP/Lessons).
-   **Persistence**: `localStorage` (simulated backend).

## Key Architecture

### Data Sources
*   `src/data/curriculum.js`: The **SOURCE OF TRUTH** for all content. It defines Modules, Lessons (Reading/interactive), XP rewards, and Story scenarios.
*   `src/data/vocabulary.js`: Defines terms, definitions, and the `lessonId` required to unlock them.

### Core Components
*   **`Map.jsx`**: The main dashboard. Visualizes the curriculum path, user stats (XP, Level), and Module status (Locked/Unlocked).
*   **`Lesson.jsx`**: A generic shell that renders specific lesson content based on the ID. It dynamically loads "Widgets" (interactive components) and parses markdown for bold text.
*   **`VocabReview.jsx`**: A flashcard system that filters terms based on completed lessons in `ProgressContext`.

### Interactive Widgets (`src/components/interactive/`)
*   `MarketTimer.jsx`: A mini-game simulating stock market volatility.
*   `CompoundInterest.jsx`: Visualizer for growth over time.
*   `BudgetingTool.jsx`: Interactive budget allocator.
*   `InsuranceCompare.jsx`, `CarCalculator.jsx`: Decision-making tools.

## Current State
-   **Curriculum**: 9 Modules implemented (Basics to Future Finance).
-   **Features**:
    -   Gamification (XP, Progress Bars, Level badges).
    -   Market Timer Game.
    -   Vocabulary Review System.
    -   "Auth" is currently a mock implementation stored in local state.

## Future Roadmap / Next Steps
1.  **Backend Integration**: Replace `localStorage` with Firebase/Supabase for real user persistence across devices.
2.  **More Games**: Add a "Bond Ladder" simulator or "Inflation Runner" game.
3.  **UI Polish**: Enhance the "Map" visual to look more like a game map (e.g., SVG path).
4.  **Mobile Optimization**: Ensure complex charts (Recharts) look good on small screens.
