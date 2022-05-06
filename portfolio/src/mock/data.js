import { nanoid } from 'nanoid';

// HEAD DATA
export const headData = {
  title: 'Wuknow', // e.g: 'Name | Developer'
  lang: 'fr', // e.g: en, es, fr, jp
  description: 'Bienvenue sur mon site', // e.g: Welcome to my website
};

// HERO DATA
export const heroData = {
  title: "Bienvenue sur Wuknow's Projects,",
  subname: 'Je suis ',
  name: 'Quentin LAO',
  subtitle: ['Un développeur JAVA/SPRING', 'Un CTO en devenir', 'Un développeur qui aime PHP/Symfony', 'Un développeur fullstack', 'Un enthousiaste mobile Flutter développeur', 'Un développeur frontend React/TS' ],
  cta: "Plus d'informations",
};

// ABOUT DATA
export const aboutData = {
  img: 'profile.jpg',
  paragraphOne: "J'ai découvert l'informatique au collège lorsqu'on faisait nos premiers sites web grâce au SdZ (Site du zéro, maintenant OpenClassrooms)." +
      " Je me suis pris de passion pour le graphisme via Photoshop et le développement web php au début du lycée, où j'ai réalisé un site maquette pour mon lycée en ISN.",
  paragraphTwo: "Par la suite je me suis orienté dans le développement logiciel en me concentrant sur la technique et l'architecture logiciel.",
  paragraphThree: "Aujourd'hui je suis capable de travailler dans un large périmètre et je développe pour mon compte avec passion !",
  resume: 'https://www.linkedin.com/in/quentinlao/', // if no resume, the button will not show up
};

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img: 'affiche_final.jpg',
    title: 'MyMenuPlan',
    info: "MyMenuPlan est une application mobile qui accompagne l’utilisateur en lui planifiant des menus hebdomadaires.",
    info2: " Tout en lui proposant à la fois la liste des courses de la semaine et les informations nutritionnelles à travers" +
        " une note sur la qualité nutritive de la recette.",
    url: 'https://wuknow.netlify.app/',
    repo: 'https://wuknow.netlify.app/', // if no repo, the button will not show up
    tech: ['flutter', 'firebase', 'flask', 'postgres']
  },
  {
    id: nanoid(),
    img: 'flutterchallenger.JPG',
    title: 'FlutterChallenger',
    info: "Une chaine youtube de speedCoding pour montrer des réalisations de template Flutter",
    info2: 'Hi from /Flutterchallenger',
    url: 'https://wuknow.netlify.app/',
    repo: 'https://wuknow.netlify.app/', // if no repo, the button will not show up
    tech: ['flutter', 'behance', 'youtube', 'androidStudio']
  },
  {
    id: nanoid(),
    img: 'eti.JPG',
    title: 'E.ti',
    info: "Une application qui permet de numériser la gestion des tickets de caisses.",
    info2: 'framework Flutter',
    url: 'https://wuknow.netlify.app/',
    repo: 'https://wuknow.netlify.app/', // if no repo, the button will not show up
    tech: ['flutter']
  },
  {
    id: nanoid(),
    img: 'quizinteractive.JPG',
    title: 'Quizinteractive',
    info: "Une application Android qui permet de remplacer les questionnaires d'évaluations en amphithéâtre." +
        "Pendant un cours le professeur tape une question dans l’application, les élèves peuvent répondre à la question sur leur téléphone.",
    info2: " Le professeur reçoit des statistiques sur les réponses des élèves.",
    url: 'https://wuknow.netlify.app/',
    repo: 'https://wuknow.netlify.app/', // if no repo, the button will not show up
    tech: ['Android', 'ServerClient', 'Bluetooth Protocol', 'AndroidStudio', 'Java']
  },

  {
    id: nanoid(),
    img: 'quizwaifu.JPG',
    title: 'Quizwaifu',
    info: "Seriez-vous capable de savoir si les différents personnages d'animés sont de vrais waifu.",
    info2: 'Une application hybride Android et iOS',
    url: 'https://wuknow.netlify.app/',
    repo: 'https://wuknow.netlify.app/', // if no repo, the button will not show up
    tech: ['flutter', 'firebase']
  }
];

// CONTACT DATA
export const contactData = {
  cta: "N'hésitez pas à me contacter",
  btn: "M'envoyer un mail 📧",
  email: 'quentinlao@outlook.com',
};

// FOOTER DATA
export const footerData = {
  networks: [
    {
      id: nanoid(),
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/quentinlao/',
    },
    {
      id: nanoid(),
      name: 'github',
      url: 'https://github.com/quentinlao',
    },
  ],
};

// Github start/fork buttons
export const githubButtons = {
  isEnabled: false, // set to false to disable the GitHub stars/fork buttons
};
