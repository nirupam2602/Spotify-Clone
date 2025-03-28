console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Ek Din Aap Yun", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Ishq", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Ishq Sufiyana", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Janam Dekh lo", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Jeene Bhi De", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Maheroo", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Salamat", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Tere Hawaale", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tum Hi Ho", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Sun Raha Hai Na Tu", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "Hume Tumse Pyaar Kitna", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "Saudebaazi", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
    {songName: "Deewana Kar Raha Hai", filePath: "songs/13.mp3", coverPath: "covers/13.jpg"},
    {songName: "Honey Bunny", filePath: "songs/14.mp3", coverPath: "covers/14.jpg"},
    {songName: "Agar Tum sath Ho", filePath: "songs/15.mp3", coverPath: "covers/15.jpg"},
    {songName: "पहन क चल", filePath: "songs/16.mp3", coverPath: "covers/16.jpg"},
    {songName: "Chal Diye Tum Kahan", filePath: "songs/17.mp3", coverPath: "covers/20.jpg"},
    {songName: "Humdard", filePath: "songs/18.mp3", coverPath: "covers/20.jpg"},
    {songName: "Galliyano", filePath: "songs/19.mp3", coverPath: "covers/20.jpg"},
    {songName: "Jab Tak", filePath: "songs/20.mp3", coverPath: "covers/20.jpg"},
    {songName: "Maniac", filePath: "songs/21.mp3", coverPath: "covers/20.jpg"},
    {songName: "Milne Hai Mujhse Aayi", filePath: "songs/22.mp3", coverPath: "covers/20.jpg"},
    {songName: "Phir Kabhi", filePath: "songs/23.mp3", coverPath: "covers/20.jpg"},
    {songName: "Sajna Da Dil Torya", filePath: "songs/24.mp3", coverPath: "covers/20.jpg"},
    {songName: "Shayad", filePath: "songs/25.mp3", coverPath: "covers/20.jpg"},
   
    
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if (songIndex >= songs.length - 1) {
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

// Automatically play the next song when the current one ends
audioElement.addEventListener('ended', ()=>{
    if(songIndex < songs.length - 1){
        songIndex += 1;
    } else {
        songIndex = 0; // Loop back to the first song
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

let volumeSlider = document.getElementById('volumeSlider');

volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value / 100;
});
