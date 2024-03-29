import {fireEvent, render} from "@testing-library/react";
import NavBar, {Props} from "client/components/layout/NavBar";
import {mockUserInfo, mockUser} from "mocks/userFactory";
import LocalStorageKeys from "constants/localStorageKeys";
import * as router from "next/router";

const {AccessToken, UserId} = LocalStorageKeys;

const nickName = "Bob";
const points = 100;

const user = mockUser({nickName});
const userInfo = mockUserInfo({points, ...user});

const renderComponent = (customProps?: Partial<Props>) =>
  render(<NavBar user={userInfo} {...customProps} />);

test("renders a navigation bar", () => {
  const {queryByRole} = renderComponent();
  expect(queryByRole("navigation")).not.toBeNull();
});

test("renders navigation item links", () => {
  const {getAllByRole} = renderComponent();
  expect(getAllByRole("link").length).toBe(2);
});

test("renders the correct navigation items", () => {
  const {queryByRole} = renderComponent();
  ["Home", "Subscribed"].forEach((navItem) =>
    expect(queryByRole("link", {name: navItem})).not.toBeNull()
  );
});

test("Home has the correct href", () => {
  const {getByRole} = renderComponent();
  expect(getByRole("link", {name: "Home"})).toHaveAttribute("href", "/home");
});

test("Subscribed has the correct href", () => {
  const {getByRole} = renderComponent();
  expect(getByRole("link", {name: "Subscribed"})).toHaveAttribute(
    "href",
    "/subscribed"
  );
});

test("renders the user's nickname", () => {
  const {queryByText} = renderComponent();
  expect(queryByText(nickName)).not.toBeNull();
});

test("renders the user's points", () => {
  const {queryByText} = renderComponent();
  expect(queryByText(`Points: ${points}`)).not.toBeNull();
});

test("renders a log out button", () => {
  const {queryByRole} = renderComponent();
  expect(queryByRole("button", {name: "Log out"})).not.toBeNull();
});

test("clicking the log out button clears the auth headers and reloads the page", () => {
  const spy = jest.spyOn(localStorage, "removeItem");
  const useRouter = jest.spyOn(router, "useRouter") as jest.Mock<any>;

  const reload = jest.fn();

  useRouter.mockImplementation(() => ({reload}));

  const {getByRole} = renderComponent();
  const button = getByRole("button", {name: "Log out"});

  fireEvent.click(button);

  expect(spy).toHaveBeenCalledWith(UserId);
  expect(spy).toHaveBeenCalledWith(AccessToken);
  expect(reload).toHaveBeenCalledTimes(1);

  spy.mockRestore();
  jest.resetAllMocks();
});
