import { getItemData } from "@/components/ItemComponent/getItemData"
import { ContentItem } from "@/types/ContentItem"

const itemCache = new Map<string, { 
    url: string | null, 
    timestamp: number,
    loading?: Promise<string | null> 
}>()
const CACHE_DURATION = 1000 * 60 * 5 // 5 minutes

export async function prefetchItems(items: ContentItem[]) {
    // Prefetch all visible items after filtering
    return Promise.all(
        items.map(item => getCachedItemData(item.id, item.type))
    )
}

export async function getCachedItemData(id: number, type: string) {
    const key = `${id}-${type}`
    const cached = itemCache.get(key)
    
    // Return existing cache if valid
    if (cached?.url && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.url
    }

    // Return existing promise if loading
    if (cached?.loading) {
        return cached.loading
    }

    // Create new loading promise
    const loadingPromise = getItemData(id, type)
    itemCache.set(key, { url: null, timestamp: Date.now(), loading: loadingPromise })
    
    const url = await loadingPromise
    itemCache.set(key, { url, timestamp: Date.now() })
    return url
}
