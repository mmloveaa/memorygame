$(document).ready(init)

/**
 * The constructor for the Game which takes num of Tiles to create
 * @param numTiles number of tiles to display
 */
function Game(numTiles) {
    this.numTiles = numTiles;
    this.arrayOfIds = [];
    this.arrayOfTiles = [];
    this.selectedTiles = [];
    this.correctAnswers = 0;
}

/**
 * 
 */
Game.prototype.makeBoard = function() {
    //console.log('makeBoard is running ')
    var self = this;
    this.arrayOfIds = randomArray(this.numTiles / 2)
    for ( var i = 0; i < this.arrayOfIds.length; i++) {
        var tile = new Tile(this.arrayOfIds[i])
        var $tile = $(tile.html)
        $tile.on('click', function() {
            // check if the number of selected tiles is less than two, if it is reveal the element if it is not then dont do anything
            if (self.selectedTiles.length < 2) {
                self.selectedTiles.push(this)
                var selTile = $($(this).children()[0])
                selTile.toggleClass('hidden')
                if (self.selectedTiles.length === 2) {

                    var $tile1 = $(self.selectedTiles[0])
                    var $tile2 = $(self.selectedTiles[1])

                    setTimeout(function() {
                        if (self.selectedTiles[0].id === self.selectedTiles[1].id) {
                            console.log('we have a match')
                            self.selectedTiles = [];
                            self.correctAnswers++
                                if (self.correctAnswers === self.numTiles / 2) {
                                    $("#board").html("You won!").css("font-size", "50px")
                                        //console.log('you won')
                                }
                        } else {
                            console.log('sorry try again')
                            $($tile1.children()[0]).toggleClass('hidden')
                            $($tile2.children()[0]).toggleClass('hidden')
                            self.selectedTiles = [];
                        }
                    }, 500)

                }
            }

        })
        this.arrayOfTiles.push(tile)
        $('#board').append($tile)
    }
}

//Step 3
function init() {
    $("#startGame").on('click', function() {
        var input = $('input').val();
        //console.log('input ', input)
        var game = new Game(input);
        //console.log('game ', game)
        game.makeBoard();
        $(this).unbind('click')
    })
    $('#reset').on('click', function() {
        location.reload();
    })
}

//Init function listens to the click handler, when its clicked, store the number input into numTiles, then makeBoard function will be invoked.


// Step 4
function Tile(id) {
    this.id = id;
    this.status = false;
    this.html = '<span class="tile" id=' + this.id + '><span class="hidden">' + this.id + '</span></span>'
}

// Step 5
// num is equal to number of unique ID
function randomArray(num) {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    var ordArr = [];
    var ranArr = [];

    for (var i = 0; i < num; i++) {
        ordArr.push(i);
        ordArr.push(i);
    }

    while (ordArr.length) {
        var index = getRandomInt(0, ordArr.length);
        ranArr.push(ordArr.splice(index, 1)[0])
    }
    return ranArr;
}