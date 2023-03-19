let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  addBtn = document.querySelector("#new-toy-btn");
  toyFormContainer = document.querySelector(".container");
  toyCollection = document.querySelector('#toy-collection');
  form = document.querySelector('form');
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys();
  setupForm();
});

function fetchToys() {
  fetch('http://localhost:3000/toys/')
    .then(r => r.json())
    .then(d => d.forEach(t => showToyInList(t)))
}

function showToyInList(toy) {
  const toyDiv = document.createElement('div');
  toyDiv.className = 'card';
  toyDiv.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p><span>${toy.likes}</span> Likes</p>
  <button class="like-btn" toy-id="${toy.id}">Like ❤️</button>`
  toyCollection.append(toyDiv);
  setupLikeButton(String(toy.id));
}

function setupForm() {

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value;
    const image = form.image.value;
    console.log('Adding:', name, image);
    postToy(name, image);

  })

}

function postToy(name, image) {
  fetch('http://localhost:3000/toys/',
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
      ,
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0
      })
    })
    .then(r => r.json())
    .then(d => {
      console.log(d);
      showToyInList({
        name: name,
        image: image,
        likes: 0,
        id: d.id
      })
        .catch(e => console.log(e))
    })
}

function setupLikeButton(id) {
  likeButton = document.querySelector(`button[toy-id="${id}"]`);
  likeButton.addEventListener('click', e => {
    const likesSpan = e.target.previousElementSibling.children[0];
    let numLikes = parseInt(likesSpan.innerText);
    numLikes++;
    console.log('num likes:', numLikes);
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ likes: numLikes })
    })
      .then(likesSpan.innerText = numLikes)
  })
}

function updateLikeCount(id) {
  return 1;
}