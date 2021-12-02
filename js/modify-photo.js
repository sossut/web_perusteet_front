'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  return urlParams.get(param);
};

const photoID = getQParam('id');

// select existing html elements
const modForm = document.querySelector('#modPhotoForm');
const userList = document.querySelector('.add-owner');

const user = JSON.parse(sessionStorage.getItem('user'));

if(user.Role > 0) {
    userList.remove();
}

// add existing cat data to form
const getPhoto = async (id) => {
    const fetchOptions = {
        headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
    };
  const response = await fetch(url + '/photo/' + id, fetchOptions);
  const photo = await response.json();
  const inputs = modForm.querySelectorAll('input');
  inputs[0].value = photo.Description;
  inputs[1].value = photo.PhotoID;
  if (user.Role === 0) {
      modForm.querySelector('select').value = photo.UserID;
  } 
  
};

// create user options to <select>
const createUserOptions = (users) => {
  userList.innerHTML = '';
  users.forEach((user) => {
    // create options with DOM methods
    const option = document.createElement('option');
    console.log(users);
    option.value = user.UserID;
    option.innerHTML = user.UserName;
    option.classList.add('light-border');
    userList.appendChild(option);
  });
  // add cat data after userdata
  getPhoto(photoID);
};

// get users to form options
const getUsers = async () => {
  try {
      const options = {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    const response = await fetch(url + '/user', options);
    const users = await response.json();
    createUserOptions(users);
  } catch (e) {
    console.log(e.message);
  }
};


// submit modify form
modForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(modForm);
  for (const [prop, value] of Object.entries(data)) {
    if (value === '') {
      delete data[prop];
    }
  }  
  const fetchOptions = {   
    method: 'PUT',
    headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  console.log(fetchOptions);
  const response = await fetch(url + '/photo/' + photoID, fetchOptions);
  const json = await response.json();
  if (json.error) {
      alert(json.error.message);
  } else {
      alert (json.message);
  }
  location.href = 'front.html';
});

if (user.Role === 0) {
  getUsers(); // if admin
} else {
  getPhoto(photoID); // if regular user
}