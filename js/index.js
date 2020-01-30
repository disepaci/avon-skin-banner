import { Ratslider } from './ratslider';
function createBanner(selector, html) {
    var target = document.querySelector(selector);
    target.innerHTML = html;
    new Ratslider({
        id: '#my-slider',
        slides: '.slide',
        dots: true,
        handlers: true,
        draggable: true,
        create: true
    }, function (element) {
        console.log('do something');
    });
}
window.ratBanner = createBanner;
//# sourceMappingURL=index.js.map