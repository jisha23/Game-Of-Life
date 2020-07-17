const prompt = require("prompt-sync")();
const _ = require("lodash");

let r = prompt("Enter row size : ");
let c = prompt("Enter column size : ");

let inputArray = []; //input array
let i, j;

let temp;
console.log("\nEnter the pattern row-wise\n\n\talive : x\tdead : -");
for (i = 0; i < r; i++) {
	let row = [];
	console.log("\nRow " + (i + 1));
	for (j = 0; j < c; j++) {
		temp = prompt("Enter : ");
		row.push(temp);
	}
	inputArray.push(row);
}

let outputArray = _.cloneDeep(inputArray);
let count;
// Finding Neighbours and Marking Dead or Alive
const nextPattern = (ip) => {
	ip.forEach((inar, i) => {
		inar.forEach((el, j) => {
			count = 0;
			if (i > 0 && j > 0 && ip[i - 1][j - 1] == "x") count++;
			if (i > 0 && ip[i - 1][j] == "x") count++;
			if (i > 0 && j < c - 1 && ip[i - 1][j + 1] == "x") count++;
			if (j > 0 && ip[i][j - 1] == "x") count++;
			if (j < c - 1 && ip[i][j + 1] == "x") count++;
			if (i < c - 1 && j > 0 && ip[i + 1][j - 1] == "x") count++;
			if (i < c - 1 && ip[i + 1][j] == "x") count++;
			if (i < c - 1 && j < c - 1 && ip[i + 1][j + 1] == "x") count++;
			//Dead or Alive
			if (el == "x") {
				if (count > 3 || count < 2) outputArray[i][j] = "-";
				else outputArray[i][j] = "x";
			}
			if (el == "-" && count == 3) outputArray[i][j] = "x";
		});
	});
};

//Display Function
const display = (arr) => {
	arr.forEach((a) => {
		console.log(a);
	});
};
console.log("\nInput Pattern");
display(inputArray);

do {
	inputArray = _.cloneDeep(outputArray);
	nextPattern(inputArray);
	console.log("\nNext Pattern");
	display(outputArray);
	var opt = prompt("Do you want to see the next pattern (y/n) ? ");
} while (opt == "y");

console.log("\n\tOkay, Thank You!\n");
