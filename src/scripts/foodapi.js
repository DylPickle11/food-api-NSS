const foodContainer = document.querySelector('.foodList');

/*
fetch("http://localhost:3000/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(item => {
            const foodAsHTML = createFoodHTML(item)
            addFoodToDom(foodAsHTML)
        })
    })
*/

/*
For this exercise, you will be adding barcodes to your food products, 
and using another, 3rd-party API to query more information about each
 product and display it in the DOM. That's right! You don't have to 
 be stuck just messing around with your own data; there's a whole 
 world of information out there for you fetch

 */
fetch("http://localhost:3000/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text
                    } else {
                        food.ingredients = "no ingredients listed"
                    }

                    // Produce HTML representation
                    const foodAsHTML = foodFactory(productInfo)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })


const foodFactory = (foodObj) => {
    let foodHTML = `
        <section>
          <h3>Name:${foodObj.product.product_name}</h3>
          <p>ingredients: ${foodObj.product.ingredients_text}</p>
          <p>country of origin: ${foodObj.product.countries}</p>
          <p>calories per serving: ${foodObj.product.nutriments.energy_value}</p>
          <p>fat per serving: ${foodObj.product.nutriments.fat}</p>
          <p>sugar per serving: ${foodObj.product.nutriments.sugars}</p>
        </section>
        `
    return foodHTML;
}

function addFoodToDom(htmlString) {
    foodContainer.innerHTML += htmlString;

}