'use strict';

const url = 'http://localhost:3000';

const ul = document.querySelector('#articles');

const getPhoto = async () => {
    const response = await fetch(url + '/photo');
    const photos = await response.json();
    console.log(photos);
    for (const photo of photos) {
        const user = await getUser(photo.UserID);
        ul.innerHTML += `
        <li>
            
            <figure>
                <img src="${photo.Filename}" class="resp">
            </figure>
            <p>Description: ${photo.Description}</p>
            
            <p>Owner: ${user.UserName}</p>
            <p>Likes: TODO</p>
            <p>Like: TODO</p>
        </li>`;
    }
};


const getUser = async (id) => {
  const response = await fetch(url + '/user/' + id);
  const user = await response.json();
  return user;
};

getPhoto();

<h3>Add user</h3>
        <form action="http://localhost:3000/user" method="post" class="light-border">
            <input class="light-border" type="text" name="name" placeholder="Name">
            <input class="light-border" type="text" name="email" placeholder="email">
            <input class="light-border" type="text" name="passwd" placeholder="Password">
            <button class="light-border" type="submit">Save</button>
        </form>
        <h3>Add Photo</h3>
        <form action="http://localhost:3000/photo" method="post" enctype="multipart/form-data" class="light-border">
            
            <input class="light-border" type="text" name="description" placeholder="Description">
            
            <input class="light-border" type="number" name="userID" placeholder="Owner id">
            <input class="light-border" type="file" name="photo">
            <button class="light-border" type="submit">Save</button>
        </form>