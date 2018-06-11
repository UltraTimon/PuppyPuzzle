let main = function(){
    //init message to check whether the js file is linked correctly
    console.log("yes it works");

    //source of img
    let imgSource = "https://vignette.wikia.nocookie.net/r2d/images/2/22/If-you-know-what-i-mean-mr-bean-rage-face-jas-fasola-podtekst-erotyczny-mem-oryginal.png/revision/latest?cb=20150513124703";

    //setting the options of the grids
    var options = {
        widget_base_dimensions: [130, 100],
        widget_margins: [0, 0],
        avoid_overlapped_widgets: true
    };

    $(".gridster ul").gridster(options);

    //initializing gridster 'object'
    let gridster = $(".gridster ul").gridster().data('gridster');

    //counter for giving grids an id
    let counter = 0;
    let newCounter = function(){
        return counter++;
    }

    //adding a grid
    $("#addGrid").click(function() {
        let id = newCounter();
        let width = $("#newGridWidth").val();
        let height = $("#newGridHeight").val();
        gridster.add_widget('<li class="new" id='+ id + '><img src=' + imgSource + '> ' + id + '</li>', width, height);
    })


    //removing a grid
    $("#removeGrid").click(function() {
        let removeId = $("#removeId").val();
        console.log("removeId: " + removeId);
        gridster.remove_widget( $('#' + removeId), function(){
            console.log("grid removed, id=" + removeId);
        });
    })

    //solution object list
    let solution = 
    [
        { id: 1, col: 1, row: 1},
        { id: 2, col: 2, row: 1},
        { id: 3, col: 3, row: 1},
        { id: 4, col: 1, row: 2},
        { id: 5, col: 2, row: 2},
        { id: 6, col: 3, row: 2},
        { id: 7, col: 1, row: 3},
        { id: 8, col: 2, row: 3},
        { id: 9, col: 3, row: 3},
    ];

    $("#checkPuzzle").click(function() {
        let children = $("#puzzle").children();
        console.log(children[3]);
        if(allWellPlaced(children)){
            alert("Congratz! The puzzle is correct!")
        }
        else{
            alert("Alas! The puzzle is not yet correct.")
        }
        
    });

    //get corresponding object to check position
    let getCheckObject = function(Id){
        for (let index = 0; index < solution.length; index++) {
            const element = solution[index];
            if(element.id == Id){
                return element;
            }
        }
    }

    //check if position of widget is correct
    let wellPlaced = function(listItem) {
        checkObject = getCheckObject(listItem.id);
        if(listItem.dataset.row == checkObject.row){
            if(listItem.dataset.col == checkObject.col){
                return true;
            }
        }
        return false;
    }

    //check if all are correctly placed
    let allWellPlaced = function(children) {
        let correct = true;
        for (let index = 0; index < children.length; index++) {
            const element = children[index];
            if(!wellPlaced(element)){
                correct = false;
            }
        }
        return correct;
    }



};
$(document).ready(main);