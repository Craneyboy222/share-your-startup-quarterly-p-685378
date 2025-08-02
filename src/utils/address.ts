/* Address utilities */

export function isValidAddress(address: string): boolean {
    return address.length > 0 && /\d+ [\w ]+, [\w ]+, [A-Z]{2} \d{5}/.test(address);
}

export function formatAddress(address: { street: string, city: string, state: string, zip: string }): string {
    if (!address.street || !address.city || !address.state || !address.zip) {
        throw new Error('Incomplete address information');
    }
    return `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
}