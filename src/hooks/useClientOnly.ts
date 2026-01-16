import { useEffect, useState } from 'react'

/**
 * SSR-safe hook that returns true only after component mounts on client-side
 * Prevents hydration mismatches by ensuring content only renders on client
 */
export function useClientOnly(): boolean {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return mounted
}
