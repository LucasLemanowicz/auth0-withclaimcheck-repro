import { withAuthenticationRequired } from "@auth0/auth0-react";
import { type NextPage } from "next";
import { withClaimCheck } from "../services/auth";

const Secret: NextPage = () => {
  return <h1>Authenticated and Authorized Page</h1>;
}

export default withAuthenticationRequired(
  withClaimCheck(Secret, {
    claimCheck: () => true,
    returnTo: "/",
  })
);
