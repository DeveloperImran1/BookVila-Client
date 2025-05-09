import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const token = cookies(request).get("__Secure-next-auth.session-token"); // vercel a deploy korar somoi ai line comentout kore dibo.
  // const token = cookies(request).get("next-auth.session-token"); // localhost a aita use kori

  // const token = request.cookies.get("next-auth.session-token")?.value;
  console.log("token is ", token);
  const pathname = request.nextUrl.pathname;
  console.log("path name is ", pathname);

  if (pathname.includes("api")) {
    // aikhane dsashboard er pore all jekono route private ase. But jodi need hoi,, dashboard er moddhe kono route k private korbona, tahole upore condition dia return korte pari,, tahole middleware kajj korbena. aikhane api er poriborte oi route name hobe.
    return NextResponse.next();
  }
  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  // const  {value: myEmail}  = cookies(request).get("myEmail")

  // const {data} = await axios.get(`https://book-vila-server.vercel.app/user/${myEmail}`)
  // console.log("current user role is ", data?.role);

  // if((pathname === '/dashboard/admin-container' || pathname === '/dashboard/organizer-request' || pathname === '/dashboard/user-manage') &&  data?.role !== "admin" ){

  //     return NextResponse.redirect(new URL(`/login?redirect=${pathname}&error=access_denied`, request.url));
  // }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/my-order",
    "/my-profile",
    "/my-review",
    "/all-user",
    "/all-order",
    "/add-author",
    "/add-books",
    "/add-publication",
    "/manage-order",
    "/manage-books",
    "/manage-author",
    "/manage-publication",
  ],
};
