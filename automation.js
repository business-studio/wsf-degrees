function btoa(str) {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  let i = 0;
  let char1, char2, char3;
  
  while (i < str.length) {
    char1 = str.charCodeAt(i++);
    char2 = str.charCodeAt(i++);
    char3 = str.charCodeAt(i++);
    
    result += characters.charAt(char1 >> 2);
    result += characters.charAt(((char1 & 3) << 4) | (char2 >> 4));
    result += characters.charAt(((char2 & 15) << 2) | (char3 >> 6));
    result += characters.charAt(char3 & 63);
  }
  
  return result;
}
const studentName = "theolapeyre";
const studentEmail = "theo@business-studio.fr";
const dateDelivery = "2022-06-17T23:59:59Z";
const dateExpirancy = "2030-06-30T23:59:59Z";
const token = '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'; // Remplacez ceci par votre jeton d'accès personnel
const owner = 'business-studio'; // Votre nom d'utilisateur GitHub
const repo = 'wsf-degrees'; // Le nom du dépôt où vous voulez créer le fichier
const path = 'assertions/'+studentName+'-gdp-niv1-badge.json'; // Chemin du fichier dans le dépôt
const branch = 'main'; // Branche sur laquelle vous voulez pousser (par exemple, 'main')

const badgeData = {
    "@context": "https://w3id.org/openbadges/v2",
    "type": "Assertion",
    "id": 'https://raw.githubusercontent.com/business-studio/wsf-degrees/main/assertions/'+studentName+'-gdp-niv1-badge.json',
    "recipient": {
        "type": "email",
        "identity": studentEmail
    },
    "badge": "https://raw.githubusercontent.com/business-studio/wsf-degrees/main/gdp-niv1-badge.json",
    "verification": {
        "type": "hosted"
    },
    "issuedOn": dateDelivery,
    "expires": dateExpirancy
};

// Conversion de l'objet en chaîne JSON
const jsonData = JSON.stringify(badgeData, null, 4);

// Création de la requête à l'API GitHub
const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
const data = {
    message: "Ajout d'une nouvelle assertion",
    content: btoa(jsonData), // Encodage en base64
    branch: branch
};

fetch(url, {
    method: 'PUT',
    headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Erreur:', error));