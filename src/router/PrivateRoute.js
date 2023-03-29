// // This is used to determine if a user is authenticated and
// // if they are allowed to visit the page they navigated to.

// // If they are: they proceed to the page
// // If not: they are redirected to the login page.
// import React from "react";
// import AuthSession from "../getSessionAuth";
// import { Redirect, Route } from "react-router-dom";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const [isLoggedIn, setIsLoggedIn] = React.useState(false);

//   const checkAuth = async () => {
//     const result = await AuthSession();
//     setIsLoggedIn(result);
//   };
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         checkAuth();
//         if (isLoggedIn) {
//           return <Component {...props} />;
//         } else {
//           return (
//             <Redirect to={{ pathname: "/", state: { from: props.location } }} />
//           );
//         }
//       }}
//     />
//   );
// };

// export default PrivateRoute;
import React, { useState, useEffect } from "react";
import AuthSession from "../getSessionAuth";
import { Redirect, Route } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    AuthSession().then((result) => {
      setIsLoggedIn(result);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   // const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // const checkAuth = async () => {
//   //   const result = await AuthSession();
//   //   setIsLoggedIn(result);
//   // };
//   // checkAuth();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const checkAuth = () => {
//     AuthSession().then((result) => {
//       console.log(result);
//       setIsLoggedIn(result);
//     });
//   };
//   checkAuth();
//   console.log(isLoggedIn);
//   // useEffect(() => {
//   //   checkAuth();
//   // }, []);
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isLoggedIn ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to={{ pathname: "/", state: { from: props.location } }} />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;
// import React, { useState } from "react";
// import AuthSession from "../getSessionAuth";
// import { Redirect, Route } from "react-router-dom";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const checkAuth = async () => {
//     const result = await AuthSession();
//     setIsLoggedIn(result);
//   };

//   checkAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isLoggedIn ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to={{ pathname: "/", state: { from: props.location } }} />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;
