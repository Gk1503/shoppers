import "../Customers/Customer.css";
import apiConfig from "../../../utils/apiConfig";
import { deleteUser, getUsers} from "../../../utils/constant";
import { useEffect, useState } from "react";




function Customer(){

  const [Users , setUsers] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  



  const handleDelteUser = (userId) => {



  apiConfig
    .delete(`${deleteUser}/${userId}`)
    .then(() => {
      const DeletedUser = Users.filter((user) => user._id !== userId);
      setUsers(DeletedUser);
      console.log("User Deleted:", DeletedUser);
      setAlertVisible(true);
          setTimeout(()=>{
            setAlertVisible(false);
          }, 2000);
    })
    .catch((error) => {
      console.error("Delete Error", error.response?.data || error.message);
    });

   
};



  useEffect(() => {
        apiConfig
    .get(getUsers)
    .then((response) => {
      if(response.status === 200){
        console.log("User Details" , JSON.stringify(response.data));
        // localStorage.setItem("authToken", response.data.token);
        setUsers(response.data);
      } else{
        console.log("Failed to fetch Users");
      }
    }).catch((error) => {
      console.error("Error fetcing users:",error);
    });
  },[]);


  

    return(

        <>
        {alertVisible && (
        <div
          className="alert alert-danger"
          role="alert"
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            zIndex: 999,
          }}
        >
          User Deleted successfully!
        </div>
      )}

        <div id="orderlist2">
  <div className="list-header">
    <h3>Customer List</h3>
    <div className="tabs">

      <span className="active2">Monthly</span>
      <span>Weekly</span>
      <span>Today</span>
    </div>
  </div>
  <table className="styled-table">
    <thead>
      <tr id="tr">
        <th>No.</th>
        <th>Customer ID</th>
        <th>Customer Name</th>
        <th>MobileNo</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
        {Users.length > 0 ? (
          Users.map((User , index) => (
            <tr id="td"  key={User._id}>
              <td>{String(index + 1).padStart(2,"0")}</td>
              <td>{User._id}</td>
              <td>{User.Name}</td>
              <td>{User.MobileNo}</td>
              <td>{User.Email}</td>
              <td className="action-icons"><button id="EditBtn">📝</button> <button onClick={() => handleDelteUser(User._id)} id="DustBin">🗑️</button> 
               
              
               </td>

              
            </tr>
          ))
        ):(
          <tr>
            <td colSpan= "6">No Usrs Found</td>
          </tr>
        
        )}

    
    </tbody>
  </table>
</div>
        
        </>
    );

}

export default Customer;