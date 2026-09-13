import { Education, Experience } from '../../../core/models/experience.model';

export const EXPERIENCES: readonly Experience[] = [
  {
    id: 'ag2r',
    company: 'AG2R LA MONDIALE',
    logo: { src: '/images/ag2r_logo.jpg', alt: 'AG2R LA MONDIALE', width: 447 },
    role: {
      fr: 'Data Scientist & Web Developer',
      en: 'Data Scientist & Web Developer',
    },
    location: 'Paris (75)',
    startDate: '2025-12-01',
    endDate: null,
    period: { fr: 'Depuis déc. 2025', en: 'Since Dec. 2025' },
    highlights: [
      {
        title: { fr: 'Micro-services & Serving', en: 'Micro-services & serving' },
        description: {
          fr: "Développement d'API performantes et documentées (Swagger) pour exposer les moteurs d'IA aux applications, avec une gestion optimisée de la charge.",
          en: 'Built performant, documented APIs (Swagger) exposing AI engines to downstream applications, with optimised load handling.',
        },
      },
      {
        title: { fr: 'IA Générative & Frontend Angular', en: 'Generative AI & Angular frontend' },
        description: {
          fr: 'Migration des interfaces métiers de prototypage (Streamlit) vers Angular (RxJS, Signals, Standalone Components) pour déployer des applications web RAG scalables et réactives.',
          en: 'Migrated business prototyping interfaces from Streamlit to Angular (RxJS, Signals, standalone components) to ship scalable, reactive RAG web applications.',
        },
      },
      {
        title: { fr: 'Industrialisation DataOps & IaC', en: 'DataOps industrialisation & IaC' },
        description: {
          fr: 'Déploiement automatisé des ressources Cloud (GCP) via Terraform et intégration des modèles dans les pipelines CI/CD (Jenkins) pour un déploiement fiable et standardisé.',
          en: 'Automated cloud resource provisioning (GCP) with Terraform and integrated models into CI/CD pipelines (Jenkins) for reliable, standardised delivery.',
        },
      },
      {
        title: { fr: 'Cadrage technique', en: 'Technical scoping' },
        description: {
          fr: 'Analyse approfondie des besoins opérationnels et promotion des bonnes pratiques Data Science auprès des équipes métiers.',
          en: 'In-depth analysis of operational needs and advocacy for data science best practices across business teams.',
        },
      },
    ],
    stack: [
      'GCP',
      'Cloud Run',
      'Vertex AI',
      'Terraform',
      'Jenkins',
      'Docker',
      'Angular',
      'Python',
      'FastAPI',
      'LangChain',
      'LangGraph',
      'GitLab',
    ],
  },
  {
    id: 'dir-ips',
    company: 'Dir IPS',
    logo: { src: '/images/dirips_logo.jpg', alt: 'Dir IPS', width: 200 },
    role: {
      fr: 'Consultant Technique et Développeur en IA',
      en: 'Technical Consultant & AI Developer',
    },
    location: 'Évry-Courcouronnes (91)',
    startDate: '2024-04-01',
    endDate: '2025-10-31',
    period: { fr: 'Avr. 2024 – Oct. 2025', en: 'Apr. 2024 – Oct. 2025' },
    highlights: [
      {
        title: { fr: 'Pipeline Data (ETL)', en: 'Data pipeline (ETL)' },
        description: {
          fr: "Automatisation de l'ingestion multi-source (API, SQL, fichiers), nettoyage avancé et normalisation des données pour fiabiliser l'alimentation du logiciel gestionnaire.",
          en: 'Automated multi-source ingestion (API, SQL, files), advanced cleaning and normalisation to make the management software data feed reliable.',
        },
      },
      {
        title: { fr: 'Bases de connaissances (RAG)', en: 'Knowledge bases (RAG)' },
        description: {
          fr: "Développement de pipelines de web scraping pour structurer la documentation technique et implémentation d'une stratégie d'indexation hybride (lexicale/sémantique).",
          en: 'Built web scraping pipelines to structure technical documentation and implemented a hybrid lexical/semantic indexing strategy.',
        },
      },
      {
        title: { fr: 'Agents IA & Tool Calling', en: 'AI agents & tool calling' },
        description: {
          fr: "Conception de chatbots autonomes capables d'exécuter des actions techniques complexes via API et d'assistants rédactionnels augmentés par l'IA générative.",
          en: 'Designed autonomous chatbots able to run complex technical actions through APIs, plus writing assistants augmented with generative AI.',
        },
      },
      {
        title: { fr: 'Classification NLP', en: 'NLP classification' },
        description: {
          fr: "Entraînement et mise en production de modèles de classification de comptes clients pour automatiser le tri et l'analyse des portefeuilles.",
          en: 'Trained and deployed customer account classification models to automate portfolio sorting and analysis.',
        },
      },
    ],
    stack: [
      'Python',
      'Django',
      'LangChain',
      'Faiss',
      'BM25',
      'BeautifulSoup',
      'Selenium',
      'Rasa NLU',
      'BERT',
      'SQL Server',
      'GitLab',
    ],
  },
  {
    id: 'cnr',
    company: 'Caisse Nationale des Retraites (CNR)',
    logo: { src: '/images/CNR_logo.png', alt: 'Caisse Nationale des Retraites (CNR)', width: 250 },
    role: {
      fr: 'Stagiaire Data Scientist (Computer Vision)',
      en: 'Data Science Intern (Computer Vision)',
    },
    location: 'Algérie',
    startDate: '2023-03-01',
    endDate: '2023-05-31',
    period: { fr: 'Mars 2023 – Mai 2023', en: 'Mar. 2023 – May 2023' },
    highlights: [
      {
        title: { fr: 'Reconnaissance faciale & vivacité', en: 'Face recognition & liveness' },
        description: {
          fr: "Développement d'un système robuste de reconnaissance faciale et de détection de vivacité pour sécuriser la validation de vie des retraités à distance.",
          en: 'Built a robust face recognition and liveness detection system to secure remote proof-of-life validation for pensioners.',
        },
      },
      {
        title: { fr: 'Intégration applicative', en: 'Application integration' },
        description: {
          fr: 'Intégration optimisée du modèle de deep learning dans une application web de gestion à destination des agents administratifs.',
          en: 'Optimised integration of the deep learning model into a management web application used by administrative staff.',
        },
      },
    ],
    stack: ['Python', 'Django', 'OpenCV', 'TensorFlow', 'CNN', 'GitHub'],
  },
];

export const EDUCATION: readonly Education[] = [
  {
    id: 'master-data',
    degree: {
      fr: 'Ingénierie des Données pour les systèmes intelligents distribués',
      en: 'Data Engineering for Distributed Intelligent Systems',
    },
    school: 'CY Cergy Paris Université',
    period: { fr: 'En cours', en: 'In progress' },
    focus: {
      fr: [
        'Intelligence Artificielle',
        'Cloud Computing',
        'Big Data',
        'Bases de données avancées',
        'Machine Learning',
      ],
      en: [
        'Artificial Intelligence',
        'Cloud Computing',
        'Big Data',
        'Advanced databases',
        'Machine Learning',
      ],
    },
  },
  {
    id: 'licence-info',
    degree: {
      fr: 'Licence Informatique (Sciences des données)',
      en: 'BSc Computer Science (Data Science)',
    },
    school: 'CY Cergy Paris Université',
    period: { fr: '2023', en: '2023' },
    focus: {
      fr: [
        'Programmation orientée objet',
        'Théorie des graphes',
        'Structures de données',
        'Data Science',
        'Probabilités avancées',
      ],
      en: [
        'Object-oriented programming',
        'Graph theory',
        'Data structures',
        'Data Science',
        'Advanced probability',
      ],
    },
  },
];
