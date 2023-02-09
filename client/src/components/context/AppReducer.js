export const AppReducer =  (state, action) => {

    switch (action.type) {
        case 'INITIAL_DATA':
            const data = []
            action.payload.forEach((app) => {
                data.unshift(app);
            })
            return {
                kurses: data
            }

        case 'REMOVE_KURS':
            return {
                kurses: state.kurses.filter(kurs => {
                    return(
                        kurs._id !== action.payload
                    )
                })
            }
        case 'ADD_KURS':
            return{
                kurses: [action.payload, ...state.kurses]
            }

        case 'EDIT_KURS':
            const updateKurs = action.payload;
            const updateKurses = state.kurses.map(kurs => {
                if(kurs._id === updateKurs._id){
                    return updateKurs; 
                }

                return kurs
            })
            return{
                kurses: updateKurses
            }
        default:
            return state
    }
}; 