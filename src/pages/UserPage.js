import Header from "./../components/header/Header";
import Footer from "../components/footer/Footer";
import UserContent from "../components/userPage/UserContent";

const UserPage = (props) => {
  return (
    <div className="wrapper">
      <Header />
      <UserContent/>
      <Footer />
    </div>
  );
};

export default UserPage;
