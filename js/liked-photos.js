'use strict';

const url = 'http://localhost:3000';

const ul = document.querySelector('#articles');

const user = JSON.parse(sessionStorage.getItem('user'));

const createCards = (photos) => {
    ul.innerHTML = '';
    photos.forEach((photo) => {
        
        const img = document.createElement('img');
        img.src = url + '/thumbnails/' + photo.Filename;
        img.alt = photo.Description;
        img.classList.add('resp');

        img.addEventListener('click', () => {
            location.href = 'single.html?id=' + photo.PhotoID;
        });


        const figure = document.createElement('figure').appendChild(img);

        const h2 = document.createElement('h2');
        h2.innerHTML = photo.Description;

        const [postedDate] = photo.PostedDate.split('T');
        const p1 = document.createElement('p');
        p1.innerHTML = `Posted: ${postedDate}`;

        const p2 = document.createElement('p');
        p2.innerHTML = `Likes: ${photo.LikeCount}`;

        const p3 = document.createElement('p');
        p3.innerHTML = `By: ${photo.UserName}`;

        

        const li = document.createElement('li');
        li.classList.add('light-border');

        li.appendChild(h2);
        li.appendChild(figure);
        li.appendChild(p1);
        li.appendChild(p2);
        li.appendChild(p3);
        ul.appendChild(li);
    });    
}
const getPhoto = async () => {
  try {
    const fetchOptions = {
        headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
    };
    const response = await fetch(url + '/photo/favs/' + user.UserID, fetchOptions);
    const photos = await response.json();
    console.log(photos);
    createCards(photos);
  } catch (e) {
    console.log(e.message);
  }
};

getPhoto();