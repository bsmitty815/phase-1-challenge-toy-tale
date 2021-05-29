let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
let divCollect = document.querySelector('#toy-collection') //all the toys data
const nameInput = document.querySelector("body > div.container > form > input:nth-child(2)")
const urlInput = document.querySelector("body > div.container > form > input:nth-child(4)")
const form = document.querySelector('form')


document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/toys')
  .then(response => {
    return response.json()
   // response.json()
  })
  .then(toyInfo => {
    toyInfo.map(toy => renderToys(toy))
  })
  .catch(function(error) {
    console.log(error);
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
// // 1 fetch the local host to get the toys
// function getToys() {
function renderToys(toyData) {
  console.log(toyData.name)
  const toyCard = document.createElement('div')
  toyCard.className = 'card'
  divCollect.append(toyCard)
  let h2 = document.createElement('h2')
  h2.innerText = toyData.name
  toyCard.append(h2)

  const img = document.createElement('img')
  img.src = toyData.image
  img.className = 'toy-avatar'
  toyCard.append(img)

  const p = document.createElement('p')
  p.innerText = toyData.likes
  toyCard.append(p)

  const button = document.createElement('button')
  button.id = toyData.id
  button.className = 'like-btn'
  button.innerText = 'Like Button'
  toyCard.append(button)

  button.addEventListener('click', likeButton)
  function likeButton() {
    toyData.likes += 1
  
    const configurationObject = {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": toyData.likes
      })
    }
      fetch(`http://localhost:3000/toys/${toyData.id}`, configurationObject)
      .then(response => {
      return response.json()
      })
      .then(toyInfo => {
        p.innerText = toyInfo.likes
      })
      .catch(function(error) {
      console.log(error);
    })
  }
}


// grab from the 
form.addEventListener('submit', submitNewToy);
function submitNewToy(event) {
  event.preventDefault()
  let nameToy = nameInput.value //grabbing the value of what is entered
  let urlToy = urlInput.value

  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": nameToy,
      "image": urlToy,
      "likes": 0
    })
  };
  fetch('http://localhost:3000/toys', configurationObject)
  .then(response => {
    return response.json()
  })
  .then(toyInfo => renderToys(toyInfo))
  .catch(function(error) {
    console.log(error);
  })
}
