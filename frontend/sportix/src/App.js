import Login from "./component/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CricketReg from "./component/TeamRegistration/CricketReg";
import Teams from "./component/dashboard/Teams";
import Home from "./component/dashboard/Home";
import Football from "./component/TeamRegistration/Football";
import Cricket from "./component/TeamRegistration/Cricket";
import FutsalReg from "./component/TeamRegistration/FutsalReg";
import BadmintonReg from "./component/TeamRegistration/BadmintonReg";
import Badminton from "./component/TeamRegistration/Badminton";
import CricketSchedule from "./component/ManageSchedule/CricketSchedule";
import Basketball from "./component/TeamRegistration/Basketball";
import BasketballReg from "./component/TeamRegistration/BasketballReg";
import Schedule from "./component/dashboard/Schedule";
import BasketballSchedule from "./component/ManageSchedule/BasketballSchedule";
import FutsalSchedule from "./component/ManageSchedule/FutsalSchedule";
import BadmintonSchedule from "./component/ManageSchedule/BadmintonSchedule";
import CricketDash from "./component/ManageSchedule/CricketDash";
import FutsalDash from "./component/ManageSchedule/FutsalDash";
import BadmintonDash from "./component/ManageSchedule/BadmintonDash";
import BasketballDash from "./component/ManageSchedule/BasketballDash";
import Vollyball from "./component/TeamRegistration/Vollyball";
import VollyballReg from "./component/TeamRegistration/VollyballReg";
import VollySchedule from "./component/ManageSchedule/VollySchedule";
import VollyDash from "./component/ManageSchedule/VollyDash";
import BadmintonUpdate from "./component/TeamRegistration/BadmintonUpdate";
import Manageinventory from "./component/Inventory/Manageinventory";
import Addproduct from "./component/Inventory/Addproduct";
import Inventory from "./component/Inventory/Inventory";
import Managevenue from "./component/Inventory/Managevenue";
import Addvenue from "./component/Inventory/Addvenue";
import BookingDash from "./component/Booking/BookingDash";
import Bookingrecord from "./component/Booking/Bookingrecord";
import VenueDash from "./component/Booking/VenueDash";
import Venuerecord from "./component/Booking/Venuerecord";
import TeamScheduler from "./component/Scheduler/TeamScheduler";
import League from "./component/Leagues/League";
import AddLeagues from "./component/Leagues/AddLeagues";
import FutsalLeague from "./component/Leagues/FutsalLeague";
import AddSchedule from "./component/Scheduler/AddSchedule";
import Header from "./component/Resuable/Header"
import _Cricket from "./component/TeamReg2.0/_Cricket";
import Modal from "./component/TeamReg2.0/Modal";
import _Futsal from "./component/TeamReg2.0/_Futsal";
import TeamRegModal from "./component/TeamReg2.0/TeamRegModal";
import Dropdown from "./component/dashboard/Dropdown";
import _Badminton from "./component/TeamReg2.0/_Badminton";
import _Basketball from "./component/TeamReg2.0/_Basketball";
import _Vollyball from "./component/TeamReg2.0/_Vollyball";
import Result from "./component/Result/Result";
import ViewPlayers from "./component/TeamReg2.0/ViewPlayers";
import ResultRecord from "./component/Result/ResultRecord";
import LeagueResult from "./component/Leagues/LeagueResult"; 
import BiddingDash from "./component/Bidding/BiddingDash";
import FutsalBidding from "./component/Bidding/FutsalBidding"
import { createBrowserHistory } from "history";
import BiddingSown from "./component/Bidding/BiddingSown"
import ResultDash from "./component/Leagues/ResultDash";

function App() {
  const history = createBrowserHistory();
  const isAuthenticated = true;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Cricket" element={<Cricket />} />
          <Route path="/CricketReg" element={<CricketReg />} />
          <Route path="/Teams" element={<Teams />} />
          <Route path="/Football" element={<Football />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/FutsalReg" element={<FutsalReg />} />
          <Route path="/Badminton" element={<Badminton />} />
          <Route path="/BadmintonReg" element={<BadmintonReg />} />
          <Route path="/CricketSchedule" element={<CricketSchedule />} />
          <Route path="/Basketball" element={<Basketball />} />
          <Route path="/BasketballReg" element={<BasketballReg />} />
          <Route path="/FutsalSchedule" element={<FutsalSchedule />} />
          <Route path="/BasketballSchedule" element={<BasketballSchedule />} />
          <Route path="/BadmintonSchedule" element={<BadmintonSchedule />} />
          <Route path="/Schedule" element={<Schedule />} />
          <Route path="/CricketDash" element={<CricketDash />} />
          <Route path="/FutsalDash" element={<FutsalDash />} />
          <Route path="/BasketballDash" element={<BasketballDash />} />
          <Route path="/BadmintonDash" element={<BadmintonDash />} />
          <Route path="/VollyballReg" element={<VollyballReg />} />
          <Route path="/Vollyball" element={<Vollyball />} />
          <Route path="/VollyDash" element={<VollyDash />} />
          <Route path="/VollySchedule" element={<VollySchedule />} />
          <Route path="/BadmintonUpdate" element={<BadmintonUpdate />} />
          <Route path="/Manageinventory" element={<Manageinventory />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/Addproduct" element={<Addproduct />} />
          <Route path="/Managevenue" element={<Managevenue />} />
          <Route path="/Addvenue" element={<Addvenue />} />
          <Route path="/BookingDash" element={<BookingDash />} />
          <Route path="/Bookingrecord" element={<Bookingrecord />} />
          <Route path="/VenueDash" element={<VenueDash />} />
          <Route path="/Venuerecord" element={<Venuerecord />} />
          <Route path="/TeamScheduler" element={<TeamScheduler />} />
          <Route path="/League" element={<League />} />
          <Route path="/ResultDash" element={<ResultDash />} />
          <Route path="/FutsalLeague" element={<FutsalLeague />} />
          <Route path="/AddSchedule" element={<AddSchedule/>} />
          <Route path="/AddLeagues" element={<AddLeagues/>} />
          <Route path="/Header" element={<Header/>} />
          <Route path="/_Cricket" element={<_Cricket/>} />
          <Route path="/Modal" element={<Modal/>} />
          <Route path="/_Futsal" element={<_Futsal/>} />
          <Route path="/TeamRegModal" element={<TeamRegModal/>} />
          <Route path="/Dropdown" element={<Dropdown/>} />
          <Route path="/_Badminton" element={<_Badminton/>} />
          <Route path="/_Vollyball" element={<_Vollyball/>} />
          <Route path="/_Basketball" element={<_Basketball/>} />
          <Route path="/Result" element={<Result/>} />
          <Route path="/ViewPlayers" element={<ViewPlayers/>} />
          <Route path="/ResultRecord" element={<ResultRecord/>} />
          <Route path="/LeagueResult" element={<LeagueResult />} />
          <Route path="/BiddingDash" element={<BiddingDash />} />
          <Route path="/FutsalBidding" element={<FutsalBidding />} />
          <Route path="/BiddingSown" element={<BiddingSown />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
