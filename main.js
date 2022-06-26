console.log('connected')

// grab HTML elements
const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = `http://localhost:4000`;

// step 2:  write your function
function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

function getAllChars() {
  clearCharacters();

  axios.get(`${baseURL}/characters`)
    .then((res) => {
      console.log(res);
      const characterArr = res.data;
      for(let i = 0; i < characterArr.length; i++) {
        createCharacterCard(characterArr[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

function getOneChar(event) {
  clearCharacters();

  axios.get(`${baseURL}/character/${event.target.id}`)
  .then((res) => {
    console.log(res.data)
    const characterObj = res.data
    createCharacterCard(characterObj);
  })
  .catch((err) => {
    console.log(err);
  })
}

function getOldChars(event) {
  event.preventDefault();

  clearCharacters();

  axios.get( `${baseURL}/character/?age=${ageInput.value}`)
    .then((res) => {
      console.log(res.data)
      const oldCharactersArr = res.data;
      for(let i = 0; i < oldCharactersArr.length; i++) {
        createCharacterCard(oldCharactersArr[i]);
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

function createNewChar(evt) {
  event.preventDefault();

  clearCharacters();

  let newLikes = [...newLikesText.value.split(",")];
  console.log(newLikes);

  let body = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value,
    likes: newLikes
  }

  axios.post(`${baseURL}/character`, body)
    .then((res) => {
      const newArr = res.data;
      for(let i = 0; i < newArr.length; i++)
        createCharacterCard(newArr[i]);
    })
    .catch((err) => {
      console.log(err);
    })
}

  newFirstInput.value = ''
  newLastInput.value = ''
  newGenderDropDown.value = ''
  newAgeInput.value = ''
  newLikes = ''


// step 3: assign event listeners
getAllBtn.addEventListener('click', getAllChars);

for(let i = 0; i < charBtns.length; i++) {
  charBtns[i].addEventListener('click', getOneChar);
}

ageForm.addEventListener('submit', getOldChars);

createForm.addEventListener('submit', createNewChar);

getAllChars();