
//const butonLibraryPage = document.querySelector('.site-nav__link-library');
export const config = {spinerBloc : document.querySelector('.spiner')};
     
    
// const {spinerBloc} = refs ; 

// butonLibraryPage.addEventListener('click', spiner);
export function spinerDel() {
  config.spinerBloc.style.display = 'none';
};
// console.log(spiner);

export function spinerAdd() {

  config.spinerBloc.style.display = 'flex';
 }


//  const promise = new Promise((resolve, reject) => {

// });

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success!');
//   }, 1000);
// });
