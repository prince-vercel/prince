"use strict";
const BASE_URL = window.location.protocol + "//" + window.location.host,
    PATH_URL = window.location.pathname,
    FULL_URL = window.location.href,
    GET_PARAM = e => new URL(FULL_URL).searchParams.get(e);
var app = [];

function fadeOut(e, t = !1, i = null) {
    if (!e) return !1;
    e.style.opacity = 1,
        function a() {
            (e.style.opacity -= .1) < 0 ? (t ? e.style.display = "none" : e.remove(), i instanceof Function ? i() : window[i] instanceof Function && window[i]()) : requestAnimationFrame(a)
        }()
}

function smoothScroll(e) {
    e && e.scrollIntoView({
        behavior: "smooth"
    })
}

function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
app.header = {
    set: function () {
        const e = document.getElementById("overlay");
        e && document.querySelectorAll("#header .menu-item").forEach((t => {
            if (!t.querySelector(".mega-menu-dropdown-box")) return !1;
            t.addEventListener("mouseover", (function (t) {
                e.classList.add("show")
            })), t.addEventListener("mouseout", (function (t) {
                e.classList.remove("show")
            }))
        }));
        const t = document.getElementById("hamburger");
        t && t.addEventListener("click", (function (e) {
            t.classList.toggle("is-active"), document.body.classList.toggle("navigation-active")
        }))
    },
    init: function () {
        document.getElementById("header") && app.header.set()
    }
}, console.log("%cMade by Orkun & Sekoww", "background:#da4648;color:#fff;padding:10px;font-weight:bold;"), app.heroSlider = {
    swiper: null,
    slider: function () {
        app.heroSlider.swiper = new Swiper("#hero-slider", {
            loop: !1,
            slidesPerView: 1,
            spaceBetween: 0,
            autoplay: {
                delay: 5e3
            },
            speed: 500,
            effect: "fade",
            fadeEffect: {
                crossFade: !0
            },
            lazy: {
                loadPrevNext: !0
            },
            pagination: {
                el: document.querySelector("#hero-slider .swiper-pagination"),
                clickable: !0
            }
        })
    },
    init: function () {
        document.getElementById("hero-slider") && app.heroSlider.slider()
    }
}, app.swiperCardSlider = {
    sliders: [],
    set: function () {
        document.querySelectorAll(".swiper-card-slider").forEach(((e, t) => {
            app.swiperCardSlider.setSwiper(e, t)
        }))
    },
    setSwiper: function (e, t) {
        app.swiperCardSlider.sliders[t] = new Swiper(e, {
            navigation: {
                prevEl: e.querySelector(".btn-navigation.prev"),
                nextEl: e.querySelector(".btn-navigation.next")
            },
            pagination: {
                clickable: !0,
                el: e.querySelector(".slider-pagination")
            },
            speed: 500,
            lazy: !0,
            slidesPerView: "auto",
            spaceBetween: 32,
            pagination: {
                el: e.querySelector(".swiper-pagination"),
                clickable: !0
            }
        })
    },
    init: function () {
        document.querySelector(".swiper-card-slider") && app.swiperCardSlider.set()
    }
}, app.accordion = {
    set: function () {
        document.querySelectorAll(".accordion .btn-accordion").forEach((e => {
            if (e.classList.contains("active")) {
                const t = e.parentElement,
                    i = t.querySelector(".accordion-inner>div").clientHeight;
                t.style.height = (i + e.clientHeight) / 10 + "rem"
            } else {
                e.parentElement.style.height = e.clientHeight / 10 + "rem"
            }
            e.addEventListener("click", (function (e) {
                const t = e.currentTarget,
                    i = t.parentElement,
                    a = i.querySelector(".accordion-inner>div").clientHeight;
                if (t.classList.contains("active")) t.classList.remove("active"), i.style.height = t.clientHeight / 10 + "rem";
                else {
                    let e = i.parentElement;
                    if (e.querySelector(".btn-accordion.active")) {
                        let t = e.querySelector(".btn-accordion.active");
                        t.parentElement.style.height = t.clientHeight / 10 + "rem", t.classList.remove("active")
                    }
                    t.classList.add("active"), i.style.height = (a + t.clientHeight) / 10 + "rem"
                }
            }))
        }))
    },
    init: function () {
        document.querySelector(".accordion") && app.accordion.set()
    }
}, app.swiperVerticalCardSliders = {
    sliders: [],
    set: function () {
        document.querySelectorAll(".swiper-vertical-card-sliders").forEach(((e, t) => {
            app.swiperVerticalCardSliders.setSwiper(e, t)
        }))
    },
    setSwiper: function (e, t) {
        var swiper = new Swiper(e, {
            navigation: {
                prevEl: e.querySelector(".btn-navigation.prev"),
                nextEl: e.querySelector(".btn-navigation.next")
            },
            pagination: {
                clickable: !0,
                el: e.querySelector(".slider-pagination")
            },
            speed: 500,
            autoplay: {
                delay: 2000,
                disableOnInteraction: true, // Kullanıcı etkileşiminde durmasın
                pauseOnMouseEnter: true // Slider üzerine gelindiğinde durmasın
            },
            loop: !0,
            lazy: !0,
            slidesPerView: "auto",
            spaceBetween: 32,
            pagination: {
                el: e.querySelector(".swiper-pagination"),
                clickable: !0
            },
            on: {
                slideChangeTransitionStart: function () {
                    app.swiperVerticalCardSliders.handleSlideChange(e);
                },
                slideChangeTransitionEnd: function () {
                    app.swiperVerticalCardSliders.handleSlideManualChange(swiper);
                }
            }
        });

        app.swiperVerticalCardSliders.sliders[t] = swiper;
    },
    handleSlideChange: function (swiperElement) {
        document.querySelectorAll('.testimonialsText .body-sm').forEach(function (element) {
            var p = element.querySelector('p');
            var readMoreButton = element.querySelector('.read-more');

            // Orijinal yüksekliği kaydet
            var originalHeight = p.clientHeight;

            // 3 satırdan sonraki yüksekliği hesapla
            p.style.display = '-webkit-box';
            p.style.webkitBoxOrient = 'vertical';
            p.style.webkitLineClamp = '3';
            p.style.overflow = 'hidden';
            p.style.textOverflow = 'ellipsis';

            var threeLineHeight = p.clientHeight;

            // Eğer orijinal yükseklik 3 satırdan büyükse butonu göster
            if (originalHeight > threeLineHeight) {
                readMoreButton.style.display = 'inline-block';

                // Butona tıklanınca tüm metni göster ve autoplay'i durdur
                readMoreButton.addEventListener('click', function () {
                    p.style.display = 'block';
                    p.style.webkitBoxOrient = 'unset';
                    p.style.webkitLineClamp = 'unset';
                    p.style.overflow = 'visible';
                    p.style.textOverflow = 'unset';
                    readMoreButton.style.display = 'none';

                    // Swiper autoplay'i durdur
                    var swiper = app.swiperVerticalCardSliders.sliders.find(s => s.el === swiperElement);
                    if (swiper && swiper.autoplay) {
                        swiper.autoplay.stop();
                    }
                });
            }
        });
    },
    handleSlideManualChange: function (swiper) {
        if (!swiper.el.matches(':hover')) { // Slider üstünde değilse
            if (swiper.autoplay) {
                swiper.autoplay.start(); // Autoplay'i yeniden başlat
            }
        }
    },
    init: function (swiperElement) {
        document.querySelector(".swiper-vertical-card-sliders") && app.swiperVerticalCardSliders.set();
        document.querySelectorAll('.testimonialsText .body-sm').forEach(function (element) {
            var p = element.querySelector('p');
            var readMoreButton = element.querySelector('.read-more');

            // Orijinal yüksekliği kaydet
            var originalHeight = p.clientHeight;

            // 3 satırdan sonraki yüksekliği hesapla
            p.style.display = '-webkit-box';
            p.style.webkitBoxOrient = 'vertical';
            p.style.webkitLineClamp = '3';
            p.style.overflow = 'hidden';
            p.style.textOverflow = 'ellipsis';

            var threeLineHeight = p.clientHeight;

            // Eğer orijinal yükseklik 3 satırdan büyükse butonu göster
            if (originalHeight > threeLineHeight) {
                readMoreButton.style.display = 'inline-block';

                // Butona tıklanınca tüm metni göster ve autoplay'i durdur
                readMoreButton.addEventListener('click', function () {
                    const cards = document.querySelectorAll('.testimonialsText .short-card');
                    cards.forEach(card => {
                        card.style.height = 'auto';
                    });
                    p.style.display = 'block';
                    p.style.webkitBoxOrient = 'unset';
                    p.style.webkitLineClamp = 'unset';
                    p.style.overflow = 'visible';
                    p.style.textOverflow = 'unset';
                    readMoreButton.style.display = 'none';

                    // Swiper autoplay'i durdur
                    var swiper = app.swiperVerticalCardSliders.sliders[0];
                    if (swiper && swiper.autoplay) {
                        swiper.autoplay.stop();
                    }
                });
            }
        });
    }
}, app.iframeModal = {
    trigger: function () {
        document.querySelectorAll("[data-iframe-modal]").forEach((function (e) {
            e.addEventListener("click", (function (e) {
                e.preventDefault(), app.iframeModal.open(e.target)
            }))
        })), app.iframeModal.shadow(), app.iframeModal.closeBtn()
    },
    getYoutubeId: function (e) {
        return void 0 !== (e = e.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/))[2] ? e[2].split(/[^0-9a-z_\-]/i)[0] : e
    },
    open: function (e) {
        var t = e.getAttribute("href"),
            i = e.getAttribute("data-youtube"),
            a = e.getAttribute("data-podcast");
        document.getElementsByTagName("html")[0].classList.add("is-active-modal"), document.getElementById("iframe-modal").classList.add("show"), "true" == a && document.getElementById("iframe-modal").classList.add("type-podcast"), "true" == i ? app.iframeModal.setIframe("https://www.youtube.com/embed/" + app.iframeModal.getYoutubeId(t)) : app.iframeModal.setIframe(t)
    },
    setIframe: function (e) {
        var t = document.createElement("iframe");
        t.setAttribute("id", "iframe-modal-iframe"), t.setAttribute("src", e), document.getElementById("iframe-modal").querySelector(".inner-huge").appendChild(t)
    },
    closeModal: function () {
        document.getElementsByTagName("html")[0].classList.remove("is-active-modal"), document.querySelectorAll(".full-modal").forEach((e => {
            e.classList.remove("show")
        })), document.getElementById("iframe-modal-iframe") && document.getElementById("iframe-modal-iframe").remove(), document.getElementById("iframe-modal").classList.remove("type-podcast")
    },
    closeBtn: function () {
        document.querySelectorAll("[data-iframe-modal-close]").forEach((e => {
            e.addEventListener("click", (function (e) {
                e.preventDefault(0), app.iframeModal.closeModal()
            }))
        }))
    },
    shadow: function () {
        document.getElementById("iframe-modal-overlay").addEventListener("click", (function () {
            app.iframeModal.closeModal()
        }))
    },
    init: function () {
        document.querySelector("[data-iframe-modal]") && app.iframeModal.trigger()
    }
}, app.navigation = {
    set: function () {
        document.querySelectorAll("#navigation .primary-menu .menu-item").forEach((e => {
            e.querySelector(".nav-dropdown-menu") && (e.style.height = e.querySelector("&>a").offsetHeight + "px", e.querySelector("&>a").addEventListener("click", (function (e) {
                e.preventDefault();
                const t = e.currentTarget.parentElement;
                t.classList.toggle("active"), t.classList.contains("active") ? t.style.height = e.currentTarget.offsetHeight + t.querySelector(".nav-dropdown-menu").offsetHeight + "px" : t.style.height = e.currentTarget.offsetHeight + "px"
            })))
        }))
    },
    init: function () {
        document.getElementById("navigation") && app.navigation.set()
    }
}, app.animation = {
    set: function () {
        document.querySelectorAll("[data-scroll-animation]").forEach((e => {
            e.classList.add("scroll-animation-fade-in")
        })), app.animation.observer()
    },
    observer: function () {
        const e = document.querySelectorAll(".scroll-animation-fade-in"),
            t = new IntersectionObserver((e => {
                e.forEach((e => {
                    e.isIntersecting && (e.target.classList.add("show"), t.unobserve(e.target))
                }))
            }), {
                threshold: .1
            });
        e.forEach((e => {
            t.observe(e)
        }))
    },
    init: function () {
        document.querySelector("[data-scroll-animation]") && app.animation.set()
    }
}, document.addEventListener("click", (e => {
    if ("A" !== e.target.tagName) return !1;
    const t = e.target,
        i = t.getAttribute("href");
    if ("#" === i) e.preventDefault(), smoothScrollToTop();
    else if ("#" === i.charAt(0) || "/" === i.charAt(0) && "#" === i.charAt(1)) {
        if (!t.hash) return !1;
        const i = document.querySelector(t.hash);
        i && (e.preventDefault(), smoothScroll(i))
    }
})), window.onload = () => {
    document.querySelectorAll("img").forEach((e => {
        e.complete && void 0 !== e.naturalWidth && e.naturalWidth <= 0 && (e.src = BASE_URL + "/img/no-image.jpg")
    }))
}, document.addEventListener("DOMContentLoaded", (() => {
    document.querySelectorAll("a").forEach((e => {
        e.hasAttribute("href") && e.href.startsWith("tel:") && (e.href = "tel:" + e.href.replaceAll(/[^\d+]/g, ""))
    })), document.querySelectorAll("a").forEach((e => {
        e.hasAttribute("target") && "_blank" === e.getAttribute("target") && e.setAttribute("rel", "noopener noreferrer nofollow")
    })), document.addEventListener("contextmenu", (e => {
        "IMG" === e.target.nodeName && e.preventDefault()
    })), app.header.init(), app.heroSlider.init(), app.swiperCardSlider.init(), app.accordion.init(), app.swiperVerticalCardSliders.init(), app.iframeModal.init(), app.navigation.init(), app.animation.init()
}));