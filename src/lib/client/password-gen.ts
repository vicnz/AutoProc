/**
 * PASSWORD GENERATOR
 */


function genPassword(length: number) {
    function randomCharacter(characters: string) {
        return characters[Math.floor(Math.random() * characters.length)];
    }
    // Define character sets
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = lowerCaseLetters.toUpperCase();
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*(){}[]=<>/,.';

    // Ensure the generated password includes at least one character from each set
    let password = randomCharacter(lowerCaseLetters) +
        randomCharacter(upperCaseLetters) +
        randomCharacter(numbers) +
        randomCharacter(specialCharacters);

    // Fill the rest of the password length with randomly picked characters from all sets
    const allCharacters = lowerCaseLetters + upperCaseLetters + numbers + specialCharacters;
    for (let i = 4; i < length; i++) {
        password += randomCharacter(allCharacters);
    }

    // Shuffle the password characters so they're not in the order of the character sets
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}
