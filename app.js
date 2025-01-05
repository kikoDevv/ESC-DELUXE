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

        // Sort challenges by rating in descending order
        const sortedChallenges = data.challenges.sort((a, b) => b.rating - a.rating);

        // Get the top-rated challenges (e.g., top 5)
        const topRatedChallenges = sortedChallenges.slice(0, 3);
        //---------create card-----------
        topRatedChallenges.forEach(challenge => {
            generateCard(
                challenge.image,
                challenge.title,
                challenge.type,
                challenge.rating,
                challenge.minParticipants,
                challenge.maxParticipants,
                challenge.description
            );
        });
    } catch (error) {
        console.error(error);
    }
}

//--------------func to create movie card-----------------
function generateCard(img, name, tag, stars, minParti, maxPari, desc) {
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
    participantsP.textContent = `${minParti} - ${maxPari}`;

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
