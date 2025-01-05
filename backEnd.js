fetchData();

async function fetchData() {
    try {
        const response = await fetch(
            "https://lernia-sjj-assignments.vercel.app/api/challenges"
        );
        if (!response.ok) {
            throw new Error("could not fetch data!");
        }
        const data = await response.json();
        console.log(data);
        console.log(`Length of data: ${data.challenges.length}`);
        //---------create card-----------
        data.challenges.forEach(challenge => {
            generateMovieCard(
                challenge.image, // Assuming the image URL is in the 'image' property
                challenge.title, // Assuming the title is in the 'title' property
                challenge.type, // Assuming the type is in the 'type' property
                challenge.rating, // Assuming the rating is in the 'rating' property
                challenge.maxParticipants, // Assuming the max participants is in the 'maxParticipants' property
                challenge.description // Assuming the description is in the 'description' property
            );
        });
    } catch (error) {
        console.error(error);
    }
}

function generateMovieCard(img, name, tag, stars, participants, desc) {
    const cardSection = document.querySelector(".cardSection");

    const card = document.createElement("div");
    card.className = "card";

    const cardImg = document.createElement("img");
    cardImg.className = "cardImg";
    cardImg.src = img;

    const cardInfo = document.createElement("div");
    cardInfo.className = "cardInfo";

    const nameTag = document.createElement("div");
    nameTag.className = "name-tag";

    const cardName = document.createElement("p");
    cardName.className = "cardName";
    cardName.textContent = name;

    const cardTag = document.createElement("p");
    cardTag.textContent = tag;

    nameTag.appendChild(cardName);
    nameTag.appendChild(cardTag);

    const starsParticipants = document.createElement("div");
    starsParticipants.className = "stars-participents";

    const starsContainer = document.createElement("div");
    starsContainer.className = "starsContainer";

    for (let i = 0; i < stars; i++) {
        const star = document.createElement("i");
        star.className = "fa-solid fa-star";
        starsContainer.appendChild(star);
    }

    for (let i = stars; i < 5; i++) {
        const star = document.createElement("i");
        star.className = "fa-regular fa-star";
        starsContainer.appendChild(star);
    }

    const participantsP = document.createElement("p");
    participantsP.className = "participants";
    participantsP.textContent = participants;

    starsParticipants.appendChild(starsContainer);
    starsParticipants.appendChild(participantsP);

    const des = document.createElement("div");
    des.className = "des";

    const cardDescription = document.createElement("p");
    cardDescription.className = "cardDescription";
    cardDescription.textContent = desc;

    des.appendChild(cardDescription);

    const cardBtn = document.createElement("button");
    cardBtn.className = "cardBtn";
    cardBtn.textContent = "Book this room";

    cardInfo.appendChild(nameTag);
    cardInfo.appendChild(starsParticipants);
    cardInfo.appendChild(des);
    cardInfo.appendChild(cardBtn);

    card.appendChild(cardImg);
    card.appendChild(cardInfo);

    cardSection.appendChild(card);
}
