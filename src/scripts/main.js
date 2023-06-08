class Main {
    constructor() {
        this.header = document.querySelector('.header');
        this.hero = new HeroSlider('.swiper');
        this.sides = document.querySelectorAll('.side');
        this._observers = [];
        this._init();
    }

    _init() {
        new MobileMenu();
        Pace.on('done', this._scrollInit.bind(this));
    }

    destroy() {
        this._observers.forEach(so => so.destroy());
    }

    _scrollInit() {
        this._observers.push(
            new ScrollObserver('#main-content', this._sideAnimation.bind(this), {once: false, rootMargin: "-300px 0px"}),
            new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once: false}),
            new ScrollObserver('.swiper', this._toggleSlideAnimation.bind(this), {once: false}),
            new ScrollObserver('.cover-slide', this._inviewAnimation),
            new ScrollObserver('.appear', this._inviewAnimation),
            new ScrollObserver('.footer', this._inviewAnimation, {once: false}),
            new ScrollObserver('.tween-animate-title', this._textAnimation)
        )
    }

    _toggleSlideAnimation(el, inview) {
        if(inview) {
            this.hero.start();
        } else {
            this.hero.stop();
        }
    }

    _textAnimation(el, inview) {
        if(inview) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }

    _navAnimation(el, inview) {
        if(inview) {
            this.header.classList.remove('triggered');
        } else {
            this.header.classList.add('triggered');
        }
    }

    _sideAnimation(el, inview) {
        if(inview) {
            this.sides.forEach( side => side.classList.add('inview'));
        } else {
            this.sides.forEach( side => side.classList.remove('inview'));
        }
    }

    _inviewAnimation(el, inview) {
        if(inview) {
            el.classList.add('inview');
        } else {
            el.classList.remove('inview');
        }
    }
}

{
    const menuOpen = document.querySelector('#global-container');
    const header = document.querySelector('header');
    const pageTop = document.querySelector('.pagetop');
    const vh = window.innerHeight;
    let time = null;
    const speed = 200;
    const gap = 50; /* ここにgapを追記 */

    function pageTopAction() {
        clearTimeout(time);
        time = setTimeout(function() {
            const scroll = window.pageYOffset;
            const targetDistance = header.getBoundingClientRect().bottom;
            const targetPosition = targetDistance + gap;

            if ( targetPosition < scroll ) {
                if (menuOpen.classList.contains('menu-open')) {
                    if (pageTop.classList.contains('fadeIn')) {
                        pageTop.classList.remove('fadeIn');
                    } 
                } else {
                    pageTop.classList.add('fadeIn');
                }
            } else {
                pageTop.classList.remove('fadeIn');
            }
        }, speed); /* setTimeoutを閉じる */
    }
    window.addEventListener('scroll', pageTopAction);
}

new Main();
