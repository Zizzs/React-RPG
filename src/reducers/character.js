export default (state = "loading", action) => {
    switch (action.type) {
        case "FETCH_CHARACTER":
            return action.payload;
        default:
            return state;
    }
};