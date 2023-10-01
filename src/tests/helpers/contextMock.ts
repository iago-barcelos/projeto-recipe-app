import { vi } from 'vitest';
import { Meals } from './meals';
import { Drinks } from './drinks';

export const mockContext = {
  mealCategories: [
    {
      strCategory: 'Beef',
    },
    {
      strCategory: 'Breakfast',
    },
    {
      strCategory: 'Chicken',
    },
    {
      strCategory: 'Dessert',
    },
    {
      strCategory: 'Goat',
    },
  ],
  drinkCategories: [
    {
      strCategory: 'Ordinary Drink',
    },
    {
      strCategory: 'Cocktail',
    },
    {
      strCategory: 'Shake',
    },
    {
      strCategory: 'Other / Unknown',
    },
    {
      strCategory: 'Cocoa',
    },
  ],
  searchResults: { meals: Meals, drinks: [] }, // Substitua com seus dados de teste
  searchValue: '', // Substitua com seus dados de teste
  handleChange: vi.fn(), // Substitua com uma função mock
  handleSearch: vi.fn(), // Substitua com uma função mock
  drinksByCategories: { drinks: [] }, // Substitua com seus dados de teste
  mealsByCategories: { meals: [] }, // Substitua com seus dados de teste
  setDrinksByCategories: vi.fn(), // Substitua com uma função mock
  setMealsByCategories: vi.fn(), // Substitua com uma função mock
  getByCategories: vi.fn(), // Substitua com uma função mock
};
