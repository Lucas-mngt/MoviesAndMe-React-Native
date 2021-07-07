const initialState = { avatar: require('../../assets/ic_tag_faces.png') }

function setAvatar(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SET_AVATAR':
      const newAvatar = action.value
      if (action.value !== undefined) {
        nextState = {
          ...state,
          avatar: newAvatar
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default setAvatar