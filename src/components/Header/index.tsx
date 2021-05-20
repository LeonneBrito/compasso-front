import React, { useState } from "react";
import styles from './styles.module.scss';
import { useNavigate } from "react-router-dom";
import { RiGithubLine } from "react-icons/ri";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    navigate("/" + search.toLowerCase().trim());
  }

  return (
    <div className={styles.container}>
      <RiGithubLine size={32} />
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter username"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </form>
    </div>
  );
};

export default Header;