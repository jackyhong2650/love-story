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
        touchThreshold: 10
    });
});
