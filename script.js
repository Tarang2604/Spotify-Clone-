
console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('songs/01.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let currentSongName = document.getElementById('currentSongName'); // ✅ new
let currentTimeDisplay = document.getElementById('currentTimeDisplay');
let waveform = document.getElementById('waveform');

// Helper function to format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}


let songs = [
    {songName: "I'M Done - Maan Panu", filepath: "songs/01.mp3", coverPath: "covers/cover1.jpeg"},
    {songName: "Tum agar saath Dene ka - Mahendra Kapoor", filepath: "songs/02.mp3", coverPath: "covers/2.jpg"},
    {songName: "Meherbani - Arko Mukherjee", filepath: "songs/03.mp3", coverPath: "covers/cover4"},
    {songName: "Jab se tere naina - Shaan", filepath: "songs/04.mp3", coverPath: "covers/cover3"},
    {songName: "Afreen Afreen - Rahat Fateh Ali Khan", filepath: "songs/05.mp3", coverPath: "covers/8.jpg"},
    {songName: "Raat Kali Khawab Mein - Sanam Puri", filepath: "songs/06.mp3", coverPath: "covers/raat kali.jpg"}
];

// play / pause main button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        waveform.classList.remove('paused');
        currentSongName.innerText = songs[songIndex].songName; // ✅ show name
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        waveform.classList.add('paused');

    }
});

// update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    // show live time
    if (!isNaN(audioElement.duration)) {
        currentTimeDisplay.innerText = `${formatTime(audioElement.currentTime)} / ${formatTime(audioElement.duration)}`;
    }
});


myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// make all icons play icons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// handle individual song play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filepath;
        currentSongName.innerText = songs[songIndex].songName; // ✅ dynamic name
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

// next button
// document.getElementById('next').addEventListener('click', () => {
//     if (songIndex >= songs.length - 1) songIndex = 0;
//     else songIndex += 1;
//     audioElement.src = songs[songIndex].filepath;
//     currentSongName.innerText = songs[songIndex].songName; // ✅ show name
//     audioElement.currentTime = 0;
//     audioElement.play();
//     masterPlay.classList.remove('fa-circle-play');
//     masterPlay.classList.add('fa-circle-pause');
// });

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) songIndex = 0;
    else songIndex += 1;

    makeAllPlays(); // reset all icons to play

    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    currentSongName.innerText = songs[songIndex].songName;
    waveform.classList.remove('paused');

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

    // 🔽 Highlight the new song’s icon
    let playingIcon = document.getElementById(songIndex);
    playingIcon.classList.remove('fa-circle-play');
    playingIcon.classList.add('fa-circle-pause');
});


// // previous button
// document.getElementById('previous').addEventListener('click', () => {
//     if (songIndex <= 0) songIndex = 0;
//     else songIndex -= 1;
//     audioElement.src = songs[songIndex].filepath;
//     currentSongName.innerText = songs[songIndex].songName; // ✅ show name
//     audioElement.currentTime = 0;
//     audioElement.play();
//     masterPlay.classList.remove('fa-circle-play');
//     masterPlay.classList.add('fa-circle-pause');
// });

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) songIndex = 0;
    else songIndex -= 1;

    makeAllPlays(); // reset all icons to play

    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    currentSongName.innerText = songs[songIndex].songName;
    waveform.classList.remove('paused');

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

    // 🔽 Highlight the correct current icon
    let playingIcon = document.getElementById(songIndex);
    playingIcon.classList.remove('fa-circle-play');
    playingIcon.classList.add('fa-circle-pause');
});
