export function set(state, repositories) {
  this.state.repositories.repositories = repositories;
  this.state.repositories.loading_repositories = false;
}

export function loadingRepositories() {
  this.state.repositories.loading_repositories = true;
}
