import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useClientOnly } from './useClientOnly'

/**
 * SSR-safe translation hook that prevents hydration mismatches
 * Returns empty string/array/object during SSR and actual translations after mount
 */
export function useSafeTranslation() {
    const { t, i18n } = useTranslation()
    const mounted = useClientOnly()
    const isReady = mounted && i18n.isInitialized

    const safeT = useMemo(() => {
        return (key: string, options?: any): any => {
            if (!isReady) {
                // Return empty string for strings, empty array for arrays, empty object for objects
                if (options?.returnObjects) {
                    return []
                }
                return ''
            }
            return t(key, options)
        }
    }, [t, isReady])

    return {
        t: safeT,
        i18n,
        isReady,
        mounted
    }
}
