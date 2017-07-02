$(document).ready(function() {
    "use strict";

    // Toggle main navigation
    $(".cs-toggle-main-navigation").on("click", function () {
        $("#cs-main-navigation").toggle();
    });

    // Toggle search in mobile view
    $(".cs-toggle-main-search, .cs-header-search .close").on("click", function () {
        $(".cs-header-middle .cs-header-search").toggle();
    });        
    
    // Sticky sidebar
    $(".cs-sticky-sidebar").theiaStickySidebar({
        additionalMarginTop: 10
    });

    // Scroll indicator
    $("body.single-post").scrollIndicator({
        bindResize: false
    });

    // Parallax single post
    $(".cs-parallax-element").scrolly({bgParallax: true});

    // Popup login
    $(".cs-top-login").magnificPopup({
        type: 'inline'
    });

    // Popup image
    $(".cs-lightbox-image").magnificPopup({
        type: "image"
    });

    // Tabs
    $(".cs-tab-group").tabs();

    // Accordions
    $(".cs-accordion-group").accordion({
        heightStyle: "content",
        collapsible: true,
        icons: false
    });

    // Post slider
    var mySwiper = new Swiper (".cs-post-slider", {
        autoHeight: true,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev"
    });

    // Full width sldier
    var swiper = new Swiper(".cs-slider-1 .swiper-container", {
        autoHeight: true,
        initialSlide: 1,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        spaceBetween: 20
    });

    // Carousel sldier
    var swiper = new Swiper(".cs-slider-2 .swiper-container", {
        autoHeight: true,
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 5,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        breakpoints: {
            1040: {
                slidesPerView: 2
            },
            800: {
                slidesPerView: 1
            }
        }
    });

    // Regular sldier
    var swiper = new Swiper(".cs-slider-3.swiper-container", {
        autoHeight: true,
        pagination: ".swiper-pagination",
        paginationClickable: true
    });

});