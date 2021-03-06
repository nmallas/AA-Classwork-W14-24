// TODO: Import all of your importing your API util function
import * as APIUtil from "../util/apiUtil"

export const RECEIVE_GIFS = "RECEIVE_GIFS";

export function receiveGifs(gifs) {
    return {
        type: RECEIVE_GIFS,
        gifs
    }
};


export const fetchGifs = searchTerm => {
    return async (dispatch) => {
       let response = await APIUtil.fetchGifs(searchTerm);
       let result = await response.json();
       console.log(result.data)
       dispatch(receiveGifs(result.data));
    }
}
