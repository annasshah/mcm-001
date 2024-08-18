
"use client";

import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import PlusIcon from "@/assets/images/Logos/plus-icon.png"
import { FC, ReactNode } from "react";

interface PropsInterface {
    children: ReactNode;
    submit_button_color?: string;
    Title?: string;
    loading?: boolean;
    is_open: boolean;
    close_handle: () => void;
    open_handle: () => void;
    create_new_handle: () => void;
    buttonLabel?: string;
    Trigger_Button?: null | ReactNode;
    disabled?: boolean;


}

export const Custom_Modal: FC<PropsInterface> = ({ children, submit_button_color = 'info', Title = 'Modal Title', loading = false, is_open, close_handle, open_handle, create_new_handle, buttonLabel = 'Create', Trigger_Button = null, disabled = false }) => {

    return (
        <>

            {Trigger_Button ? Trigger_Button : Trigger_Button !== null ? <button onClick={open_handle}>
                <Image
                    className="w-12"
                    src={PlusIcon}
                    alt="Logo"
                />
            </button> : null}
            {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
            <Modal show={is_open} onClose={close_handle}>
                <Modal.Header>{Title}</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        {children}
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <Button color="gray" onClick={close_handle}>
                        Cancel
                    </Button>
                    <Button color={submit_button_color} className="capitalize" isProcessing={loading} disabled={loading || disabled} onClick={create_new_handle}>{buttonLabel}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
