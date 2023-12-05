const NotesData = [
  {
    id: 1,
    city: "New York City, NY",
    title: "this is heading of the note",
    details: "lorem Ipsum is simply dummy text of the printing and typesetting",
  },
  {
    id: 2,
    city: "New York City, NY",
    title: "this is heading of the note",
    details: "lorem Ipsum is simply dummy text of the printing and typesetting",
  },
  {
    id: "3",
    city: "New York City, NY",
    title: "this is heading of the note",
    details: "lorem Ipsum is simply dummy text of the printing and typesetting",
  },
  {
    id: "4",
    city: "New York City, NY",
    title: "this is heading of the note",
    details: "lorem Ipsum is simply dummy text of the printing and typesetting",
  },
  {
    id: "5",
    city: "New York City, NY",
    title: "this is heading of the note",
    details: "lorem Ipsum is simply dummy text of the printing and typesetting",
  },
  {
    id: "6",
    city: "New York City, NY",
    title: "this is heading of the note",
    details: "lorem Ipsum is simply dummy text of the printing and typesetting",
  },
  {
    id: "7",
    city: "New York City, NY",
    title: "this is heading of the note",
    details: "lorem Ipsum is simply dummy text of the printing and typesetting",
  },
  {
    id: "8",
    city: "New York City, NY",
    title: "this is heading of the note",
    details: "lorem Ipsum is simply dummy text of the printing and typesetting",
  },
  {
    id: "9",
    city: "New York City, NY",
    title: "this is heading of the note",
    details: "lorem Ipsum is simply dummy text of the printing and typesetting",
  },
];
export function getEventById(id) {
  return NotesData.find((x) => x.id == id);
}
export function getEventByCity(city) {
  return NotesData.filter((x) => x.city == city);
}
export default NotesData;
