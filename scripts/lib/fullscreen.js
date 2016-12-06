const $ = require('jquery');

function isFullScreen() {
    return $('body').hasClass('fullscreen');
}

function handleFullscreenToggle () {
    if (isFullScreen()) {
        $('body').removeClass('fullscreen');
    } else {
        $('body').addClass('fullscreen');
    }
}

export function launchIntoFullscreen (element) {
    var success = true;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else {
        success = false;
    }

    return success;
}

export function exitFullscreen () {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

export function toggleFullScreen(element) {
    if (document.fullscreenElement) {
        exitFullscreen();
    } else {
        launchIntoFullscreen(element);
    }
}

export function initEventHandling () {
    $(document).on('fullscreenchange', function () {
        handleFullscreenToggle();
    });

    $(document).on('webkitfullscreenchange', function () {
        handleFullscreenToggle();
    });
}