var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* Ratslider v1.0.0
 * By Rantasma
 * Github: https://github.com/rantasma/ratslider
 */
var RatsliderCore = /** @class */ (function () {
    function RatsliderCore(props, onChange, set, reset, get) {
        this.props = props;
        this.set = set;
        this.reset = reset;
        this.get = get;
        this.onChange = onChange;
        this.slidesLength = document.querySelectorAll(props.slides).length;
        this.sliderId = "" + props.id;
        if (props.init) {
            this.setCurrentSlide(0);
        }
    }
    RatsliderCore.prototype.setCurrentSlide = function (index, goto) {
        if (goto === void 0) { goto = false; }
        var max = this.getSliderLength();
        if (!goto) {
            index = index == 0 ? 0 : index == max ? max - 1 : index - 1;
        }
        if (typeof this.set == 'function') {
            this.set(this.getSlides()[index], index);
        }
        else {
            this.getSlides()[index].className += " current";
        }
    };
    RatsliderCore.prototype.resetCurrentSlide = function () {
        if (typeof this.reset == 'function') {
            this.reset(this.getCurrentSlide(), this.getNodeIndex(this.getCurrentSlide()));
        }
        else {
            var regex = new RegExp('current', 'g');
            var current = this.getCurrentSlide();
            current.className = current.className.replace(regex, '');
        }
    };
    RatsliderCore.prototype.getCurrentSlide = function () {
        if (typeof this.get == 'function') {
            return this.get();
        }
        else {
            return document.querySelector(this.sliderId + " .current");
        }
    };
    RatsliderCore.prototype.getCurrentSlideIndex = function () {
        return this.getNodeIndex(this.getCurrentSlide());
    };
    RatsliderCore.prototype.getSlides = function () {
        return document.querySelectorAll(this.sliderId + " " + this.props.slides);
    };
    RatsliderCore.prototype.getSliderLength = function () {
        return this.getSlides().length;
    };
    RatsliderCore.prototype.getNodeIndex = function (element) {
        var arr = Array.from(this.getSlides());
        return arr.indexOf(element) + 1;
    };
    RatsliderCore.prototype.getMetadata = function () {
        return {
            container: document.querySelector(this.sliderId),
            id: this.sliderId,
            slidesClass: this.props.slides
        };
    };
    RatsliderCore.prototype.next = function (callback) {
        var currentElement = this.getCurrentSlide();
        var currentIndex = this.getCurrentSlideIndex();
        var slides = this.getSlides();
        var slidesLength = this.getSliderLength();
        this.resetCurrentSlide();
        if (currentIndex == slidesLength) {
            this.setCurrentSlide(0);
            typeof callback == 'function' ? callback(currentElement, slides[0], slides[1]) : null;
        }
        else {
            this.setCurrentSlide(currentIndex + 1);
            typeof callback == 'function' ? callback(currentElement, slides[currentIndex], currentIndex == slidesLength - 1 ? slides[0] : slides[(currentIndex + 1)]) : null;
        }
        typeof this.onChange == 'function' ? this.onChange(slides[currentIndex], currentIndex == slidesLength ? 0 : currentIndex, slides) : null;
    };
    RatsliderCore.prototype.prev = function (callback) {
        var slides = this.getSlides();
        var slidesLength = this.getSliderLength();
        var currentElement = this.getCurrentSlide();
        var currentIndex = this.getCurrentSlideIndex();
        this.resetCurrentSlide();
        if (currentIndex == 1) {
            this.setCurrentSlide(slidesLength);
            callback(slides[0], //prev
            slides[slidesLength - 1], //current
            currentElement //next
            );
        }
        else {
            this.setCurrentSlide(currentIndex - 1);
            callback(currentIndex == 1 ? slides[slidesLength - 1] : slides[currentIndex - 2], slides[currentIndex - 2], currentElement);
        }
        typeof this.onChange == 'function' ? this.onChange(slides[currentIndex], currentIndex == 1 ? slidesLength - 1 : currentIndex - 2, slides) : null;
    };
    RatsliderCore.prototype.goTo = function (to, callback) {
        var slides = this.getSlides();
        var slidesLength = this.getSliderLength();
        var currentElement = this.getCurrentSlide();
        var currentIndex = this.getCurrentSlideIndex();
        if (to >= 0 && to < slidesLength && to != currentIndex - 1) {
            this.resetCurrentSlide();
            this.setCurrentSlide(to, true);
            typeof callback == 'function' ? callback(slides[currentIndex - 1], slides[to], slides[to > slidesLength ? to : 0]) : null;
            typeof this.onChange == 'function' ? this.onChange(slides[to], to, slides) : null;
        }
    };
    return RatsliderCore;
}());
export { RatsliderCore };
var Ratslider = /** @class */ (function (_super) {
    __extends(Ratslider, _super);
    function Ratslider(props, animationEnd) {
        var _this = _super.call(this, {
            id: props.id,
            slides: props.slides,
        }, onChange, setCurrentSlide, resetCurrentSlide, getCurrentSlide) || this;
        function setCurrentSlide(element, index) {
            element.setAttribute('ratslider', 'current-slide');
        }
        function resetCurrentSlide(element, index) {
            element.setAttribute('ratslider', 'slide');
        }
        function getCurrentSlide() {
            return document.querySelector(props.id + " [ratslider*=current-slide]");
        }
        function onChange(element, index, slides) {
            var dots = document.querySelectorAll(props.id + "[ratslider=container] .dotHandler span");
            for (var i = 0; i < dots.length; i++) {
                dots[i].className = '';
            }
            dots[index].className = "ratslider-dot-active";
        }
        // set global constants
        _this.props = props;
        _this.metadata = _super.prototype.getMetadata.call(_this);
        _this.containerElement = _this.metadata.container;
        _this.containerSelector = '#' + _this.containerElement.getAttribute('id');
        _this.prefix = 'ratslider';
        _this.defaultAttr = 'slide';
        _this.currentSlideAttr = 'current-slide';
        _this.containerAttr = 'container';
        _this.nextSlideAttr = 'reverse-slide';
        _this.prevSlideAttr = 'foward-slide';
        if (props.create) {
            _this.create();
        }
        return _this;
    }
    Ratslider.prototype.create = function () {
        var _this = this;
        var handlers = document.querySelectorAll(this.props.id + ' span.handler');
        var dots = document.querySelector('[ratslider=container] div.dotHandler');
        _super.prototype.setCurrentSlide.call(this, 0);
        this.setAttribute(this.containerElement, this.containerAttr);
        _super.prototype.getSlides.call(this).forEach(function (slide) {
            if (slide.getAttribute(_this.prefix) != _this.currentSlideAttr) {
                _this.setAttribute(slide, _this.defaultAttr);
            }
            slide.addEventListener("animationend", function (a) {
                a.animationName == 'in-reverse' || a.animationName == 'in-foward' ? typeof animationEnd == 'function' ? animationEnd(a) : null : null;
            }, false);
        });
        if (!document.querySelector(this.props.id + " [ratslider=" + this.currentSlideAttr + "]")) {
            this.setAttribute(this.getSlides()[0], this.currentSlideAttr);
        }
        if (this.props.dots && !dots) {
            this.dots();
            document.querySelector(this.props.id + "[ratslider=container] .dotHandler span").className = 'ratslider-dot-active';
        }
        if (this.props.handlers && handlers.length == 0) {
            this.handlers();
        }
        if (this.props.draggable) {
            if (typeof draggable == 'object') {
                var op = this.props.draggable;
                drag(op.timeDragging, op.mobileDistance, op.desktopDistance);
            }
            else {
                this.drag();
            }
        }
    };
    Ratslider.prototype.destroy = function () {
        var _this = this;
        var handlers = document.querySelectorAll(this.props.id + ' span.handler');
        var container = document.querySelector(this.props.id);
        var dots = document.querySelector('[ratslider=container] div.dotHandler');
        var slides = _super.prototype.getSlides.call(this);
        if (this.props.handlers) {
            container.removeChild(handlers[0]);
            container.removeChild(handlers[1]);
        }
        if (this.props.dots) {
            container.removeChild(dots);
        }
        if (this.props.draggable) {
            slides.forEach(function (slide) {
                slide.removeEventListener('mousedown', _this.handleMouseDown);
                slide.removeEventListener('mouseup', _this.handleMouseUp);
                slide.addEventListener('touchstart', _this.handleTouchStart);
                slide.removeEventListener('touchmove', _this.handleTouchMove);
                slide.removeEventListener('touchend', _this.handleTouchEnd);
            });
        }
        container.removeAttribute('ratslider');
        slides.forEach(function (slide) {
            slide.removeAttribute('ratslider');
        });
    };
    Ratslider.prototype.setAttribute = function (selector, value) {
        if (typeof selector == 'object') {
            selector.setAttribute(this.prefix, value);
        }
        else {
            var containerSelector = this.containerSelector + ' ';
            document.querySelector(containerSelector + selector).setAttribute(this.prefix, value);
        }
    };
    Ratslider.prototype.cleanAttributes = function () {
        var _this = this;
        this.getSlides().forEach(function (slide) {
            var attr = slide.getAttribute(_this.prefix);
            if (attr == _this.nextSlideAttr) {
                _this.setAttribute(slide, _this.defaultAttr);
            }
            if (attr == _this.prevSlideAttr) {
                _this.setAttribute(slide, _this.defaultAttr);
            }
        });
    };
    Ratslider.prototype.drag = function (createDestroy, timeDragging, mobileDistance, desktopDistance) {
        var _this = this;
        if (timeDragging === void 0) { timeDragging = 200; }
        if (mobileDistance === void 0) { mobileDistance = 200; }
        if (desktopDistance === void 0) { desktopDistance = 100; }
        var pos = {};
        this.handleMouseDown = function (e) {
            pos.init = e.clientX;
        };
        this.handleMouseUp = function (e) {
            pos.end = e.clientX;
            if (pos.init < pos.end - desktopDistance) {
                _this.prev();
            }
            else if (pos.init > pos.end + desktopDistance) {
                _this.next();
            }
        };
        this.handleTouchStart = function (e) {
            pos.init = e.touches[0].clientX;
        };
        this.handleTouchMove = function (e) {
            pos.end = e.touches[0].clientX;
        };
        this.handleTouchEnd = function (e) {
            if (pos.init < pos.end - mobileDistance) {
                _this.prev();
            }
            else if (pos.init > pos.end + mobileDistance) {
                _this.next();
            }
            pos.init = 0;
            pos.end = 0;
            _this.dragValidator = false;
        };
        this.getSlides().forEach(function (slide) {
            slide.addEventListener('mousedown', _this.handleMouseDown);
            slide.addEventListener('mouseup', _this.handleMouseUp);
            slide.addEventListener('touchstart', _this.handleTouchStart);
            slide.addEventListener('touchmove', _this.handleTouchMove);
            slide.addEventListener('touchend', _this.handleTouchEnd);
        });
    };
    Ratslider.prototype.next = function (callback) {
        var _this = this;
        _super.prototype.next.call(this, function (prev, current, next) {
            _this.cleanAttributes();
            _this.setAttribute(current, _this.currentSlideAttr + "-" + _this.nextSlideAttr);
            _this.setAttribute(prev, _this.nextSlideAttr);
            typeof callback == 'function' ? callback(prev, current, next) : null;
        });
    };
    Ratslider.prototype.prev = function (callback) {
        var _this = this;
        _super.prototype.prev.call(this, function (prev, current, next) {
            _this.cleanAttributes();
            _this.setAttribute(current, _this.currentSlideAttr + "-" + _this.prevSlideAttr);
            _this.setAttribute(next, _this.prevSlideAttr);
            typeof callback == 'function' ? callback(prev, current, next) : null;
        });
    };
    Ratslider.prototype.goTo = function (index, callback) {
        var _this = this;
        _super.prototype.goTo.call(this, index, function (prev, current, next) {
            _this.cleanAttributes();
            if (Number(index) + 1 > _this.getNodeIndex(prev)) {
                _this.setAttribute(current, _this.currentSlideAttr + "-" + _this.nextSlideAttr);
                _this.setAttribute(prev, _this.nextSlideAttr);
            }
            else {
                _this.setAttribute(current, _this.currentSlideAttr + "-" + _this.prevSlideAttr);
                _this.setAttribute(prev, _this.prevSlideAttr);
            }
            typeof callback == 'function' ? callback(prev, current, next) : null;
        });
    };
    Ratslider.prototype.handlers = function () {
        var _this = this;
        var right = document.createElement("span");
        right.innerHTML = "&#10097;";
        right.className = 'next handler';
        var left = document.createElement("span");
        left.innerHTML = "&#10096;";
        left.setAttribute('id', "prev");
        left.className = 'prev handler';
        this.containerElement.insertBefore(left, this.containerElement.firstElementChild);
        this.containerElement.appendChild(right);
        document.querySelector(this.containerSelector + " span.prev.handler").addEventListener('click', function (e) {
            _this.prev();
        });
        document.querySelector(this.props.id + " .next.handler").addEventListener('click', function (e) {
            _this.next();
        });
    };
    Ratslider.prototype.dots = function () {
        var _this = this;
        var dotContainer = document.createElement('div');
        dotContainer.className = 'dotHandler';
        this.containerElement.appendChild(dotContainer);
        for (var i = 0; i < document.querySelectorAll(this.props.slides).length; i++) {
            var dot = document.createElement('span');
            dot.setAttribute('slide', i);
            dotContainer.appendChild(dot);
            dot.addEventListener('click', function (e) {
                var index = e.target.getAttribute('slide');
                _this.goTo(index);
            });
        }
    };
    return Ratslider;
}(RatsliderCore));
export { Ratslider };
//# sourceMappingURL=ratslider.js.map