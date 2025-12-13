import react, * as React from "react";
import { Page, Grid, Table } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";

class ListEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  loadData() {
    fetch(
      "http://192.168.8.93:8082/api/v1/attendance/search/all"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data });
      })
      .catch((err) =>
        console.error("Error fetching attendance data:", err.toString())
      );
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <SiteWrapper>
        <Page.Card title="Attendance List"></Page.Card>
        <Grid.Col md={6} lg={10} className="align-self-center">
          <Table>
            <Table.Header>
              <Table.ColHeader>Employee ID</Table.ColHeader>
              <Table.ColHeader>Name</Table.ColHeader>
              <Table.ColHeader>Status</Table.ColHeader>
              <Table.ColHeader>Date</Table.ColHeader>
            </Table.Header>
            <Table.Body>
              {this.state.data.map((item, i) => {
                return (
                  <Table.Row key={i}>
                    <Table.Col>{item.id}</Table.Col>
                    <Table.Col>{item.name}</Table.Col>
                    <Table.Col>{item.status}</Table.Col>
                    <Table.Col>{item.date}</Table.Col>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Grid.Col>
      </SiteWrapper>
    );
  }
}

export default ListEmployee;
