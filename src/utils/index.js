export const map = fn => array => array.map(fn)

export const compose = (...fns) => arg => fns.reduceRight((acc, fn) => fn(acc), arg)

export const identity = x => x

export const unique = (array) => Array.from(new Set([...array]))

export const prop = key => obj => obj[key]