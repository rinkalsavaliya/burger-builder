export const mapIngredients = (ingredientsData) => {
  const ingredients = {};
  const ingredientTypes = [];
  const ingredientPrices = {};
  const basicPrice = ingredientsData.basicPrice;
  let totalPrice = ingredientsData.basicPrice;
  ingredientsData.ingredients.forEach((ingredient) => {
    ingredients[ingredient.type] = 0;
    ingredientPrices[ingredient.type] = ingredient.price;
    ingredientTypes.push({ label: ingredient.label, type: ingredient.type });
  });
  return {
    ingredients, ingredientTypes, basicPrice, totalPrice, ingredientPrices
  }
}
