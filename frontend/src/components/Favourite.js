import React,{useEffect} from "react";
import Header from "./Header";
import { Button, Col, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Favourite() {
  //   const history = useHistory();
  // const callHomePage = async () => {
      
  //   try {
  //      const res = await axios.get("/favourite");
  //     console.log(res)
  //     const data = await res.json();
  //     console.log(data);
  //   } catch (e) {
  //       history.push("/login");
  //       console.log(e)
  //   }
  // };
  // useEffect(() => {
  //   callHomePage();

  //   // axios.post('/favourite')
  // }, []);
  return (
    <div>
      <Header />
      <h1>Favoourite Page</h1>
      <Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Movie Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <Button>Remove</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
