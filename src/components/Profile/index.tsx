import React from "react";
import styles from './styles.module.scss';
import { RiUserLine, RiBuildingLine, RiMapLine, RiMailLine, RiLinksLine } from "react-icons/ri";

interface ProfileProps {
  username: string;
  name: string;
  avatarUrl: string;
  followers: number;
  following: number;
  company?: string;
  location?: string;
  email?: string;
  blog?: string;
}

const Profile: React.FC<ProfileProps> = ({
  username,
  name,
  avatarUrl,
  followers,
  following,
  company,
  location,
  email,
  blog,
}) => {
  return (
    <div className={styles.container}>

      <header className={styles.profileHeader}>
        <img src={avatarUrl} alt={username} />
        <div>
          <h1>{name}</h1>
          <h2>{username}</h2>
        </div>
      </header>

      <main className={styles.profileMain}>
        <li>
          <RiUserLine size={16} />
          <b>{followers}</b>
          <span>Followers</span>
        </li>
        <li>
          <b>{following}</b>
          <span>Following</span>
        </li>
      </main>

      <footer className={styles.profileFooter}>
        {company && (
          <li>
            <RiBuildingLine size={16} />
            <span>{company}</span>
          </li>
        )}
        {location && (
          <li>
            <RiMapLine size={16} />
            <span>{location}</span>
          </li>
        )}
        {email && (
          <li>
            <RiMailLine size={16} />
            <span>{email}</span>
          </li>
        )}
        {blog && (
          <li>
            <RiLinksLine size={16} />
            <span>{blog}</span>
          </li>
        )}
      </footer>

    </div>
  );
};

export default Profile;
