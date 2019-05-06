const plants = [{
		name: "Artichoke",
		startIndoors: true,
		startIndoorsMax: -8,
		startIndoorsMin: -7,
		startOutdoorsMin: 0,
		startOutdoorsMax: 1
	},
	{
		name: "Arugula",
		startIndoors: false,
		startOutdoorsMin: -4,
		startOutdoorsMax: -3
	},
	{
		name: "Asparagus Crowns",
		startIndoors: false,
		startOutdoorsMin: -4,
		startOutdoorsMax: -2
	},
	{
		name: "Basil",
		startIndoors: true,
		startIndoorsMax: -6,
		startIndoorsMin: -4,
		startOutdoorsMin: 2,
		startOutdoorsMax: 4
	},
	{
		name: "Beans",
		startIndoors: false,
		startOutdoorsMin: 1,
		startOutdoorsMax: 3
	},
	{
		name: "Beets",
		startIndoors: false,
		startOutdoorsMin: -3,
		startOutdoorsMax: -2
	},
	{
		name: "Bok Choy",
		startIndoors: true,
		startIndoorsMax: -6,
		startIndoorsMin: -4,
		startOutdoorsMin: -2,
		startOutdoorsMax: -1
	},
	{
		name: "Broccoli",
		startIndoors: true,
		startIndoorsMax: -8,
		startIndoorsMin: -6,
		startOutdoorsMin: -3,
		startOutdoorsMax: -2
	},
	{
		name: "Cabbage",
		startIndoors: true,
		startIndoorsMax: -8,
		startIndoorsMin: -6,
		startOutdoorsMin: -3,
		startOutdoorsMax: -2
	},
	{
		name: "Cauliflower",
		startIndoors: true,
		startIndoorsMax: -8,
		startIndoorsMin: -6,
		startOutdoorsMin: -3,
		startOutdoorsMax: -2
	},
	{
		name: "Carrots",
		startIndoors: false,
		startOutdoorsMin: -4,
		startOutdoorsMax: -2
	},
	{
		name: "Celery",
		startIndoors: true,
		startIndoorsMax: -10,
		startIndoorsMin: -9,
		startOutdoorsMin: 0,
		startOutdoorsMax: 2
	},
	{
		name: "Chives",
		startIndoors: true,
		startIndoorsMax: -10,
		startIndoorsMin: -9,
		startOutdoorsMin: -3,
		startOutdoorsMax: -2
	},
	{
		name: "Cilantro",
		startIndoors: false,
		startOutdoorsMin: 0,
		startOutdoorsMax: 0
	},
	{
		name: "Collards",
		startIndoors: true,
		startIndoorsMax: -10,
		startIndoorsMin: -9,
		startOutdoorsMin: -4,
		startOutdoorsMax: -2
	},
	{
		name: "Corn",
		startIndoors: false,
		startOutdoorsMin: 1,
		startOutdoorsMax: 2
	},
	{
		name: "Claytonia",
		startIndoors: false,
		startOutdoorsMin: -5,
		startOutdoorsMax: -4
	},
	{
		name: "Cucumber",
		startIndoors: false,
		startOutdoorsMin: 1,
		startOutdoorsMax: 2
	},
	{
		name: "Dill",
		startIndoors: true,
		startIndoorsMax: -8,
		startIndoorsMin: -7,
		startOutdoorsMin: -3,
		startOutdoorsMax: -2
	},
	{
		name: "Eggplant",
		startIndoors: true,
		startIndoorsMax: -7,
		startIndoorsMin: -6,
		startOutdoorsMin: 3,
		startOutdoorsMax: 4
	},
	{
		name: "Endive",
		startIndoors: true,
		startIndoorsMax: -9,
		startIndoorsMin: -8,
		startOutdoorsMin: -3,
		startOutdoorsMax: -2
	},
	{
		name: "Horseradish",
		startIndoors: false,
		startOutdoorsMin: -3,
		startOutdoorsMax: -2
	},
	{
		name: "Kale",
		startIndoors: true,
		startIndoorsMax: -10,
		startIndoorsMin: -9,
		startOutdoorsMin: -4,
		startOutdoorsMax: -2
	},
	{
		name: "Kohlrabi",
		startIndoors: true,
		startIndoorsMax: -10,
		startIndoorsMin: -8,
		startOutdoorsMin: -4,
		startOutdoorsMax: -3
	},
	{
		name: "Leeks",
		startIndoors: true,
		startIndoorsMax: -10,
		startIndoorsMin: -8,
		startOutdoorsMin: -4,
		startOutdoorsMax: -3
	},
	{
		name: "Lettuce",
		startIndoors: true,
		startIndoorsMax: -8,
		startIndoorsMin: -7,
		startOutdoorsMin: -4,
		startOutdoorsMax: -3
	},
	{
		name: "Mache",
		startIndoors: false,
		startOutdoorsMin: -4,
		startOutdoorsMax: -3
	},
	{
		name: "Melons",
		startIndoors: true,
		startIndoorsMax: -3,
		startIndoorsMin: -2,
		startOutdoorsMin: 1,
		startOutdoorsMax: 2
	},
	{
		name: "Mizuna",
		startIndoors: true,
		startIndoorsMax: -7,
		startIndoorsMin: -6,
		startOutdoorsMin: -4,
		startOutdoorsMax: -3
	},
	{
		name: "Mustard Greens",
		startIndoors: true,
		startIndoorsMax: -7,
		startIndoorsMin: -6,
		startOutdoorsMin: -4,
		startOutdoorsMax: -3
	},
	{
		name: "Okra",
		startIndoors: true,
		startIndoorsMax: -4,
		startIndoorsMin: -3,
		startOutdoorsMin: 2,
		startOutdoorsMax: 4
	},
	{
		name: "Onions",
		startIndoors: true,
		startIndoorsMax: -10,
		startIndoorsMin: -8,
		startOutdoorsMin: -4,
		startOutdoorsMax: -3
	},
	{
		name: "Orach",
		startIndoors: true,
		startIndoorsMax: -3,
		startIndoorsMin: -2,
		startOutdoorsMin: 0,
		startOutdoorsMax: 1
	},
	{
		name: "Oregano",
		startIndoors: true,
		startIndoorsMax: -8,
		startIndoorsMin: -7,
		startOutdoorsMin: -2,
		startOutdoorsMax: -1
	},
	{
		name: "Parsley",
		startIndoors: true,
		startIndoorsMax: -10,
		startIndoorsMin: -9,
		startOutdoorsMin: -4,
		startOutdoorsMax: -3
	},
	{
		name: "Peas",
		startIndoors: false,
		startOutdoorsMin: -4,
		startOutdoorsMax: -3
	},
	{
		name: "Peppers",
		startIndoors: true,
		startIndoorsMax: -7,
		startIndoorsMin: -6,
		startOutdoorsMin: 3,
		startOutdoorsMax: 4
	},
	{
		name: "Pototaoes",
		startIndoors: false,
		startOutdoorsMin: -3,
		startOutdoorsMax: -1
	},
	{
		name: "Pumpkin",
		startIndoors: true,
		startIndoorsMax: -3,
		startIndoorsMin: -1,
		startOutdoorsMin: 2,
		startOutdoorsMax: 3
	},
	{
		name: "Radicchio",
		startIndoors: true,
		startIndoorsMax: -8,
		startIndoorsMin: -7,
		startOutdoorsMin: -2,
		startOutdoorsMax: -1
	},
	{
		name: "Radishes",
		startIndoors: false,
		startOutdoorsMin: -3,
		startOutdoorsMax: -2
	},
	{
		name: "Raspberries",
		startIndoors: false,
		startOutdoorsMin: -6,
		startOutdoorsMax: -4
	},
	{
		name: "Rutabaga",
		startIndoors: false,
		startOutdoorsMin: -3,
		startOutdoorsMax: -2
	},
	{
		name: "Sage",
		startIndoors: true,
		startIndoorsMax: -8,
		startIndoorsMin: -6,
		startOutdoorsMin: 0,
		startOutdoorsMax: 0
	},
	{
		name: "Salsify",
		startIndoors: false,
		startOutdoorsMin: -2,
		startOutdoorsMax: -1
	},
	{
		name: "Sorrel",
		startIndoors: true,
		startIndoorsMax: -6,
		startIndoorsMin: -5,
		startOutdoorsMin: -3,
		startOutdoorsMax: -2
	},
	{
		name: "Spinach",
		startIndoors: false,
		startOutdoorsMin: -4,
		startOutdoorsMax: -2
	},
	{
		name: "Squash (Summer)",
		startIndoors: true,
		startIndoorsMax: -3,
		startIndoorsMin: -2,
		startOutdoorsMin: 0,
		startOutdoorsMax: 1
	},
	{
		name: "Squash (Winter)",
		startIndoors: true,
		startIndoorsMax: -3,
		startIndoorsMin: -2,
		startOutdoorsMin: 1,
		startOutdoorsMax: 2
	},
	{
		name: "Sweet Potato",
		startIndoors: false,
		startOutdoorsMin: 3,
		startOutdoorsMax: 4
	},
	{
		name: "Swiss Chard",
		startIndoors: true,
		startIndoorsMax: -8,
		startIndoorsMin: -7,
		startOutdoorsMin: -3,
		startOutdoorsMax: -2
	},
	{
		name: "Thyme",
		startIndoors: true,
		startIndoorsMax: -8,
		startIndoorsMin: -6,
		startOutdoorsMin: 0,
		startOutdoorsMax: 0
	},
	{
		name: "Tomatillos",
		startIndoors: true,
		startIndoorsMax: -7,
		startIndoorsMin: -6,
		startOutdoorsMin: 3,
		startOutdoorsMax: 4
	},
	{
		name: "Tomatoes",
		startIndoors: true,
		startIndoorsMax: -7,
		startIndoorsMin: -6,
		startOutdoorsMin: 3,
		startOutdoorsMax: 4
	},
	{
		name: "Turnips",
		startIndoors: false,
		startOutdoorsMin: -3,
		startOutdoorsMax: -2
	}
];