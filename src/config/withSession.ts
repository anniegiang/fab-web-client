import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler
} from "next";
import {withIronSessionApiRoute, withIronSessionSsr} from "iron-session/next";
import ironOptions from "config/ironOptions";

const sessionOptions = ironOptions;

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr<
  P extends {[key: string]: unknown} = {[key: string]: unknown}
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}
