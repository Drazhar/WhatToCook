export function getRandom(maxValue: number): number {
    return Math.random()*maxValue
}

export function getRandomInt(maxValue: number): number {
    return Math.floor(getRandom(maxValue))
}