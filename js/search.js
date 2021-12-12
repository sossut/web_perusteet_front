'use strict';

const url = 'https://10.114.34.24/app';

const searchFrom = document.querySelector('#search-form');
const ul = document.querySelector('#articles');
let searchParam = '';
searchFrom.addEventListener('submit', async(evt) => {
    ul.innerHTML = '';
    evt.preventDefault();
    try {
        
        const searchq = document.getElementById('search-value').value;
        searchParam = searchq;
        getPhoto(searchq);
        
                
    } catch (e) {
        console.log(e.message);
    }
    
});
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
                getPhoto(searchParam);
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
    });    
}
const getPhoto = async (query) => {
  try {
    const fetchOptions = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
            
        };
    const response = await fetch(url + '/photo/search/' + query, fetchOptions);
    const photos = await response.json();
    if (photos.length > 0) {
            createCards(photos);
                       
        } else {            
            const p = document.createElement('p');            
            p.innerHTML = 'No photos found with matching description. Try something else.';
            ul.appendChild(p);            
        }
    
    
  } catch (e) {
    console.log(e.message);
  }
};