const teamInfo = [
  {
    imgUrl:  `./images/team/bogdan.jpg`,
    fullname: "Bogdan Kozhoma",
    teamRole: "Team Leader / Developer",
    socialLinks: {
      linkedinRef: "https://www.linkedin.com/in/bogdan-kozhoma-79782920b/",
      githubRef: "https://github.com/Bogdan-K-A",
      telegramRef: "https://t.me/K_Bogdan87"
    }
  },
  {
    imgUrl:  "./images/team/dima.jpg",
    fullname: "Dmytro Bolharin",
    teamRole: "Scram master / Developer",
    linkedinRef: "https://www.linkedin.com/in/dmytro-bolgarin-531a2621b/",
    githubRef: "https://github.com/Monerk98?tab=repositories",
    telegramRef: "https://t.me/Nikopol98"
  },
  {
    imgUrl:  "./images/team/arsen.jpg",
    fullname: "Arsen Temurian",
    teamRole: "Developer",
    linkedinRef: "https://www.linkedin.com/in/arsen-temurian-8238a3225",
    githubRef: "https://github.com/Arsen7878",
    telegramRef: "https://t.me/TEdmon"
    
  },
  {
    imgUrl:  "./images/team/natali.jpg",
    fullname: "Natalia Odinets",
    teamRole: "Developer",
    linkedinRef: "https://www.linkedin.com/in/natalia-odinec-30a2a7226/",
    githubRef: "https://github.com/nattalliaod",
    telegramRef: "https://t.me/nataliaodinets"
    
  },
  {
    imgUrl:  "./images/team/vlad.jpg",
    fullname: "Vladislav Prokopenko",
    teamRole: "Developer",
    linkedinRef: "https://www.linkedin.com/in/vladislav-prokopenko-35b87420a",
    githubRef: "https://github.com/quezzo-dev",
    telegramRef: "https://t.me/magnetiv"
  },
  {
    imgUrl:  "./images/team/andrey.jpg",
    fullname: "Andrey Shavrov",
    teamRole: "Developer",
    linkedinRef: "https://www.linkedin.com/in/andrey-shavrov-158086226/",
    githubRef: "https://github.com/Andrii-Shavrov",
    telegramRef: "https://t.me/andrey_shavrov84"
  },
  {
    imgUrl:  "./images/team/danil.jpg",
    fullname: "Danylo Nehreba",
    teamRole: "Developer",
    linkedinRef: "https://www.linkedin.com/in/danylo-nehreba-25806320a/",
    githubRef: "https://github.com/Butanasi",
    telegramRef: "https://t.me/Butanasi"
  },
  {
    imgUrl:  "./images/team/lena.jpg",
    fullname: "Olena Zabolotnia",
    teamRole: "Developer",
    linkedinRef: "https://www.linkedin.com/in/olena-zabolotnia-a80899225/",
    githubRef: "https://github.com/OlenaZ-nia",
    telegramRef: "https://t.me/OlenaZ_nia"
  },
  {
    imgUrl:  "./images/team/ruslan.jpg",
    fullname: "Ruslan Tuliabaeiev",
    teamRole: "Developer",
    linkedinRef: "https://www.linkedin.com/in/%D1%80%D1%83%D1%81%D0%BB%D0%B0%D0%BD-%D1%82%D1%83%D0%BB%D1%8F%D0%B1%D0%B0%D0%B5%D0%B2-984b0b219",
    githubRef: "https://github.com/Ruslan-Tuliabaeiev?tab=repositories",
    telegramRef: "https://t.me/Ruslan"
  },
  {
    imgUrl:  "./images/team/ivan.jpg",
    fullname: "Ivan Oliinyk",
    teamRole: "Developer",
    linkedinRef: "https://www.linkedin.com/feed/",
    githubRef: "https://github.com/Ivan-Oliinyk",
    telegramRef: "https://t.me/OliVan1991"
  },
];

const listMarkup = teamInfo.map(makeLi).join('');

const ulContainer = document.querySelector('.js-team-modal__list');
ulContainer.insertAdjacentHTML("beforeend", listMarkup);
 
function makeLi({imgUrl, fullname, teamRole, linkedinRef, githubRef, telegramRef}) {
  return `<li class="team-modal__item">
            <div class="team-modal__item-img">
              <img src="${imgUrl}" alt="Developer" />
            </div>
            <div class="team-modal__item-content">
              <h3 class="team-modal__item-title">${fullname}</h3>
              <p class="team-modal__item-text">${teamRole}</p>
              <ul class="team-modal__links-list">
                <li class="team-modal__links-item">
                  <a
                    href=${linkedinRef}
                    class="team-modal__links-link"
                    target="_blank"
                  >
                    <svg class="icon" width="20" height="20">
                      <use href="./images/icon/icons.svg#linkedin"></use>
                    </svg>
                  </a>
                </li>
                <li class="team-modal__links-item">
                  <a
                    href=${githubRef}
                    class="team-modal__links-link"
                    target="_blank"
                  >
                    <svg class="icon" width="20" height="20">
                      <use href="./images/icon/icons.svg#github"></use>
                    </svg>
                  </a>
                </li>
                <li class="team-modal__links-item">
                  <a href=${telegramRef} class="team-modal__links-link" target="_blank">
                    <svg class="icon" width="20" height="20">
                      <use href="./images/icon/icons.svg#telegram"></use>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </li>`;
}