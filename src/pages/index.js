import Search from "@/components/Search";
import UserDetails from "@/components/UserDetails";
import { useState } from "react";

export default function Home() {
  const [openModal, setOpenModal] = useState({ state: false, user: null });

  return (
    <>
      <Search openModal={openModal} setOpenModal={setOpenModal} />
      {openModal.state && (
        <UserDetails openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
}
