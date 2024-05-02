import { login, register, logout } from './apiCalls';
import { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, logout as logoutAction } from './userRedux';
import { clearCart } from './cartRedux';
import { publicRequest } from '../requestMethods';

// Mock publicRequest
jest.mock('../requestMethods', () => ({
    publicRequest: {
        post: jest.fn()
    }
}));

describe('API Calls', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();  // Clears any previous data
    });

    describe('login', () => {
        const userCredentials = { username: 'testuser', password: 'password' };
        it('dispatches loginSuccess when login API call is successful', async () => {
            const mockUser = { data: { name: 'testuser', token: 'fakeToken' }};
            publicRequest.post.mockResolvedValue(mockUser);
            await login(mockDispatch, userCredentials);
            expect(mockDispatch).toHaveBeenCalledWith(loginStart());
            expect(mockDispatch).toHaveBeenCalledWith(loginSuccess(mockUser.data));
        });

        it('dispatches loginFailure when login API call fails', async () => {
            publicRequest.post.mockRejectedValue(new Error('Login failed'));
            await login(mockDispatch, userCredentials);
            expect(mockDispatch).toHaveBeenCalledWith(loginStart());
            expect(mockDispatch).toHaveBeenCalledWith(loginFailure());
        });
    });

    describe('register', () => {
        const userCredentials = { username: 'newuser', email: 'test@example.com', password: 'password' };
        it('dispatches registerSuccess when registration is successful', async () => {
            const mockUser = { data: { name: 'newuser', token: 'fakeToken' }};
            publicRequest.post.mockResolvedValue(mockUser);
            await register(mockDispatch, userCredentials);
            expect(mockDispatch).toHaveBeenCalledWith(registerStart());
            expect(mockDispatch).toHaveBeenCalledWith(registerSuccess(mockUser.data));
        });

        it('dispatches registerFailure when registration fails', async () => {
            publicRequest.post.mockRejectedValue(new Error('Registration failed'));
            await register(mockDispatch, userCredentials);
            expect(mockDispatch).toHaveBeenCalledWith(registerStart());
            expect(mockDispatch).toHaveBeenCalledWith(registerFailure(new Error('Registration failed')));
        });
    });

    describe('logout', () => {
        it('dispatches logoutAction and clearCart', async () => {
            await logout(mockDispatch);
            expect(mockDispatch).toHaveBeenCalledWith(logoutAction());
            expect(mockDispatch).toHaveBeenCalledWith(clearCart());
        });
    });
});
