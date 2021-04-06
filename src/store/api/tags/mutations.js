import _ from 'lodash';

export function set(state, tags) {
  this.state.tags.tags = tags;

  this.state.tags.loading_tags = false;
}

export function loadingTags() {
  this.state.tags.loading_tags = true;
}

export function add(state, tag) {
  this.state.tags.tags.unshift(tag);

  this.state.tags.creating_tags = false;
}

export function creatingTags() {
  this.state.tags.creating_tags = true;
}

export function edit(state, tag) {
  this.state.tags.tags.splice(_.findIndex(this.state.tags.tags, { uuid: tag.uuid }), 1, tag);

  this.state.tags.updating_tags = false;
}

export function updatingTags() {
  this.state.tags.updating_tags = true;
}

export function remove(state, uuid) {
  this.state.tags.tags.splice(_.findIndex(this.state.tags.tags, { uuid }), 1);

  this.state.tags.removing_tags = false;
}

export function removingTags() {
  this.state.tags.removing_tags = true;
}
