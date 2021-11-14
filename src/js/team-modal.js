const refsModal = {
  btnModal: document.querySelector('.js-team-modal__btn'),
  block: document.querySelector('.js-team-modal'),
  btnClose: document.querySelector('.team-modal__btn'),
  backdrop: document.querySelector('.backdrop'),
};

refsModal.btnModal.addEventListener('click', openModal);
refsModal.btnClose.addEventListener('click', closeModal);
refsModal.backdrop.addEventListener('click', closeModalClickOnBackdrop);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

function openModal() {
  refsModal.block.classList.remove('is-hidden');
  document.body.style.overflow = "hidden"
}

function closeModal() {
  refsModal.block.classList.add('is-hidden');
  document.body.style.overflow = ""
}

function closeModalClickOnBackdrop(e) {
  if (e.currentTarget === e.target) {
    closeModal();
  }
}
