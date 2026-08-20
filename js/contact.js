const USER_URL = "";
const USER_COLOR = ["red", "green", "blue", "purple", "orange", "cyan", "darkgreen", "darkred", "darkblue"];

let user = [{
    id: 1,
    name: "John",
    surName: "Doe",
    phone: "123-456-7890",
    email: "JohnDoe@example.com",
    color: "red"
},
{
    id: 2,
    name: "Jane",
    surName: "Smith",
    phone: "987-654-3210",
    email: "JaneSmith@example.com",
    color: "green"
},
{
    id: 3,
    name: "Alice",
    surName: "Johnson",
    phone: "555-123-4567",
    email: "AliceJohnson@example.com",
    color: "blue"
},
{
    id: 4,
    name: "Svetlana",
    surName: "Nova",
    phone: "222-333-4844",
    email: "SvetlanaNova@example.com",
    color: "darkred"
},
{
    id: 5,
    name: "Anna",
    surName: "Karasova",
    phone: "333-444-5555",
    email: "AnnaKarasova@example.com",
    color: "orange"
},
{
    id: 6,
    name: "Oliver",
    surName: "Pauls",
    phone: "222-333-4444",
    email: "OliverPauls@example.com",
    color: "cyan"
},
{
    id: 7,
    name: "Maurice",
    surName: "Kaisers",
    phone: "222-333-4444",
    email: "MauriceKaisers@example.com",
    color: "darkgreen"
},
{
    id: 8,
    name: "Sebastian",
    surName: "Müller",
    phone: "444-555-6666",
    email: "SebastianMueller@example.com",
    color: "purple"
},
{
    id: 9,
    name: "Dennis",
    surName: "Krombacher",
    phone: "222-333-4444",
    email: "DennisKrombacher@example.com",
    color: "darkblue"
},
{
    id: 10,
    name: "Natascha",
    surName: "Di Salvos",
    phone: "222-333-4444",
    email: "Nataschadisalvos@example.com",
    color: "darkgreen"
}
];

let idCounter = 10;

function init() {
    renderContactList();
    console.log(idCounter);
}



function renderContactList() {
    if (!document.getElementById('contact_list')) return;
    document.getElementById('contact_list').innerHTML = '';
    const groups = {};
    user.forEach(u => {
        helperGroupAlphabetics(u, groups);
    });
    loadContacts(groups);
}

function helperGroupAlphabetics(u, groups) {
    const name = (u.name || u.surName || '').toString().trim();
    const initial = name.charAt(0) ? name.charAt(0).toUpperCase() : '#';
    const key = /[A-Z]/i.test(initial) ? initial : '#';
    if (!groups[key]) groups[key] = [];
    groups[key].push(u);
}

function loadContacts(groups) {
    const keys = getSortedGroupKeys(groups);

    for (let i = 0; i < keys.length; i++) {
        const letter = keys[i];
        addContactTopic(letter);
        addGroupContacts(groups[letter]);
    }
}

function getSortedGroupKeys(groups) {
    return Object.keys(groups).sort((a, b) => {
        if (a === '#') return 1;
        if (b === '#') return -1;
        return a.localeCompare(b);
    });
}

function addContactTopic(letter) {
    document.getElementById('contact_list').innerHTML +=
        generateContactTopicHTML(letter);
}

function addGroupContacts(group) {
    group.sort(compareContacts);

    for (let i = 0; i < group.length; i++) {
        addContact(group[i]);
    }
}

function compareContacts(a, b) {
    const na = `${a.name || ''} ${a.surName || ''}`.trim();
    const nb = `${b.name || ''} ${b.surName || ''}`.trim();
    return na.localeCompare(nb);
}

function addContact(element) {
    const initials = `${(element.name || '').charAt(0)}${(element.surName || '').charAt(0)}`;
    const email = element.email.toLowerCase();
    document.getElementById('contact_list').innerHTML +=
        generateContactHTML(initials, element, email);
}



function highlightContact(contactId) {
    for (let i = 0; i < user.length; i++) {
        document.getElementById(`contact_${i + 1}`).classList.remove('btn-primary');
    }
    document.getElementById(`contact_${contactId}`).classList.add('btn-primary');
}



function addNewContact() {
    const nameInput = document.getElementById('contact_name').value;
    const surNameInput = document.getElementById('contact_surname').value;
    const emailInput = document.getElementById('contact_email').value;
    const phoneInput = document.getElementById('contact_phone').value;
    let randomColor = USER_COLOR[Math.floor(Math.random() * USER_COLOR.length)];
    const newContact = {
        id: user.length + 1,
        name: nameInput,
        surName: surNameInput,
        phone: phoneInput,
        email: emailInput,
        color: randomColor
    };
    user.push(newContact);
    clearContactForm();
}

function clearContactForm() {
    document.getElementById('contact_name').value = '';
    document.getElementById('contact_surname').value = '';
    document.getElementById('contact_phone').value = '';
    document.getElementById('contact_email').value = '';
}



function pushContactToServer() {
}

function editContact() {
    console.log("edit" + " " + user[0].name);
}

function deleteContact() {
    console.log("delete" + " " + user[0].name);
}


function dialogAddContact() {

}

function dialogEditContact() {

}

function dialogContactSuccessAdded() {
}


function loadContactDetails(contact, initials) {
    contact = user[contact - 1];

    document.getElementById('contact_details_initials').innerText = initials;
    document.getElementById('contact_details_name').innerText = contact.name + ' ' + contact.surName;
    document.getElementById('contact_details_email').innerText = contact.email.toLowerCase();
    document.getElementById('contact_details_email').setAttribute('href', `mailto:${contact.email} `);
    document.getElementById('contact_details_phone').innerText = contact.phone;
}



function generateContactTopicHTML(letter) {
    return `
        <div class="contact-list-letter">
            <div class="separator">
                <span class="initials-box">${letter}</span>
            </div>
        </div>
    `;
}

function generateContactHTML(initials, element, email) {
    return `
    <button id="contact_${element.id}" onclick="highlightContact(${element.id}), loadContactDetails(${element.id}, '${initials}')" class="contact-list-item">
        <div class="contact-content">
            <div class="initials-box">
                <span class="contact-initials color-${element.color}">${initials}</span>
            </div>
            <div class="contact-item">
                <span class="contact-list-name">${element.name} ${element.surName}</span>
                <a class="contact-list-email" href="mailto:${email}">${email}</a>
            </div>
        </div>
            </button >
    `
}

// Alle User Stories und Akzeptanzkriterien sind erfüllt
// Alle Features funktionieren fehlerfrei wie erwartet
// Vor Abgabe werden min. 5 realistische Tasks und 10 Kontakte hinzugefügt
// Alle Funktionialitäten von jedem Gruppenmitglied vor Abgabe manuell getestet mit aktuellsten Version Hauptbrowser
// Github Repository auf public

// Keine sensiblen Daten im Github Repository
// Nach abschluss sollte jeder das Projekt Forken

// Interaktions feedback
// 1:1 nachbau aus dem Figma
// btn Transitions
// App optimiert auf mobile (auch querformat)
// inputs und Btn keinen Border z.b. border: unset;

// Console muss leer bleiben
// Erstellter Content ist unmittelbar sichtbar

// Form-Validation: Was passiert bei leeren Inputs? (kein HTML5 verwenden)

// responsive min. 320px
// content begrenzung (1440px oder 1920px/linksbündig)
// Landscape modus deaktivieren mobile (ausser speziell optimiert)
// kein scrollbalken bei kleinen auflösungen

// Jede seite mind. eine JS-Datei
// Allgemeine seitenübergreifende JS-Datei

// Form Validierung
// Erstellter Content direkt sichtbar
// Button deaktivieren während der Ladezeit

// Funktion nur 1 Aufgabe
// Deutliche Funktionsnamen
// 2 Leerzeichen Zwischen Funktionen