import LoaderLayout from "../loader/LoaderLayout.jsx";
import HomePage from "../../pages/HomePage.jsx";
import NavBar from "../NavBar.jsx";

export default function HomeWrapper() {
  const bgImages = ["/homeJumbo.jpg"];

  return (
    <LoaderLayout bgImages={bgImages}>
      <NavBar />
      <HomePage />
    </LoaderLayout>
  );
}
