import { Project } from '../../../core/models/project.model';

/**
 * Real projects, sourced from Wassim's own GitHub repositories (github.com/Walliodasu)
 * plus two team repositories he contributed to (github.com/RayanMokhtar) — for the latter,
 * the description and outcomes are scoped to his actual, verified contribution (commit history).
 * Cover images are category placeholders until real screenshots are provided.
 * Source-code links are only added for public repositories — the others stay private.
 */
export const PROJECTS: readonly Project[] = [
  {
    slug: 'visionassist',
    title: 'VisionAssist',
    tagline: {
      fr: 'Assistant vocal embarqué pour personnes malvoyantes : agent IA et vision temps réel.',
      en: 'Embedded voice assistant for visually impaired users: AI agent and real-time vision.',
    },
    description: {
      fr: [
        "Projet d'équipe (5 personnes) visant à améliorer la perception de l'environnement des personnes malvoyantes : un assistant vocal conversationnel couplé à une analyse visuelle temps réel, pensé pour un déploiement embarqué (NVIDIA Jetson).",
        "Architecture distribuée par message broker (MQTT) : un worker de vision en C++ (YOLOv8, flux optique, IMU) perçoit l'environnement, un service de reconnaissance vocale transcrit la voix, et un agent conversationnel (LangGraph) orchestre des outils — météo, lieux à proximité, transports en commun (SNCF), mémoire conversationnelle par recherche sémantique (FAISS) — avant de répondre par synthèse vocale (Piper).",
        "Ma contribution a porté sur la brique agent/LLM : intégration du broker MQTT côté service LLM, construction de l'agent LangGraph (tool-calling), refonte de la mémoire conversationnelle (court et long terme, vector store) et tentative d'intégration d'un serveur d'inférence vLLM pour le modèle Qwen.",
      ],
      en: [
        'A 5-person team project aiming to improve environment perception for visually impaired people: a conversational voice assistant paired with real-time visual analysis, designed for embedded deployment (NVIDIA Jetson).',
        'Distributed architecture over an MQTT message broker: a native C++ vision worker (YOLOv8, optical flow, IMU) senses the environment, a speech-to-text service transcribes voice input, and a conversational agent (LangGraph) orchestrates tools — weather, nearby places, public transit (SNCF), semantic conversational memory (FAISS) — before replying through text-to-speech (Piper).',
        'My contribution focused on the LLM/agent layer: integrating the MQTT broker on the LLM service side, building the LangGraph tool-calling agent, reworking conversational memory (short and long-term, vector store), and attempting a vLLM inference server integration for the Qwen model.',
      ],
    },
    outcomes: {
      fr: [
        'Architecture temps réel entièrement découplée par MQTT entre vision, voix et raisonnement, adaptée à un déploiement sur edge device (Jetson).',
        'Agent conversationnel équipé de 6 outils (météo, transports SNCF, lieux OSM, mémoire RAG, analyse visuelle à la demande) via LangGraph.',
        'Mémoire conversationnelle persistante avec recherche sémantique (FAISS) filtrée par utilisateur et fenêtre temporelle.',
      ],
      en: [
        'Fully decoupled real-time architecture over MQTT between vision, speech and reasoning, suited to edge deployment (Jetson).',
        'Conversational agent equipped with 6 tools (weather, SNCF transit, OSM places, RAG memory, on-demand visual analysis) via LangGraph.',
        'Persistent conversational memory with semantic search (FAISS) filtered by user and time window.',
      ],
    },
    stack: ['Python', 'LangChain', 'LangGraph', 'FAISS', 'MQTT', 'YOLOv8', 'C++'],
    category: 'ai',
    year: 2026,
    featured: true,
    links: {
      github: 'https://github.com/RayanMokhtar/VisionAssist',
    },
    image: {
      src: '/images/projects/placeholder-ai.svg',
      alt: {
        fr: 'Illustration du projet VisionAssist',
        en: 'Illustration of the VisionAssist project',
      },
      width: 1200,
      height: 675,
    },
  },
  {
    slug: 'floodai-segmentation-satellite',
    title: 'FloodAI — Segmentation & prédiction des inondations',
    tagline: {
      fr: "Projet d'équipe combinant segmentation d'images satellite (U-Net) et prédiction de risque (LSTM).",
      en: 'Team project combining satellite image segmentation (U-Net) and risk prediction (LSTM).',
    },
    description: {
      fr: [
        "Projet mené en équipe de 3 : une plateforme Django qui croise deux approches de deep learning pour l'anticipation des inondations — un U-Net (PyTorch) segmentant les zones inondées sur des images SAR Sentinel-1 (via openEO/Copernicus), et un LSTM bidirectionnel avec attention (TensorFlow) prédisant le risque à 5 jours pour une localisation donnée.",
        "Ma contribution a porté sur le module de prédiction LSTM : intégration du modèle (variantes standard et CNN-LSTM) dans l'application Django, gestion de l'historique des prédictions, et mise en place d'une tâche planifiée (chronjob) pour les mises à jour automatiques.",
        "Le modèle LSTM combine des données météo (Visual Crossing), d'élévation (OpenTopoData), de type de sol (OpenEPI) et l'historique des inondations (base EM-DAT), enrichies de caractéristiques cycliques pour capturer la saisonnalité.",
      ],
      en: [
        'A team project built with two other developers: a Django platform combining two deep-learning approaches to anticipate floods — a U-Net (PyTorch) segmenting flooded areas on Sentinel-1 SAR imagery (via openEO/Copernicus), and a bidirectional LSTM with attention (TensorFlow) predicting 5-day risk for a given location.',
        'My contribution focused on the LSTM prediction module: integrating the model (standard and CNN-LSTM variants) into the Django application, managing prediction history, and setting up a scheduled job (chronjob) for automatic updates.',
        'The LSTM model combines weather data (Visual Crossing), elevation (OpenTopoData), soil type (OpenEPI) and historical flood records (EM-DAT database), enriched with cyclical features to capture seasonality.',
      ],
    },
    outcomes: {
      fr: [
        "Intégration complète d'un modèle de deep learning (LSTM + attention) dans un pipeline Django de bout en bout : entraînement → sérialisation → prédiction → historique.",
        'Croisement de 4 sources de données externes hétérogènes (météo, élévation, sol, historique des catastrophes) pour enrichir un seul modèle prédictif.',
        'Automatisation des mises à jour de prédiction via une tâche planifiée (chronjob).',
      ],
      en: [
        'End-to-end integration of a deep learning model (LSTM + attention) into a Django pipeline: training → serialisation → prediction → history.',
        'Combined 4 heterogeneous external data sources (weather, elevation, soil, disaster history) to enrich a single predictive model.',
        'Automated prediction refresh via a scheduled job (chronjob).',
      ],
    },
    stack: ['Python', 'Django', 'TensorFlow', 'PyTorch', 'LSTM', 'U-Net'],
    category: 'ai',
    year: 2026,
    featured: true,
    links: {
      github: 'https://github.com/RayanMokhtar/Segmentation_images_satellites_Neural_networks',
    },
    image: {
      src: '/images/projects/placeholder-ai.svg',
      alt: {
        fr: 'Illustration du projet FloodAI',
        en: 'Illustration of the FloodAI project',
      },
      width: 1200,
      height: 675,
    },
  },
  {
    slug: 'us-accidents-data-mining',
    title: 'US Accidents — Data Mining',
    tagline: {
      fr: "Clustering et règles d'association sur 7,7 millions d'accidents routiers américains.",
      en: 'Clustering and association-rule mining over 7.7M US road-accident records.',
    },
    description: {
      fr: [
        'Analyse du dataset Kaggle "US Accidents" (2016-2023, environ 7,7 millions de lignes) : nettoyage, feature engineering (extraction jour/heure, optimisation mémoire par colonne) et exploration statistique (répartition temporelle, météo, sévérité, analyse par ville).',
        'Application de deux familles de clustering — K-Means (sélection de k par méthode du coude et score de silhouette) et DBSCAN — validées non pas seulement en interne mais aussi en externe via les indices ARI et NMI face à la sévérité réelle des accidents, avec profilage détaillé de chaque cluster.',
        "Recherche de règles d'association (Apriori et FPGrowth) pour identifier les combinaisons de facteurs météo/temporels associées aux accidents graves.",
      ],
      en: [
        'Analysis of the Kaggle "US Accidents" dataset (2016-2023, ~7.7M rows): cleaning, feature engineering (day/hour extraction, per-column memory optimisation) and statistical exploration (temporal distribution, weather, severity, city-level analysis).',
        'Applied two clustering families — K-Means (k selected via elbow method and silhouette score) and DBSCAN — validated not just internally but externally against real accident severity using ARI and NMI, with detailed per-cluster profiling.',
        'Mined association rules (Apriori and FPGrowth) to identify weather/time factor combinations linked to severe accidents.',
      ],
    },
    outcomes: {
      fr: [
        "Mise en évidence d'un paradoxe météo/gravité : les clusters aux conditions les plus favorables affichent jusqu'à +80% d'accidents graves par rapport au cluster hivernal le plus défavorable — un résultat cohérent avec le Risk Compensation Effect (Peltzman, 1975).",
        "Règles d'association montrant que les accidents graves sont 1,79x plus probables lors de conditions apparemment favorables (printemps, température modérée, bonne visibilité).",
        "Comparaison rigoureuse de deux algorithmes de clustering avec validation externe (ARI/NMI), plutôt qu'une simple évaluation interne au score de silhouette.",
      ],
      en: [
        'Surfaced a weather/severity paradox: clusters with the most favourable conditions show up to +80% more severe accidents than the least favourable winter cluster — consistent with the Risk Compensation Effect (Peltzman, 1975).',
        'Association rules showing severe accidents are 1.79x more likely under seemingly favourable conditions (spring, moderate temperature, good visibility).',
        'Rigorous comparison of two clustering algorithms with external validation (ARI/NMI), rather than relying on internal silhouette scoring alone.',
      ],
    },
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'mlxtend'],
    category: 'data',
    year: 2026,
    featured: true,
    links: {},
    image: {
      src: '/images/projects/placeholder-data.svg',
      alt: {
        fr: 'Illustration du projet US Accidents Data Mining',
        en: 'Illustration of the US Accidents Data Mining project',
      },
      width: 1200,
      height: 675,
    },
  },
  {
    slug: 'cnr-validation-vie-retraites',
    title: 'Validation de vie à distance — CNR',
    tagline: {
      fr: 'Plateforme de gestion des retraités intégrant reconnaissance faciale et détection de vivacité.',
      en: 'Pensioner management platform integrating face recognition and liveness detection.',
    },
    description: {
      fr: [
        'Développé lors d\'un stage à la Caisse Nationale des Retraites (CNR, Algérie) : un système sécurisant à distance la "validation de vie" des retraités, démarche périodique classiquement effectuée en agence.',
        "Un modèle de reconnaissance faciale associé à une détection de vivacité (anti-usurpation par photo ou vidéo) authentifie le retraité, tandis qu'une application web Django gère les dossiers administratifs : état civil, numéro de pension, photo biométrique.",
        'Le back-office expose un tableau de bord listant les retraités et leur statut, avec authentification dédiée pour les agents administratifs.',
      ],
      en: [
        'Built during an internship at Caisse Nationale des Retraites (CNR, Algeria): a system securing pensioners\' periodic "proof of life" remotely, a step traditionally requiring an in-person visit.',
        'A face recognition model paired with liveness detection (anti-spoofing against photos or videos) authenticates the pensioner, while a Django web application manages administrative records: civil status, pension number, biometric photo.',
        'The back office exposes a dashboard listing pensioners and their validation status, with dedicated authentication for administrative staff.',
      ],
    },
    outcomes: {
      fr: [
        "Sécurisation à distance d'une démarche auparavant obligatoirement effectuée en agence physique.",
        "Intégration bout-en-bout d'un modèle de deep learning (CNN) dans une application web de gestion destinée aux agents.",
        'Modèle validé sur des cas réels de tentative de usurpation (photo vs. visage en direct).',
      ],
      en: [
        'Enabled a previously in-person-only process to be completed securely and remotely.',
        'End-to-end integration of a deep learning model (CNN) into a management web application for administrative staff.',
        'Model validated against real spoofing attempts (photo vs. live face).',
      ],
    },
    stack: ['Python', 'Django', 'OpenCV', 'TensorFlow', 'CNN', 'MySQL'],
    category: 'ai',
    year: 2023,
    featured: true,
    links: {},
    image: {
      src: '/images/projects/placeholder-ai.svg',
      alt: {
        fr: 'Illustration du projet de validation de vie à distance CNR',
        en: 'Illustration of the CNR remote proof-of-life project',
      },
      width: 1200,
      height: 675,
    },
  },
  {
    slug: 'portfolio',
    title: 'Portfolio personnel',
    tagline: {
      fr: 'Ce site : un portfolio Angular 20 avec SSR, bilingue et zoneless.',
      en: 'This very site: an Angular 20 portfolio with SSR, bilingual and zoneless.',
    },
    description: {
      fr: [
        "Le portfolio que vous consultez actuellement, conçu comme une vitrine technique autant qu'un CV : Angular 20 standalone, zoneless, signals de bout en bout, nouvelle syntaxe de contrôle de flux et blocs @defer.",
        'Rendu hybride SSR + prerendering pour le SEO, i18n bilingue FR/EN piloté par signals sans rechargement de page, thème clair/sombre persistant, Tailwind CSS v4 en configuration CSS-first.',
        "Formulaire de contact fonctionnel (EmailJS), section projets alimentée dynamiquement par l'API GitHub, et conventions de code strictes documentées dans un fichier de règles dédié au projet.",
      ],
      en: [
        'The portfolio you are currently browsing, designed as a technical showcase as much as a résumé: standalone Angular 20, zoneless, signals end-to-end, the new control-flow syntax and @defer blocks.',
        'Hybrid SSR + prerendering for SEO, bilingual FR/EN i18n driven by signals with no page reload, a persisted light/dark theme, and Tailwind CSS v4 in CSS-first configuration.',
        'A working contact form (EmailJS), a projects section dynamically fed by the GitHub API, and strict coding conventions documented in a dedicated project rules file.',
      ],
    },
    outcomes: {
      fr: [
        'Architecture 100% standalone et zoneless, sans aucun NgModule.',
        'Prerendering de toutes les routes (y compris les pages projet) pour un temps de premier affichage minimal.',
        'Contenu entièrement bilingue avec bascule instantanée, sans rechargement de page.',
      ],
      en: [
        '100% standalone, zoneless architecture with zero NgModules.',
        'Every route prerendered (including project detail pages) for a minimal first paint.',
        'Fully bilingual content with an instant toggle and no page reload.',
      ],
    },
    stack: ['Angular', 'TypeScript', 'Tailwind CSS', 'SSR', 'Signals'],
    category: 'web',
    year: 2026,
    featured: true,
    links: {
      github: 'https://github.com/Walliodasu/Portfolio',
    },
    image: {
      src: '/images/projects/placeholder-web.svg',
      alt: {
        fr: 'Illustration du portfolio personnel',
        en: 'Illustration of the personal portfolio',
      },
      width: 1200,
      height: 675,
    },
  },
  {
    slug: 'museevasion',
    title: 'MuséeEvasion',
    tagline: {
      fr: "Plateforme collaborative d'exploration des musées, croisant trois API publiques.",
      en: 'Collaborative museum-discovery platform combining three public APIs.',
    },
    description: {
      fr: [
        "Projet réalisé en équipe de trois : une plateforme web permettant d'explorer les musées de France via des fiches détaillées, une recherche par ville ou par nom, et un système de favoris après inscription.",
        'Le back-end PHP/MySQL orchestre trois API externes : Wikimedia (contenus et images des musées), Dataculture (événements et expositions culturelles) et OpenStreetMap (cartographie et géolocalisation).',
        "Authentification par email avec confirmation d'inscription, et gestion de profil utilisateur pour personnaliser l'expérience.",
      ],
      en: [
        'A team project built with two other developers: a web platform to explore museums across France through detailed listings, search by city or name, and a favourites system after sign-up.',
        'The PHP/MySQL back end orchestrates three external APIs: Wikimedia (museum content and images), Dataculture (cultural events and exhibitions) and OpenStreetMap (mapping and geolocation).',
        'Email-confirmed sign-up and user profile management to personalise the experience.',
      ],
    },
    outcomes: {
      fr: [
        'Intégration de 3 API tierces hétérogènes (contenu, données culturelles, cartographie) dans une seule expérience utilisateur cohérente.',
        'Travail en équipe de 3 développeurs avec répartition front-end / back-end / intégration API.',
        "Déploiement d'une démo publique accessible en ligne.",
      ],
      en: [
        'Integrated 3 heterogeneous third-party APIs (content, cultural data, mapping) into one coherent user experience.',
        'Team of 3 developers, split across front end, back end and API integration.',
        'Deployed a publicly accessible live demo.',
      ],
    },
    stack: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    category: 'web',
    year: 2023,
    featured: false,
    links: {
      demo: 'https://museevasion.alwaysdata.net/',
    },
    image: {
      src: '/images/projects/placeholder-web.svg',
      alt: {
        fr: 'Illustration du projet MuséeEvasion',
        en: 'Illustration of the MuséeEvasion project',
      },
      width: 1200,
      height: 675,
    },
  },
];
