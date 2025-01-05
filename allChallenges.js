const allCardSection = document.querySelector(".cardSection");
const filterBtn = document.querySelector(".filterBtn");
const filterMenu = document.querySelector(".filterSection");
filterBtn.addEventListener("click", () => {
	filterMenu.classList.toggle("active");
	if(filterMenu.classList.contains("active")){
		console.log("is active");
		filterBtn.textContent = "";
		filterBtn.classList.remove("filterBtn");
		filterBtn.classList.add("filterOpenBtn");
		filterBtn.classList.add("fa-2xl");
		filterBtn.classList.add("fa-solid");
		filterBtn.classList.add("fa-xmark");
	} else{
		filterBtn.textContent = "Filter challenges";
		filterBtn.classList.remove("filterOpenBtn", "fa-2xl", "fa-solid", "fa-xmark");
		filterBtn.classList.add("filterBtn");
	}
});






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
		data.challenges.forEach((challenge) => {
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












//--------------func to generate card----------------
function generateCard(img, name, tag, stars, minPar, maxPar, desc) {
	const starsHTML = generateStars(stars);

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
                        ${starsHTML}
                    </div>
                    <p class="participants">${minPar}-${maxPar} participants</p>
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
	allCardSection.innerHTML += cardHTML;
}

function generateStars(stars) {
	let starsHTML = "";
	for (let i = 0; i < stars; i++) {
		starsHTML += '<i class="fa-solid fa-star"></i>';
	}
	for (let i = stars; i < 5; i++) {
		starsHTML += '<i class="fa-regular fa-star"></i>';
	}
	return starsHTML;
}
fetchData();
