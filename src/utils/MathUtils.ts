export const clamp = (x: number, min: number, max: number) => x <= min ? min : (x >= max ? max: x)

export const dec2per = (x: number) => x * 100 + '%'
