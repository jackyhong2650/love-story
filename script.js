document.addEventListener('DOMContentLoaded', function() {
    var sidebarToggle = document.getElementById('sidebar-toggle');
    var sidebar = document.getElementById('sidebar');
    var mainContent = document.getElementById('main-content');

    function toggleSidebar() {
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            mainContent.style.marginLeft = '0';
            sidebarToggle.style.left = '-10px';
        } else {
            sidebar.classList.add('open');
            mainContent.style.marginLeft = '250px';
            sidebarToggle.style.left = '250px';
        }
    }

    sidebarToggle.addEventListener('mouseover', function() {
        if (!sidebar.classList.contains('open')) {
            sidebarToggle.style.left = '10px';
        }
    });

    sidebarToggle.addEventListener('mouseout', function() {
        if (!sidebar.classList.contains('open')) {
            sidebarToggle.style.left = '-10px';
        }
    });

    sidebarToggle.addEventListener('click', toggleSidebar);

    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev">❮</button>',
        nextArrow: '<button type="button" class="slick-next">❯</button>',
        touchThreshold: 10,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true
    });

    var backgroundMusic = document.getElementById('background-music');
    var playPauseButton = document.getElementById('play-pause');
    var prevTrackButton = document.getElementById('prev-track');
    var nextTrackButton = document.getElementById('next-track');
    var volumeControl = document.getElementById('volume-control');
    var progressBar = document.getElementById('progress-bar');
    var vinylRecord = document.querySelector('.vinyl-record');
    var tonearm = document.getElementById('tonearm');
    var musicContainer = document.querySelector('.background-music-container');

    var tracks = [
        { src: 'music1.mp3', cover: 'cover1.jpg' },
        { src: 'music2.mp3', cover: 'cover2.jpg' },
        { src: 'music3.mp3', cover: 'cover3.jpg' },
        { src: 'music4.mp3', cover: 'cover4.jpg' },
        { src: 'music5.mp3', cover: 'cover5.jpg' }
    ];
    var currentTrackIndex = 0;

    function loadTrack(index) {
        backgroundMusic.src = tracks[index].src;
        document.querySelector('.album-cover').src = tracks[index].cover;
        backgroundMusic.load();
    }

    function playTrack() {
        backgroundMusic.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        vinylRecord.style.animationPlayState = 'running';
        tonearm.classList.add('playing');
    }

    function pauseTrack() {
        backgroundMusic.pause();
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        vinylRecord.style.animationPlayState = 'paused';
        tonearm.classList.remove('playing');
    }

    playPauseButton.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            playTrack();
        } else {
            pauseTrack();
        }
    });

    prevTrackButton.addEventListener('click', function() {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        playTrack();
    });

    nextTrackButton.addEventListener('click', function() {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        playTrack();
    });

    // 自动播放下一首音乐
    backgroundMusic.addEventListener('ended', function() {
        nextTrackButton.click();
    });

    // 初始化音量
    backgroundMusic.volume = volumeControl.value;

    // 音量控制
    volumeControl.addEventListener('input', function() {
        backgroundMusic.volume = volumeControl.value;
    });

    // 进度条控制
    backgroundMusic.addEventListener('timeupdate', function() {
        var progress = (backgroundMusic.currentTime / backgroundMusic.duration) * 100;
        progressBar.value = progress;
    });

    progressBar.addEventListener('input', function() {
        var newTime = backgroundMusic.duration * (progressBar.value / 100);
        backgroundMusic.currentTime = newTime;
    });

    // 加载初始轨道
    loadTrack(currentTrackIndex);

    // 半透明效果控制
    var hideTimeout;

    function showMusicContainer() {
        clearTimeout(hideTimeout);
        musicContainer.classList.remove('hidden');
        hideTimeout = setTimeout(function() {
            musicContainer.classList.add('hidden');
        }, 3000); // 3秒后变为半透明
    }

    musicContainer.addEventListener('mouseover', function() {
        clearTimeout(hideTimeout);
        musicContainer.classList.remove('hidden');
    });

    musicContainer.addEventListener('mouseout', showMusicContainer);

    // 初始调用
    showMusicContainer();
});
