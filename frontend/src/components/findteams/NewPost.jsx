import React from 'react';
import { withAuthCheck } from "../../util/auth";

const NewPost = () => {

  return (
    <div style={{
      backgroundImage: `url("${process.env.PUBLIC_URL}/images/cover.png")`,
      backgroundSize: 'cover',
      minHeight: "100vh"
    }}>
      <div class="container">
        <div className="register-wrapper">
          Hello World
        </div>
      </div>
    </div>
  )
}

export default withAuthCheck(NewPost);
