export function set(state, user) {
  this.state.users.user = user;
  this.state.users.loading_users = false;
}

export function loadingUsers() {
  this.state.users.loading_users = true;
}
