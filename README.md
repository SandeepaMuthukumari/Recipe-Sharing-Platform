# 🍽️ Recipe Sharing Platform

## 📖 Overview

Build a simplified **recipe-sharing platform** where users can browse recipes, save favorites, and contribute their own creations.  
This assignment tests your ability to handle dynamic data, user interactions, and modern React workflows.

---

## 🎯 Objectives

1. Implement **client-side routing** with React Router.
2. Manage **global state** using Redux, Context API, or Zustand.
3. Integrate a **mock API** for CRUD operations (recipes, user data).
4. Use a **UI framework** (e.g., Material-UI) for styling.
5. Demonstrate **clean code structure** and **error handling**.

---

## ⚙️ Functional Requirements

### ✅ Core Features

#### 1. Recipe Feed
- Display a **grid/list of recipes** fetched from a mock API.
- Each recipe card shows: **Title, Cooking Time, Rating, and Image**.
- Include a **search bar** to filter recipes by title or ingredient.

![Screenshot (640)](https://github.com/user-attachments/assets/7cceacd6-095f-472f-adc6-8fed5c47ffb1)
![Screenshot (639)](https://github.com/user-attachments/assets/ccdafe24-ccec-4086-8647-6ee91301173b)


#### 2. Recipe Details Page
- Navigate to a **dedicated page** for each recipe using React Router.
- Display: **Ingredients, step-by-step instructions**, and a **"Save to Favorites"** button.

#### 3. User Authentication (Mock)
- Create a simple **login/signup flow** (no backend required).
- Store mock user data (e.g., **username, saved recipes**) in localStorage.

#### 4. CRUD for Recipes
- **Create**: A form to add a new recipe (title, ingredients, instructions, image URL).
- **Update/Delete**: Allow editing and deleting recipes created by the logged-in user.

#### 5. Favorites System
- Let users **save/unsave recipes**.
- Persist favorites using **global state** or **localStorage**.

#### 6. State Management
Use **Redux**, **Context API**, or **Zustand** to manage:
- User authentication status.
- Recipe data (fetching, updating, deleting).
- Favorites list.

---

## ✨ Optional Features (Bonus)

1. **Cooking Timer**  
   Add a timer component that users can start from a recipe’s "Cooking Time" field.

2. **Ingredient Substitutions**  
   Show alternative ingredients (e.g., "Use almond milk instead of dairy").

3. **Social Sharing**  
   Add mock buttons to share recipes on social media.

4. **Advanced Filtering**  
   Filter recipes by **dietary restrictions** (vegan, gluten-free, etc.).

5. **Dark Mode**  
   Toggle between **light/dark themes** using CSS variables.

---

## 🛠️ Tech Stack Suggestions
- **React 18+**
- **React Router DOM**
- **Redux Toolkit / Context API / Zustand**
- **Material-UI / Chakra UI / Tailwind CSS**
- **LocalStorage for persistence**
- **Mock API (JSON Server, MirageJS, etc.)**

---

## 📝 Notes
- Keep your code **modular and readable**.
- Ensure **responsive design** for mobile and desktop.
- Add **error boundaries** or try/catch for API requests.

---



