function deleteRecipe(id) {
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

        xhr.send(`id=${id}`);
    
}

document.getElementById('image').addEventListener('change', function(event) {
    const preview = document.getElementById('image-preview');
    const imageBase64Input = document.getElementById('imageBase64');
    preview.innerHTML = '';

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            preview.appendChild(img);
            imageBase64Input.value = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '<p>No image selected</p>';
    }
});

document.getElementById('recipe-form').addEventListener('submit', function(event) {
    const imageBase64Input = document.getElementById('imageBase64');
    if (!imageBase64Input.value) {
        event.preventDefault();
        alert('Please select an image.');
    }
    else {

        if (window.location.href.includes('/edit-recipe')) {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            deleteRecipe(id);

        }

        const newUrl = `${window.location.pathname}manage-recipes`;
        window.location.href = newUrl;
}
setTimeout(function() {
            window.location.href = '/manage-recipes';
            }, 1000);
});

function loadRecipe(recipe) {
    recipe = recipe[0];
    const titleInput = document.getElementById('title');
    const ingredientsTextarea = document.getElementById('ingredients');
    const instructionsTextarea = document.getElementById('instructions');
    const cookingTimeInput = document.getElementById('cookingtime');
    const servingSizeInput = document.getElementById('servingsize');
    const categorySelect = document.getElementById('category');

    
    titleInput.value = recipe.title;
    ingredientsTextarea.value = recipe.ingredients;
    instructionsTextarea.value = recipe.instructions;
    cookingTimeInput.value = recipe.cookingtime;
    servingSizeInput.value = recipe.servingsize;
    categorySelect.value = recipe.category;

    document.getElementById('image').src = recipe.image;

    
}

function addCategories(categories) {
    categories = JSON.parse(categories[0].categories);
    console.log(categories);
    const select = document.getElementById('category');
    select.innerHTML = '';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.title;
        option.textContent = category.title;
        select.appendChild(option);
    });
}