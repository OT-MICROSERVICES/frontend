import { useState, useEffect } from "react";
import react, * as React from "react";
import { Grid, StatsCard, Card, colors } from "tabler-react";
import C3Chart from "react-c3js";

const employeeUrl = "http://43.205.129.0:8081/api/v1";

function generateResult(input) {
  if (input === undefined) {
    return 0;
  } else {
    return input;
  }
}

export function ListAllEmployees() {
  const [stats, handleStats] = useState([]);

  const FetchData = async () => {
    const data = await fetch(employeeUrl.concat("/employee/search/all"));
    const stats = await data.json();

    handleStats(stats);
  };

  useEffect(() => {
    FetchData();
  }, []);
  const empData = stats.length;

  return (
    <Grid.Col sm={3}>
      <StatsCard
        layout={1}
        movement={0}
        total={empData}
        label="Total Employees"
      />
    </Grid.Col>
  );
}

export function ListEmployeeActiveEmployee() {
  const [stats, handleStats] = useState([]);

  const FetchData = async () => {
    const data = await fetch(employeeUrl.concat("/employee/search/status"));
    const stats = await data.json();
    handleStats(stats);
  };

  useEffect(() => {
    FetchData();
  }, []);
  const empData = stats;

  return (
    <Grid.Col sm={3}>
      <StatsCard
        layout={1}
        movement={0}
        total={generateResult(empData["Current Employee"])}
        label="Current Employee"
      />
    </Grid.Col>
  );
}

export function ListEmployeeInActiveEmployee() {
  const [stats, handleStats] = useState([]);

  const FetchData = async () => {
    const data = await fetch(employeeUrl.concat("/employee/search/status"));
    const stats = await data.json();
    handleStats(stats);
  };

  useEffect(() => {
    FetchData();
  }, []);
  const empData = stats;

  return (
    <Grid.Col sm={3}>
      <StatsCard
        layout={1}
        movement={0}
        total={generateResult(empData["Ex-Employee"])}
        label="Ex-Employee"
      />
    </Grid.Col>
  );
}

export function RoleDistribution() {
  const [stats, handleStats] = useState([]);

  const FetchData = async () => {
    const data = await fetch(
      employeeUrl.concat("/employee/search/designation")
    );
    const stats = await data.json();
    handleStats(stats);
  };

  useEffect(() => {
    FetchData();
  }, []);
  const empData = stats;

  return (
    <Grid.Col sm={4}>
      <Card>
        <Card.Header>
          <Card.Title data-testid="job">Job Role Distribution</Card.Title>
        </Card.Header>
        <Card.Body>
          <C3Chart
            style={{ height: "12rem" }}
            data={{
              columns: [
                // each columns data
                ["DevOps", generateResult(empData["DevOps"])],
                ["Developer", generateResult(empData["Developer"])],
              ],
              type: "donut", // default type of chart
              colors: {
                data1: colors["green"],
                data2: colors["green-light"],
              },
              names: {
                // name of each serie
                data1: "Maximum",
                data2: "Minimum",
              },
            }}
            legend={{
              show: false, //hide legend
            }}
            padding={{
              bottom: 0,
              top: 0,
            }}
          />
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}

export function LocationDistribution() {
  const [stats, handleStats] = useState([]);

  const FetchData = async () => {
    const data = await fetch(employeeUrl.concat("/employee/search/location"));
    const stats = await data.json();
    console.log(stats);
    handleStats(stats);
  };

  useEffect(() => {
    FetchData();
  }, []);
  const empData = stats;

  return (
    <Grid.Col sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Locations Distribution</Card.Title>
        </Card.Header>
        <Card.Body>
          <C3Chart
            style={{ height: "12rem" }}
            data={{
              columns: [
                // each columns data
                ["Delhi", generateResult(empData["Delhi"])],
                ["Bangalore", generateResult(empData["Bangalore"])],
                ["Hyederabad", generateResult(empData["Hyderabad"])],
                ["Newyork", generateResult(empData["Newyork"])],
              ],
              type: "donut", // default type of chart
              colors: {
                data1: colors["blue-darker"],
                data2: colors["blue"],
                data3: colors["blue-light"],
                data4: colors["blue-lighter"],
              },
              names: {
                // name of each serie
                data1: "A",
                data2: "B",
                data3: "C",
                data4: "D",
              },
            }}
            legend={{
              show: false, //hide legend
            }}
            padding={{
              bottom: 0,
              top: 0,
            }}
          />
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}

export function StatusDistribution() {
  const [stats, handleStats] = useState([]);

  const FetchData = async () => {
    const data = await fetch(employeeUrl.concat("/employee/search/status"));
    const stats = await data.json();
    console.log(stats);
    handleStats(stats);
  };

  useEffect(() => {
    FetchData();
  }, []);
  const empData = stats;

  return (
    <Grid.Col sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Employees Distribution</Card.Title>
        </Card.Header>
        <Card.Body>
          <C3Chart
            style={{ height: "12rem" }}
            data={{
              columns: [
                // each columns data
                [
                  "Current Employee",
                  generateResult(empData["Current Employee"]),
                ],
                ["Ex-Employee", generateResult(empData["Ex-Employee"])],
              ],
              type: "donut", // default type of chart
              colors: {
                data1: colors["blue-darker"],
                data2: colors["blue"],
                data3: colors["blue-light"],
                data4: colors["blue-lighter"],
              },
              names: {
                // name of each serie
                data1: "A",
                data2: "B",
                data3: "C",
                data4: "D",
              },
            }}
            legend={{
              show: false, //hide legend
            }}
            padding={{
              bottom: 0,
              top: 0,
            }}
          />
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}
