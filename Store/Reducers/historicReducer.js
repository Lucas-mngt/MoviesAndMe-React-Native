const initialState = {
  historicFilms: []
}

function manageHistoricFilms(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_FILMDETAIL':
      const historicFilmsIndexAddMovie = state.historicFilms.findIndex(item => item.id === action.value.id)
      if (historicFilmsIndexAddMovie) {
        nextState = {
          ...state,
          historicFilms: [...state.historicFilms, action.value]
        }
      }
      return nextState || state
    case 'REMOVE_HISTORIC_FILM':
      const historicFilmsIndexRemoveMovie = state.historicFilms.findIndex(item => item.id === action.value.id)
      if (historicFilmsIndexRemoveMovie !== -1) {
        nextState = {
          ...state,
          historicFilms: state.historicFilms.filter((item, index) => index !== historicFilmsIndexRemoveMovie)
        }
      }
      return nextState || state
    case 'RESET_HISTORIC':
      nextState = {
        ...state,
        historicFilms: []
      }
      return nextState
  default:
    return state
  }
}

export default manageHistoricFilms
