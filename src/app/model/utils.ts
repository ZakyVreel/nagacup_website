export function formatTime(ms: number): string {
    // Convertir en secondes
    const totalSeconds = Math.floor(ms / 1000);
    
    // Extraire les heures, minutes et secondes
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    // Construire le format conditionnel
    let result = '';
  
    // Afficher les heures seulement si elles sont supérieures à 0
    if (hours > 0) {
      result += `${hours}:`;
    }
  
    // Ajouter les minutes avec un zéro devant si elles sont inférieures à 10, sauf s'il y a des heures
    if (minutes < 10 && hours > 0) {
      result += `0${minutes}:`;
    } else {
      result += `${minutes}:`;
    }
  
    // Ajouter les secondes avec un zéro devant si elles sont inférieures à 10
    if (seconds < 10) {
      result += `0${seconds}`;
    } else {
      result += `${seconds}`;
    }
  
    return result;
  }

  export function formatTimeWithMilliseconds(ms: number): string {
    // Convertir en secondes entières
    const totalSeconds = Math.floor(ms / 1000);
    
    // Extraire les heures, minutes, secondes et millisecondes
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;
  
    // Construire le format conditionnel
    let result = '';
  
    // Afficher les heures seulement si elles sont supérieures à 0
    if (hours > 0) {
      result += `${hours}:`;
    }
  
    // Ajouter les minutes avec un zéro devant si elles sont inférieures à 10, sauf s'il y a des heures
    if (minutes < 10 && hours > 0) {
      result += `0${minutes}:`;
    } else {
      result += `${minutes}:`;
    }
  
    // Ajouter les secondes avec un zéro devant si elles sont inférieures à 10
    if (seconds < 10) {
      result += `0${seconds}`;
    } else {
      result += `${seconds}`;
    }

    // Ajouter les millisecondes avec trois chiffres
    result += `.${milliseconds.toString().padStart(3, '0')}`;
  
    return result;
}


  export function formatUUID(uuid: string): string {
    // Assurez-vous que l'UUID fait bien 32 caractères
    if (uuid.length !== 32) {
      throw new Error("UUID invalide, il doit contenir exactement 32 caractères.");
    }
  
    // Ajouter les tirets aux positions correctes pour formater l'UUID
    return `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(12, 16)}-${uuid.slice(16, 20)}-${uuid.slice(20)}`;
  }
  