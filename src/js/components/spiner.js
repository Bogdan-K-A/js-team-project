import refs from '../refs.js';

const { spinerBloc } = refs;

export function spinerDel() {
  spinerBloc.style.display = 'none';
}

export function spinerAdd() {
  spinerBloc.style.display = 'flex';
}
