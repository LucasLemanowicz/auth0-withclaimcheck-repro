import { AppState, Auth0Provider, useAuth0, User } from "@auth0/auth0-react"
import { NextPage } from "next";
import Router from "next/router";

const onRedirectCallback = (appState?: AppState) => {
  if (appState?.returnTo) {
    Router.replace(appState.returnTo);
  }
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? ""}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? ""}
      authorizationParams={{
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE ?? "",
        redirect_uri: typeof window !== "undefined" ? window.location.origin : undefined,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}

const BlankPage: NextPage = () => null;

interface ClaimCheckProps {
  claimCheck: (claim?: User) => boolean;
  returnTo: string;
}

export function withClaimCheck(Component: NextPage, { claimCheck, returnTo }: ClaimCheckProps): NextPage {
  const WithClaimCheckComponent: NextPage = () => {
      const { user } = useAuth0();

      if (claimCheck(user)) {
          return <Component />;
      }

      Router.push(returnTo);
      return BlankPage;
  };

  return WithClaimCheckComponent;
}
