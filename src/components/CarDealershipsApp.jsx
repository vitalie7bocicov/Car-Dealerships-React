import { BrowserRouter, Routes, Route } from "react-router-dom";
import DealershipsComponent from "./dealerships/DealershipsComponent";
import FooterComponent from "./footer/FooterComponent";
import HeaderComponent from "./header/HeaderComponent";
import HomeComponent from "./home/HomeComponent";
import DealershipComponent from "./dealership/DealershipComponent";
import CarsComponent from "./cars/CarsComponent";
import CarComponent from "./car/CarComponent";
import CarsByDealershipComponent from "./cars/CarsByDealershipComponent";
import CarAtDealershipComponent from "./car/CarAtDealershipComponent";
export default function CarDealershipsApp() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomeComponent />}></Route>
          <Route path="/dealerships" element={<DealershipsComponent />}></Route>
          <Route
            path="/dealership/:id"
            element={<DealershipComponent />}
          ></Route>
          <Route
            path="/dealerships/:id/cars"
            element={<CarsByDealershipComponent />}
          ></Route>
          <Route path="/cars" element={<CarsComponent />}></Route>
          <Route path="/cars/:id" element={<CarComponent />}></Route>
          <Route
            path="/cars/dealership/:id"
            element={<CarAtDealershipComponent />}
          ></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}
