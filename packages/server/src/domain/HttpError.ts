import { IHttpErrorConstructor } from "fastify";

/**
 * Classe personnalisée pour gérer les erreurs avec codes d'état HTTP.
 */
export class HttpError extends Error {
  statusCode: number;
  additionalInfo?: any; // Informations supplémentaires pour le débogage

  /**
   * Crée une instance de HttpError.
   * @param {string} message - Le message d'erreur.
   * @param {number} [statusCode=500] - Le code d'état HTTP associé à l'erreur.
   * @param {string} [name='HttpError'] - Le nom de l'erreur.
   * @param {any} [additionalInfo] - Informations supplémentaires relatives à l'erreur.
   */
  constructor(error: IHttpErrorConstructor) {
    super(error.message);
    this.statusCode = error.statusCode || 500;
    this.name = error.name || "HttpError";
    this.additionalInfo = error.additionalInfo;
  }
}