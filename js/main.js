let theButtons = document.querySelectorAll("#buttonHolder img"),
    theHeading = document.querySelector("#headLine h1"),
    puzzleBoard = document.querySelector(".puzzle-board"),
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
    } else {
        console.log("This drop zone is already occupied");
    }
}

function handleRemove(e) {
    console.log('removed piece from drop zone');
    this.classList.remove("occupied");
}



puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

dropZones.forEach(zone => {
    zone.addEventListener("dragover", handleDragOver);
    zone.addEventListener("drop", handleDrop);
    zone.addEventListener("DOMNodeRemoved", handleRemove);
});


puzzlePiecesBoard.forEach(zone => {
    zone.addEventListener("dragover", handleDragOver);
    zone.addEventListener("drop", handleDrop);
    zone.addEventListener("DOMNodeRemoved", handleRemove);
});


1

