const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';

const pathCharacter = '*';


class Field {
    constructor(fieldArray){
        this._fieldArray = fieldArray;
        this._playerPosition = fieldArray[0][0];
        this._vertLoc = 0;
        this._horLoc = 0;
    }

    static generateField(height, width, holePercentage){
        // creates array for selection in line with percentage change of each type of character
        let fieldPercentage = 100-holePercentage;
        let selectorArray = [];
        for (let i = holePercentage; i > 0; i--){
            selectorArray.push(hole);
        }
        let f = fieldPercentage
        while (f > 0){
            selectorArray.push(fieldCharacter);
            f--;
        }
       

        // generate output array using selector:
        let outputArray = [];
        let h = height;
        while (h > 0){
            let horizonatalArr = []
            let w = width;
            while (w > 0){
                let selectionIndex = Math.floor(Math.random() * 100);
                horizonatalArr.push(selectorArray[selectionIndex])
            
                w--
            }
            outputArray.push(horizonatalArr);
            h--
        }

        // places hat in random position
        let vertHatPlacement = Math.floor(Math.random() * (height-.5));
        let horHatPlacement = Math.floor(Math.random() * (width-.5));
        outputArray[vertHatPlacement][horHatPlacement] = hat;

        outputArray[0][0] = pathCharacter;

        return outputArray;

        

    }

    print(){
        console.log('printing');
        let arr = this._fieldArray;
        for(let i = 0; i<arr.length; i++){
            console.log(arr[i].join(""));
        }
    }

    getMove(){
        let userInput = prompt('Which way? ');
    
        switch (userInput){
            case 'u':
                return 'up';
                break;
            case 'd':
                return 'down';
                break;
            case 'l':
                return 'left';
                break;
            case 'r':
                return 'right';
                break;
            default:
                return 'invalid';
        }
    
    }

    playerMove(){
        let newMove = this.getMove();
        switch (newMove) {
            case 'up':
                this._vertLoc -= 1;
                break;

            case 'down':
                this._vertLoc += 1;
                break;
            case 'left':
                this._horLoc -= 1;
                break;
            case 'right':
                this._horLoc +=1;
                break;
        }    
    }

    addPath(){
        let gameState = null;
        this._playerPosition = this._fieldArray[this._vertLoc][this._horLoc];
        gameState = this.playerLocType()
        this._fieldArray[this._vertLoc][this._horLoc] = pathCharacter;
        return gameState;
        
    }

    playerLocType(){
        if (this._playerPosition == hat){
            console.log('Congratulations, you found your hat!');
            return 'win';
        }else if (this._playerPosition == hole){
            console.log('Oh no! You fell down a hole.');
            return 'lost';
        }else if (this._vertLoc === -1 || this._vertLoc > this._fieldArray.length){
            console.log('Out of bounds!');
        }else if (this._horLoc === -1 || this._horLoc > this._fieldArray[0].length-1) {
            console.log('Out of bounds!');
            return 'lost';
        }else{
            console.log('returning null');
            return null;
        }

    }

    playField(){
        
        let gameState = null;
        while (gameState == null){
            this.print()
            this.playerMove();
            console.log('player has moved')
            gameState = this.addPath();
            
            
        }
    }




}

let height = prompt('Enter height: ');
let width = prompt('Enter width: ');
let percentage = prompt('Enter % of holes (higher is more difficult or even impossible): ')

const newField = new Field(Field.generateField(height, width, percentage));

newField.playField();







