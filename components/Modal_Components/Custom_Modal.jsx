
"use client";

import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import PlusIcon from "@/assets/images/Logos/plus-icon.png"

export function Custom_Modal({children, Title, loading, is_open,close_handle, open_handle, create_new_handle, buttonLabel='Create', Trigger_Button, disabled = false}) {

    return (
        <>

           {Trigger_Button ?  Trigger_Button : <button onClick={open_handle}>
                <Image
                    className="w-12"
                    src={PlusIcon}
                    alt="Logo"
                />
            </button>}
            {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
            <Modal  show={is_open} onClose={close_handle}>
                <Modal.Header>{Title}</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        {children}
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <Button  color="gray" onClick={close_handle}>
                        Cancel
                    </Button>
                    <Button  isProcessing={loading} disabled={loading || disabled}  onClick={create_new_handle}>{buttonLabel}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
