let theButtons = document.querySelectorAll("#buttonHolder img"),
    theHeading = document.querySelector("#headLine h1"),
    puzzlePieces = document.querySelectorAll(".puzzle-pieces img"),
    puzzlePiecesBoard = document.querySelectorAll(".puzzle-pieces"),
    dropZones = document.querySelectorAll('.drop-zone'),
    draggedPiece;


function handleStartDrag() {
    console.log('started dragging this piece:', this);
    draggedPiece = this;
}

function handleDragOver(e) {
    e.preventDefault();
    console.log('dragged over me');
}

function isDropZoneEmpty(zone) {
    return !zone.classList.contains("occupied");
}

function handleDrop(e) {
    e.preventDefault();
    console.log('dropped something on me');
    if (isDropZoneEmpty(this)) {
        this.appendChild(draggedPiece);
        this.classList.add("occupied");
        const soundSrc = draggedPiece.getAttribute("data-audio");
        const sound = new Audio(soundSrc);
        sound.loop = true;
        sound.play();
    } else {
        console.log("This drop zone is already occupied");
    }
}

function handleRemove(mutationsList) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            if (!mutation.target.hasChildNodes()) {
                console.log('removed piece from drop zone');
                mutation.target.classList.remove("occupied");
            }
        }
    }
}

const observerConfig = {
    childList: true
};

dropZones.forEach(zone => {
    zone.addEventListener("dragover", handleDragOver);
    zone.addEventListener("drop", handleDrop);

    const observer = new MutationObserver(handleRemove);
    observer.observe(zone, observerConfig);
});

puzzlePiecesBoard.forEach(zone => {
    zone.addEventListener("dragover", handleDragOver);
    zone.addEventListener("drop", handleDrop);

    const observer = new MutationObserver(handleRemove);
    observer.observe(zone, observerConfig);
});

puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));
