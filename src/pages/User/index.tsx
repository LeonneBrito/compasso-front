import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IRepo, IUser } from "../../@types";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import styles from "./styles.module.scss";

import Profile from "../../components/Profile";
import Repo from "../../components/Repo";

interface ProfileProps {
  user?: IUser;
  repos?: IRepo[];
  starreds?: IRepo[];
  error?: string;
}

const headers = {
  Authorization: `Basic ${btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`,
}
 
const User = () => {
  const { username = "leonnebrito" } = useParams();
  const [data, setData] = useState<ProfileProps>();

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        "headers": headers
      }),
      fetch(`https://api.github.com/users/${username}/repos`, {
        "headers": headers
      }),
      fetch(`https://api.github.com/users/${username}/starred`, {
        "headers": headers
      }),
    ]).then(async (responses) => {
      const [userResponse, reposResponse, starredsResponse] = responses;

      if (userResponse.status === 404) {
        setData({ error: "User not found!" });
        return;
      }

      const user = await userResponse.json();
      const repos = await reposResponse.json();
      const starreds = await starredsResponse.json();

      setData({
        user,
        repos,
        starreds,
      });
    });
  }, [username]);

  if (data?.error) {
    return <h1>{data.error}</h1>;
  }

  if (!data?.user || !data?.repos || !data?.starreds) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.userMain}>
        <div className={styles.left}>
          <Profile
            username={data.user.login}
            name={data.user.name}
            avatarUrl={data.user.avatar_url}
            followers={data.user.followers}
            following={data.user.following}
            company={data.user.company}
            location={data.user.location}
            email={data.user.email}
            blog={data.user.blog}
          />
        </div>
        <Tabs>
          <TabList>
            <Tab>Repositories</Tab>
            <Tab>Starreds</Tab>
          </TabList>
          <div className={styles.right}>
            <TabPanel>
              <div className={styles.repos}>
                <div>
                  {data.repos.map((item) => (
                    <Repo
                      key={item.name}
                      username={item.owner.login}
                      reponame={item.name}
                      description={item.description}
                      language={item.language}
                      stars={item.stargazers_count}
                      forks={item.forks}
                    />
                  ))}
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className={styles.repos}>
                <div>
                  {!data.starreds.length && <> 
                    <h1>Empty</h1>
                  </>}
                  { data.starreds && <> 
                    {data.starreds.map((item) => (
                      <Repo
                        key={item.name}
                        username={item.owner.login}
                        reponame={item.name}
                        description={item.description}
                        language={item.language}
                        stars={item.stargazers_count}
                        forks={item.forks}
                      />
                    ))}
                  </>}
                </div>
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default User;
