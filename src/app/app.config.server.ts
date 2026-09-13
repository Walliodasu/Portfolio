import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(
      withRoutes(serverRoutes),
      // Optionnel selon la structure de votre version pour injecter les options de rendu, 
      // ou en configurant l'objet d'options directement :
    )
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);