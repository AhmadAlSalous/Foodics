function display(recipes) {
    // Extract the 'recipes' array from the object]
    // console.log(recipes[0].recipes);
    recipes = JSON.parse(recipes[0].recipes); // Parse the JSON string to an array of objects
    console.log(recipes);

    const recipeTableBody = document.getElementById('recipe-table-body');
    recipes.forEach(recipe => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${recipe.title}</td>
            <td>
                <button class="edit-btn" onclick="editRecipe(${recipe.id})">Edit</button>
                <button class="delete-btn" onclick="confirmDelete(${recipe.id})">Delete</button>
            </td>
        `;
        recipeTableBody.appendChild(row);
    });
};
function editRecipe(recipeId) {
    console.log(recipeId);
    window.location.href = `/edit-recipe?id=${recipeId}`;
}

function confirmDelete(recipeId) {
    if (confirm("Are you sure you want to delete this recipe?")) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/delete-recipe', true);
        xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        window.location.href = '/manage-recipes';
                    } else {
                        alert('Error: ' + response.error);
                    }
                } else {
                    console.error('AJAX request failed:', xhr.statusText);
                    alert('An error occurred while deleting the recipe.');
                }
            }
        };

        xhr.send(`id=${recipeId}`);
        setTimeout(function() {
            window.location.href = '/manage-recipes';
            }, 1000);

        // const row = document.getElementById('recipe-' + recipeId);
        // row.remove();
    }
}