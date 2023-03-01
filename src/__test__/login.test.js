import { render, screen } from "@testing-library/react";
import Login from "../components/Login";

test("Login render", () => {
  render(<Login />);
  const sloganText = screen.getBytext(/會員登入/);
  expect(sloganText).toBeInTheDocument();
});
