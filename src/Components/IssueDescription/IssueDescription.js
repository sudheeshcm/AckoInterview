import React, { useEffect, useState } from "react";
import classes from "./IssueDescription.module.css";
import Spinner from "../Spinner/Spinner";
const IssueDescription = (props) => {
  console.log(props);
  const [issueList, setIssueList] = useState([]);
  const [loading, setLoading] = useState(true);
  let repoName = "facebook / react";

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
  return (
    <div className={classes.App}>
      <div className={classes.RepoName}>{repoName}</div>
    </div>
  );
};

export default IssueDescription;
