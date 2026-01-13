// Swiper ve DOM'un hazır olmasını bekle
(function () {
  function initCustomScripts() {
    // Swiper kontrolü
    if (typeof Swiper === 'undefined') {
      console.warn('⚠️ [custom5e1f.js] Swiper henüz yüklenmedi, tekrar denenecek...')
      setTimeout(initCustomScripts, 100)
      return
    }

    // Swiper Awards slider
    const swiperAwardsElement = document.querySelector('.swiper-awards')
    if (swiperAwardsElement) {
      try {
        const swiper2 = new Swiper('.swiper-awards', {
          loop: true,
          autoplay: {
            delay: 5000
          },
          slidesPerView: 5,
          spaceBetween: 10,
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 20
            }
          }
        })
        console.log('✅ [custom5e1f.js] Swiper Awards slider başlatıldı')
      } catch (error) {
        console.error('❌ [custom5e1f.js] Swiper Awards slider hatası:', error)
      }
    }

    // Visa ve Country select'leri
    var visaSelect = document.querySelector('.visa')
    var countrySelect = document.querySelector('.country')

    if (visaSelect) {
      var url = window.location.href
      console.log('[custom5e1f.js] URL:', url)

      if (countrySelect) {
        countrySelect.addEventListener('change', (e) => {
          url = window.location.href
        })
      }

      visaSelect.addEventListener('change', (e) => {
        url += visaSelect.value
        window.location.replace(url)
      })
      console.log('✅ [custom5e1f.js] Visa select event listener eklendi')
    } else {
      console.warn('⚠️ [custom5e1f.js] .visa elementi bulunamadı')
    }
  }

  // DOM ve Swiper'ın hazır olmasını bekle
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomScripts)
  } else {
    // DOM zaten yüklü, sadece Swiper'ı bekle
    initCustomScripts()
  }
})()