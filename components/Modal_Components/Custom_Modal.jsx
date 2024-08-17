
"use client";

import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import PlusIcon from "@/assets/images/Logos/plus-icon.png"

export function Custom_Modal({children, submit_button_color='info', Title='Modal Title', loading=false, is_open,close_handle, open_handle, create_new_handle, buttonLabel='Create', Trigger_Button=null, disabled = false}) {

    return (
        <>

           {Trigger_Button ?  Trigger_Button : Trigger_Button !== null ? <button onClick={open_handle}>
                <Image
                    className="w-12"
                    src={PlusIcon}
                    alt="Logo"
                />
            </button> : null}
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
                    <Button color={submit_button_color} className="capitalize"  isProcessing={loading} disabled={loading || disabled}  onClick={create_new_handle}>{buttonLabel}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
