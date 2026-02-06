/* --- game.js --- */

// --- 1. GESTION DU PANNEAU D'INFORMATION ---

/**
 * Met à jour le panneau latéral avec les infos de l'élément survolé
 * @param {string} id - Le symbole de l'élément (ex: "Fe")
 */
function showInfo(id) {
    const data = elementsData.find(e => e.id === id);
    if (!data) return;

    // Fonction utilitaire pour mettre à jour un champ s'il existe dans le DOM
    const setText = (elemId, text) => {
        const el = document.getElementById(elemId);
        if (el) el.textContent = text;
    };
    const setHTML = (elemId, html) => {
        const el = document.getElementById(elemId);
        if (el) el.innerHTML = html;
    };

    setText('info-nom', data.nom);
    setText('info-symbole', data.id);
    setText('info-masse', data.masse);
    setHTML('info-formule', data.formule);
    setHTML('info-propPhy', data.propPhy);
    setHTML('info-propChi', data.propChi);
    setHTML('info-composes', data.composes);
}

/**
 * Vide ou réinitialise le panneau (optionnel)
 */
function clearInfo() {
    // On peut laisser vide ou remettre un texte par défaut
}


// --- 2. GESTION DU DRAG & DROP (BASIQUE) ---

function commonAllowDrop(ev) {
    ev.preventDefault();
}

function commonDragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    // Effet visuel optionnel : changer l'opacité
    // ev.target.style.opacity = "0.5"; 
}


// --- 3. GÉNÉRATEUR DE CARTES (FACTORY) ---

function createCard(elementData, isDraggable = true) {
    const div = document.createElement('div');
    div.className = 'element-card';
    div.id = elementData.id;
    
    // Conteneur pour le Symbole (ex: Al)
    const symboleSpan = document.createElement('span');
    symboleSpan.textContent = elementData.id;
    div.appendChild(symboleSpan);

    // Ajout de l'indication de la masse sous le symbole
    const masseDiv = document.createElement('div');
    masseDiv.className = 'element-mass';
    masseDiv.textContent = `m = ${elementData.masse}`;
    div.appendChild(masseDiv);
    
    if (isDraggable) {
        div.draggable = true;
        div.addEventListener('dragstart', commonDragStart);
    }

    div.addEventListener('mouseover', () => showInfo(elementData.id));
    div.addEventListener('mouseout', clearInfo);

    return div;
}