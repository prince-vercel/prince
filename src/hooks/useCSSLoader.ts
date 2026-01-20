import { useEffect, useState, useRef } from 'react'

interface CSSFile {
  href: string
  id: string
}

/**
 * CSS dosyalarının yüklenip yüklenmediğini kontrol eden hook
 * Tüm CSS'ler yüklenene kadar false döner
 */
export function useCSSLoader(cssFiles: CSSFile[]): boolean {
  // Başlangıçta loading durumunu true yap (CSS'ler yüklenene kadar loading göster)
  const [allLoaded, setAllLoaded] = useState(() => {
    // Eğer CSS dosyaları yoksa, direkt true döndür (loading gösterme)
    return cssFiles.length === 0
  })
  const intervalsRef = useRef<NodeJS.Timeout[]>([])
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    // Her CSS dosyası değiştiğinde loading durumunu sıfırla
    // Bu, sayfa değiştiğinde veya CSS'ler yeniden yüklendiğinde çalışır
    setAllLoaded(false)

    // Önceki interval ve timeout'ları temizle
    intervalsRef.current.forEach(interval => clearInterval(interval))
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    intervalsRef.current = []
    timeoutsRef.current = []

    if (cssFiles.length === 0) {
      setAllLoaded(true)
      return
    }

    // CSS'lerin DOM'a eklenmesini beklemek için kısa bir gecikme ekle
    // Bu, Head component'inin CSS'leri DOM'a eklemesi için zaman tanır
    const initialDelay = setTimeout(() => {
      // CSS'lerin yüklenmesini kontrol etmeye başla
      startCSSLoadCheck()
    }, 100)

    timeoutsRef.current.push(initialDelay)

    function startCSSLoadCheck() {

      const checkCSSLoaded = (): boolean => {
        // Tüm CSS dosyalarının DOM'da olup olmadığını ve yüklenip yüklenmediğini kontrol et
        return cssFiles.every((cssFile) => {
          const link = document.getElementById(cssFile.id) as HTMLLinkElement
          if (!link) {
            return false
          }
          
          // sheet property varsa CSS yüklenmiş demektir
          // Ayrıca link'in complete property'sini de kontrol et
          if (link.sheet || (link as any).complete) {
            return true
          }
          
          return false
        })
      }

      // CSS'lerin DOM'a eklenmesini bekle
      const waitForCSSInDOM = (): Promise<void> => {
        return new Promise((resolve) => {
          let attempts = 0
          const maxAttempts = 100 // 5 saniye (50ms * 100)
          
          const checkInterval = setInterval(() => {
            attempts++
            const allInDOM = cssFiles.every((cssFile) => {
              return document.getElementById(cssFile.id) !== null
            })
            
            if (allInDOM || attempts >= maxAttempts) {
              clearInterval(checkInterval)
              resolve()
            }
          }, 50)

          intervalsRef.current.push(checkInterval)
        })
      }

      // CSS'lerin yüklenmesini bekle
      const waitForCSSLoad = (): Promise<void> => {
        return new Promise((resolve) => {
          // Önce DOM'da olup olmadıklarını kontrol et
          waitForCSSInDOM().then(() => {
            // İlk kontrol - belki CSS'ler zaten yüklenmiş
            if (checkCSSLoaded()) {
              resolve()
              return
            }

            // CSS'lerin yüklenmesini bekle
            const loadPromises: Promise<void>[] = []
            const loadedLinks = new Set<string>()

            cssFiles.forEach((cssFile) => {
              const promise = new Promise<void>((resolveFile) => {
                let checkAttempts = 0
                const maxCheckAttempts = 100 // 5 saniye
                
                const checkInterval = setInterval(() => {
                  checkAttempts++
                  const link = document.getElementById(cssFile.id) as HTMLLinkElement
                  
                  if (link) {
                    // sheet property varsa yüklenmiş demektir
                    if (link.sheet || (link as any).complete) {
                      clearInterval(checkInterval)
                      loadedLinks.add(cssFile.id)
                      resolveFile()
                      return
                    }
                    
                    // onload event'ini dinle (sadece bir kez)
                    if (!link.onload && !link.hasAttribute('data-loading')) {
                      link.setAttribute('data-loading', 'true')
                      link.onload = () => {
                        clearInterval(checkInterval)
                        loadedLinks.add(cssFile.id)
                        resolveFile()
                      }
                      link.onerror = () => {
                        // Hata olsa bile devam et (CSS yüklenemese bile sayfa gösterilsin)
                        clearInterval(checkInterval)
                        loadedLinks.add(cssFile.id)
                        resolveFile()
                      }
                    }
                  }
                  
                  // Maksimum deneme sayısına ulaşıldıysa devam et
                  if (checkAttempts >= maxCheckAttempts) {
                    clearInterval(checkInterval)
                    if (!loadedLinks.has(cssFile.id)) {
                      loadedLinks.add(cssFile.id)
                      resolveFile()
                    }
                  }
                }, 50) // Her 50ms'de bir kontrol et

                intervalsRef.current.push(checkInterval)
              })
              
              loadPromises.push(promise)
            })

            // Tüm CSS'lerin yüklenmesini bekle
            Promise.all(loadPromises).then(() => {
              resolve()
            })
          })
        })
      }

      // CSS'lerin yüklenmesini bekle ve sonra state'i güncelle
      waitForCSSLoad().then(() => {
        // Kısa bir gecikme ekle (CSS'in uygulanması için)
        const timeout = setTimeout(() => {
          setAllLoaded(true)
        }, 150)
        timeoutsRef.current.push(timeout)
      })
    }

    // Cleanup function
    return () => {
      intervalsRef.current.forEach(interval => clearInterval(interval))
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      intervalsRef.current = []
      timeoutsRef.current = []
    }
  }, [cssFiles])

  return allLoaded
}
