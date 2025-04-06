
import { User, Recipe } from "@/types";

export const mockUsers: User[] = [
  {
    id: "user1",
    username: "ChefJohn",
    email: "john@example.com",
    password: "password123"
  },
  {
    id: "user2",
    username: "BakingQueen",
    email: "sarah@example.com",
    password: "password123"
  }
];

export const mockRecipes: Recipe[] = [
  {
    id: "recipe1",
    title: "Creamy Garlic Parmesan Pasta",
    description: "A quick and delicious pasta dish with a creamy garlic parmesan sauce.",
    ingredients: [
      "8 oz fettuccine pasta",
      "2 tbsp butter",
      "4 cloves garlic, minced",
      "1 cup heavy cream",
      "1 cup grated parmesan cheese",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "Cook pasta according to package instructions. Drain and set aside.",
      "In a large skillet, melt butter over medium heat. Add minced garlic and sauté for 1-2 minutes until fragrant.",
      "Pour in heavy cream and bring to a simmer. Cook for 2-3 minutes until slightly thickened.",
      "Stir in parmesan cheese until melted and smooth.",
      "Add cooked pasta to the sauce and toss until well coated.",
      "Season with salt and pepper to taste.",
      "Garnish with fresh parsley before serving."
    ],
    cookingTime: 20,
    servings: 4,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a",
    rating: 4.8,
    tags: ["pasta", "italian", "quick", "vegetarian"],
    userId: "user1",
    createdAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "recipe2",
    title: "Chocolate Chip Cookies",
    description: "Classic chocolate chip cookies that are crispy on the outside and chewy on the inside.",
    ingredients: [
      "1 cup unsalted butter, softened",
      "1 cup white sugar",
      "1 cup packed brown sugar",
      "2 eggs",
      "2 tsp vanilla extract",
      "3 cups all-purpose flour",
      "1 tsp baking soda",
      "2 tsp hot water",
      "1/2 tsp salt",
      "2 cups semisweet chocolate chips"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C).",
      "Cream together butter and sugars until smooth.",
      "Beat in eggs one at a time, then stir in vanilla.",
      "Dissolve baking soda in hot water. Add to batter along with salt.",
      "Stir in flour and chocolate chips.",
      "Drop by large spoonfuls onto ungreased pans.",
      "Bake for about 10 minutes or until edges are nicely browned."
    ],
    cookingTime: 25,
    servings: 24,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e",
    rating: 4.9,
    tags: ["dessert", "cookies", "baking"],
    userId: "user2",
    createdAt: "2023-02-20T15:45:00Z"
  },
  {
    id: "recipe3",
    title: "Spicy Thai Red Curry",
    description: "A flavorful and aromatic Thai curry with vegetables and your choice of protein.",
    ingredients: [
      "2 tbsp vegetable oil",
      "1 onion, thinly sliced",
      "3 tbsp Thai red curry paste",
      "1 can (14 oz) coconut milk",
      "1 lb chicken or tofu",
      "2 bell peppers, sliced",
      "1 cup snap peas",
      "1 tbsp fish sauce",
      "1 tbsp brown sugar",
      "Fresh basil leaves",
      "Lime wedges for serving",
      "Steamed rice for serving"
    ],
    instructions: [
      "Heat oil in a large pan over medium heat. Add onion and sauté until softened.",
      "Add curry paste and cook for 1 minute until fragrant.",
      "Pour in coconut milk and bring to a simmer.",
      "Add chicken or tofu and cook for 5-7 minutes.",
      "Add bell peppers and snap peas, simmer for 3-4 minutes until vegetables are tender-crisp.",
      "Season with fish sauce and brown sugar. Adjust to taste.",
      "Stir in fresh basil leaves before serving.",
      "Serve hot over steamed rice with lime wedges on the side."
    ],
    cookingTime: 30,
    servings: 4,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
    rating: 4.7,
    tags: ["thai", "spicy", "curry", "dinner"],
    userId: "user1",
    createdAt: "2023-03-05T18:20:00Z"
  },
 
];
