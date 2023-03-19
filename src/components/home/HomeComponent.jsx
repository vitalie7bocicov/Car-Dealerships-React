import "./HomeComponent.css";

export default function HomeComponent() {
  return (
    <div className="container text-center home">
      <h1 className="text-center">Car dealerships</h1>
      <h5 className="my-5">
        Welcome to our web app, where you can easily browse and compare a
        comprehensive list of car dealerships.
      </h5>
      <h5 className="my-5">
        &#128187; Our user-friendly interface allows you to quickly find the
        dealerships that meet your needs and preferences, so you can make an
        informed decision when it comes to buying your next car.
      </h5>
      <h5>
        💽 Our database is regularly updated to ensure that you have access to
        the latest information on each dealership.
      </h5>
      <h5>
        &#128663; Whether you're in the market for a new or used car, our app
        has everything you need to find the right dealership and make the most
        informed decision possible.
      </h5>
      <h4 className="mt-5 text-center">
        &#9829; So why wait? Start your search today and find the perfect car
        dealership for your needs!
      </h4>
    </div>
  );
}
