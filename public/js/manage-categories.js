function display(categories) {
    // Extract the 'categories' array from the object]
    // console.log(categories[0].categories);
    categories = JSON.parse(categories[0].categories); // Parse the JSON string to an array of objects
    console.log(categories);

    const recipeTableBody = document.getElementById('recipe-table-body');
    categories.forEach(category => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${category.title}</td>
            <td>
                <button class="delete-btn" onclick="confirmDelete(${category.id})">Delete</button>
            </td>
        `;
        recipeTableBody.appendChild(row);
    });
};
function editRecipe(recipeId) {
    document.getElementById('recipe-id').value = recipeId;
    window.location.href = 'edit-recipe.html';
}

function confirmDelete(recipeId) {
    if (confirm("Are you sure you want to delete this category?")) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/delete-category', true);
        xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        alert('Recipe deleted successfully!');
                        window.location.href = '/manage-categories';
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
    }
}