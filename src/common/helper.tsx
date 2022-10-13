export const isPrimitive = (value: any) => {
    if (value === null) return true;
    if (typeof value === 'object') return false;
    return true;
};

export const isObject = (value: any) => {
    return typeof value === 'object' && value.length === undefined;
};

export const isArray = (value: any) => {
    return typeof value === 'object' && value.length !== undefined;
};