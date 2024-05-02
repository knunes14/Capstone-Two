import store, { persistor } from './store';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import cartReducer from './cartRedux';
import userReducer from './userRedux';

describe('Redux Store', () => {
    it('should correctly initialize the store with the correct reducers', () => {
        const state = store.getState();
        expect(state.user).toEqual(userReducer(undefined, { type: undefined }));
        expect(state.cart).toEqual(cartReducer(undefined, { type: undefined }));
    });

    it('should have redux persist middleware integrated', () => {
        const actions = store.getState().lastAction;
        const actionTypes = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
        actionTypes.forEach(actionType => {
            expect(store.dispatch({ type: actionType })).toEqual(expect.anything());
        });
    });

    it('should configure the persistor', () => {
        expect(persistor.getState()).toEqual(expect.objectContaining({
            registry: expect.any(Array),
            bootstrapped: expect.any(Boolean)
        }));
    });

    it('should handle dispatching actions', () => {
        const testAction = { type: 'TEST_ACTION' };
        store.dispatch(testAction);
        const actions = store.getState().lastAction; 
        expect(actions).toContain(testAction);
    });
});
