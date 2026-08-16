const USER_URL = "";
const USER_COLOR = ["red", "green", "blue", "purple", "orange", "cyan", "darkgreen", "darkred", "darkblue"];

let user = [{
    id: 1,
    name: "John",
    surName: "Doe",
    telefon: "123-456-7890",
    email: "JohnDoe@example.com",
    color: "red"
},
{
    id: 2,
    name: "Jane",
    surName: "Smith",
    telefon: "987-654-3210",
    email: "JaneSmith@example.com",
    color: "green"
},
{
    id: 3,
    name: "Alice",
    surName: "Johnson",
    telefon: "555-123-4567",
    email: "AliceJohnson@example.com",
    color: "blue"
},
{
    id: 4,
    name: "Sebastian",
    surName: "Müller",
    telefon: "444-555-6666",
    email: "SebastianMueller@example.com",
    color: "purple"
},
{
    id: 5,
    name: "Anna",
    surName: "Karasova",
    telefon: "333-444-5555",
    email: "AnnaKarasova@example.com",
    color: "orange"
},
{
    id: 3,
    name: "Oliver",
    surName: "Pauls",
    telefon: "222-333-4444",
    email: "OliverPauls@example.com",
    color: "cyan"
}
];

function init() {
    renderContactList();
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

function generateContactTopicHTML(letter) {
    return `
        <div class="contact-list-letter">
            <div class="separator">
                <span class="initials-box">${letter}</span>
            </div>
        </div>
    `;
}

function generateContactHTML(initials, element) {
    return `
            <div class="contact-list-item">
                <div class="contact-content">
                    <div class="initials-box">
                        <span class="contact-initials color-${element.color}">${initials}</span>
                    </div>
                    <div class="contact-item">
                        <span>${element.name || ''} ${element.surName || ''}</span>
                        <a href="mailto:${element.email || ''}">${element.email || ''}</a>
                    </div>
                </div>
            </div>
            `
}

function loadContacts(groups) {
    const keys = Object.keys(groups).sort((a, b) => {
        if (a === '#') return 1;
        if (b === '#') return -1;
        return a.localeCompare(b);
    });
    keys.forEach(letter => {
        document.getElementById('contact_list').innerHTML += generateContactTopicHTML(letter);
        groups[letter].sort((a, b) => {
            const na = ((a.name || '') + ' ' + (a.surName || '')).trim();
            const nb = ((b.name || '') + ' ' + (b.surName || '')).trim();
            return na.localeCompare(nb);
        }).forEach(element => {
            const initials = `${(element.name || '').charAt(0)}${(element.surName || '').charAt(0)}`;
            document.getElementById('contact_list').innerHTML += generateContactHTML(initials, element);
        });
    });
}

function addContact() {
    // const name = document.getElementById('contact_name').value;
    // const surName = document.getElementById('contact_surname').value;
    // const email = document.getElementById('contact_email').value;
    // const telefon = document.getElementById('contact_telefon').value;
    let randomColor = USER_COLOR[Math.floor(Math.random() * USER_COLOR.length)];

    const newContact = {
        id: user.length + 1,
        name: document.getElementById('contact_name').value,
        surName: document.getElementById('contact_surname').value,
        telefon: document.getElementById('contact_telefon').value,
        email: document.getElementById('contact_email').value,
        color: randomColor
    };
    user.push(newContact);
}

function pushContactToServer() {
}

function editContact() {
}
    
function deleteContact() {
}