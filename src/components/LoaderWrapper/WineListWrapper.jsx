import LoaderLayout from "../loader/LoaderLayout.jsx";
import WineList from "../../pages/WineList.jsx";
import NavBar from "../NavBar.jsx";

export default function WineListWrapper() {
  const bgImages = ["/tela.jpg"];

  return (
    <LoaderLayout bgImages={bgImages}>
      <NavBar />
      <WineList />
    </LoaderLayout>
  );
}
