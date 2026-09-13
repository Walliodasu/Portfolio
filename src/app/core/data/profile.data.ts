import { Profile } from '../models/profile.model';

export const GITHUB_USERNAME = 'Walliodasu';

export const PROFILE: Profile = {
  fullName: 'Wassim TAGHELIT',
  role: {
    fr: 'Data Scientist & Web Developer',
    en: 'Data Scientist & Web Developer',
  },
  headline: {
    fr: "Je conçois des systèmes d'IA générative et des applications web qui vont jusqu'en production.",
    en: 'I design generative AI systems and web applications that make it all the way to production.',
  },
  bio: {
    fr: [
      "Data Scientist et développeur web, je travaille à la frontière entre l'intelligence artificielle et le produit. Mon terrain de jeu : transformer des modèles et des données brutes en applications utilisables par des équipes métier.",
      "Chez AG2R LA MONDIALE, je développe des micro-services d'IA exposés via FastAPI et je migre les interfaces de prototypage vers des applications Angular scalables, le tout industrialisé sur GCP avec Terraform et Jenkins.",
      "Avant cela, j'ai conçu des pipelines ETL multi-sources, des bases de connaissances RAG à indexation hybride et des agents IA capables d'exécuter des actions techniques via API.",
    ],
    en: [
      'Data Scientist and web developer, I work at the intersection of artificial intelligence and product. My focus: turning models and raw data into applications business teams actually use.',
      'At AG2R LA MONDIALE, I build AI micro-services exposed through FastAPI and migrate prototyping interfaces to scalable Angular applications, industrialised on GCP with Terraform and Jenkins.',
      'Previously, I designed multi-source ETL pipelines, RAG knowledge bases with hybrid indexing, and AI agents able to execute technical actions through APIs.',
    ],
  },
  location: 'Paris, France',
  email: 'taghelitwassim@gmail.com',
  phone: '+33 7 45 72 60 58',
  githubUsername: GITHUB_USERNAME,
  availability: {
    fr: 'Disponible dès maintenant',
    en: 'Available now',
  },
  resumeUrl: '/documents/CV_Wassim_TAGHELIT.pdf',
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      url: `https://github.com/${GITHUB_USERNAME}`,
      icon: 'github',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/wassim-taghelit/',
      icon: 'linkedin',
    },
    {
      id: 'email',
      label: 'taghelitwassim@gmail.com',
      url: 'mailto:taghelitwassim@gmail.com',
      icon: 'mail',
    },
    {
      id: 'phone',
      label: '+33 7 45 72 60 58',
      url: 'tel:+33745726058',
      icon: 'phone',
    },
  ],
  languages: [
    { name: { fr: 'Français', en: 'French' }, level: 'C2' },
    { name: { fr: 'Kabyle', en: 'Kabyle' }, level: 'C2' },
    { name: { fr: 'Anglais', en: 'English' }, level: 'C1' },
    { name: { fr: 'Arabe', en: 'Arabic' }, level: 'C1' },
  ],
};
