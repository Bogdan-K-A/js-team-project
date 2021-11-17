import refs from './refs';
const { btnModal, block, btnClose, backdrop } = refs;

btnModal.addEventListener('click', openModal);
btnClose.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModalClickOnBackdrop);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

function openModal() {
  block.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  block.classList.add('is-hidden');
  document.body.style.overflow = '';
}

function closeModalClickOnBackdrop(e) {
  if (e.currentTarget === e.target) {
    closeModal();
  }
}
