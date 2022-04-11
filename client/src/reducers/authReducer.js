export const authReducer = (state, action) => {
    const { type, payload: { isAuthenticated, user, checkRouteUser, porfolioUser} } = action;

    switch (type) {
        case 'SET_AUTH': 
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user
            }
        case 'CHECKED_USER':
            return {
                ...state,
                checkRouteUser,
                porfolioUser
            }
        case 'UPDATE_USER':
            return {
                ...state,
                user,
                porfolioUser
            }
        default: throw new Error('Action not found');
    }
}
