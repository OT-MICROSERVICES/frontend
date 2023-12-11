import React from "react";
import { render, screen, logRoles } from "@testing-library/react";
import { RoleDistribution } from "./EmployeeData";

test("renders learn react link", () => {
  render(<RoleDistribution />);
  logRoles(screen.getAllByTestId("job"));
  //   const linkElement = screen.getByText("Job Role Distributio");
  //     expect(linkElement).toBInTheDocument();
  const jobTitleElement = screen.queryByRole("job");
  expect(jobTitleElement).toBeInTheDocument();
  expect(jobTitleElement).toHaveTextContent("Job Role Distribution");
});
