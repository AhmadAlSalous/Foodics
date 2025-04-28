// Display recipe details on click
function displayRecipeDetails(recipe) {
    var recipeDetails = document.createElement('div');
    recipeDetails.classList.add('recipe-details');
    recipeDetails.innerHTML = `
        <h3>${recipe.name}</h3>
        <img src="${recipe.image}" alt="${recipe.name}">
        <p>${recipe.description}</p>
        <h4>Ingredients:</h4>
        <ul>
            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <h4>Method:</h4>
        <p>${recipe.method}</p>
    `;
    document.body.appendChild(recipeDetails);

    // Close recipe details on click outside
    document.addEventListener('click', function(event) {
        if (!recipeDetails.contains(event.target)) {
            recipeDetails.remove();
        }
    });
}

// Display recipes in the grid
 // Display recipe details on click
 function displayRecipeDetails(recipe) {
    var recipeDetails = document.createElement('div');
    recipeDetails.classList.add('recipe-details');
    recipeDetails.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}">
        <p><pre>${recipe.instructions}</pre></p>
        <h4>Ingredients:</h4>
        <ul>
            <pre>${recipe.ingredients}</pre>
        </ul>
        <h4>Method:</h4>
        <ol>
            <pre>${recipe.instructions}</pre>
        </ol>
    `;
    document.body.appendChild(recipeDetails);

    // Close recipe details on click outside
    document.addEventListener('click', function(event) {
        if (!recipeDetails.contains(event.target)) {
            recipeDetails.remove();
        }
    });
}

// Display recipes in the grid
function display(recipes) {
    console.log(recipes);
    if (recipes.length==0) {
        document.getElementById('notfound').innerHTML = 'Not Found. Try another category.';
    }
    // recipes = JSON.parse(recipes[0].recipes);
    var recipeGrid = document.querySelector('.recipe-grid');
    recipeGrid.innerHTML = '';
    recipes.forEach(function(recipe) {
        var recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.title}">
                <div class="overlay">
                    <h4>Ingredients:</h4>
                    <ul>
                        <pre>${recipe.ingredients}</pre>
                    </ul>
                    <h4>Method:</h4>
                    <ol>
                        <pre>${recipe.instructions}</pre>
                    </ol>
                    <h4>Cooking Time: <span style="color: black; font-family:monospace;">${recipe.cookingtime}</span></h4>
                    <h4>Serving Size: <span style="color: black;font-family:monospace;">${recipe.servingsize}</span></h4>
                    <h4>Category: <span style="color: black;font-family:monospace;">${recipe.category}</span></h4>
                </div>
                <pre>${recipe.title}</pre>
            </div>
        `;
        recipeCard.addEventListener('click', function() {
            displayRecipeDetails(recipe);
        });
        recipeGrid.appendChild(recipeCard);
    });
}

// Search for recipes
function searchRecipes() {
    var searchKeyword = document.getElementById("search-input").value.toLowerCase();
    const newUrl = `${window.location.pathname}?search=${encodeURIComponent(searchKeyword)}`;
    window.location.href = newUrl;
}
