const length = 100;
let items = [];

function setup() {
	createCanvas(600, 400);
	randomizeItems(length);
	frameRate(1);
}

async function draw() {
	background(200);
	displayItems();
	items = await mergeSort(items);
}

const mergeSort = async l => {
	displayItems();
	if (l.length <= 1) {
		return l;
	}

	const middleIndex = ceil((l.length - 1) / 2);
	let left = l.slice(0, middleIndex);
	let right = l.slice(middleIndex, l.length);

	left = await mergeSort(left);
	right = await mergeSort(right);

	return merge(left, right);
};

const merge = (left, right) => {
	displayItems();
	let result = [];

	while (left.length > 0 && right.length > 0) {
		if (left[0] <= right[0]) {
			result.push(left[0]);
			left = left.slice(1, left.length);
		} else {
			result.push(right[0]);
			right = right.slice(1, right.length);
		}
	}

	if (left.length > 0) {
		result = result.concat(left);
	} else {
		result = result.concat(right);
	}

	return result;
};

const randomizeItems = n => {
	for (let i = 0; i < n; i++) {
		const r = random();
		items.push(r);
	}
};

const displayItems = () => {
	fill(0);
	stroke(255);
	const w = width / length;
	for (let i = 0; i < length; i++) {
		const h = map(items[i], 0, 1, 0, height);
		rect(i * w, height - h, w, h);
	}
};
