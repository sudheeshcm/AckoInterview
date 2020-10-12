import React, { useEffect, useState } from "react";
import classes from "./IssueListing.module.css";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import Spinner from "./../Spinner/Spinner";
const IssueListing = () => {
  const [issueList, setIssueList] = useState([]);
  const [loading, setLoading] = useState(true);
  let repoName = "facebook / react";
  // if (issueList && issueList[0] && issueList[0].repository_url) {
  //   let urlarray = issueList[0].repository_url.split("/");
  //   repoName =
  //     urlarray[urlarray.length - 2] + " / " + urlarray[urlarray.length - 1];
  // }

  useEffect(() => {
    callGetIssueListWebService();
  }, []);

  const callGetIssueListWebService = () => {
    fetch("https://api.github.com/repos/facebook/react/issues")
      .then((res) => res.json())
      .then((response) => {
        setIssueList(response);
        setLoading(false);
      })
      .catch((e) => {});
  };

  const renderIssueCard = (item, issueIndex) => {
    let issueItemClass = [classes.IssueItemContainer];
    if (issueIndex === 0) {
      issueItemClass.push(classes.FirstIssueBorder);
      issueItemClass.push(classes.BorderRadiusTop);
    }
    if (issueIndex === issueList.length - 1) {
      issueItemClass.push(classes.BorderRadiusBottom);
    }

    let opned =
      (new Date().getTime() - new Date(item.created_at).getTime()) /
      (1000 * 60 * 60 * 24);
    let whenOpeded = "";
    if (parseInt(opned) === 0) {
      whenOpeded = "today";
    } else if (parseInt(opned) === 1) {
      whenOpeded = "yesterday";
    } else {
      whenOpeded = parseInt(opned) + " days";
    }
    return (
      <div className={issueItemClass.join(" ")} key={"" + item.number}>
        <div className={classes.IssueDesc}>
          <div className={classes.IssueTitle}>{item.title}</div>
        </div>
        <div className={classes.IssueTime}>
          {"#" +
            item.number +
            " opened " +
            whenOpeded +
            " by " +
            item.user.login}
        </div>
      </div>
    );
  };

  return (
    <div className={classes.App}>
      <div className={classes.RepoName}>{repoName}</div>
      {issueList.length > 0 ? (
        <>
          <div className={classes.IssuListContainer}>
            {issueList.map((item, issueIndex) =>
              renderIssueCard(item, issueIndex)
            )}
          </div>
          <div className={classes.IssueDesc}></div>
        </>
      ) : loading ? (
        <Spinner />
      ) : (
        <div>No Issues Found</div>
      )}
    </div>
  );
};

export default IssueListing;
