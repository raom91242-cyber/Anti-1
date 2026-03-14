export function favouritesReducer(state, action) {
    switch (action.type) {
        case "TOGGLE_FAV":
            const exists = state.find((photo) => photo.id === action.payload.id);

            let updated;

            if (exists) {
                updated = state.filter((p) => p.id !== action.payload.id);
            } else {
                updated = [...state, action.payload];
            }

            localStorage.setItem("favourites", JSON.stringify(updated));
            return updated;

        case "LOAD_FAV":
            return action.payload;

        default:
            return state;
    }
}