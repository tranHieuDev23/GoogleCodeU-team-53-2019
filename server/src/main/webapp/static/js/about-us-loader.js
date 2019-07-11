// Fetch information about team member and add them to the page.
function fetchTeamMember() {
    const url = '/aboutus';
    fetch(url).then((response) => {
        return response.json();
    }).then((members) => {
        const memberContainer = document.getElementById('team-information-container');
        if (members.length == 0) {
            memberContainer.innerHTML = '<p>No information.</p>';
        }
        else {
            memberContainer.innerHTML = '';
        }
        members.forEach((member) => {
            const memberDiv = buildTeamMemberDiv(member);
            memberContainer.appendChild(memberDiv);
        });
    });
}

function buildTeamMemberDiv(member) {
    const nameHeader = document.createElement('h2');
    nameHeader.appendChild(document.createTextNode(member.name));

    const informationList = document.createElement('ul');

    const feelzItem = document.createElement('li');
    feelzItem.appendChild(document.createTextNode("Summer Feelz: " + member.summerFeelz));
    const hobbyItem = document.createElement('li');
    hobbyItem.appendChild(document.createTextNode("Aspirational Hobby: " + member.aspirationalHobby));
    const askMeItem = document.createElement('li');
    askMeItem.appendChild(document.createTextNode("Ask me About: " + member.askMeAbout));

    informationList.appendChild(feelzItem);
    informationList.appendChild(hobbyItem);
    informationList.appendChild(askMeItem);

    const memberDiv = document.createElement('div');
    memberDiv.appendChild(nameHeader);
    memberDiv.appendChild(informationList);

    return memberDiv;
}

// Fetch data and populate the UI of the page.
function buildUI() {
    fetchTeamMember();
}