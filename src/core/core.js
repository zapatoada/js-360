import getHandler from '../handlers/handler';

export default function generate360view(containerId, sources) {
    let current = 0, images;

    function incrementCurrentImage(i) {
        current += i;
        if (current === images.length) {
            current = 0;
        } else if (current < 0) {
            current = images.length - 1;
        }
    }

    function hideImages() {
        for (var i = 1, max = images.length; i < max; i++) {
            images[i].style.display = 'none';
        }
    }

    function toggleImages(i) {
        images[current].style.display = 'none';
        incrementCurrentImage(i);
        images[current].style.display = 'block';
    }

    const container = document.getElementById(containerId);
    const handler = getHandler(container);
    images = document.querySelectorAll("#" + containerId + " img");
    if(!images.length && sources && sources.length) {
        container.innerHTML = sources.map(i=>'<img src="' + i + '" />').join('');
        images = document.querySelectorAll("#" + containerId + " img");
    }
    hideImages();

    handler.subscribe(toggleImages);
}
