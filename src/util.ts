export interface Event {
    date: Date;
    title: string;
    description: string;
    deadline: Date;
}

export function getEvents(date?: Date) {
    const events = localStorage.getItem("events");

    if (date) {
        return events
            ? JSON.parse(events).filter((e: Event) => {
                  return (
                      date.toLocaleDateString() ===
                      new Date(e.date).toLocaleDateString()
                  );
              })
            : [];
    }

    return events ? JSON.parse(events) : []; // Return stored events or an empty array if none found
}

export function addEvent(
    date: Date,
    title: string,
    description: string,
    deadline: Date
) {
    const events = localStorage.getItem("events");
    const eventList = events ? JSON.parse(events) : [];

    const newEvent = {
        date,
        title,
        description,
        deadline,
    };

    localStorage.setItem("events", JSON.stringify([...eventList, newEvent]));

    return newEvent;
}

export function editEvent(updatedEvent: Event) {
    const events = localStorage.getItem("events");
    if (!events) return; // No events to edit

    const eventList = JSON.parse(events);
    const index = eventList.findIndex(
        (e: Event) =>
            new Date(e.date).toLocaleString() ===
            new Date(updatedEvent.date).toLocaleString()
    );

    if (index !== -1) {
        eventList[index] = updatedEvent;
        localStorage.setItem("events", JSON.stringify(eventList));
    }
}

export function deleteEvent(date: Event) {
    const events = localStorage.getItem("events");
    if (!events) return; // No events to delete

    console.log(date);

    const eventList = JSON.parse(events);
    const updatedEvents = eventList.filter(
        (e: Event) =>
            new Date(e.date).toLocaleString() !==
                new Date(date.date).toLocaleString() &&
            e.title !== date.title && // Ensure we are also checking title for exact match
            e.description !== date.description && // Ensure we are also checking description for exact match
            new Date(e.deadline).toLocaleString() !==
                new Date(date.deadline).toLocaleString() // Ensure we are also checking deadline for exact match
    );

    localStorage.setItem("events", JSON.stringify(updatedEvents));
}
