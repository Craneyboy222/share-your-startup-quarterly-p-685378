/* Object utilities */

export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function deepMerge<T, U>(target: T, source: U): T & U {
    if (typeof target !== 'object' || typeof source !== 'object') {
        throw new Error('Both target and source must be objects');
    }
    const output = { ...target };
    Object.keys(source).forEach(key => {
        if (source[key] instanceof Object && key in target) {
            output[key] = deepMerge(target[key], source[key]);
        } else {
            output[key] = source[key];
        }
    });
    return output as T & U;
}

export function isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0;
}