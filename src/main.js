const section = document.querySelector('section');
const playlistContainer = document.querySelector('.playlist-container');
const coverContainer = document.querySelector('.cover');
const coverImage = document.getElementById('cover-image');
const audio = document.getElementById("audio")
const title = document.querySelector('.title');
const controlButtons = document.querySelector('.control-buttons');
const playButton = document.querySelector('.play-button');
const imagePause = document.getElementById('image-pause');
const backButton = document.querySelector('.back-button');
const nextButton = document.querySelector('.next-button');
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.querySelector('.progress-bar');
const songsContainer = document.querySelector('.songs-container');
const songs = document.querySelector('.songs');

//Creating my songs List
const songsList = [
    {
        title: 'Azul',
        cover: './cover/azul.jpg',
        path: './media/azul.mp3'
    },
    {
        title: 'Lugar Seguro',
        cover: './cover/lugarseguro.jpg',
        path: './media/lugarseguro.mp3'
    },
    {
        title: 'Pegadito',
        cover: './cover/pegadito.jpg',
        path: './media/pegadito.mp3'
    },
    {
        title: 'No te apartes de mi',
        cover: './cover/noteapartes.jpg',
        path: './media/noteapartes.mp3'
    }

]

let currentSong = 0;
let isPlaying = false;

//Function to show the songs list in the DOM
function loadSongs() {
    songsList.forEach((song, index)=> {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = song.title;
        link.href = "#"
        // Escuchar clicks
        link.addEventListener("click", () => loadSong(index))
        li.appendChild(link)
        songs.appendChild(li)
    })
    
}


//Function to load the song in the DOM and play it
function loadSong(index) {
    currentSong = index;
    title.textContent = songsList[currentSong].title;
    coverImage.src = songsList[currentSong].cover;
    audio.src = songsList[currentSong].path;
    audio.playbackRate = 1.0;
    //Without calling the function playSong() the song doesn't play
    playSong();

}

//Function to play the song
function playSong() {
    //Changing the image of the play button
    imagePause.src = './icons/pause-button.png';
    isPlaying = true;
    audio.play();

}

function pauseSong() {
    //Changing the image of the play button
    imagePause.src = './icons/play-button-arrowhead.png';
    isPlaying = false;
    audio.pause();
}

playButton.addEventListener('click', () => {
    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})


nextButton.addEventListener('click', () => {
    currentSong++;
    //If the current song is greater than the length of the songsList array, then the currentSong will be 0
    if(currentSong > songsList.length - 1) {
        currentSong = 0;
    }
    loadSong(currentSong);
    playSong();
})

backButton.addEventListener('click', () => {
    currentSong--;
    //If the current song is less than 0, then the currentSong will be the last song of the array
    if(currentSong < 0) {
        currentSong = songsList.length - 1;
    }
   
    loadSong(currentSong);
    playSong();
})

//Update the progress bar
audio.addEventListener('timeupdate', (e) => {
    //Destructuring
    const { duration, currentTime } = e.target;
    //Calculate the progress bar percentage
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
})

//Set the progress bar
progressContainer.addEventListener('click', (e) => {
    //Obtain the width of the progress container
    const width = e.target.clientWidth;
    //Obtain the position of the click
    const clickX = e.offsetX;
    const duration = audio.duration;
    //Set the current time of the audio
    audio.currentTime = (clickX / width) * duration;
})

audio.addEventListener('ended', () => {
    nextButton.click();
})

loadSongs();
