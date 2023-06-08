class MobileMenu {
  constructor() {
    this.DOM = {};
    this.DOM.btn = document.querySelector(".mobile-menu__btn");
    this.DOM.cover = document.querySelector(".mobile-menu__cover");
    this.DOM.link = document.querySelector(".mobile-menu__main");
    this.DOM.container = document.querySelector("#global-container");
    this.DOM.pageTop = document.querySelector(".pagetop");
    this.eventType = this._getEventType();
    this._addEvent();
  }

  _getEventType() {
    const isTouchCapable = "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch);
    return isTouchCapable ? "touchstart" : "click";
  }

  _toggle() {
    this.DOM.container.classList.toggle("menu-open");
    if (this.DOM.container.classList.contains('menu-open')) {
      if (this.DOM.pageTop.classList.contains('fadeIn')) {
        this.DOM.pageTop.classList.remove('fadeIn');
      }
    }
  }

  _addEvent() {
    this.DOM.btn.addEventListener(this.eventType, this._toggle.bind(this));
    this.DOM.cover.addEventListener(this.eventType, this._toggle.bind(this));
    this.DOM.link.addEventListener(this.eventType, this._toggle.bind(this));
  }
}
