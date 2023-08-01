/* ----------------skeleton--------------------*/
function addSkeleton() {
    for (let i = 0; i < 20; i++) {
        $templateSkeleton += `
    <div class="card skeleton">
        <div class=" card-text">
            <div class="skeleton-text"></div>
            <i class="fa-regular fa-heart skeleton-svg" style="color: #000000;"></i>
        </div>
        <img class="pokemon-img" src="./assets/empty.png"/>
        <div class="card-text text-bottom">
            <p class="skeleton-text"></p>
            <a><button disabled class= "buy-button skeleton-btn" >Buy</button></a>
        </div>
    </div>
    `;
        $skeletonContainer.innerHTML = $templateSkeleton;
    }
}

function hideSkeleton() {
    let skltArray = Array.from(document.getElementsByClassName('skeleton'));
    skltArray.forEach(element => {
        element.classList.add('hidden');
    });
}

function showSkeleton() {
    let skltArray = Array.from(document.getElementsByClassName('skeleton'));
    skltArray.forEach(element => {
        element.classList.remove('hidden');
    });
}