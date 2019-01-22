import authReduceer from '../../reducers/auth';

describe('auth reducer', () => {

    test('should set uid in store on login', () => {
        const action = {
            type: 'LOGIN',
            uid: 'xYz'
        };
        const state = authReduceer({}, action);
        expect(state.uid).toBe( action.uid );
    });

    test('should clear uid from the store on logout', () => {
        const action = {
            type: 'LOGOUT'
        };
        const state = authReduceer( { uid: 'xYz' }, action);
        expect(state).toEqual({ });
    });

});