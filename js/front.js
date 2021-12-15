'use strict';

const url = 'https://10.114.34.24/app';

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

        const likePhoto = document.createElement('i');
        likePhoto.innerHTML= '<i class="fas fa-thumbs-up"></i>'
        likePhoto.addEventListener('click', async () => {
            const fetchOptions = {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                },
                
            };
            try {
                const response = await fetch(url + '/photo/' + photo.PhotoID, fetchOptions);
                const json = await response.json();
                console.log('like response', json);
                getPhoto();
            } catch (e) {
                console.log(e.message);
            }
        })

        const li = document.createElement('li');
        li.classList.add('light-border');

        li.appendChild(h2);
        li.appendChild(figure);
        li.appendChild(p1);
        li.appendChild(p2);
        li.appendChild(p3);
        li.appendChild(likePhoto);
        ul.appendChild(li);
        
        if (user.Role === 0 || user.UserID === photo.UserID) {
            const but = document.createElement('button');

            const modButton = document.createElement('a');
            but.innerHTML = 'Modify';
            modButton.href = `modify-photo.html?id=${photo.PhotoID}`;
            but.classList.add('button1');
            but.setAttribute('id', 'mod-button');

            const delButton = document.createElement('button');
            delButton.innerHTML = 'Delete';
            delButton.classList.add('button1');
            delButton.setAttribute('id', 'del-button');
            delButton.addEventListener('click', async () => {
                const conf = 'Are you sure you want to delete this picture. This can not be reversed.'
                if (confirm(conf) == true) {
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
                }    
            });

            

            modButton.appendChild(but);
            li.appendChild(modButton);
            li.appendChild(delButton);
        }

        
        
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