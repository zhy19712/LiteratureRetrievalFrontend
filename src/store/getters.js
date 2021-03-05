const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  center_id: state => state.user.center_id,
  id: state => state.user.id,
}
export default getters
