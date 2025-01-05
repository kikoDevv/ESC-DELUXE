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

    const cardHTML = `
        <div class="card">
            <img class="cardImg" src="${img}" />
            <div class="cardInfo">
                <div class="name-tag">
                    <p class="cardName">${name}</p>
                    <p>${tag}</p>
                </div>
                <div class="stars-participents">
                    <div class="starsContainer">
                        ${generateStars(stars)}
                    </div>
                    <p class="participants">${minParti}-${maxPari} participants</p>
                </div>
                <div class="des">
                    <p class="cardDescription">
                        ${desc}
                    </p>
                </div>
                <button class="cardBtn">Book this room</button>
            </div>
        </div>
    `;

    cardSection.innerHTML += cardHTML;
}

function generateStars(stars) {
    let starsHTML = '';
    for (let i = 0; i < stars; i++) {
        starsHTML += '<i class="fa-solid fa-star"></i>';
    }
    for (let i = stars; i < 5; i++) {
        starsHTML += '<i class="fa-regular fa-star"></i>';
    }
    return starsHTML;
}
