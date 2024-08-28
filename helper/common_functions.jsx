export function capitalize_word_letter(string) {
    const splited_string = string.split('_')
    const capitalized_string = splited_string.map(word => word.charAt(0).toUpperCase() + word.slice(1))
    return capitalized_string.join(' ')
}



export const currencyFormatHandle = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(amount)
};