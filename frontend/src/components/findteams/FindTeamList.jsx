import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const FindTeamList = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/recruit/");
        setPosts(res.data.posts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  const peopleOrPerson = (numPeople) => {
    if (numPeople === 1) {
      return "person";
    }
    return "people";
  };

  const renderedPostList = posts.map((post, index) => {
    return (
      <div className="card" key={index}>
        <div className="card-body">
          <div className="card-title">{post.role_needed}</div>
          <div className="card-content-flex-row">
            <div className="card-content-main">
              <p className="card-subtitle">
                {post.num_people_wanted}{" "}
                {peopleOrPerson(post.num_people_wanted)} needed
              </p>
              <p className="card-text">{post.project_description}</p>
            </div>
            <div className="card-content-contact">
              <p className="card-text">{post.first_name}</p>
              <p className="card-text">{post.contact_email}</p>
              <p className="card-text">{post.phone_number}</p>
              <p className="card-text">{post.other_info}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div
      style={{
        backgroundImage: `url("${process.env.PUBLIC_URL}/images/cover.png")`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div className="post-list">{renderedPostList}</div>
      <button
        className="post-fixed-button circular-red-button"
        onClick={() => history.push("/find-teams/new")}
      >
        +
      </button>
    </div>
  );
};

export default FindTeamList;
