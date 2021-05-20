import React from "react";
import styles from './styles.module.scss';
import { RiGitRepositoryLine, RiStarLine } from 'react-icons/ri';
import { AiOutlineFork } from 'react-icons/ai';

import { Link } from 'react-router-dom';

interface RepoProps {
  username: string;
  reponame: string;
  description?: string;
  language?: string;
  stars: number;
  forks: number;
}

const Repo: React.FC<RepoProps> = ({
  username,
  reponame,
  description,
  language,
  stars,
  forks,
}) => {
  const languageClass = language ? language.toLowerCase() : 'other';

  return(
    <div className={styles.container}>

      <div className={styles.repoHeader}>
        <header>
          <RiGitRepositoryLine size={16} />
          <Link to={`/${username}/${reponame}`}>{reponame}</Link>
        </header>
        <p>{description}</p>
      </div>

      <div className={styles.repoFooter}>
      <ul>
          <li>
            <div className={`language ${languageClass}`} />
            <span>{language}</span>
          </li>
          <li>
            <RiStarLine size={16} />
            <span>{stars}</span>
          </li>
          <li>
            <AiOutlineFork size={16} />
            <span>{forks}</span>
          </li>
        </ul>
      </div>

    </div>
  )
}

export default Repo;