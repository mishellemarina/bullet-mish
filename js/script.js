// Función genérica para guardar en localStorage y mostrar en DOM
function setupPage(storageKey, formId, listId, fields) {
    const form = document.getElementById(formId);
    const ul = document.getElementById(listId);
    const savedList = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    savedList.forEach(item => addToDOM(item));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const item = {};
        fields.forEach(field => {
            const element = document.getElementById(field);
            if(element.type === "checkbox") {
                item[field] = element.checked;
            } else {
                item[field] = element.value;
            }
        });

        savedList.push(item);
        localStorage.setItem(storageKey, JSON.stringify(savedList));
        addToDOM(item);
        form.reset();
    });

    function addToDOM(item) {
        const li = document.createElement('li');
        li.textContent = fields.map(f => `${f}: ${item[f]}`).join(' | ');
        ul.appendChild(li);
    }
}
