'use strict';

const url = 'http://localhost:3000';

const ul = document.querySelector('#articles');

const createCards = (photos) => {
    ul.innerHTML = '';
    photos.forEach((photo) => {
        const img = document.createElement('img');
        img.src = url + '/' + photo.Filename;
        img.alt = photo.description;
        img.classList.add('resp');

        const figure = document.createElement('figure').appendChild(img);

        const h2 = document.createElement('h2');
        h2.innerHTML = photo.Description;

        const p1 = document.createElement('p');
        p1.innerHTML = `Posted: ${photo.PostedDate}`;

        const p2 = document.createElement('p');
        p2.innerHTML = `Likes: TODO`;

        const p3 = document.createElement('p');
        p3.innerHTML = `By: ${photo.UserName}`;

        const modButton = document.createElement('a');
        modButton.innerHTML = 'Modify';
        modButton.href = `modify-photo.html?id=${photo.PhotoID}`;
        modButton.classList.add('button');

        const delButton = document.createElement('button');
        delButton.innerHTML = 'Delete';
        delButton.classList.add('button');
        delButton.addEventListener('click', async () => {
            const fetchOptions = {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                },
            };
            try {
                const response = await fetch(url + '/photo/' + photo.PhotoID, fetchOptions);
                const json = await response.json();
                console.log('delete response', json);
                getPhoto();
            } catch (e) {
                
                console.log(e.message);
            }
        });

        const li = document.createElement('li');
        li.classList.add('light-border');

        li.appendChild(h2);
        li.appendChild(figure);
        li.appendChild(p1);
        li.appendChild(p2);
        li.appendChild(p3);
        li.appendChild(modButton);
        li.appendChild(delButton);
        ul.appendChild(li);
    })
}


const getPhoto = async () => {
  try {
    const fetchOptions = {
        headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
    };
    const response = await fetch(url + '/photo', fetchOptions);
    const photos = await response.json();
    createCards(photos);
  } catch (e) {
    console.log(e.message);
  }
};

getPhoto();