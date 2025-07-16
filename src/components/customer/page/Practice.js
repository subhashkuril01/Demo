
import { addDoc, collection, Timestamp ,doc, query, where, onSnapshot} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import { auth, db } from "../../../Firebase";
import { toast } from "react-toastify";

export default function Practice() {
  var nav = useNavigate();
  var [breakfasts, setbreakfasts] = useState("");
  var [lunchs, setlunchs] = useState("");
  var [dinners, setdinners] = useState("");
  var [startdate, setstartdate] = useState("");
  var [enddate, setenddate] = useState("");
  var [loading, setloading] = useState(false);
  var[days,setDays]=useState("");
  var[totalPrice,setTotalPrice]=useState("");
  var [meals, setmeals] = useState([]);

  var spinnerObj = {
    margin: "120px auto",
    display: "block",
  };
  let authenticate = sessionStorage.getItem("isLogin");
  var userData = JSON.parse(sessionStorage.getItem("uData"));

  useEffect(() => {
    getAllmeals();
  }, []);

  const getAllmeals = () => {
    const mealsRef = collection(db, "/Meals");
    const que = query(mealsRef, where("status", "==", true));
    onSnapshot(que, (querySnapshot) => {
      setTimeout(() => {
        setloading(false);
      }, 700);

      setmeals(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };

  useEffect(() => {
    if (!authenticate) {
      nav("/login");
      setTimeout(() => {
        toast.error("Please Login First!!");
      }, 500);
    }
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    setloading(true);

    const user = auth.currentUser; 
    try {
      let custombookingsref = collection(db, "/Custombookings");
      addDoc(custombookingsref, {
        customerName: userData["name"],
        userId: userData["id"],
        breakfasts: breakfasts,
        lunchs: lunchs,
        dinners: dinners,
        days:days,
        totalPrice:totalPrice,
        startdate: startdate,
        enddate: enddate,
        createdat: Timestamp.now(),
        status: "Pending"
      });
      setloading(false);

      nav("/");
      setTimeout(() => {
        toast.success("Your booking has been added");
      }, 300);
    } catch (err) {
      setloading(false);
      toast.error("Something Went Wrong");
      console.log("Error in adding booking", err);
    }
  };

  return (
    <>
      {/* banner starts */}
      <section
        class="bg-title-page flex-c-m p-t-160 p-b-80 p-l-15 p-r-15"
        style={{ backgroundImage: "url(assets/images/bg-title-page-02.jpg)" }}
      >
        <h2 class="tit6 t-center">Add Customize Bookings</h2>
      </section>

      {/* banner ends */}
      <ClockLoader
        color="red"
        loading={loading}
        cssOverride={spinnerObj}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      {/* <!-- Reservation --> */}
      <section class="section-reservation bg1-pattern p-t-70 p-b-113">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 p-b-30">
              <div class="t-center">
                <span class="tit2 t-center">Subscribe Now</span>

                <h3 class="tit3 t-center m-b-35 m-t-35">
                  Add Customize Bookings
                </h3>
              </div>
             <div>
              
             </div>
              <form
                onSubmit={handleForm}
                class="wrap-form-reservation size22 m-l-r-auto"
              >
                <div class="row">
                  <div class="col-md-6">
                    {/* <!-- Date --> */}
                    <span class="txt9">Breakfasts</span>

                    <div class="wrap-inputdate pos-relative txt10 size12 bo2 bo-rad-10 m-t-3 m-b-23">
                      <input
                        class="bo-rad-10 sizefull txt10 p-l-20"
                        type="number"
                        name="breakfasts"
                        placeholder="breakfasts"
                        value={breakfasts}
                        onChange={(e) => {
                          setbreakfasts(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    {/* <!-- Date --> */}
                    <span class="txt9">Lunchs</span>

                    <div class="wrap-inputdate pos-relative txt10 size12 bo2 bo-rad-10 m-t-3 m-b-23">
                      <input
                        class="bo-rad-10 sizefull txt10 p-l-20"
                        type="number"
                        name="lunch"
                        placeholder="lunchs"
                        value={lunchs}
                        onChange={(e) => {
                          setlunchs(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    {/* <!-- Name --> */}
                    <span class="txt9">Dinners</span>

                    <div class="wrap-inputname size12 bo2 bo-rad-10 m-t-3 m-b-23">
                      <input
                        class="bo-rad-10 sizefull txt10 p-l-20"
                        type="number"
                        name="dinner"
                        placeholder="dinners"
                        value={dinners}
                        onChange={(e) => {
                          setdinners(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    {/* <!-- Name --> */}
                    <span class="txt9">Days</span>

                    <div class="wrap-inputname size12 bo2 bo-rad-10 m-t-3 m-b-23">
                      <input
                        class="bo-rad-10 sizefull txt10 p-l-20"
                        type="number"
                        name="dinner"
                        placeholder="dinners"
                        value={days}
                        onChange={(e) => {
                          setDays(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    {/* <!-- Name --> */}
                    <span class="txt9">Total Price</span>

                    <div class="wrap-inputname size12 bo2 bo-rad-10 m-t-3 m-b-23">
                      <input
                        class="bo-rad-10 sizefull txt10 p-l-20"
                        type="number"
                        name="dinner"
                        placeholder="dinners"
                        value={totalPrice}
                        onChange={(e) => {
                          setTotalPrice(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    {/* <!-- Phone --> */}
                    <span class="txt9">Start from</span>

                    <div class="wrap-inputphone size12 bo2 bo-rad-10 m-t-3 m-b-23">
                      <input
                        class="bo-rad-10 sizefull txt10 p-l-20"
                        type="date"
                        name="Start from"
                        placeholder="Start from"
                        value={startdate}
                        onChange={(e) => {
                          setstartdate(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div class="col-md-12">
                    {/* <!-- Email --> */}
                    <span class="txt9">End At</span>

                    <div class="wrap-inputemail size12 bo2 bo-rad-10 m-t-3 m-b-23">
                      <input
                        class="bo-rad-10 sizefull txt10 p-l-20"
                        type="date"
                        name="Endat"
                        placeholder="end"
                        value={enddate}
                        onChange={(e) => {
                          setenddate(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div class="wrap-btn-booking flex-c-m m-t-6">
                  {/* <!-- Button3 --> */}
                  <button
                    type="submit"
                    class="btn3 flex-c-m size13 txt11 trans-0-4"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="info-reservation flex-w p-t-80">
            <div class="size23 w-full-md p-t-40 p-r-30 p-r-0-md">
              <h4 class="txt5 m-b-18">Reserve by Phone</h4>

              <p class="size25">
                Donec quis euismod purus. Donec feugiat ligula rhoncus, varius
                nisl sed, tincidunt lectus.
                <span class="txt25">Nulla vulputate</span>, lectus vel volutpat
                efficitur, orci
                <span class="txt25">lacus sodales</span>
                sem, sit amet quam:
                <span class="txt24">(001) 345 6889</span>
              </p>
            </div>

            <div class="size24 w-full-md p-t-40">
              <h4 class="txt5 m-b-18">For Event Booking</h4>

              <p class="size26">
                Donec feugiat ligula rhoncus:
                <span class="txt24">(001) 345 6889</span>, varius nisl sed,
                tinci-dunt lectus sodales sem.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
