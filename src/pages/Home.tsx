import React from "react";
import Title from "../components/Title";
import { useUsersQuery } from "../gen/graphql-client-api";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Skeleten from "@material-ui/lab/Skeleton";
import { Theme } from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) => ({
  loginnedUserInfoWrap: {
    maxWidth: "900px",
    margin: `${theme.spacing(6)}px auto`,
  },
  userCard: {
    minWidth: "400px"
  },
  title: {
    fontSize: 14
  }
}));

const Home: React.FC = props => {
  const usersQuery = useUsersQuery();
  const classes = useStyle();

  return (
    <>
      <div className={classes.loginnedUserInfoWrap}>
        <Title>ユーザー情報</Title>
        <Card className={classes.userCard}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              ユーザー名
            </Typography>
            {usersQuery.loading && (
              <Skeleten animation="wave" width={300} height={40} />
            )}
            {!usersQuery.loading && !usersQuery.error && (
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="textPrimary"
              >
                hoge
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Home;
