import { login, logout } from '../../actions/auth';

describe('auth actions', () => {

    test('should generate the login action object', () => {
        const uid = 'xYz';
        const action = login(uid)
        expect(action).toEqual({
            type: 'LOGIN',
            uid
        });
    });

    test('should generate the logout action object', () => {
        const action = logout();
        expect(action).toEqual({
            type: 'LOGOUT'
        });
    });

});