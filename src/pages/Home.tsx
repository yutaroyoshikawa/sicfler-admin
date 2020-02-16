import React, { useCallback } from "react";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Skeleten from "@material-ui/lab/Skeleton";
import Divider from "@material-ui/core/Divider";
import { Theme } from "@material-ui/core";
import { useSnackbar } from "notistack";
import Title from "../components/Title";
import { useMyInfoQuery } from "../gen/graphql-client-api";

const useStyle = makeStyles((theme: Theme) => ({
  loginnedUserInfoWrap: {
    maxWidth: "900px",
    margin: `${theme.spacing(6)}px auto`
  },
  userCard: {
    minWidth: "400px"
  },
  title: {
    fontSize: 14
  },
  dividerSpacing: {
    margin: `${theme.spacing(2)}px 0`
  }
}));

const GET_USERS = gql`
  query {
    myInfo {
      id
      role
    }
  }
`;

const Home: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { error, data, loading } = useMyInfoQuery({
    query: GET_USERS
  });
  const classes = useStyle();

  useCallback(() => {
    enqueueSnackbar(error);
    // eslint-disable-next-line
  }, [error]);

  return (
    <>
      <div className={classes.loginnedUserInfoWrap}>
        <Title>ユーザー情報</Title>
        <Card className={classes.userCard}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              email
            </Typography>
            {loading && <Skeleten animation="wave" width={300} height={40} />}
            {!loading && !error && (
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="textPrimary"
              >
                {data?.myInfo.id}
              </Typography>
            )}
            <Divider className={classes.dividerSpacing} />
            <Typography className={classes.title} color="textSecondary">
              アカウント種
            </Typography>
            {loading && <Skeleten animation="wave" width={300} height={40} />}
            {!loading && !error && (
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="textPrimary"
              >
                {data?.myInfo.role}
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Home;
