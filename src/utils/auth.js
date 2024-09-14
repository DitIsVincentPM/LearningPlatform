export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;  // returns true if token exists
};
