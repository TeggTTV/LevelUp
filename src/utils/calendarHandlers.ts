/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Event, Tag, getEvents, addTag } from "@/utils/util";

export const goBackMonth = (
    month: number,
    setMonth: Function,
    setYear: Function
) => {
    if (month === 0) {
        setMonth(11);
        setYear((prev: number) => prev - 1);
    } else {
        setMonth((prev: number) => prev - 1);
    }
};

export const goForwardMonth = (
    month: number,
    setMonth: Function,
    setYear: Function
) => {
    if (month === 11) {
        setMonth(0);
        setYear((prev: number) => prev + 1);
    } else {
        setMonth((prev: number) => prev + 1);
    }
};

export const isToday = (date: Date) => {
    const now = new Date();
    return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    );
};

export const isSelected = (date: Date, selectedDate: Date) =>
    date.toDateString() === selectedDate.toDateString();

export const hasEvent = (date: Date) => getEvents(date).length > 0;

export const getEventColors = (date: Date) => {
    const events = getEvents(date);
    return events.map((event: Event) => event.tagColor.split(",")[0] || "gray");
};

export const handleColorClick = (
    color: string,
    setSelectedTagColors: Function
) => {
    setSelectedTagColors((prev: string[]) =>
        prev.includes(color) ? [] : [color]
    );
};

export const handleTagClick = (
    tag: Tag,
    selectedTags: Tag[],
    setSelectedTags: Function
) => {
    if (selectedTags.some((t) => t.name === tag.name)) {
        setSelectedTags(selectedTags.filter((t) => t.name !== tag.name));
    } else {
        setSelectedTags([...selectedTags, tag]);
    }
};

export const handleAddTag = (
    newTagName: string,
    selectedTagColors: string[],
    tags: Tag[],
    setTags: Function,
    setNewTagName: Function,
    setSelectedTagColors: Function,
    setShowTagModal: Function
) => {
    if (newTagName.trim() && selectedTagColors.length > 0) {
        selectedTagColors.forEach((color) => {
            const newTag = addTag(newTagName.trim(), color);
            setTags([...tags, newTag]);
        });
        setNewTagName("");
        setSelectedTagColors([]);
        setShowTagModal(false);
    }
};

export const handleEditClick = (
    event: Event,
    setIsEditing: Function,
    setEventToEdit: Function,
    setNewTitle: Function,
    setNewDesc: Function,
    setNewStartTime: Function,
    setNewEndTime: Function,
    setSelectedTags: Function,
    tags: Tag[],
    setShowModal: Function
) => {
    setIsEditing(true);
    setEventToEdit(event);
    setNewTitle(event.title);
    setNewDesc(event.description);
    setNewStartTime(new Date(event.startTime).toTimeString().slice(0, 5));
    setNewEndTime(new Date(event.endTime).toTimeString().slice(0, 5));
    setSelectedTags(
        tags.filter((tag) => event.tagName.split(",").includes(tag.name))
    );
    setShowModal(true);
};

export const handleModalClose = (
    e: React.MouseEvent,
    setShowModal: Function,
    setIsEditing: Function,
    setEventToEdit: Function,
    setNewTitle: Function,
    setNewDesc: Function,
    setNewStartTime: Function,
    setNewEndTime: Function,
    setSelectedTags: Function
) => {
    if ((e.target as HTMLElement).id === "event-modal") {
        setShowModal(false);
        setIsEditing(false);
        setEventToEdit(null);
        setNewTitle("");
        setNewDesc("");
        setNewStartTime("");
        setNewEndTime("");
        setSelectedTags([]);
    }
};

export const handleTagModalClose = (
    setShowTagModal: Function,
    setNewTagName: Function,
    setSelectedTagColors: Function
) => {
    setShowTagModal(false);
    setNewTagName("");
    setSelectedTagColors([]);
};
