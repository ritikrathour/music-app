// const musciApi =async ()=>{
//     const url = 'https://royalty-music-net-free-sheet-music-websites.p.rapidapi.com/royaltymusic.net';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '52781361b4msh47d974963f8ae52p1ea049jsne7b5f80766c5',
// 		'X-RapidAPI-Host': 'royalty-music-net-free-sheet-music-websites.p.rapidapi.com'
// 	}
// }
// console.log("hello");

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.test();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
// }
let songList = [
    { songname: "BHOLENATH -A LOVE STORY", artist: "Hansraj Raghuwanshi", songImage: "./images/05.jpeg", src: "musics/BHOLENATH -A LOVE STORY- 2020 By Kaka (DjWorldTau.In).mp3" },
    { songname: "Shambhoo Ik Tu Hi Tu", artist: "Hansraj Raghuwanshi", songImage: "./images/02.jpg", src: "musics/Shambhoo Ik Tu Hi Tu - Hansraj Raghuwanshi.mp3" },
    { songname: "Mera Dil Ye Pukare Aaja", artist: "Unknown", songImage: "./images/06.jpeg", src: "musics/Mera Dil Ye Pukare Aaja.mp3" },
    { songname: "Filhaal2 Mohabbat", artist: "amlijatt", songImage: "./images/05.jpeg", src: "musics/Filhaal2 Mohabbat-(Mr-Jatt.com).mp3" },
    { songname: "Shambhoo Ik Tu Hi Tu", artist: "Hansraj Raghuwanshi", songImage: "./images/02.jpg", src: "musics/Shambhoo Ik Tu Hi Tu - Hansraj Raghuwanshi.mp3" },
    { songname: "Libaas", artist: "amlijatt", songImage: "./images/01.jpg", src: "musics/Libaas - (amlijatt.in).mp3" },
    { songname: "Shambhoo Ik Tu Hi Tu", artist: "Hansraj Raghuwanshi", songImage: "./images/02.jpg", src: "musics/Shambhoo Ik Tu Hi Tu - Hansraj Raghuwanshi.mp3" },
];
// variables

let playPause = document.querySelector("#playPause"),
    music_image = document.querySelector(".music_image img"),
    music_name = document.querySelector(".music_name"),
    music_artists = document.querySelector(".music_artists .name"),
    retweet = document.querySelector("#retweet"),
    prevMusic = document.querySelector("#prev"),
    nextMusic = document.querySelector("#next"),
    progress_bar = document.querySelector(".progress_bar"),
    music_listMain = document.querySelector("#music_list"),
    main_music = document.querySelector("#main_music"),
    progress_area = document.querySelector(".progress_area");

let i = 0
window.addEventListener("load", () => {
    music_image.src = songList[i].songImage;
    music_name.textContent = songList[i].songname;
    music_artists.textContent = songList[i].artist;
    main_music.src = songList[i].src;
})
let isPlaying = true;
const Play = () => {
    if (isPlaying == true) {
        playMusic()
    } else {
        pauseMusic()
    }
}
// play music 
const playMusic = () => {
    isPlaying = false;
    main_music.play();
    playPause.classList.replace("fa-play", "fa-pause");
}
// pause music 
const pauseMusic = () => {
    isPlaying = true;
    main_music.pause();
    playPause.classList.replace("fa-pause", "fa-play");
}
// next music
let nextMusicPlay = () => {
    i++
    if (i > songList.length - 1) {
        i = 0;
    }
    music_image.src = songList[i].songImage;
    music_name.textContent = songList[i].songname;
    music_artists.textContent = songList[i].artist;
    main_music.src = songList[i].src;
    playMusic();
}
nextMusic.addEventListener("click", nextMusicPlay);
// prev music 
prevMusic.addEventListener("click", () => {
    i--;
    if (i < 0) {
        i = songList.length - 1
    }
    music_image.src = songList[i].songImage;
    music_name.textContent = songList[i].songname;
    music_artists.textContent = songList[i].artist;
    main_music.src = songList[i].src;
    playMusic();
});
playPause.addEventListener("click", Play);
// progreesBar
main_music.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progress_bar.style.width = progressWidth + "%";

    let music_current = document.querySelector(".music_current");
    let music_duration = document.querySelector(".music_duration");
    main_music.addEventListener("loadeddata", () => {
        let audioDuration = main_music.duration; 
        let min = Math.floor(audioDuration / 60)
        let sec = Math.floor(audioDuration % 60);
        if (sec < 10) {
            sec = "0" + sec;
        }
        music_duration.innerHTML = min + ":" + sec;
    })
 
    let current_min = Math.floor(currentTime / 60)
    let current_sec = Math.floor(currentTime % 60);
    if (current_sec < 10) {
        current_sec = "0" + current_sec;
    }
    music_current.innerHTML = current_min + ":" + current_sec;
})
// music seek 
progress_area.addEventListener("click", (e) => {
    let progressWidthValue = progress_area.clientWidth
    let progressOffsetX = e.offsetX;
    let songDuration = main_music.duration;
    main_music.currentTime = (progressOffsetX / progressWidthValue) * songDuration;
    playMusic()
})
main_music.addEventListener("ended", nextMusicPlay);
