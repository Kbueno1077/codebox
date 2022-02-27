import { atom, selector } from "recoil";

export const fileListState = atom({
  key: "filesListState",
  default: [{ title: "New Folder", elements: 0 }],
});
