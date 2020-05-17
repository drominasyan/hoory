import { validateEmail } from '../../helpers/utils';

export const validator = (requiredFuilds, baseData) => {
    const array = [];
    requiredFuilds.forEach(item => {
        if (!baseData[item]) {
            return array.push(item);
        }
        if (item === 'email' && !validateEmail(baseData[item])) {
            return array.push('email');
        }
        if (item === 'confirmEmail' && (item !== baseData.email)) {
            if (baseData.email !== baseData.confirmEmail) {
                return array.push('confirmEmail');
            }
        }
        if (item === 'password') {
            if (baseData[item].length < 8) {
                return array.push('password');
            }
        }
    });
    return array;
};
