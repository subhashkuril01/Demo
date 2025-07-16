import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../Firebase";
import { toast, ToastContainer } from "react-toastify";
import { ClockLoader } from "react-spinners";

export default function CompletedCustomBookings() {

  var [bookings, setbookings] = useState([]);
  var [loading, setloading] = useState(true);
  const [priceInputs, setPriceInputs] = useState({});
  const nav = useNavigate();
  const getDate = (date) => {
    if (date?.toDate) {
      date = date.toDate(); 
    }
    let finalDate = moment(date).format("MMM Do YY");
    return finalDate;
  };

  var spinnerObj = {
    margin: "0 auto",
    display: "block",
    borderColor: "red",
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  const getAllBookings = () => {
    const Bookingsref = collection(db, "/Custombookings");
    const que = query(Bookingsref, where("status", "==", "Completed"));
    onSnapshot(que, (querySnapshot) => {
      setTimeout(() => {
        setloading(false);
      }, 700);

      setbookings(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };

  

 
  return (
    <>
    <ToastContainer/>
      <section
        className="bg-title-page flex-column p-t-250 p-b-80 p-l-15 p-r-15"
        style={{ backgroundImage: "url(/assets/images/bg-title-page-03.jpg)" }}
      >
        <h2 className="tit6 t-center">Completed Custom bookings</h2>
        <nav>
          <ol class="main_menu d-flex justify-content-center">
            <li class="breadcrumb-item mx-0">
              <Link to="/admin/dashboard" className="px-0 mx-0">
                Dashboard
              </Link>
            </li>
            <li class="breadcrumb-item px-0 mx-0">
              <Link
                to="/admin//Manage-Custom-Bookings"
                className="text-white px-0"
              >
                Completed Custom Bookings
              </Link>
            </li>
          </ol>
        </nav>
      </section>
      <ClockLoader
        color="red"
        loading={loading}
        cssOverride={spinnerObj}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      <div className={loading && "display-none"}>
      <section className="section-welcome bg1-pattern p-t-40 p-b-20">
        <div className="container-fluid">
        <div className="row justify-content-end">
            <div className="col-md-6 d-flex justify-content-around">
              <Link to={"/admin/Manage-Custom-Bookings"}><button className="btn btn-info">Pending Bookings</button></Link>
              <Link to={"/admin/approvedcustombookings"}><button className="btn btn-success">Approved Bookings</button></Link>
            <Link to={"/admin/rejectedcustombookings"}><button className="btn btn-danger">Rejected Bookings</button></Link>
            </div>
            
            </div>
          <div className="row mt-5">
            
            <div className="col-12 p-5">
                {bookings.length===0 ? (
                    <>
                    <h3 className="text-center">No Data Available</h3>
                    </>
                ):(
                    <>
                      <table class="table table-bordered table-secondary">
                <thead>
                  <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">CustomerName</th>
                    <th scope="col">Breakfast</th>
                    <th scope="col">Lunch</th>
                    <th scope="col">Dinner</th>
                    <th scope="col">Days</th>
                    <th scope="col">Final Price</th>
                    <th scope="col">Start</th>
                    <th scope="col">End</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.map((el,index)=>(
                    <>
                    <tr>
                    <td scope="row">{index+1}</td>
                    <td>{el?.customerName}</td>
                    <td>{el?.breakfasts}</td>
                    <td>{el?.lunchs}</td>
                    <td>{el?.dinners}</td>
                    <td>7</td>
                  <td>{el?.totalPrice}</td>
                    <td>{el?.startdate}</td>
                    <td>{el?.enddate}</td>
                    <td>{el?.status}</td>
                    <td>{getDate(el?.createdat)}</td>
                  </tr>
                    </>
                  ))}
                  
                </tbody>
              </table>
                    </>
                )}
            </div>

            <div className="col-1"></div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
