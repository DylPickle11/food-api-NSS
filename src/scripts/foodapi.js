const foodContainer= document.querySelector('.foodList');

function createFoodHTML(foodObj) {

    let foodHTML = `
    <section>
      <h3>Name:${foodObj.name}</h3>
      <p>Category: ${foodObj.category}</p>
      <p>Ethnicity: ${foodObj.ethnicity}</p>
    </section>
    `
    return foodHTML;
}

function addFoodToDom(htmlString){
  foodContainer.innerHTML += htmlString;
}

fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(item => {
            const foodAsHTML = createFoodHTML(item)
            addFoodToDom(foodAsHTML)
        })
    })
