
// Var is Global Variable
function varIsGlobal() {
    //Var is Global
    var numArray = [];
    for (var i = 0; i < 3; i++) {
        numArray.push(i);
    }
    console.log(numArray);
    console.log(i);
}
//Const still can edit
function constArrIsEditable() {
    const s = [5, 6, 7];
    console.log("before " + s);
    s[0] = 7;
    s[1] = 6;
    s[2] = 5;
    console.log("after " + s);
}
// Freeze Obj cannot edit anywhere
function freezeObj() {
    let obj = {
        nama: "Yuyun Purniawan",
        kelas: "08TPLE019",
        nim: "191011401330"
    }
    console.log(obj);
    Object.freeze(obj);

    console.log("Object not change");
    obj.nama = "adw";
    console.log(obj);
}
//Passing multi params
function restParameter(...args) {
    let xargs = args.length;
    for (let i = 0; i < args.length; i++) {
        console.log(args[i]);

    }
    console.log("total args passed : " + xargs);
}
//How to copy array using spread
function spreadOperator() {
    const arr1 = [6, 89, 3, 45];
    let arr2;

    arr2 = Math.max.apply(null, arr1);
    console.log(arr2);

    arr2 = Math.max(...arr1);
    console.log(arr2);

    arr2 = [...arr1]
    console.log(arr2);
}
//Destructing style assignment
function destructing() {
    const user = { name: 'John Doe', age: 34 };

    const { name, age } = user;

    console.log("Name :" + name + "\n" + "Age : " + age);

}
//Destructing and assign with custom
function destructingAndAssign() {
    const user = { name: 'John Doe', age: 34 };
    console.log(user);

    const { name: userName, age: userAge } = user;
    console.log("User Name : " + userName + "\n" + "Age : " + userAge);

}
// Destructing assignment with nested object
function destructingAndObject() {
    const user = {
        johnDoe: {
            age: 34,
            email: 'johnDoe@freeCodeCamp.com'
        }
    };
    const { johnDoe: { age: userAge, email: userEmail } } = user;
    console.log(userAge + "|" + userEmail);
}
//Destructing Assignment array
function destructingArray() {
    const [a, b, , , c] = [1, 2, 3, 4, 5, 6];
    console.log(a, b, c);

}
//Use destructing to swap
function destructingArraySwap() {
    let a = 1, b = 2;
    [a, b] = [b, a];
    console.log(a, b);
}
//Using rest to get all sisa destructing
function destructingRest() {

    const [a, b, ...args] = [1, 2, 3, 4, 5, 6];
    console.log(a, b, args);

}
//Contohnya kaya gini ({})
function destructingAndPassObjToFunct() {

    const stats = {
        max: 56.78,
        standard_deviation: 4.34,
        median: 34.54,
        mode: 23.87,
        min: -0.75,
        average: 35.85
    };

    // Only change code below this line
    const half = ({ max, min }) => (max + min) / 2.0;

    console.log(half(stats));

    // Only change code above this line
}
//Template Literals, echo var on string
function templateLiteral() {
    const person = {
        nama: "Yuyun Purniawan",
        age: 21
    }

    const greeting = `Hello, my name is ${person.nama}`;
    console.log(greeting);
}
//Example above
function templateLiteralexample() {
    const result = {
        success: ["max-length", "no-amd", "prefer-arrow-functions"],
        failure: ["no-var", "var-on-top", "linebreak"],
        skipped: ["no-extra-semi", "no-dup-keys"]
    };
    function makeList(arr) {
        // Only change code below this line
        const failureItems = [...arr];

        for (let index = 0; index < failureItems.length; index++) {
            failureItems[index] = `<li class="text-warning">${failureItems[index]}</li>`;
        }
        // Only change code above this line

        return failureItems;
    }

    const failuresList = makeList(result.failure);
    console.log(failuresList);
}
// return object literal
function objectPropShorthand() {

    const createPerson = ({ name, age, gender }) => {
        // Only change code below this line
        return {
            name, age, gender
        };
        // Only change code above this line
    };

    const varMy = {
        name: "Yuyun Purnaiawan",
        age: 21,
        gender: "male"
    }

    console.log(createPerson(varMy));
}
//sayHello() {} on array
function conciseDeclarative() {

    const person = {
        name: "Taylor",
        sayHello() {
            return `Hello ${this.name}`;
        }
    };

    console.log(person.sayHello());
}

//Class start
class SpaceShuttle {
    constructor(targetPlanet) {
        this.targetPlanet = targetPlanet;
    }
    takeOff() {
        console.log("To " + this.targetPlanet);
    }
}
class Rocket {
    launch() {
        console.log("To the moon");
    }
}
function runClass1() {
    const zeus = new SpaceShuttle('Jupiter');
    zeus.takeOff();
    const atlas = new Rocket();
    atlas.launch();
}

//Class Getter Setter
class Book {
    constructor(author) {
        this._author = author;
    }
    get writer() {
        return this._author;
    }
    set writer(updatedAuthor) {
        this._author = updatedAuthor;
    }
}
function runClass2() {
    const novel = new Book('anonymous');
    console.log(novel.writer);
    novel.writer = "Yuyun Purniawan";
    console.log(novel.writer);
}

{/* <script type="module" src="index.js"></script> */ }


//Promise like try catch
const myPromise = (valIn) => {
    return new Promise((resolve, reject) => {
        if (valIn < 10) {
            resolve("Accept");
        }
        else {
            reject("More than 10");
        }
    })
}

myPromise(12).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
})


//Export Function
const uppercaseString = (string) => {
    return string.toUpperCase();
}

const lowercaseString = (string) => {
    return string.toLowerCase()
}
// export { uppercaseString, lowercaseString };
// import {uppercaseString, lowercaseString} from './string_functions.js' ; 

// IMPORT EVERYTHING
// import * as stringFunctions from 'string_functions.js';

//Array Manipulation
function myArrTest() {
    let arrX = [1, 2, 3, 4];

    arrX.pop();
    arrX.push(5);

    arrX.shift();
    arrX.unshift(8);

    console.log(JSON.stringify(arrX));
}

myArrTest();