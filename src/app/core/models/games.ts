export interface Game {
    genre: string
    title: string
    price: string
    id: string
    _id: string
    sortName: string
    isFullyOptimized: string
    steamUrl: string
    store: string
    publisher: string
    genres: string[]
    status: 'AVAILABLE' | 'UNAVAILABLE'
}
export interface gamesInterface {
    [key: string]: Game
}

export interface gamesSearchQueryInterface  {
    price?: number
    genres?: {
        indie: boolean
        adventure: boolean
        action: boolean
    }
    name?: string
} 