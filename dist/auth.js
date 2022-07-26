netlifyIdentity.on("login", (user) => {
  if (document.getElementById("netlify-identity-login-page")) {
    const url = new URL(document.location.href);
    // Add query param to refresh page on login for auth’d content
    if (url.searchParams.get("refresh") !== "login") {
      window.netlifyIdentity
        .refresh()
        .then((jwt) => {
          url.searchParams.set("refresh", "login");
          url.pathname =
            `/restricted/${url.searchParams.get("return_url")}` ||
            "/restricted";
          url.searchParams.delete("return_url");
          document.location.href = url.toString();
        })
        .catch((err) => {
          console.log(
            "Identity Error: Unable to get new valid token. logging out user",
            err
          );
          clearUser();
          window.netlifyIdentity.open();
        });
    }
  }
});
netlifyIdentity.on("logout", () => {
  if ("URL" in window) {
    const url = new URL(document.location.href);
    // Add query param to refresh page on logout to hide auth’d content
    if (url.searchParams.get("refresh") !== "logout") {
      url.searchParams.set("refresh", "logout");
      url.searchParams.set("return_url", url.pathname);
      document.location.href = url.toString();
    }
  }
});
