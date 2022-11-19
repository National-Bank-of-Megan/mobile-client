export const countDecimals = (value: string) => {
    let decimalPlaces = value.split(".")[1];
    if (decimalPlaces) {
        return decimalPlaces.length;
    }
    return 0;
}

export const shouldUpdateCurrencyInput = (value: string): boolean => {
    if (value.trim() === '') {
        return true;
    }
    if (value.trim().startsWith(".")) {
        return false;
    }

    const maxDecimalPlaces = 2;
    const userDecimalPlaces = countDecimals(value);
    return (userDecimalPlaces <= maxDecimalPlaces);
}
