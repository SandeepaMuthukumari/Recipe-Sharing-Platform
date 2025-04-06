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
  

![Screenshot (639)](https://github.com/user-attachments/assets/ccdafe24-ccec-4086-8647-6ee91301173b)
![Screenshot (640)](https://github.com/user-attachments/assets/7cceacd6-095f-472f-adc6-8fed5c47ffb1)
![Screenshot (642)](https://github.com/user-attachments/assets/56b63e05-5b80-45b0-8c34-f2d449aefb68)



#### 2. Recipe Details Page
- Navigate to a **dedicated page** for each recipe using React Router.
- Display: **Ingredients, step-by-step instructions**, and a **"Save to Favorites"** button.

![Screenshot (643)](https://github.com/user-attachments/assets/b4b36b4b-59ca-4adb-b2d1-aedee64035f5)
![Screenshot (644)](https://github.com/user-attachments/assets/dee7ec5e-ab92-4829-b9d2-1dced2d042e3)


#### 3. User Authentication (Mock)
- Create a simple **login/signup flow** (no backend required).
- Store mock user data (e.g., **username, saved recipes**) in localStorage.

![Screenshot (646)](https://github.com/user-attachments/assets/5b687a59-a612-4230-970a-78aa573928c1)
![Screenshot (645)](https://github.com/user-attachments/assets/9aa1129e-2096-4c75-abc9-b3e1a06cd9dd)


#### 4. CRUD for Recipes
- **Create**: A form to add a new recipe (title, ingredients, instructions, image URL).
- **Update/Delete**: Allow editing and deleting recipes created by the logged-in user.

![Screenshot (647)](https://github.com/user-attachments/assets/7a3d3785-c797-4996-91b8-3fd6683d510a)
![Screenshot (649)](https://github.com/user-attachments/assets/cec544db-c63a-4740-871b-81d27bbdedd0)
![Screenshot (648)](https://github.com/user-attachments/assets/f9fe6700-855e-4ee9-aa3a-b12aaa9e7faf)


#### 5. Favorites System
- Let users **save/unsave recipes**.
- Persist favorites using **global state** or **localStorage**.

![Screenshot (650)](https://github.com/user-attachments/assets/3b83db02-65c3-4fd0-beed-f70b615c1783)


#### 6. State Management
Use **Redux**, **Context API**, or **Zustand** to manage:
- User authentication status.
- Recipe data (fetching, updating, deleting).
- Favorites list.
  ![Screenshot (657)](https://github.com/user-attachments/assets/5dbc4a37-4517-4d02-a62a-67b4f0aa6f76)
![Screenshot (656)](https://github.com/user-attachments/assets/d1800375-96db-4e1d-97eb-2873f218fdad)


---

## ✨ Optional Features (Bonus)

1. **Cooking Timer**  
   Add a timer component that users can start from a recipe’s "Cooking Time" field.
![Screenshot (651)](https://github.com/user-attachments/assets/2832937a-bde5-407e-b560-6a79f0af5b82)

3. **Ingredient Substitutions**  
   Show alternative ingredients (e.g., "Use almond milk instead of dairy").

5. **Social Sharing**  
   Add mock buttons to share recipes on social media.
   ![Screenshot (654)](https://github.com/user-attachments/assets/b7aa8612-72a2-4094-95c8-151f18171c89)


7. **Advanced Filtering**  
   Filter recipes by **dietary restrictions** (vegan, gluten-free, etc.).
   ![Screenshot (652)](https://github.com/user-attachments/assets/1f8187f8-a6cb-4c05-84bc-4f63a31478a8)


9. **Dark Mode**  
   Toggle between **light/dark themes** using CSS variables.
   ![Screenshot (653)](https://github.com/user-attachments/assets/9a6f2f4c-467a-400a-a92c-2e931791de9e)


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



