const section = document.querySelector('section');
const playlistContainer = document.querySelector('.playlist-container');
const coverContainer = document.querySelector('.cover');
const coverImage = document.getElementById('cover-image');
const audio = document.getElementById("audio")
const title = document.querySelector('.title');
const controlButtons = document.querySelector('.control-buttons');
const playButton = document.querySelector('.play-button');
const imagePause = document.getElementById('image-pause');
//const pauseButton = document.querySelector('.pause-button');
const backButton = document.querySelector('.back-button');
const nextButton = document.querySelector('.next-button');
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.querySelector('.progress-bar');
const songsContainer = document.querySelector('.songs-container');
const songs = document.querySelector('.songs');

const songsList = [
    {
        title: 'Azul',
        cover: './cover/azul.jpg',
        path: './media/azul.mp3'
    },
    {
        title: 'Pegadito',
        cover: './cover/azul.jpg',
        path: './media/pegadito.mp3'
    },
    {
        title: 'No te apartes de mi',
        cover: './cover/azul.jpg',
        path: './media/noteapartes.mp3'
    }

]

let currentSong = 0;
let isPlaying = false;

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

function loadSong(index) {
    currentSong = index;
    title.textContent = songsList[currentSong].title;
    coverImage.src = songsList[currentSong].cover;
    audio.src = songsList[currentSong].path;
    audio.playbackRate = 1.0;
    playSong();

}


function playSong() {
    imagePause.src = './icons/pause-button.png';
    isPlaying = true;
    audio.play();

}

function pauseSong() {
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

loadSongs();
nextButton.addEventListener('click', () => {
    currentSong++;
    if(currentSong > songsList.length - 1) {
        currentSong = 0;
    }
    loadSong(currentSong);
    playSong();
})

backButton.addEventListener('click', () => {
    currentSong--;
    if(currentSong < 0) {
        currentSong = songsList.length - 1;
    }
   
    loadSong(currentSong);
    playSong();
})

audio.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
})


progressContainer.addEventListener('click', (e) => {
    const width = e.target.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
})

audio.addEventListener('ended', () => {
    nextButton.click();
})

