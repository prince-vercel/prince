import { useEffect } from 'react'

interface CSSFile {
  href: string
  id: string
}

export function useDynamicCSS(cssFiles: CSSFile[]) {
  useEffect(() => {
    // CSS link elementlerini ekle
    const links: HTMLLinkElement[] = []
    
    cssFiles.forEach((cssFile) => {
      // Eğer zaten yüklenmişse atla
      if (document.getElementById(cssFile.id)) {
        return
      }

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = cssFile.href
      link.id = cssFile.id
      document.head.appendChild(link)
      links.push(link)
    })

    // Cleanup: Component unmount olduğunda veya CSS'ler değiştiğinde kaldır
    return () => {
      links.forEach((link) => {
        const existingLink = document.getElementById(link.id)
        if (existingLink) {
          existingLink.remove()
        }
      })
    }
  }, [cssFiles])
}


