export const validateItem = (itemName) => {
    if (itemName.length < 1 || itemName.match(/^\s+$/)) {
        return 'Cannot be empty.'
    }
    if (itemName.length > 30) {
        return 'Cannot be longer than 30 characters'
    }
    return null
}
