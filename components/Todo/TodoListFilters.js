import { useRecoilState } from "recoil";

import { filterState } from "/recoil/TodoRecoil/todoState";

export default function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(filterState);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}
