
"use client";

import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import PlusIcon from "@/assets/images/Logos/plus-icon.png"

export function Custom_Modal({children, Title, loading}) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>

            <button onClick={() => setOpenModal(true)}>
                <Image
                    className="w-12"
                    src={PlusIcon}
                    alt="Logo"
                />
            </button>
            {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
            <Modal  show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>{Title}</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        {children}
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <Button  color="gray" onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                    <Button  isProcessing={loading} disabled={loading}  onClick={() => setOpenModal(false)}>Create</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
