/** 
  All of the routes for the Material Dashboard 2 PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 PRO React layouts
import Homepage from "layouts/dashboards/homepage";
import GetMoreInfo from "layouts/dashboards/getMoreInfo";
import OwnerPortal from "layouts/dashboards/ownerPortal";
import OwnerPortalJournal from "layouts/dashboards/ownerPortalJournal";
import TenantPortal from "layouts/dashboards/tenantPortal";
import SignInCover from "layouts/authentication/sign-in/cover";

// @mui icons
import Icon from "@mui/material/Icon";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const routes = [
  {
    type: "collapse",
    name: "Scott Hood",
    key: "brooklyn-alice",
    collapse: [
      {
        name: "Logout",
        key: "logout",
        route: "/authentication/sign-in/cover",
        component: <SignInCover />,
      },
    ],
  },
  { type: "divider", key: "divider-0" },
  { type: "divider", key: "divider-2" },
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    collapse: [
      {
        name: "Homepage",
        key: "homepage",
        route: "/dashboards/homepage",
        component: <Homepage />,
      },
      {
        name: "Get More Info",
        key: "getMoreInfo",
        route: "/dashboards/getMoreInfo",
        component: <GetMoreInfo />,
      },
      {
        name: "Owner Portal",
        key: "ownerPortal",
        route: "/dashboards/ownerPortal",
        component: <OwnerPortal />,
      },
      {
        name: "Owner Journal",
        key: "ownerJournal",
        route: "/dashboards/ownerPortalJournal/",
        component: <OwnerPortalJournal />,
      },
      {
        name: "Tenant Portal",
        key: "tenantPortal",
        route: "/dashboards/tenantPortal",
        component: <TenantPortal />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Authentication",
    key: "authentication",
    icon: <Icon fontSize="medium">content_paste</Icon>,
    collapse: [
      {
        name: "Sign In",
        key: "sign-in",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/sign-in/cover",
            component: <SignInCover />,
          },
        ],
      },
      {
        name: "Sign Up",
        key: "sign-up",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/sign-up/cover",
          },
        ],
      },
      {
        name: "Reset Password",
        key: "reset-password",
        collapse: [
          {
            name: "Cover",
            key: "cover",
            route: "/authentication/reset-password/cover",
          },
        ],
      },
    ],
  },
];

export default routes;
