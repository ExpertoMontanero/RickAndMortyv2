import "/src/styles/homepage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LeftComponent from "../components/LeftComponent";
import RightComponent from "../components/RightComponent";

export default function Homepage() {
  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="left-side">
          <LeftComponent />
        </div>
        <div className="right-side">
          <RightComponent />
        </div>
      </div>
      <Footer />
    </div>
  );
}
