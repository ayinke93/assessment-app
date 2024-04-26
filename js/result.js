document.addEventListener("DOMContentLoaded", function () {
    var imageElement = document.getElementById("uploaded-image");
    var imageDataUrl = localStorage.getItem("uploadedImage");
    var toggleSound = document.getElementById("toggle-sound");

    if (imageDataUrl) {
        imageElement.src = imageDataUrl;
        imageElement.style.display = "block";
    } else {
        console.log("No image found in localStorage.");
    }

    function loadData() {
        const rawData = localStorage.getItem("firstFoodItem");
        if (rawData) {
            try {
                const data = JSON.parse(rawData);
				localStorage.removeItem("firstFoodItem")
                return data;
            } catch (error) {
                console.error("Error parsing JSON from local storage:", error);
                return null;
            }
        }
        return null; // If no data found in local storage, return null
    }

    function displayResults(data) {
        const container = document.getElementById("results");
        let content;

        if (data) {
            //  server and local storage data
            content = `<div class="content">
                <h2>Nutritional Details for ${data.name}</h2>
                <div id="nutrition-info">
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p>Gram per serving: ${data.gramsPerServing}g</p>
                    <p>Calories: ${data.calories} kcal/100g</p>
                    <p>Carbohydrates: ${data.carbohydrates}g</p>
                    <p>Proteins: ${data.proteins}g</p>
                    <p>Fats: ${data.fats}g</p>
                    <p>Fibers: ${data.fibers}g</p>
                    <p>Sugars: ${data.sugars}g</p>
                    <p>Sodium: ${data.sodium}mg</p>
                </div>
                <button id="toggle-recipe">Show Recipe</button>
                <div id="recipe" style="display: none;">
                    <h3>Recipe</h3>
                    <p>Ingredients:</p>
                    <ul>
                        ${data.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
                    </ul>
                    <p>Instructions:</p>
                    <ol>
                        ${data.instructions.map(step => `<li>${step}</li>`).join("")}
                    </ol>
                </div>
            </div>`;
        } else {
            // Hardcoded fallback data
            content = `<div class="content">
                <h2>Nutritional Details for Pizza</h2>
                <div id="nutrition-info">
                    <p><strong>Name:</strong> Pizza</p>
                    <p>Gram per serving: 120g</p>
                    <p>Calories: 285 kcal/100g</p>
                    <p>Carbohydrates: 33g</p>
                    <p>Proteins: 12g</p>
                    <p>Fats: 10g</p>
                    <p>Fibers: 2.5g</p>
                    <p>Sugars: 3.8g</p>
                    <p>Sodium: 640mg</p>
                </div>
                <button id="toggle-recipe">Show Recipe</button>
                <div id="recipe" style="display: none;">
                    <h3>Recipe</h3>
                    <p>Ingredients:</p>
                    <ul>
                        <li>1 pre-made pizza crust</li>
                        <li>1/2 cup tomato sauce</li>
                        <li>1 cup mozzarella cheese</li>
                        <li>1/2 cup sliced bell peppers</li>
                        <li>1/2 cup diced onions</li>
                        <li>1/2 cup sliced mushrooms</li>
                        <li>1/4 cup sliced black olives</li>
                        <li>1/2 teaspoon dried oregano</li>
                        <li>1/2 teaspoon garlic powder</li>
                    </ul>
                    <p>Instructions:</p>
                    <ol>
                        <li>Preheat your oven to 425°F (220°C).</li>
                        <li>Spread tomato sauce evenly over the pizza crust.</li>
                        <li>Sprinkle mozzarella cheese over the sauce.</li>
                        <li>Add bell peppers, onions, mushrooms, and olives as toppings.</li>
                        <li>Sprinkle oregano and garlic powder over the toppings.</li>
                        <li>Bake in preheated oven for 15-20 minutes, or until crust is golden and cheese is bubbly.</li>
                        <li>Remove from oven, slice, and serve hot.</li>
                    </ol>
                </div>
            </div>`;
        }

        container.innerHTML = content;

        document.getElementById("toggle-recipe").addEventListener("click", function () {
            var nutritionInfo = document.getElementById("nutrition-info");
            var recipeInfo = document.getElementById("recipe");
            if (recipeInfo.style.display === "none") {
                recipeInfo.style.display = "block";
                nutritionInfo.style.display = "none";
                this.textContent = "Hide Recipe";
                toggleSound.play();
            } else {
                recipeInfo.style.display = "none";
                nutritionInfo.style.display = "block";
                this.textContent = "Show Recipe";
                toggleSound.play();
            }
        });
    }

    const data = loadData(); // Attempt to load data from server
    displayResults(data); // Display the the hardcoded fallback
});
