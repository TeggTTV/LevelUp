const exmapleEvents = [
	{
		date: new Date(),
		title: 'Birthday Party',
		description:
			"Need to pickup uncle Jerry and mama Rosie for Susan's birthday party.",
		deadline: new Date(), //
	},
];

export function getEvents(date?) {
	// const events = localStorage.getItem('events');
    
    if (date) {
        return exmapleEvents.filter((e) => {
			return date.toLocaleDateString() === e.date.toLocaleDateString();
		});
	}
	return exmapleEvents;
}
