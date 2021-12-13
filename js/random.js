'use strict';

const url = 'https://10.114.34.24/app';

const card = document.querySelector('#random');

const createCard = (photo) => {
    card.innerHTML = '';
    const title = document.createElement('h2');
    title.innerHTML = photo.Description;
    const img = document.createElement('img');
    img.src = `${url}/${photo.Filename}`;
    img.alt = photo.Description;
    card.appendChild(title);
    card.appendChild(img);
    
    const infoDiv = document.createElement('div');
    infoDiv.setAttribute('id', 'info-div');

    const likeDiv = document.createElement('div');
    
    const posterDataDiv = document.createElement('div');
    
    
    infoDiv.appendChild(posterDataDiv);
    infoDiv.appendChild(likeDiv);
    const likePhoto = document.createElement('i');
    likePhoto.innerHTML= '<i class="fas fa-thumbs-up"></i>'
    const likeCount = document.createElement('p');
    likeCount.innerHTML = 'Likes: ' + photo.LikeCount;
    likeDiv.appendChild(likePhoto);
    
    const owner = document.createElement('p');
    owner.innerHTML = 'By: ' + photo.UserName;

    const [postedDate] = photo.PostedDate.split('T');
    const p1 = document.createElement('p');
    p1.innerHTML = `Posted: ${postedDate}`;

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
            
            const fetchLikesOptions = {
                method: 'GET',
                headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
            }
            const likeResponse = await fetch(url + '/photo/' + photo.PhotoID, fetchLikesOptions);
            const likesJson = await likeResponse.json();
            likeCount.innerHTML = '';
            likeCount.innerHTML = 'Likes: ' + likesJson.LikeCount;
            
        } catch (e) {
            console.log(e.message);
        }
    })
    likeDiv.appendChild(likeCount);
    posterDataDiv.appendChild(owner);
    posterDataDiv.appendChild(p1);
    card.appendChild(infoDiv);
    
}

const getPhoto = async () => {
    try {
        const fetchOptions = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        }        
        const response = await fetch(url + '/photo/get/random/', fetchOptions);
        const photo = await response.json();
        createCard(photo);
    } catch (e) {
        console.log(e.message);
    }
}
getPhoto();