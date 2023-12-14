export const Categories = [
  {
    title: "Man",
  },
  {
    title: "women",
  },
  { title: `kid's` },
];

export const Sizes = [
  {
    name: "S",
  },
  {
    name: "M",
  },
  {
    name: "L",
  },
  {
    name: "XL",
  },
  {
    name: "XXL",
  },
  {
    name: "XXXL",
  },
];

export const Colors = [
  {
    name: "White",
    hex: "#fff",
    rgb: "0, 0, 0",
  },
  {
    name: "Red",
    hex: "#FF0000",
    rgb: "255, 0, 0",
  },
  {
    name: "Green",
    hex: "#00FF00",
    rgb: "0, 255, 0",
  },
  {
    name: "Blue",
    hex: "#0000FF",
    rgb: "0, 0, 255",
  },
  {
    name: "Yellow",
    hex: "#FFFF00",
    rgb: "255, 255, 0",
  },
  {
    name: "Orange",
    hex: "#FFA500",
    rgb: "255, 165, 0",
  },
  {
    name: "Purple",
    hex: "#800080",
    rgb: "128, 0, 128",
  },
  {
    name: "Pink",
    hex: "#FFC0CB",
    rgb: "255, 192, 203",
  },
  {
    name: "Brown",
    hex: "#A52A2A",
    rgb: "165, 42, 42",
  },
  {
    name: "Gray",
    hex: "#808080",
    rgb: "128, 128, 128",
  },
  {
    name: "Black",
    hex: "#000000",
    rgb: "0, 0, 0",
  },
];

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "PRICE", uid: "price", sortable: true },
  { name: "STOCK", uid: "stock", sortable: true },
  { name: "SUBCATEGORY", uid: "subcategory", sortable: true },
  { name: "SIZE", uid: "size" },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const category = [
  { name: "Man", uid: "man" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export { columns, statusOptions, category };
