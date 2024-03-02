import { CreateAddressCard, AddressTable } from "./components";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App mt-5">
      <CreateAddressCard />
      <AddressTable />
    </div>
  );
}

export default App;
