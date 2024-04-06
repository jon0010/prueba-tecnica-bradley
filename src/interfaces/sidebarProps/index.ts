export interface SideBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (option: "latest" | "oldest") => void;
  onSortChange: (option: "asc" | "desc") => void;
}
