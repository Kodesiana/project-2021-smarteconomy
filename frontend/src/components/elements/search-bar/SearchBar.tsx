import { ActionIcon, TextInput } from "@mantine/core";
import { useRef, useState } from "react";
import { Search } from "react-feather";
import styles from "./SearchBar.module.scss";

type SearchBarProps = {
  onClick: (value?: string) => void;
  placeholder?: string;
};

const SearchBar = ({ onClick, placeholder }: SearchBarProps) => {
  const [value, setValue] = useState("");

  return (
    <div className={styles.searchWrapper}>
      <TextInput
        placeholder={placeholder}
        radius={6}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            onClick?.(value);
          }
        }}
        value={value}
        onChange={(event) => { setValue(event?.target?.value ?? ""); }}
      />
      <ActionIcon
        onClick={() => onClick?.(value)}
        variant="filled"
        color="green"
        size={36}
        radius={6}
      >
        <Search size={16} />
      </ActionIcon>
    </div>
  );
};

export default SearchBar;