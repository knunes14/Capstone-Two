import userReducer, {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    registerStart,
    registerSuccess,
    registerFailure
} from './userSlice';

describe('userSlice', () => {
    const initialState = {
        currentUser: null,
        isFetching: false,
        error: null
    };

    test('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });

    test('should handle loginStart', () => {
        const expectedState = {
            ...initialState,
            isFetching: true
        };
        expect(userReducer(initialState, loginStart())).toEqual(expectedState);
    });

    test('should handle loginSuccess', () => {
        const user = { name: 'John Doe', token: 'abc123' };
        const expectedState = {
            ...initialState,
            currentUser: user,
            isFetching: false
        };
        expect(userReducer(initialState, loginSuccess(user))).toEqual(expectedState);
    });

    test('should handle loginFailure', () => {
        const error = 'Invalid credentials';
        const expectedState = {
            ...initialState,
            isFetching: false,
            error: error
        };
        expect(userReducer(initialState, loginFailure(error))).toEqual(expectedState);
    });

    test('should handle logout', () => {
        const loggedInState = {
            currentUser: { name: 'John Doe', token: 'abc123' },
            isFetching: false,
            error: null
        };
        expect(userReducer(loggedInState, logout())).toEqual(initialState);
    });

    test('should handle registerStart', () => {
        const expectedState = {
            ...initialState,
            isFetching: true
        };
        expect(userReducer(initialState, registerStart())).toEqual(expectedState);
    });

    test('should handle registerSuccess', () => {
        const user = { name: 'Jane Doe', token: 'xyz789' };
        const expectedState = {
            ...initialState,
            currentUser: user,
            isFetching: false
        };
        expect(userReducer(initialState, registerSuccess(user))).toEqual(expectedState);
    });

    test('should handle registerFailure', () => {
        const error = 'Email already exists';
        const expectedState = {
            ...initialState,
            isFetching: false,
            error: error
        };
        expect(userReducer(initialState, registerFailure(error))).toEqual(expectedState);
    });
});
